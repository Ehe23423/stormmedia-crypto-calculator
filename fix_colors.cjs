const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || [];
  files.forEach(function (file) {
    if (fs.statSync(path.join(dirPath, file)).isDirectory()) {
      arrayOfFiles = getAllFiles(path.join(dirPath, file), arrayOfFiles);
    } else {
      if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.css')) {
        arrayOfFiles.push(path.join(dirPath, file));
      }
    }
  });
  return arrayOfFiles;
}

const files = getAllFiles(srcDir);

const replacements = [
  // Old Backgrounds (Slate dark blue)
  { from: /rgba\(15, 23, 42, 0\.8\)/g, to: 'rgba(254, 250, 224, 0.8)' },
  { from: /rgba\(15, 23, 42, 0\.6\)/g, to: 'rgba(254, 250, 224, 0.6)' },
  { from: /rgba\(15, 23, 42, 0\.4\)/g, to: 'rgba(254, 250, 224, 0.4)' },
  { from: /rgba\(30, 41, 59, 0\.4\)/g, to: 'rgba(254, 250, 224, 0.4)' },

  // Old Grays/blacks -> replace with Chalet Green and Dark Bourbon
  { from: /rgba\(0, ?0, ?0, ?0\.2\)/g, to: 'rgba(96, 108, 56, 0.1)' },
  { from: /rgba\(0, ?0, ?0, ?0\.3\)/g, to: 'rgba(96, 108, 56, 0.15)' },
  { from: /rgba\(255, ?255, ?255, ?0\.1\)/g, to: 'rgba(48, 30, 20, 0.1)' },

  // Old Accent Blue -> Di Serria (221, 161, 94)
  { from: /rgba\(56, 189, 248, 0\.1\)/g, to: 'rgba(221, 161, 94, 0.1)' },
  { from: /rgba\(56, 189, 248, 0\.03\)/g, to: 'rgba(221, 161, 94, 0.05)' },

  // Old Accent Purple -> Chalet Green (96, 108, 56)
  { from: /rgba\(192, 132, 252, 0\.1\)/g, to: 'rgba(96, 108, 56, 0.1)' },

  // Old Accent Emerald -> Mallard (40, 54, 24)
  { from: /rgba\(52, 211, 153, 0\.2\)/g, to: 'rgba(40, 54, 24, 0.2)' },
  { from: /rgba\(52, 211, 153, 0\.1\)/g, to: 'rgba(40, 54, 24, 0.1)' },
  { from: /rgba\(52, 211, 153, 0\.05\)/g, to: 'rgba(40, 54, 24, 0.05)' },

  // Old Accent Rose -> Dark Bourbon (48, 30, 20)
  { from: /rgba\(251, 113, 133, 0\.2\)/g, to: 'rgba(48, 30, 20, 0.2)' },
  { from: /rgba\(251, 113, 133, 0\.1\)/g, to: 'rgba(48, 30, 20, 0.1)' },

  // Old Accent Amber -> Bourbon (188, 108, 37)
  { from: /rgba\(251, 191, 36, 0\.2\)/g, to: 'rgba(188, 108, 37, 0.2)' },
  { from: /rgba\(251, 191, 36, 0\.1\)/g, to: 'rgba(188, 108, 37, 0.1)' },
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let modified = false;

  replacements.forEach(r => {
    if (content.match(r.from)) {
      content = content.replace(r.from, r.to);
      modified = true;
    }
  });

  if (modified) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated', file);
  }
});
