import https from 'https';
import fs from 'fs';

function downloadFile(url: string, filename: string): Promise<void> {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      const statusCode = res.statusCode || 0;
      console.log(`URL: ${url} -> Status: ${statusCode}`);
      
      if (statusCode >= 300 && statusCode < 400 && res.headers.location) {
        let redirectUrl = res.headers.location;
        if (!redirectUrl.startsWith('http')) {
          redirectUrl = new URL(redirectUrl, url).href;
        }
        console.log(`Following redirect to: ${redirectUrl}`);
        downloadFile(redirectUrl, filename).then(resolve).catch(reject);
      } else {
        const fileStream = fs.createWriteStream(filename);
        res.pipe(fileStream);
        fileStream.on('finish', () => {
          fileStream.close();
          console.log(`Finished downloading ${filename}. Size: ${fs.statSync(filename).size} bytes`);
          resolve();
        });
      }
    }).on('error', (err) => {
      reject(err);
    });
  });
}

// Let's test by downloading eslint.config.mjs with ID 1zTMKIHhhRfdNIGcMKIKy3fWyJeTpIzSg
const id = '1zTMKIHhhRfdNIGcMKIKy3fWyJeTpIzSg';
const url = `https://drive.google.com/uc?id=${id}&export=download`;

downloadFile(url, 'downloaded_eslint.js')
  .then(() => {
    console.log('Content of downloaded eslint.config.mjs:');
    console.log(fs.readFileSync('downloaded_eslint.js', 'utf-8'));
  })
  .catch(err => console.error(err));
