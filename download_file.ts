import https from 'https';
import fs from 'fs';

const id = '1bWGmW2D_L23fc12ZfOf1WZX-nyNIN8VP';
const url = `https://drive.google.com/uc?id=${id}&export=download`;

https.get(url, (res) => {
  if (res.statusCode === 302 || res.statusCode === 301) {
    const redirectUrl = res.headers.location!;
    console.log('Redirecting to:', redirectUrl);
    https.get(redirectUrl, (res2) => {
      let data = '';
      res2.on('data', (chunk) => data += chunk);
      res2.on('end', () => {
        fs.writeFileSync('downloaded_package.json', data);
        console.log('Downloaded package.json! Length:', data.length);
        console.log(data);
      });
    });
  } else {
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', () => {
      fs.writeFileSync('downloaded_package.json', data);
      console.log('Downloaded package.json! Status:', res.statusCode, 'Length:', data.length);
      console.log(data);
    });
  }
}).on('error', (err) => {
  console.error('Error downloading:', err);
});
