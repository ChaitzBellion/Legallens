import express from 'express';
import multer from 'multer';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import {
  validateDocumentFile,
  extractTextFromBuffer,
  sanitizeFilename,
} from './server/documentParser.js';
import {
  analyzeLegalDocument,
  askDocumentQuestion,
  compareTwoDocuments,
  isTransientError,
  formatGeminiError,
} from './server/gemini.js';
import {
  DEMO_DOCUMENT_A_NAME,
  DEMO_DOCUMENT_A_TEXT,
  DEMO_DOCUMENT_B_NAME,
  DEMO_DOCUMENT_B_TEXT,
  ALL_TEST_CASE_DOCUMENTS,
} from './server/sampleDocuments.js';

const app = express();
const PORT = 3000;

// Body parsing with sane payload limits
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));

// Multer in-memory storage for secure, temporary document processing (never written to disk)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB maximum
    files: 2,
  },
});

// API Routes

/**
 * Health check endpoint
 */
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
    timestamp: new Date().toISOString(),
  });
});

/**
 * Provides access to fictional sample documents for quick demo & testing
 */
app.get('/api/demo-documents', (req, res) => {
  res.json({
    demoA: {
      name: DEMO_DOCUMENT_A_NAME,
      text: DEMO_DOCUMENT_A_TEXT,
      label: 'Fictional Employment Agreement (Apex Technologies)',
      documentType: 'employment_agreement',
    },
    demoB: {
      name: DEMO_DOCUMENT_B_NAME,
      text: DEMO_DOCUMENT_B_TEXT,
      label: 'Fictional Offer Letter B (Beacon Global Systems)',
      documentType: 'offer_letter',
    },
    testCases: ALL_TEST_CASE_DOCUMENTS,
  });
});

/**
 * Upload & Analyze a legal document (supports both multipart file upload and JSON body text)
 */
app.post('/api/analyze', upload.single('file'), async (req, res) => {
  try {
    let rawText = '';
    let docName = 'Uploaded Legal Document';
    let pageCount: number | undefined = undefined;

    if (req.file) {
      const validation = validateDocumentFile(req.file);
      if (!validation.isValid) {
        return res.status(400).json({ error: validation.error });
      }

      const extracted = await extractTextFromBuffer(
        req.file.buffer,
        req.file.originalname,
        req.file.mimetype
      );
      rawText = extracted.text;
      docName = extracted.name;
      pageCount = extracted.pageCount;
    } else if (req.body && req.body.text) {
      rawText = String(req.body.text).trim();
      docName = sanitizeFilename(req.body.documentName || 'Document.txt');
      if (rawText.length < 25) {
        return res.status(400).json({
          error: 'The provided document text is too short or empty. Please provide readable legal text.',
        });
      }
    } else {
      return res.status(400).json({
        error: 'No file or document text was received. Please select a file or paste document text.',
      });
    }

    const analysis = await analyzeLegalDocument(rawText, docName, pageCount);
    res.json({
      success: true,
      analysis,
      fullText: rawText,
    });
  } catch (err: any) {
    console.error('Error during document analysis:', err?.message || err);
    const is503 = isTransientError(err);
    const friendlyError = formatGeminiError(err);
    res.status(is503 ? 503 : 500).json({
      error: friendlyError,
      isTransient: is503,
    });
  }
});

/**
 * Document Q&A (Ask LegalLens) strictly grounded in document text
 */
app.post('/api/ask', async (req, res) => {
  try {
    const { documentText, question, conversationHistory } = req.body;

    if (!documentText || typeof documentText !== 'string' || documentText.trim().length === 0) {
      return res.status(400).json({ error: 'Document text is required for answering questions.' });
    }

    if (!question || typeof question !== 'string' || question.trim().length === 0) {
      return res.status(400).json({ error: 'Please enter a valid question.' });
    }

    const result = await askDocumentQuestion(
      documentText,
      question.trim(),
      Array.isArray(conversationHistory) ? conversationHistory : []
    );

    res.json({
      success: true,
      ...result,
    });
  } catch (err: any) {
    console.error('Error during Document Q&A:', err?.message || err);
    const is503 = isTransientError(err);
    const friendlyError = formatGeminiError(err);
    res.status(is503 ? 503 : 500).json({
      error: friendlyError,
      isTransient: is503,
    });
  }
});

/**
 * Compare two legal documents
 */
app.post('/api/compare', upload.fields([{ name: 'fileA', maxCount: 1 }, { name: 'fileB', maxCount: 1 }]), async (req, res) => {
  try {
    let docAText = '';
    let docAName = 'Document A';
    let docBText = '';
    let docBName = 'Document B';

    const files = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined;

    if (files?.fileA?.[0]) {
      const extractedA = await extractTextFromBuffer(
        files.fileA[0].buffer,
        files.fileA[0].originalname,
        files.fileA[0].mimetype
      );
      docAText = extractedA.text;
      docAName = extractedA.name;
    } else if (req.body?.docAText) {
      docAText = String(req.body.docAText).trim();
      docAName = sanitizeFilename(req.body.docAName || 'Document A');
    }

    if (files?.fileB?.[0]) {
      const extractedB = await extractTextFromBuffer(
        files.fileB[0].buffer,
        files.fileB[0].originalname,
        files.fileB[0].mimetype
      );
      docBText = extractedB.text;
      docBName = extractedB.name;
    } else if (req.body?.docBText) {
      docBText = String(req.body.docBText).trim();
      docBName = sanitizeFilename(req.body.docBName || 'Document B');
    }

    if (!docAText || !docBText) {
      return res.status(400).json({
        error: 'Both Document A and Document B must be provided to perform a comparison.',
      });
    }

    const comparison = await compareTwoDocuments(docAText, docAName, docBText, docBName);
    res.json({
      success: true,
      comparison,
    });
  } catch (err: any) {
    console.error('Error during document comparison:', err?.message || err);
    const is503 = isTransientError(err);
    const friendlyError = formatGeminiError(err);
    res.status(is503 ? 503 : 500).json({
      error: friendlyError,
      isTransient: is503,
    });
  }
});

// Vite Middleware integration for dev and production static serving
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`LegalLens Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
