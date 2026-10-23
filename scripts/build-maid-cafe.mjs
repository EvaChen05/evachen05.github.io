import { execFileSync } from 'node:child_process';
import { cp, mkdir, readdir, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const app = new URL('../apps/maid-cafe/', import.meta.url);
const output = new URL('../frontend/public/projects/maid-cafe/', import.meta.url);

execFileSync(process.platform === 'win32' ? 'npm.cmd' : 'npm', ['run', 'build', '--', '--base', '/projects/maid-cafe/'], {
  cwd: fileURLToPath(app),
  stdio: 'inherit',
});

// Astro owns the HTML route; only the standalone app's static assets go in public.
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
for (const name of await readdir(new URL('dist/', app))) {
  if (name === 'index.html') continue;
  await cp(new URL(`dist/${name}`, app), new URL(name, output), { recursive: true });
}
