# Changelog

All notable changes to this project will be documented in this file.

Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) — versioning: [SemVer](https://semver.org/).

## [Unreleased]

### Added
- Initial Payload CMS v3 scaffold (SQLite adapter, Lexical editor).
- Collections: `Users`, `Media`, `Pages`, `Posts`.
- `src/hooks/triggerBuild.ts` — afterChange/afterDelete HMAC-signed POST to the Astro rebuild endpoint.
- `server.js` — custom entrypoint for cPanel "Setup Node.js App" (also rewrites relative SQLite paths to absolute).
- `next.config.ts` with `output: 'standalone'` for clean Docker / shared-hosting deploys.
- `Dockerfile` (multi-stage) + `docker-compose.yml`.
- `O2SWITCH_DEPLOYMENT.md` — cPanel deploy guide.
- `SQLITE_PATH_FIX.md` — documents the relative-path pitfall under Passenger.
