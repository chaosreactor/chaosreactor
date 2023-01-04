import { execa } from 'execa';
import { renameSync } from 'fs';

let ext = '';
if (process.platform === 'win32') ext = '.exe';

/**
 * Renames the trpc server binary to include the target triple.
 */
async function rename() {
  // Determine target triple.
  const rustInfo = (await execa('rustc', ['-vV'])).stdout;
  const triple = /host: (\S+)/g.exec(rustInfo)[1];
  if (!triple) {
    console.error('Error generating platform target triple');
  }

  console.log(`Renaming trpc server binary to trpc-node-${triple}${ext}`);

  // Remove the prior binary before renaming.
  try {
    await execa('rm', [
      `../../apps/desktop/src-tauri/binaries/trpc-node-${triple}${ext}`,
    ]);
  } catch (e) {
    // Ignore error if file doesn't exist.
  }

  // Rename trpc server binaries with target triple.
  // The binary is named trpc-node. The binary name must contain node in order
  // for noflo to recognize the process as a node process.
  // @see https://github.com/noflo/noflo/blob/6187566f761a463af95dd186de55dc488e2f03b8/src/lib/Platform.js#L16
  renameSync(
    `../../apps/desktop/src-tauri/binaries/trpc-node${ext}`,
    `../../apps/desktop/src-tauri/binaries/trpc-node-${triple}${ext}`
  );
}

rename().catch((e) => {
  throw e;
});
