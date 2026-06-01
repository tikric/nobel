import fs from 'fs';
import path from 'path';

// Function to decode hex/octal escapes from Google Drive page javascript source
function decodeHexEscapes(str: string): string {
  return str.replace(/\\x([0-9a-fA-F]{2})/g, (match, p1) => {
    return String.fromCharCode(parseInt(p1, 16));
  }).replace(/\\u([0-9a-fA-F]{4})/g, (match, p1) => {
    return String.fromCharCode(parseInt(p1, 16));
  });
}

// User Agent for fetches
const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

// Helper to wait
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function fetchFolderHTML(folderId: string): Promise<string> {
  const url = `https://drive.google.com/drive/folders/${folderId}?usp=sharing`;
  const res = await fetch(url, { headers: { 'User-Agent': USER_AGENT } });
  if (!res.ok) {
    throw new Error(`Failed to fetch folder ${folderId}. Status: ${res.status}`);
  }
  return await res.text();
}

interface FileItem {
  id: string;
  name: string;
  mime: string;
  parentPath: string;
}

interface FolderItem {
  id: string;
  name: string;
  parentPath: string;
}

// Global lists
const queuedFolders = new Set<string>();
const allFiles: FileItem[] = [];
const allFolders: FolderItem[] = [];

async function scanFolderRecursive(folderId: string, currentPath: string) {
  if (queuedFolders.has(folderId)) return;
  queuedFolders.add(folderId);
  
  console.log(`Scanning folder "${currentPath}" (ID: ${folderId})...`);
  await sleep(100); // polite pause
  
  let html = '';
  try {
    html = await fetchFolderHTML(folderId);
  } catch (err: any) {
    console.error(`Error scanning folder ${currentPath}:`, err.message);
    return;
  }
  
  // Find script blocks with initial data
  const scripts = html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g);
  let payload = '';
  for (const match of scripts) {
    const code = match[1];
    if (code.includes(folderId)) {
      payload += code;
    }
  }
  
  const decoded = decodeHexEscapes(payload);
  
  // Extract files and folders
  // Schema: "ID", ["PARENT_ID"], "NAME", "MIME"
  const regex = /"([a-zA-Z0-9_-]{28,45})"\s*,\s*\[\s*"([a-zA-Z0-9_-]{28,45})"\s*\]\s*,\s*"([^"]+)"\s*,\s*"([^"]+)"/g;
  let match;
  
  const filesInThisFolder: FileItem[] = [];
  const subfoldersInThisFolder: FolderItem[] = [];
  
  while ((match = regex.exec(decoded)) !== null) {
    const id = match[1];
    const parentId = match[2];
    const name = match[3];
    const mime = match[4];
    
    // Ensure we are matching children of this folder
    if (parentId === folderId) {
      if (mime.includes('vnd.google-apps.folder')) {
        subfoldersInThisFolder.push({ id, name, parentPath: currentPath });
      } else {
        filesInThisFolder.push({ id, name, mime, parentPath: currentPath });
      }
    }
  }
  
  console.log(`Folder "${currentPath}" has ${filesInThisFolder.length} files and ${subfoldersInThisFolder.length} subfolders.`);
  
  allFiles.push(...filesInThisFolder);
  
  // Recurse into subfolders
  for (const sub of subfoldersInThisFolder) {
    const subPath = currentPath ? `${currentPath}/${sub.name}` : sub.name;
    allFolders.push(sub);
    await scanFolderRecursive(sub.id, subPath);
  }
}

async function downloadFileContent(id: string, savePath: string) {
  const url = `https://drive.google.com/uc?id=${id}&export=download`;
  try {
    const res = await fetch(url, { headers: { 'User-Agent': USER_AGENT } });
    if (!res.ok) {
      throw new Error(`Status ${res.status}`);
    }
    const arrayBuffer = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // Ensure folder exists
    fs.mkdirSync(path.dirname(savePath), { recursive: true });
    fs.writeFileSync(savePath, buffer);
    console.log(`Successfully downloaded: ${savePath} (${buffer.length} bytes)`);
  } catch (err: any) {
    console.error(`Failed to download file ${savePath} (ID: ${id}):`, err.message);
  }
}

async function run() {
  const rootFolderId = '1FSvponZUXZ8SPwaRa960WaWY3ivvgpGR';
  const outDir = path.join(process.cwd(), 'gdrive_download');
  
  console.log('--- STARTING GOOGLE DRIVE RECURSIVE RECONSTRUCTION ---');
  await scanFolderRecursive(rootFolderId, '');
  
  console.log('\n--- SCAN COMPLETE ---');
  console.log(`Total folders found: ${allFolders.length}`);
  console.log(`Total files found: ${allFiles.length}`);
  
  fs.writeFileSync('gdrive_files_manifest.json', JSON.stringify({ folders: allFolders, files: allFiles }, null, 2));
  
  console.log('\n--- STARTING FILE DOWNLOADS ---');
  let current = 1;
  for (const file of allFiles) {
    const cleanPath = path.join(outDir, file.parentPath, file.name);
    console.log(`[${current}/${allFiles.length}] Downloading ${file.parentPath ? file.parentPath + '/' : ''}${file.name}...`);
    await downloadFileContent(file.id, cleanPath);
    await sleep(200); // rate limit protection
    current++;
  }
  
  console.log('\n--- ALL DOWNLOADS COMPLETED! ---');
}

run().catch(err => console.error('Root error:', err));
