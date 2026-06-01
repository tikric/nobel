import fs from 'fs';

const html = fs.readFileSync('drive_folder.html', 'utf-8');

// The Google Drive folder list is represented by rows.
// Let's find each row matching `<tr data-selectable data-id="ID"`
const matches = html.matchAll(/<tr[^>]*(data-selectable)[^>]*data-id="([^"]+)"[^>]*>/g);
const ids = Array.from(matches).map(m => m[2]);
console.log('Found row IDs:', ids);

for (const id of ids) {
  // Let's find the text name of the file by looking at the aria-label of the row or its children.
  // The row has aria-label="Name" or similar or class names.
  // There is usually a span or element with the name.
  const idx = html.indexOf(id);
  if (idx !== -1) {
    // Look at 1000 characters around the ID to find the file or folder name
    const context = html.slice(idx - 1000, idx + 1000);
    
    // Find text content that represents the file or folder name
    // Typically inside a span with jsname="LBaJxb" or aria-label="..."
    const ariaLabel = context.match(/aria-label="([^"]+)"/);
    console.log(`ID: ${id}`);
    if (ariaLabel) {
      console.log(`  aria-label: ${ariaLabel[1]}`);
    }
    
    // Let's print some text pieces that look like file/folder names
    const textPieces = context.match(/>([^<]{3,80})</g);
    if (textPieces) {
      const cleanPieces = textPieces.map(t => t.slice(1, -1).trim()).filter(t => t.length > 2);
      console.log(`  Texts around ID:`, cleanPieces.slice(0, 10));
    }
  }
}
