import https from 'https';
import fs from 'fs';

const url = 'https://drive.google.com/drive/folders/1X3-3LaGyqEE4tO0Btzcv6eABEOupbZWa?usp=sharing';

https.get(url, (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    fs.writeFileSync('src_folder.html', data);
    console.log('Saved src folder HTML.');
    
    // Find potential IDs in src folder
    const regex = /"[0-9a-zA-Z_-]{28,40}"/g;
    const matches = data.match(regex);
    if (matches) {
      const unique = Array.from(new Set(matches)).map(s => s.replace(/"/g, ''));
      console.log('Found potential keys in src:', unique.slice(0, 50));
    }
  });
}).on('error', (err) => {
  console.error('Error fetching src folder:', err);
});
