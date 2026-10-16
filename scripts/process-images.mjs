import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceDir = path.resolve(__dirname, "..", "..", "data");
const targetDir = path.resolve(__dirname, "..", "public", "images");

console.log("Source directory:", sourceDir);
console.log("Target directory:", targetDir);

if (!fs.existsSync(sourceDir)) {
  console.error("Source data directory not found:", sourceDir);
  process.exit(1);
}

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

let sharp;
try {
  sharp = (await import("sharp")).default;
} catch (e) {
  console.warn("sharp not available, falling back to direct copy");
}

const files = fs.readdirSync(sourceDir);
console.log(`Found ${files.length} files in data/`);

for (const file of files) {
  const ext = path.extname(file).toLowerCase();
  if (![".jpg", ".jpeg", ".png", ".webp", ".avif", ".heic"].includes(ext)) {
    continue;
  }

  const srcPath = path.join(sourceDir, file);
  const baseName = path.basename(file, ext);
  
  // Verify file is readable (not OneDrive placeholder)
  try {
    const stat = fs.statSync(srcPath);
    if (stat.size === 0) {
      console.warn(`WARNING: ${file} has size 0 (possible online-only placeholder)`);
    }
  } catch (err) {
    console.error(`Error reading ${file}:`, err.message);
    continue;
  }

  if (sharp) {
    try {
      const metadata = await sharp(srcPath).metadata();
      console.log(`Processing ${file} (${metadata.width}x${metadata.height}, ${metadata.format})`);

      // 1. Copy or convert original as webp
      const destWebp = path.join(targetDir, `${baseName}.webp`);
      await sharp(srcPath).webp({ quality: 85 }).toFile(destWebp);

      // 2. Generate responsive sizes (sm: 480px, md: 800px, lg: 1200px)
      const widths = [
        { suffix: "-sm", width: 480 },
        { suffix: "-md", width: 800 },
        { suffix: "-lg", width: 1200 },
      ];

      for (const w of widths) {
        if (metadata.width && metadata.width > w.width) {
          const outPath = path.join(targetDir, `${baseName}${w.suffix}.webp`);
          await sharp(srcPath)
            .resize({ width: w.width, withoutEnlargement: true })
            .webp({ quality: 80 })
            .toFile(outPath);
        }
      }
    } catch (err) {
      console.error(`Sharp error for ${file}:`, err.message);
      fs.copyFileSync(srcPath, path.join(targetDir, file));
    }
  } else {
    fs.copyFileSync(srcPath, path.join(targetDir, file));
  }
}

console.log("Image processing complete!");
