# honey-selling-site-cms

Headless CMS pour le site de vente de miel. Gère **uniquement le contenu
éditorial** : pages, articles de blog, médias. Le commerce (produits, prix,
stock, commandes) est dans
[honey-selling-site-commerce](../commerce). Le site public statique est
[honey-selling-site-frontend](../frontend).

## Stack

- Payload CMS v3 (servi par Next.js — admin sur `/admin`, REST + GraphQL sur `/api`)
- **SQLite** (via `@payloadcms/db-sqlite`) — pas de Postgres requis, idéal o2switch
- Lexical rich-text editor
- Node.js 24 (compatible 22+)

## Démarrage local

```bash
nvm use                              # 24.15.0
cp .env.example .env                 # éditer PAYLOAD_SECRET et le webhook
npm install
npm run dev                          # http://localhost:3000/admin
```

Le premier démarrage applique les migrations Payload sur la base SQLite et
demande de créer le premier compte admin.

## Production

```bash
npm run build
npm run start                        # lance server.js
```

Sur o2switch, voir [O2SWITCH_DEPLOYMENT.md](./O2SWITCH_DEPLOYMENT.md). Avec
Docker :

```bash
docker compose up -d --build
```

## Webhook → rebuild Astro

Le hook `src/hooks/triggerBuild.ts` est branché sur `afterChange` et
`afterDelete` de toutes les collections. À chaque sauvegarde / suppression :

1. Construit un payload JSON `{source, collection, at}`.
2. Le signe en HMAC-SHA-256 avec `BUILD_WEBHOOK_SECRET`.
3. POST `BUILD_WEBHOOK_URL` (le receveur PHP dans le repo frontend).

Le receveur déclenche `build_astro.sh`, qui rebuild le site Astro et déploie
vers `WEB_ROOT`. Plusieurs sauvegardes successives = un seul rebuild (lockfile
côté shell).

Pour désactiver le hook (ex: scripts de seed) :
```ts
await payload.create({ collection: 'pages', data, context: { skipBuildHook: true } });
```

## Structure

```
cms/
├── server.js                  entrypoint cPanel / Docker
├── next.config.ts
├── payload.config.ts
├── Dockerfile
├── docker-compose.yml
├── eslint.config.mjs
├── .prettierrc.json
├── O2SWITCH_DEPLOYMENT.md
├── SQLITE_PATH_FIX.md
└── src/
    ├── collections/
    │   ├── Users.ts
    │   ├── Media.ts
    │   ├── Pages.ts
    │   └── Posts.ts
    └── hooks/
        └── triggerBuild.ts
```

## À compléter avant le premier `npm install`

Payload v3 attend une arborescence Next.js (`app/`, `next-env.d.ts`,
`app/(payload)/...`). Le plus rapide est de générer un squelette une fois :

```bash
npx create-payload-app@latest --name temp --template blank --use-npm
```

puis copier les fichiers `app/`, `next-env.d.ts` du squelette dans ce repo,
**sans écraser** `payload.config.ts`, `server.js`, ni `src/`.

## Variables d'environnement

Voir `.env.example`. `BUILD_WEBHOOK_SECRET` doit être identique dans les
trois repos.

## Liens

- [SQLITE_PATH_FIX.md](./SQLITE_PATH_FIX.md) — piège classique du chemin SQLite relatif sur o2switch.
- [O2SWITCH_DEPLOYMENT.md](./O2SWITCH_DEPLOYMENT.md) — déploiement cPanel pas à pas.
