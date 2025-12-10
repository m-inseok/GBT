const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'client/src/assets');
const destDir = path.join(__dirname, 'client/public/place_images');

if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
}

const files = [
    'Yongin Severance Hospital.jpg',
    'Yongin Myongji Univ. Station Kolon Haneulchae.jpg',
    'Yongin Cheoin-gu Health Center.jpg',
    'Yeokbuk Sinwon Morning Cityjpg.jpg',
    'Woori Bank Cheoin-gu Office.jpg',
    'KB Kookmin Bank Yongin.jpg'
];

files.forEach(file => {
    const srcPath = path.join(srcDir, file);
    const destPath = path.join(destDir, file);
    if (fs.existsSync(srcPath)) {
        fs.copyFileSync(srcPath, destPath);
        console.log(`Copied ${file} to public/place_images/`);
    } else {
        console.log(`File not found: ${srcPath}`);
    }
});
