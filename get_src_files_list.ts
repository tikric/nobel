import fs from 'fs';

const html = fs.readFileSync('src_folder.html', 'utf-8');

// Search for strings of 33 length that resemble file IDs
const regex = /"[0-9a-zA-Z_-]{28,40}"/g;
const matches = html.match(regex);

if (matches) {
  const ids = Array.from(new Set(matches)).map(s => s.replace(/"/g, ''));
  console.log(`Found ${ids.length} potential IDs in src/`);
  
  for (const id of ids) {
    const index = html.indexOf(id);
    if (index !== -1) {
      const searchArea = html.slice(Math.max(0, index - 3000), index + 3000);
      const titleMatch = searchArea.match(/aria-label="([^"]+)"/);
      const rowIdMatch = searchArea.match(/data-id="([^"]+)"/);
      
      if (titleMatch && rowIdMatch && rowIdMatch[1] === id) {
        console.log(`ID: ${id}`);
        console.log(`  Name/Label: ${titleMatch[1]}`);
      }
    }
  }
} else {
  console.log('No IDs found in src');
}
