import fs from 'fs';

const html = fs.readFileSync('drive_folder.html', 'utf-8');

// Let's find all occurences of names/extension-like patterns or labels
// Google Drive initial data often lists strings like: ["id", "name", "mimeType", ...]
// Let's find patterns like: ["1...", "your_filename_here", ...]
const ids = [
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

for (const id of ids) {
  const index = html.indexOf(id);
  if (index !== -1) {
    console.log(`Found ID: ${id} at index ${index}`);
    // Print around 200 chars before and after
    const part = html.slice(Math.max(0, index - 300), index + 300);
    console.log('--- CONTEXT ---');
    console.log(part);
    console.log('---------------\n');
  }
}
