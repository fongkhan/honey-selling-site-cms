# SQLite path on o2switch — the relative-path trap

## The bug

`DATABASE_URI=file:./data/payload.db` works in dev but fails in production
under cPanel's Node.js App (Phusion Passenger). The reason: Passenger spawns
the app from a working directory that is **not** the project folder, so
`./data/payload.db` resolves somewhere unexpected (`/`, `/home/USER/`, or
similar). Payload then creates an empty SQLite file at that wrong path on
first request, and your real database appears empty to the admin UI.

Symptoms:

- Admin page loads but says "no users — create the first one" even though
  users already exist.
- A stray `payload.db` file appears in `/home/USER/` or `~/nodevenv/...`.
- Logs show `SqliteError: no such table: users` after a deploy.

## The fix

Two layers of defense:

1. **`server.js` rewrites a relative URI to an absolute one** before booting
   Next.js (see the top of `server.js` in this repo). So even if `.env`
   contains `file:./data/payload.db`, runtime sees `file:/home/USER/.../data/payload.db`.

2. **Use an absolute path in `.env` on production**:

   ```env
   DATABASE_URI=file:/home/USER/data/honey-cms/payload.db
   ```

   Keep the database **outside the repo working directory** so a
   `git reset --hard` during deploy never touches it.

## Recommended production layout

```
/home/USER/
├── repositories/
│   └── honey-selling-site-cms/      ← the git checkout (read-only data here)
├── data/
│   └── honey-cms/
│       ├── payload.db                ← writable, backed up
│       └── media/                    ← uploads
└── logs/
    └── honey-cms.log
```

Then in `.env`:

```env
DATABASE_URI=file:/home/USER/data/honey-cms/payload.db
```

And in `payload.config.ts`, override Media's `staticDir`:

```ts
upload: {
  staticDir: '/home/USER/data/honey-cms/media',
  ...
}
```

## Backups

SQLite is a single file. Backup is:

```bash
sqlite3 /home/USER/data/honey-cms/payload.db ".backup '/home/USER/backups/payload-$(date +%F).db'"
```

Add a cron in cPanel (`Cron jobs` → daily at 03:00).

## When to switch to Postgres

Move to Postgres if any of:

- Multiple Payload instances need to share the DB (load balancing).
- Editorial team grows large enough to see SQLite write-lock contention.
- You hit the 281 TB SQLite limit (you won't).

Migration path: install `@payloadcms/db-postgres`, replace the adapter in
`payload.config.ts`, dump via `payload migrate` after fixing IDs / sequences.
