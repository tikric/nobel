import fs from 'fs';

function decodeHexEscapes(str: string): string {
  return str.replace(/\\x([0-9a-fA-F]{2})/g, (match, p1) => {
    return String.fromCharCode(parseInt(p1, 16));
  }).replace(/\\u([0-9a-fA-F]{4})/g, (match, p1) => {
    return String.fromCharCode(parseInt(p1, 16));
  });
}

const html = fs.readFileSync('src_folder_real.html', 'utf-8');

// Find all script tags that contain "1GsyqNdaOgNdRHOikOZQiqBOSGmmkou1I"
const scripts = html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g);
let count = 0;
let payload = '';
for (const match of scripts) {
  const code = match[1];
  if (code.includes('1GsyqNdaOgNdRHOikOZQiqBOSGmmkou1I')) {
    payload += code;
  }
  count++;
}

const decoded = decodeHexEscapes(payload);
fs.writeFileSync('src_folder_decoded.json', decoded);

// Find files inside the src folder!
// Format: "ID", ["PRENT_ID"], "NAME", "MIME"
const regex = /"([a-zA-Z0-9_-]{28,45})"\s*,\s*\[\s*"([a-zA-Z0-9_-]{28,45})"\s*\]\s*,\s*"([^"]+)"\s*,\s*"([^"]+)"/g;
let match;
console.log('Files and subfolders found inside src/:');
const items: any[] = [];
while ((match = regex.exec(decoded)) !== null) {
  console.log(`- ID: ${match[1]}, Name: ${match[3]}, Mime: ${match[4]}`);
  items.push({ id: match[1], name: match[3], mime: match[4] });
}

fs.writeFileSync('src_items.json', JSON.stringify(items, null, 2));
