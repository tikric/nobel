async function run() {
  const url = 'https://drive.google.com/drive/folders/1GsyqNdaOgNdRHOikOZQiqBOSGmmkou1I?usp=sharing';
  console.log('Fetching src folder URL:', url);
  
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    console.log('Status:', res.status);
    const html = await res.text();
    console.log('HTML length:', html.length);
    
    const fs = await import('fs');
    fs.writeFileSync('src_folder_real.html', html);
    console.log('Saved src_folder_real.html');
  } catch (err: any) {
    console.error('Error fetching src folder:', err.message);
  }
}

run();
