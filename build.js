const fs = require('fs');
const path = require('path');

/**
 * Recursively copy a directory
 */
function copyDir(srcDir, destDir) {
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }
  for (const entry of fs.readdirSync(srcDir, { withFileTypes: true })) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else if (entry.isFile()) {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function main() {
  const projectRoot = __dirname;
  const distDir = path.join(projectRoot, 'dist');

  // Clean dist
  if (fs.existsSync(distDir)) {
    fs.rmSync(distDir, { recursive: true, force: true });
  }

  fs.mkdirSync(distDir, { recursive: true });

  // Copy top-level static files
  const topLevelFiles = ['index.html', 'styles.css', 'script.js', 'phone.png'];
  for (const file of topLevelFiles) {
    const src = path.join(projectRoot, file);
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, path.join(distDir, file));
    }
  }

  // Copy directories that contain assets
  const assetDirs = ['images', 'pdf'];
  for (const dir of assetDirs) {
    const src = path.join(projectRoot, dir);
    if (fs.existsSync(src)) {
      copyDir(src, path.join(distDir, dir));
    }
  }

  console.log('Build completed. Output in ./dist');
}

main();


