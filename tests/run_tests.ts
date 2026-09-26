import assert from 'node:assert';
import app from '../server/api.js';
import {
  validateDocumentFile,
  extractTextFromBuffer,
  sanitizeFilename,
} from '../server/documentParser.js';
import {
  DEMO_DOCUMENT_A_NAME,
  DEMO_DOCUMENT_A_TEXT,
  DEMO_DOCUMENT_B_NAME,
  DEMO_DOCUMENT_B_TEXT,
  ALL_TEST_CASE_DOCUMENTS,
} from '../server/sampleDocuments.js';

console.log('--- Starting LegalLens Core Verification Tests ---');

// Test 1: Filename Sanitization
console.log('Test 1: Filename Sanitization');
{
  const unsafe = '../../etc/passwd..//sensitive<file>.pdf';
  const clean = sanitizeFilename(unsafe);
  assert(!clean.includes('..'), 'Must strip path traversal sequences');
  assert(!clean.includes('<'), 'Must strip illegal characters');
  assert(!clean.includes('>'), 'Must strip illegal characters');
  assert(clean.endsWith('.pdf'), 'Preserves legitimate extension');
  console.log('✓ Filename sanitization passed.');
}

// Test 2: File Validation Logic
console.log('Test 2: File Validation Logic');
{
  // Valid text file
  const validFile: any = {
    originalname: 'offer_letter.txt',
    size: 2048,
    mimetype: 'text/plain',
  };
  const v1 = validateDocumentFile(validFile);
  assert.strictEqual(v1.isValid, true, 'Valid text file should pass validation');

  // Executable file should be rejected
  const exeFile: any = {
    originalname: 'malware.exe',
    size: 1024,
    mimetype: 'application/x-msdownload',
  };
  const v2 = validateDocumentFile(exeFile);
  assert.strictEqual(v2.isValid, false, 'EXE file must be rejected');

  // File over 10MB should be rejected
  const hugeFile: any = {
    originalname: 'huge_document.pdf',
    size: 12 * 1024 * 1024,
    mimetype: 'application/pdf',
  };
  const v3 = validateDocumentFile(hugeFile);
  assert.strictEqual(v3.isValid, false, 'Files over 10MB must be rejected');

  // Empty file should be rejected
  const emptyFile: any = {
    originalname: 'empty.pdf',
    size: 0,
    mimetype: 'application/pdf',
  };
  const v4 = validateDocumentFile(emptyFile);
  assert.strictEqual(v4.isValid, false, 'Empty files must be rejected');

  console.log('✓ File validation passed.');
}

// Test 3: Text Buffer Extraction (Plain Text)
console.log('Test 3: Plain text buffer extraction');
async function testExtraction() {
  const sampleContent = 'EMPLOYMENT AGREEMENT\n\nThis agreement is made between Apex Tech and Jane Doe.\nBase Salary: $165,000.\nNotice period: 60 days.';
  const buffer = Buffer.from(sampleContent, 'utf-8');

  const result = await extractTextFromBuffer(buffer, 'agreement.txt', 'text/plain');
  assert.strictEqual(result.name, 'agreement.txt');
  assert(result.text.includes('Jane Doe'), 'Extracted text must contain Jane Doe');
  assert(result.text.includes('60 days'), 'Extracted text must contain notice period');
  assert.strictEqual(result.wordCount > 10, true, 'Word count accurately calculated');
  console.log('✓ Plain text extraction passed.');

  const pdfText = 'Employment Agreement with salary and thirty days notice period.';
  const pdfStream = `BT\n/F1 12 Tf\n72 720 Td\n(${pdfText}) Tj\nET`;
  const pdfObjects = [
    '<< /Type /Catalog /Pages 2 0 R >>',
    '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
    '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>',
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
    `<< /Length ${Buffer.byteLength(pdfStream, 'ascii')} >>\nstream\n${pdfStream}\nendstream`,
  ];
  let pdfSource = '%PDF-1.4\n';
  const offsets = [0];
  for (const [index, object] of pdfObjects.entries()) {
    offsets.push(Buffer.byteLength(pdfSource, 'ascii'));
    pdfSource += `${index + 1} 0 obj\n${object}\nendobj\n`;
  }
  const xrefOffset = Buffer.byteLength(pdfSource, 'ascii');
  pdfSource += `xref\n0 ${offsets.length}\n0000000000 65535 f \n`;
  pdfSource += offsets.slice(1).map((offset) => `${String(offset).padStart(10, '0')} 00000 n \n`).join('');
  pdfSource += `trailer\n<< /Size ${offsets.length} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;

  const pdfResult = await extractTextFromBuffer(Buffer.from(pdfSource, 'ascii'), 'agreement.pdf', 'application/pdf');
  assert(pdfResult.text.includes('Employment Agreement'), 'PDF extraction must preserve document text');
  assert.strictEqual(pdfResult.pageCount, 1, 'PDF extraction must return the page count');
  console.log('✓ PDF text extraction passed.');
}

async function testApiHealthRoute() {
  const server = app.listen(0, '127.0.0.1');

  try {
    await new Promise<void>((resolve) => server.once('listening', resolve));
    const address = server.address();
    assert(address && typeof address !== 'string', 'API server should bind to a local port');

    const response = await fetch(`http://127.0.0.1:${address.port}/api/health`);
    assert.strictEqual(response.status, 200, 'Health route should respond successfully');

    const health = await response.json();
    assert.strictEqual(health.status, 'ok');
    assert.strictEqual(typeof health.hasGeminiKey, 'boolean');
    console.log('✓ API health route passed.');
  } finally {
    await new Promise<void>((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
    });
  }
}

// Test 4: Demo Sample Documents Integrity
console.log('Test 4: Sample Documents Integrity');
{
  assert(DEMO_DOCUMENT_A_TEXT.length > 500, 'Demo Document A has full legal content');
  assert(DEMO_DOCUMENT_A_TEXT.includes('Apex Technologies'), 'Demo Document A specifies Apex Technologies');
  assert(DEMO_DOCUMENT_A_TEXT.includes('7.2') || DEMO_DOCUMENT_A_TEXT.includes('8.2'), 'Demo Document A has section references');
  assert(DEMO_DOCUMENT_B_TEXT.includes('Beacon Global Systems'), 'Demo Document B specifies Beacon Global Systems');
  
  // Test 5: Verify all 6 test cases
  assert.strictEqual(ALL_TEST_CASE_DOCUMENTS.length, 6, 'Should provide 6 test case documents');
  const ids = ALL_TEST_CASE_DOCUMENTS.map(tc => tc.id);
  assert(ids.includes('demoA') && ids.includes('demoB') && ids.includes('demoC') && ids.includes('demoD') && ids.includes('demoE') && ids.includes('demoF'), 'All 6 test IDs present');
  ALL_TEST_CASE_DOCUMENTS.forEach(tc => {
    assert(tc.title && tc.title.length > 0, 'Test case has title');
    assert(tc.text && tc.text.length > 200, 'Test case has substantial contract text');
    assert(tc.keyProvisionsToInspect && tc.keyProvisionsToInspect.length > 0, 'Test case has key provisions to inspect');
  });
  console.log('✓ All 6 test case documents verified.');
}

// Run async tests
Promise.all([testExtraction(), testApiHealthRoute()]).then(() => {
  console.log('--- All LegalLens Core Verification Tests Passed Successfully! ---');
}).catch((err) => {
  console.error('Test failed:', err);
  process.exit(1);
});
