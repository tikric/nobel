import fs from 'fs';

const html = fs.readFileSync('drive_folder.html', 'utf-8');

// The HTML contains a window['_initialData'] or data-initial-data block.
// Or we can just find all matches of files and folder names by looking for potential strings of files.
// Let's filter the unique strings in the entire page that might be file/folder names or titles or IDs.

const driveIds = [
  '1HfmOOl_QvHepT1IOBCQm6jxfDihCrxH-',
  '1GsyqNdaOgNdRHOikOZQiqBOSGmmkou1I',
  '1X3-3LaGyqEE4tO0Btzcv6eABEOupbZWa',
  '1V468f021MgFRW_oIr5rPwf_g-fh-z7Xg',
  '1nuvnWOovR5idCBNVocsm9Ht90Ruqe6d5',
  '1VLCAuGWL6-JNqNGUAI3Y3GyvV1LHv7Q_',
  '11kDJ2bdn8mj2y1A6rUeinihlxgiy4MgB',
  '1sYZTEdbZ5Eoi49cYwK-voE5jZGOBkoJh',
  '13hLsQT0IGLtBqXG1PbkoURQw5f385t3p',
  '1zTMKIHhhRfdNIGcMKIKy3fWyJeTpIzSg',
  '11gLjZE79BOrRbYf8pP6DW9RAhRcO2Tq5',
  '1qU76zPzR-HUrDOdYNz28Ay6X7qFrX33e',
  '1bWGmW2D_L23fc12ZfOf1WZX-nyNIN8VP',
  '1oBAFS0E8g0knMK6i8S6g_BwiKlgBgSqm',
  '16TvNNpZ1A0k8f75_vFY2M7GcfWcZCgzL',
  '1QvzG8AB-6y8RnI6_0AAKkQWJqdHnYZLe'
];

console.log('Searching for elements around each ID...');

for (const id of driveIds) {
  const index = html.indexOf(id);
  if (index !== -1) {
    // Find strings of characters around this ID
    // Look 5000 characters around the ID and search for text names
    const searchArea = html.slice(Math.max(0, index - 5000), index + 5000);
    
    // Search for patterns like:
    // [ "id", "name", ... ]
    // or HTML attributes like title="...", aria-label="..."
    const titleMatch = searchArea.match(/aria-label="([^"]+)"/);
    const titleAttr = searchArea.match(/title="([^"]+)"/);
    const nameMatch = searchArea.match(/"([^"]+)"\s*,\s*\[\s*"id"\s*,\s*"\w+"\s*\]/);
    
    console.log(`ID: ${id}`);
    if (titleMatch) console.log(`  aria-label: ${titleMatch[1]}`);
    if (titleAttr) console.log(`  title: ${titleAttr[1]}`);
    
    // Let's also search for typical strings containing file extensions
    const extMatch = searchArea.match(/"([^"]+\.(tsx|ts|json|css|html|js|png|jpg|ico))"/g);
    if (extMatch) {
      console.log(`  Extensions:`, extMatch.slice(0, 10));
    }
  }
}
