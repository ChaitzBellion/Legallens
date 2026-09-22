import mammoth from 'mammoth';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const pdfParse = require('pdf-parse');

export interface ExtractedDocument {
  name: string;
  mimeType: string;
  sizeBytes: number;
  text: string;
  pageCount?: number;
  wordCount: number;
}

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB limit
const ALLOWED_EXTENSIONS = ['.pdf', '.docx', '.txt', '.text', '.md'];
const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/msword',
  'text/plain',
  'text/markdown',
  'application/octet-stream', // Some browsers send txt or docx as octet-stream
];

/**
 * Sanitizes filenames to prevent path traversal, control chars, or injection.
 */
export function sanitizeFilename(filename: string): string {
  if (!filename) return 'unnamed_document.txt';
  // Strip path traversal sequences and dangerous characters
  const cleaned = filename
    .replace(/^.*[\\/]/, '')
    .replace(/[^a-zA-Z0-9._\- ]/g, '_')
    .trim();
  return cleaned || 'document.txt';
}

/**
 * Validates file constraints (size, extension, mime-type).
 */
export function validateDocumentFile(
  file: { originalname?: string; mimetype?: string; size?: number; buffer?: Buffer }
): ValidationResult {
  if (!file) {
    return { isValid: false, error: 'No document file provided.' };
  }

  if (file.size !== undefined && file.size <= 0) {
    return {
      isValid: false,
      error: 'The uploaded file is empty (0 bytes). Please upload a document with text.',
    };
  }

  if (file.size && file.size > MAX_FILE_SIZE) {
    return {
      isValid: false,
      error: `File size exceeds the 10MB limit. Provided file is ${(file.size / (1024 * 1024)).toFixed(1)}MB.`,
    };
  }

  const name = file.originalname || '';
  const extMatch = name.toLowerCase().match(/\.[a-z0-9]+$/);
  const ext = extMatch ? extMatch[0] : '';

  if (!ALLOWED_EXTENSIONS.includes(ext)) {
    return {
      isValid: false,
      error: `Unsupported file type "${ext || 'unknown'}". Please upload a PDF, DOCX, or TXT file.`,
    };
  }

  if (file.mimetype && !ALLOWED_MIME_TYPES.includes(file.mimetype) && !file.mimetype.startsWith('text/')) {
    return {
      isValid: false,
      error: `Unsupported MIME type "${file.mimetype}". Please upload a valid PDF, DOCX, or plain text document.`,
    };
  }

  return { isValid: true };
}

/**
 * Extracts raw readable text from PDF, DOCX, or TXT buffer.
 */
export async function extractTextFromBuffer(
  buffer: Buffer,
  filename: string,
  mimetype?: string
): Promise<ExtractedDocument> {
  const sanitizedName = sanitizeFilename(filename);
  const ext = sanitizedName.toLowerCase().match(/\.[a-z0-9]+$/)?.[0] || '';
  let text = '';
  let pageCount: number | undefined = undefined;

  try {
    if (ext === '.pdf' || mimetype === 'application/pdf') {
      const pdfData = await pdfParse(buffer);
      text = pdfData.text || '';
      pageCount = pdfData.numpages || undefined;
    } else if (
      ext === '.docx' ||
      mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ) {
      const result = await mammoth.extractRawText({ buffer });
      text = result.value || '';
    } else {
      // Default to plain text parsing with UTF-8 decoding
      text = buffer.toString('utf-8');
    }
  } catch (err: any) {
    throw new Error(
      `Failed to extract text from "${sanitizedName}": ${err?.message || 'Unsupported or corrupted document structure.'}`
    );
  }

  // Clean and normalize text
  text = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n').trim();

  // Validate that document actually contains readable non-empty text
  if (!text || text.replace(/[\s\t\n\r]/g, '').length < 25) {
    throw new Error(
      'We couldn\'t extract readable text from this document. Please try another file or a text-based PDF.'
    );
  }

  const words = text.split(/\s+/).filter(Boolean);

  return {
    name: sanitizedName,
    mimeType: mimetype || 'text/plain',
    sizeBytes: buffer.length,
    text,
    pageCount,
    wordCount: words.length,
  };
}

/**
 * Wraps untrusted document content in strict delimiter tags to protect against prompt injection.
 */
export function wrapUntrustedDocumentText(text: string): string {
  // Defensive sanitization: replace accidental XML tag breakout
  const sanitizedText = text
    .replace(/<\/user_submitted_legal_document_content>/gi, '[ESCAPED_CLOSING_TAG]')
    .replace(/<\/system_instructions>/gi, '[ESCAPED_TAG]');

  return `<user_submitted_legal_document_content>\n${sanitizedText}\n</user_submitted_legal_document_content>`;
}
