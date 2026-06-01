import fs from 'fs';
import path from 'path';

const FROM_DIR = path.join(process.cwd(), 'gdrive_download');
const TO_DIR = path.join(process.cwd());

const manifest = JSON.parse(fs.readFileSync('gdrive_files_manifest.json', 'utf-8'));
const files = manifest.files;

console.log('--- COPIER AND RECONSTRUCTOR ---');

// Standard copy file helper
function copyFile(src: string, dest: string) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
  console.log(`Copied: ${path.relative(process.cwd(), src)} -> ${path.relative(process.cwd(), dest)}`);
}

// 1. Copy config files at root
const rootConfigs = [
  'components.json'
];

for (const config of rootConfigs) {
  const srcPath = path.join(FROM_DIR, config);
  const destPath = path.join(TO_DIR, config);
  if (fs.existsSync(srcPath)) {
    copyFile(srcPath, destPath);
  }
}

// 2. Loop manifest files and place them appropriately
for (const file of files) {
  const srcPath = path.join(FROM_DIR, file.parentPath, file.name);
  if (!fs.existsSync(srcPath)) {
    console.warn(`Source file does not exist: ${srcPath}`);
    continue;
  }

  const p = file.parentPath || '';
  
  if (p.startsWith('src/components/ui')) {
    // UI components
    const destPath = path.join(TO_DIR, 'src', 'components', 'ui', file.name);
    copyFile(srcPath, destPath);
  } else if (p.startsWith('src/components/layout')) {
    // Layout components
    const destPath = path.join(TO_DIR, 'src', 'components', 'layout', file.name);
    copyFile(srcPath, destPath);
  } else if (p === 'src/components') {
    // Context or general components
    const destPath = path.join(TO_DIR, 'src', 'components', file.name);
    copyFile(srcPath, destPath);
  } else if (p.startsWith('src/hooks')) {
    // Hooks
    const destPath = path.join(TO_DIR, 'src', 'hooks', file.name);
    copyFile(srcPath, destPath);
  } else if (p.startsWith('src/integrations')) {
    // integrations
    const rel = p.replace('src/integrations', '');
    const destPath = path.join(TO_DIR, 'src', 'integrations', rel, file.name);
    copyFile(srcPath, destPath);
  } else if (p.startsWith('src/lib')) {
    // Lib files
    const destPath = path.join(TO_DIR, 'src', 'lib', file.name);
    copyFile(srcPath, destPath);
  } else if (p.startsWith('src/app')) {
    // Routing views - map them to pages/views under src/views
    let mappedName = '';
    
    if (p === 'src/app' && file.name === 'page.tsx') {
      mappedName = 'dashboard-page.tsx';
    } else if (p === 'src/app/clientes' && file.name === 'page.tsx') {
      mappedName = 'clientes-page.tsx';
    } else if (p === 'src/app/configuracoes' && file.name === 'page.tsx') {
      mappedName = 'configuracoes-page.tsx';
    } else if (p === 'src/app/ia' && file.name === 'page.tsx') {
      mappedName = 'ia-page.tsx';
    } else if (p === 'src/app/prospeccao' && file.name === 'page.tsx') {
      mappedName = 'prospeccao-page.tsx';
    } else if (p === 'src/app/erp/receitas' && file.name === 'page.tsx') {
      mappedName = 'erp-receitas-page.tsx';
    } else if (p === 'src/app/erp/despesas' && file.name === 'page.tsx') {
      mappedName = 'erp-despesas-page.tsx';
    } else if (p === 'src/app/erp/dre' && file.name === 'page.tsx') {
      mappedName = 'erp-dre-page.tsx';
    } else if (p === 'src/app/erp/fluxo-caixa' && file.name === 'page.tsx') {
      mappedName = 'erp-fluxo-caixa-page.tsx';
    } else if (p === 'src/app/erp/ponto-equilibrio' && file.name === 'page.tsx') {
      mappedName = 'erp-ponto-equilibrio-page.tsx';
    }
    
    if (mappedName) {
      const destPath = path.join(TO_DIR, 'src', 'views', mappedName);
      copyFile(srcPath, destPath);
    }
  }
}

console.log('--- RECONSTRUCTION COMPLETE! ---');
