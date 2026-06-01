import fs from 'fs';
import path from 'path';

const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

async function downloadFileContent(id: string, savePath: string) {
  const url = `https://drive.google.com/uc?id=${id}&export=download`;
  try {
    const res = await fetch(url, { headers: { 'User-Agent': USER_AGENT } });
    if (!res.ok) {
      throw new Error(`Status ${res.status}`);
    }
    const arrayBuffer = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    fs.mkdirSync(path.dirname(savePath), { recursive: true });
    fs.writeFileSync(savePath, buffer);
    console.log(`Downloaded: ${path.basename(savePath)} (${buffer.length} bytes)`);
  } catch (err: any) {
    console.error(`Failed to download ${savePath} (ID: ${id}):`, err.message);
  }
}

// Helper to batch execute promises with concurrency control
async function runWithConcurrency(tasks: (() => Promise<void>)[], limit: number) {
  const results: Promise<void>[] = [];
  const executing = new Set<Promise<void>>();
  
  for (const task of tasks) {
    const p = Promise.resolve().then(() => task());
    results.push(p);
    executing.add(p);
    
    const clean = () => executing.delete(p);
    p.then(clean, clean);
    
    if (executing.size >= limit) {
      await Promise.race(executing);
    }
  }
  
  await Promise.all(results);
}

async function run() {
  const missingFiles = JSON.parse(fs.readFileSync('missing_downloads.json', 'utf-8'));
  console.log(`Starting download of ${missingFiles.length} missing files...`);
  
  const tasks = missingFiles.map((file: any) => {
    return async () => {
      const cleanPath = path.join(process.cwd(), 'gdrive_download', file.parentPath, file.name);
      await downloadFileContent(file.id, cleanPath);
    };
  });
  
  // 10 concurrent requests at a time
  await runWithConcurrency(tasks, 12);
  console.log('--- ALL MISSING DOWNLOADS COMPLETED! ---');
}

run().catch(err => console.error(err));
