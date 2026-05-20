# Changelog

All notable changes to this project will be documented in this file.

Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) — versioning: [SemVer](https://semver.org/).

## [Unreleased]

### Added
- Modulable page layout blocks system in `src/blocks/LayoutBlocks.ts` representing `HeroBlock`, `PageHeaderBlock`, `ValuesBlock`, `StoryBlock`, `EngagementsBlock`, `QuoteBlock`, `FeaturedProductsBlock`, and `LatestPostsBlock`.
- Block-based dynamic layout editing field inside the `Pages` collection schema.
- Next.js API seeding endpoint (`src/app/api/seed/route.ts`) to completely wipe and populate SQLite with premium page blocks for the Home and History pages, and 3 rich blog posts.
- Recursive `convertToLexical` utility inside the seeding API to transform raw text into standard, compliant Payload v3 Lexical rich text JSON trees.
- Initial Payload CMS v3 scaffold (SQLite adapter, Lexical editor).
- Collections: `Users`, `Media`, `Pages`, `Posts`.
- `ProductsMetadata` custom collection to store terroir characteristics, intensity, honey wellness benefits, and recipes.
- `src/hooks/triggerBuild.ts` — afterChange/afterDelete HMAC-signed POST to the Astro rebuild endpoint.
- `server.js` — custom entrypoint for cPanel "Setup Node.js App" (also rewrites relative SQLite paths to absolute).
- `Dockerfile` (multi-stage) + `docker-compose.yml`.
- `O2SWITCH_DEPLOYMENT.md` — cPanel deploy guide.
- `SQLITE_PATH_FIX.md` — documents the relative-path pitfall under Passenger.

### Fixed
- Next.js SWC compilation syntax error caused by an unescaped single quote in the French pain d'épices recipe within the seed route.
- Missing base administration stylesheet on the dashboard by explicitly importing `@payloadcms/next/css` in custom root `layout.tsx`.
- Asset path resolution issues during local development (`next dev`) by making Next.js configuration's `output: 'standalone'` dynamic, depending on `NODE_ENV === 'production'`.
- React Server Component loading crashes by correcting page config and import mapping bindings inside `not-found.tsx`.

