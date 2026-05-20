# honey-selling-site-cms

Headless CMS pour le site de vente de miel. Gère **uniquement le contenu
éditorial** : pages, articles de blog, médias, métadonnées produits. Le commerce (produits, prix,
stock, commandes) est dans
[honey-selling-site-commerce](../commerce). Le site public statique est
[honey-selling-site-frontend](../frontend).

## Stack

- Payload CMS v3 (servi par Next.js 15 — admin sur `/admin`, REST + GraphQL sur `/api`)
- **SQLite** (via `@payloadcms/db-sqlite`) — pas de Postgres requis, idéal o2switch
- Lexical rich-text editor
- Node.js 22+

## Démarrage local

```bash
# Copier et éditer les variables d'environnement (Secret, Webhook)
cp .env.example .env

# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev                          # http://localhost:3000/admin
```

### Identifiants d'Administration Locaux (SQLite)
Lors de l'initialisation de la base SQLite `data/payload.db`, un compte d'administration a été configuré par défaut :
- **Email** : `fong.vu@hotmail.fr`
- *Note : En cas de besoin de créer un nouvel admin ou de tester un autre compte, Payload vous redirigera automatiquement vers `/admin/create-first-user` si aucune base n'existe.*

## Notes de Résolution & Configuration

### 1. Style Global (`layout.tsx`)
Pour que l'administration charge sa charte graphique premium complète, la feuille de style globale de Payload CMS v3 est explicitement importée dans [src/app/(payload)/layout.tsx](file:///e:/Program%20Files/git/honey-selling-site/cms/src/app/(payload)/layout.tsx) :
```typescript
import '@payloadcms/next/css'
```

### 2. Standalone Build et Next Dev (`next.config.ts`)
Pour éviter tout conflit d'actifs et d'hydratation CSS en cours de développement (`next dev`), le paramètre `standalone` n'est activé qu'en production :
```typescript
output: process.env.NODE_ENV === 'production' ? 'standalone' : undefined
```

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
    │   ├── Posts.ts
    │   └── ProductsMetadata.ts  # Métadonnées terroir & recettes de miels
    └── hooks/
        └── triggerBuild.ts
```

## Variables d'environnement

Voir `.env.example`. `BUILD_WEBHOOK_SECRET` doit être identique dans les
trois repos.

## Liens

- [SQLITE_PATH_FIX.md](./SQLITE_PATH_FIX.md) — piège classique du chemin SQLite relatif sur o2switch.
- [O2SWITCH_DEPLOYMENT.md](./O2SWITCH_DEPLOYMENT.md) — déploiement cPanel pas à pas.

