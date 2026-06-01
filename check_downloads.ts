import fs from 'fs';
import path from 'path';

const manifest = JSON.parse(fs.readFileSync('gdrive_files_manifest.json', 'utf-8'));
const files = manifest.files;

console.log(`Manifest contains ${files.length} files.`);

let missingCount = 0;
const missingFiles: any[] = [];

for (const file of files) {
  const localPath = path.join(process.cwd(), 'gdrive_download', file.parentPath, file.name);
  if (!fs.existsSync(localPath)) {
    missingCount++;
    missingFiles.push(file);
  }
}

console.log(`Missing download count: ${missingCount}`);
if (missingCount > 0) {
  console.log('Sample missing files:', missingFiles.slice(0, 10));
}
// Write missing files to file so we can download them
fs.writeFileSync('missing_downloads.json', JSON.stringify(missingFiles, null, 2));
