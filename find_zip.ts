import fs from 'fs';

const html = fs.readFileSync('drive_folder.html', 'utf-8');

// Find occurrences of ".zip" or ".rar" or other extensions
const zipIndex = html.indexOf('.zip');
if (zipIndex !== -1) {
  console.log('Found .zip index:', zipIndex);
  console.log(html.slice(zipIndex - 100, zipIndex + 100));
} else {
  console.log('No .zip found. Searching for any extensions...');
  const extRegex = /[\w-]+\.\w{2,4}/g;
  const matches = html.match(extRegex);
  if (matches) {
    console.log('Found file-like patterns:', Array.from(new Set(matches)).slice(0, 50));
  }
}

// Let's print out text strings inside some script tag or JSON blocks
const jsonMatch = html.match(/class="qwPkcb[^"]*".*?title="([^"]*)"/);
if (jsonMatch) {
  console.log('Found title matching:', jsonMatch[1]);
}
