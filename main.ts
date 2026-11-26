import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sourcePath = join(__dirname, 'entry.png');
const outputDir = '/output';
const outputPath = join(outputDir, 'entry.png');

function main(): void {
  // Check source exists
  if (!existsSync(sourcePath)) {
    console.error('Source file not found:', sourcePath);
    process.exit(1);
  }

  const sourceBytes = readFileSync(sourcePath);

  // Check source is not empty
  if (sourceBytes.length === 0) {
    console.error('Source file is empty:', sourcePath);
    process.exit(1);
  }

  // Create output directory recursively
  mkdirSync(outputDir, { recursive: true });

  // Write output
  writeFileSync(outputPath, sourceBytes);

  // Verify output was written correctly
  const outputBytes = readFileSync(outputPath);
  if (outputBytes.length === 0 || outputBytes.length !== sourceBytes.length) {
    console.error('Output file verification failed');
    process.exit(1);
  }
}

main();
