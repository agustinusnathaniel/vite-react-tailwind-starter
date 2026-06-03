import { readFileSync } from 'node:fs';

import { CSP_VALUE } from '../src/lib/constants/security-headers.ts';

const root = new URL('../', import.meta.url);

function readJson(path: string) {
  return JSON.parse(readFileSync(new URL(path, root), 'utf-8'));
}

function readToml(path: string) {
  return readFileSync(new URL(path, root), 'utf-8');
}

function readFile(path: string) {
  return readFileSync(new URL(path, root), 'utf-8');
}

let valid = true;

const vercel = readJson('vercel.json');
const vercelCsp = vercel.headers
  .find((h: { source: string }) => h.source === '/(.*)')
  .headers.find(
    (h: { key: string }) => h.key === 'Content-Security-Policy'
  ).value;

if (vercelCsp !== CSP_VALUE) {
  console.error('❌ vercel.json CSP does not match source of truth');
  console.error('  Expected:', CSP_VALUE);
  console.error('  Got:     ', vercelCsp);
  valid = false;
}

const netlify = readToml('netlify.toml');
const netlifyCspMatch = netlify.match(/Content-Security-Policy = "(.+)"/);
if (!netlifyCspMatch) {
  console.error('❌ netlify.toml CSP not found');
  valid = false;
} else if (netlifyCspMatch[1] !== CSP_VALUE) {
  console.error('❌ netlify.toml CSP does not match source of truth');
  console.error('  Expected:', CSP_VALUE);
  console.error('  Got:     ', netlifyCspMatch[1]);
  valid = false;
}

const wrangler = readToml('wrangler.toml');
const wranglerCspMatch = wrangler.match(/Content-Security-Policy = "(.+)"/);
if (!wranglerCspMatch) {
  console.error('❌ wrangler.toml CSP not found');
  valid = false;
} else if (wranglerCspMatch[1] !== CSP_VALUE) {
  console.error('❌ wrangler.toml CSP does not match source of truth');
  console.error('  Expected:', CSP_VALUE);
  console.error('  Got:     ', wranglerCspMatch[1]);
  valid = false;
}

const headersFile = readFile('public/_headers');
const headersCspMatch = headersFile.match(/Content-Security-Policy: (.+)/);
if (!headersCspMatch) {
  console.error('❌ public/_headers CSP not found');
  valid = false;
} else if (headersCspMatch[1] !== CSP_VALUE) {
  console.error('❌ public/_headers CSP does not match source of truth');
  console.error('  Expected:', CSP_VALUE);
  console.error('  Got:     ', headersCspMatch[1]);
  valid = false;
}

if (valid) {
  console.log('✅ All platform CSP headers match the centralized source');
} else {
  process.exit(1);
}
