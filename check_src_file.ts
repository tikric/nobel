import fs from 'fs';
const content = fs.readFileSync('src_folder.html', 'utf-8');
console.log('src_folder.html length:', content.length);
console.log('src_folder.html slice:', content.slice(0, 500));
