import fs from 'fs';

function decodeHexEscapes(str: string): string {
  // Replace patterns like \x22 with corresponding characters, \x5b with [, etc.
  return str.replace(/\\x([0-9a-fA-F]{2})/g, (match, p1) => {
    return String.fromCharCode(parseInt(p1, 16));
  }).replace(/\\u([0-9a-fA-F]{4})/g, (match, p1) => {
    return String.fromCharCode(parseInt(p1, 16));
  });
}

const file36 = fs.existsSync('script_block_36.js') ? fs.readFileSync('script_block_36.js', 'utf-8') : '';
const file37 = fs.existsSync('script_block_37.js') ? fs.readFileSync('script_block_37.js', 'utf-8') : '';

const decoded36 = decodeHexEscapes(file36);
const decoded37 = decodeHexEscapes(file37);

fs.writeFileSync('decoded_36.json', decoded36);
fs.writeFileSync('decoded_37.json', decoded37);

console.log('Decoded script blocks. Searching for file-like structures...');

// Let's search inside decoded36 and decoded37 for patterns:
// id, name, extension. Usually, in Google Drive models, there are matches of 33-char alphanumeric IDs
// followed by filename string. Let's find occurrences of filenames inside these decoded contents.

// Let's use a regex to match files: [ID, folderID, name, mimeType, ...] or similar structures
// Typically: "1...",["PARENT..."],"FILENAME","MIMETYPE"
const regex = /"([a-zA-Z0-9_-]{28,45})"\s*,\s*\[\s*"([a-zA-Z0-9_-]{28,45})"\s*\]\s*,\s*"([^"]+)"\s*,\s*"([^"]+)"/g;
let match;
console.log('File details found:');
while ((match = regex.exec(decoded36)) !== null) {
  console.log(`- ID: ${match[1]}, Parent: ${match[2]}, Name: ${match[3]}, Mime: ${match[4]}`);
}
while ((match = regex.exec(decoded37)) !== null) {
  console.log(`- ID: ${match[1]}, Parent: ${match[2]}, Name: ${match[3]}, Mime: ${match[4]}`);
}
