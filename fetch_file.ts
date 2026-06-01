async function run() {
  const id = '1QvzG8AB-6y8RnI6_0AAKkQWJqdHnYZLe'; // README.md
  const url = `https://drive.google.com/uc?id=${id}&export=download`;
  console.log('Fetching', url);
  
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    console.log('Status:', res.status);
    console.log('Headers:', Object.fromEntries(res.headers.entries()));
    const text = await res.text();
    console.log('Text length:', text.length);
    console.log('Text content (first 500 chars):');
    console.log(text.slice(0, 1000));
  } catch (err: any) {
    console.error('Fetch error:', err.message);
  }
}

run();
