import fs from 'fs';

const manifest = JSON.parse(fs.readFileSync('gdrive_files_manifest.json', 'utf-8'));
const files = manifest.files;

console.log('--- MANIFEST SUMMARY ---');
const foldersMap: Record<string, string[]> = {};

for (const file of files) {
  const dir = file.parentPath || '.';
  if (!foldersMap[dir]) {
    foldersMap[dir] = [];
  }
  foldersMap[dir].push(file.name);
}

for (const [dir, fileNames] of Object.entries(foldersMap)) {
  console.log(`Directory: ${dir} (${fileNames.length} files)`);
  if (fileNames.length < 15) {
    console.log(`  Files:`, fileNames);
  } else {
    console.log(`  Files:`, fileNames.slice(0, 5), `...and ${fileNames.length - 5} more`);
  }
}
