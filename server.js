// =============================================================================
//  server.js — Custom Node entrypoint for the Payload (Next.js) app.
//
//  cPanel "Setup Node.js App" on o2switch expects a single startup file.
//  This file delegates to `next start` programmatically so we can:
//    - load env from .env early (Payload reads process.env)
//    - bind the host/port that Passenger expects
//    - guard against the SQLite-relative-path pitfall (see SQLITE_PATH_FIX.md)
// =============================================================================

const path = require('node:path');
const fs = require('node:fs');

// 1. Force CWD to this script's directory. cPanel sometimes spawns Node from
//    a different working dir, which breaks `file:./data/payload.db` lookups.
process.chdir(__dirname);

// 2. Load .env from the repo root (lightweight reader to avoid an extra dep).
try {
  const envPath = path.join(__dirname, '.env');
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf8').split(/\r?\n/);
    for (const line of lines) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/i);
      if (!m) continue;
      const [, key, raw] = m;
      if (process.env[key] !== undefined) continue;
      let value = raw;
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      process.env[key] = value;
    }
  }
} catch (err) {
  console.warn('[server.js] could not load .env:', err.message);
}

// 3. Coerce SQLite URI to an absolute path if it was passed as a relative one.
if (process.env.DATABASE_URI?.startsWith('file:./')) {
  const rel = process.env.DATABASE_URI.replace(/^file:\.\//, '');
  process.env.DATABASE_URI = 'file:' + path.resolve(__dirname, rel);
  console.log('[server.js] DATABASE_URI rewritten to', process.env.DATABASE_URI);
}

// 4. Boot Next.js
const port = Number(process.env.PORT || 3000);
const hostname = process.env.HOSTNAME || '0.0.0.0';

const next = require('next');
const app = next({ dev: false, dir: __dirname });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    require('node:http')
      .createServer((req, res) => handle(req, res))
      .listen(port, hostname, () => {
        console.log(`[server.js] honey-cms listening on http://${hostname}:${port}`);
      });
  })
  .catch((err) => {
    console.error('[server.js] failed to start Next.js:', err);
    process.exit(1);
  });
