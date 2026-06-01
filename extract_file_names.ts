import fs from 'fs';

const html = fs.readFileSync('drive_folder.html', 'utf-8');

// The Google Drive JSON contains structures containing the folder's files and folders.
// Let's find patterns in JS arrays.
// For example, file metadata is often embedded inside window['_initialData'] or as a massive JSON block inside the HTML.
// Let's search for "1HfmOOl_QvHepT1IOBCQm6jxfDihCrxH-". We know the ID is present!
// Let's search inside the HTML for the ID, and try to find any text strings of letters and spaces nearby, which would represent the file names!

const id = '1HfmOOl_QvHepT1IOBCQm6jxfDihCrxH-';
const idx = html.indexOf(id);
if (idx !== -1) {
  console.log('Found ID context:');
  const size = 2000;
  const area = html.slice(Math.max(0, idx - size), idx + size);
  
  // Let's extract all strings in double quotes inside this area
  const strRegex = /"([^"\\]|\\.)*"/g;
  const matches = area.match(strRegex);
  if (matches) {
    console.log('Strings around ID:');
    const cleanMatches = Array.from(new Set(matches)).map(m => m.slice(1, -1)).filter(m => m.length > 2);
    console.log(cleanMatches);
  }
} else {
  console.log('ID not found');
}
