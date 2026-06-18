#!/usr/bin/env node
// Compress + resize raster images IN PLACE for the web. Keeps the same filename
// and format (so no references change), resizes to <= MAX_W, and re-encodes with
// lossy quantization. Idempotent: skips files already small + within size.
//
// Usage:  node ../../scripts/optimize-images.mjs [dir]   (default: public/img)
// Wired as the `prebuild` npm hook so it runs before every `npm run build`.
import { readdir, stat, rename, unlink } from "node:fs/promises";
import { join, extname } from "node:path";
import { createRequire } from "node:module";
// Resolve sharp from the CALLING site's node_modules (this shared script lives at
// the repo root but each site installs its own sharp devDependency).
const require = createRequire(join(process.cwd(), "package.json"));
const sharp = require("sharp");

const ROOT = process.argv[2] || "public/img";
const MAX_W = 1600;          // hero/blog images never need to be wider
const Q = 80;                // JPEG/WebP/PNG quality target
const SKIP_UNDER = 400 * 1024; // already-small files are left alone
const EXT = new Set([".png", ".jpg", ".jpeg", ".webp"]);

async function* walk(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else if (EXT.has(extname(e.name).toLowerCase())) yield p;
  }
}

function encode(pipeline, ext) {
  if (ext === ".png") return pipeline.png({ quality: Q, palette: true, compressionLevel: 9, effort: 8 });
  if (ext === ".webp") return pipeline.webp({ quality: Q });
  return pipeline.jpeg({ quality: Q, mozjpeg: true }); // .jpg/.jpeg
}

let saved = 0, count = 0;
try { await stat(ROOT); } catch { console.log(`optimize-images: ${ROOT} not found, skipping`); process.exit(0); }

for await (const file of walk(ROOT)) {
  const ext = extname(file).toLowerCase();
  const before = (await stat(file)).size;
  const meta = await sharp(file).metadata();
  if (before < SKIP_UNDER && (meta.width ?? 0) <= MAX_W) continue; // already fine

  const tmp = `${file}.opt`;
  let pipe = sharp(file).rotate();                 // honor EXIF orientation
  if ((meta.width ?? 0) > MAX_W) pipe = pipe.resize({ width: MAX_W, withoutEnlargement: true });
  await encode(pipe, ext).toFile(tmp);

  const after = (await stat(tmp)).size;
  if (after < before) {                            // only replace if smaller
    await rename(tmp, file);
    saved += before - after; count++;
    console.log(`  ${file}  ${(before/1024|0)}KB -> ${(after/1024|0)}KB`);
  } else {
    await unlink(tmp);
  }
}
console.log(`optimize-images: compressed ${count} file(s), saved ${(saved/1024/1024).toFixed(1)}MB`);
