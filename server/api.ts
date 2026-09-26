import express from 'express';
import multer from 'multer';
import {
  validateDocumentFile,
  extractTextFromBuffer,
  sanitizeFilename,
} from './documentParser.js';
import {
  analyzeLegalDocument,
  askDocumentQuestion,
  compareTwoDocuments,
  isTransientError,
  formatGeminiError,
} from './gemini.js';
import {
  DEMO_DOCUMENT_A_NAME,
  DEMO_DOCUMENT_A_TEXT,
  DEMO_DOCUMENT_B_NAME,
  DEMO_DOCUMENT_B_TEXT,
  ALL_TEST_CASE_DOCUMENTS,
} from './sampleDocuments.js';

const app = express();

app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024,
    files: 2,
  },
});

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
    timestamp: new Date().toISOString(),
  });
});

app.get('/api/demo-documents', (_req, res) => {
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

app.post('/api/analyze', upload.single('file'), async (req, res) => {
  try {
    let rawText = '';
    let docName = 'Uploaded Legal Document';
    let pageCount: number | undefined;

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

export default app;
