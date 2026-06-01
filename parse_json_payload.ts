import fs from 'fs';

const html = fs.readFileSync('drive_folder.html', 'utf-8');

// Search for the JSON block inside script tags
// Google Drive usually embeds JSON data in a pattern like:
// window.bootstrapData = ...; or as a massive JSON array structure.
// Let's find script tags containing the ID "1FSvponZUXZ8SPwaRa960WaWY3ivvgpGR"

const scripts = html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g);
let count = 0;
for (const match of scripts) {
  const code = match[1];
  if (code.includes('1FSvponZUXZ8SPwaRa960WaWY3ivvgpGR')) {
    console.log(`Script ${count} contains Folder ID! Length:`, code.length);
    // Write this script block to a file to examine it
    fs.writeFileSync(`script_block_${count}.js`, code);
    
    // Let's analyze strings in this script block
    // We are looking for file structures, typically containing "1X3-3LaGyqEE4tO0Btzcv6eABEOupbZWa" or others.
    const fileId = '1X3-3LaGyqEE4tO0Btzcv6eABEOupbZWa';
    const idx = code.indexOf(fileId);
    if (idx !== -1) {
      console.log(`Found "src" folder ID in script ${count} at index ${idx}!`);
      // Print context array around it
      // In Google Drive, the files are stored as nested JSON arrays e.g., ["1X3-3LaGyqEE4tO0Btzcv6eABEOupbZWa", "src", ...]
      console.log(code.slice(idx - 200, idx + 500));
    }
  }
  count++;
}
