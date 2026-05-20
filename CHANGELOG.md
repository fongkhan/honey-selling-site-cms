# Changelog

All notable changes to this project will be documented in this file.

Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) — versioning: [SemVer](https://semver.org/).

## [Unreleased]

### Added
- Configuration globale de Paramètres Généraux (`src/globals/Settings.ts`) permettant de modifier dynamiquement le nom du site, le slogan et la favicon téléchargée directement depuis l'administration de Payload.
- Intégration d'options pour la barre de navigation dans la collection `Pages` (champs `showInNavbar` et `navbarOrder` à affichage conditionnel dans le tableau de bord).
- Labellisation conviviale de la collection de fiches techniques `ProductsMetadata` renommée en **"Fiches Miels (Détails & Bienfaits)"** pour simplifier le travail d'édition de l'apiculteur.
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

