import { execa } from 'execa';
import { renameSync } from 'fs';

let ext = '';
if (process.platform === 'win32') ext = '.exe';

async function rename() {
  // Determine target triple.
  const rustInfo = (await execa('rustc', ['-vV'])).stdout;
  const triple = /host: (\S+)/g.exec(rustInfo)[1];
  if (!triple) {
    console.error('Error generating platform target triple');
  }

  // Rename Next.js server binaries with target triple.
  renameSync(
    `src-tauri/binaries/api${ext}`,
    `src-tauri/binaries/api-${triple}${ext}`
  );
}

rename().catch((e) => {
  throw e;
});
