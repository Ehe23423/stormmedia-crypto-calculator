const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src/components');

function getAllFiles(dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath);
    arrayOfFiles = arrayOfFiles || [];
    files.forEach(function (file) {
        if (fs.statSync(path.join(dirPath, file)).isDirectory()) {
            arrayOfFiles = getAllFiles(path.join(dirPath, file), arrayOfFiles);
        } else {
            if (file.endsWith('.tsx')) {
                arrayOfFiles.push(path.join(dirPath, file));
            }
        }
    });
    return arrayOfFiles;
}

const files = getAllFiles(srcDir);
// Also include App.tsx
files.push(path.join(__dirname, 'src/App.tsx'));

const replacements = [
    { from: /'rgba\(254, 250, 224, 0\.8\)'/g, to: "'rgba(255, 255, 255, 0.05)'" },
    { from: /'rgba\(254, 250, 224, 0\.6\)'/g, to: "'rgba(255, 255, 255, 0.05)'" },
    { from: /'rgba\(254, 250, 224, 0\.4\)'/g, to: "'rgba(255, 255, 255, 0.03)'" },
    { from: /'rgba\(96, 108, 56, 0\.1\)'/g, to: "'rgba(255, 255, 255, 0.05)'" },
    { from: /'rgba\(96, 108, 56, 0\.15\)'/g, to: "'rgba(255, 255, 255, 0.08)'" },
    { from: /'rgba\(48, 30, 20, 0\.1\)'/g, to: "'rgba(255, 255, 255, 0.05)'" },
    { from: /'rgba\(40, 54, 24, 0\.05\)'/g, to: "'rgba(255, 255, 255, 0.03)'" },
    { from: /'rgba\(40, 54, 24, 0\.1\)'/g, to: "'rgba(255, 255, 255, 0.05)'" },
    { from: /'rgba\(221, 161, 94, 0\.05\)'/g, to: "'rgba(255, 255, 255, 0.03)'" },
    { from: /'rgba\(221, 161, 94, 0\.1\)'/g, to: "'rgba(255, 255, 255, 0.05)'" },
    { from: /'rgba\(188, 108, 37, 0\.1\)'/g, to: "'rgba(255, 255, 255, 0.05)'" },
    { from: /'var\(--accent-emerald\)'/g, to: "'#10b981'" }, // Force inline emerald to actual emerald hex
    { from: /'var\(--accent-rose\)'/g, to: "'#f43f5e'" },
    { from: /'var\(--accent-amber\)'/g, to: "'#f59e0b'" },
    { from: /'var\(--accent-blue\)'/g, to: "'#3b82f6'" },
    { from: /'var\(--accent-purple\)'/g, to: "'#8b5cf6'" },
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
        console.log('Cleaned Apple Style inline backgrounds for', file);
    }
});
