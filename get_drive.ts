import https from 'https';
import fs from 'fs';

const url = 'https://drive.google.com/drive/folders/1FSvponZUXZ8SPwaRa960WaWY3ivvgpGR?usp=sharing';

https.get(url, (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    fs.writeFileSync('drive_folder.html', data);
    console.log('Saved HTML. Searching for file or folder IDs...');
    
    // Regular expression to find file/folder IDs and resource keys
    const regex = /"[0-9a-zA-Z_-]{28,40}"/g;
    const matches = data.match(regex);
    if (matches) {
      const unique = Array.from(new Set(matches)).map(s => s.replace(/"/g, ''));
      console.log('Found potential keys:', unique.slice(0, 50));
    } else {
      console.log('No potential IDs found.');
    }
  });
}).on('error', (err) => {
  console.error('Error fetching URL:', err);
});
