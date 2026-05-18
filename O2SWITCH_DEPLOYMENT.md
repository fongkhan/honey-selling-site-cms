# Déploiement du CMS sur o2switch

Pour le mutualisé o2switch (CloudLinux + Phusion Passenger + cPanel). Si
tu es sur VPS, ignore cPanel et lance `server.js` sous systemd.

> **Base de données** : ce guide utilise **SQLite** (un fichier, zéro service à
> configurer). Si tu préfères mutualiser avec la base Postgres déjà créée
> pour Medusa (ex: `fongkhan_honey_selling_site`), tu peux switcher Payload
> sur Postgres : `npm i @payloadcms/db-postgres`, remplace `sqliteAdapter` par
> `postgresAdapter` dans `payload.config.ts`, et utilise un **schéma Postgres
> dédié** (`?schema=payload`) pour éviter les collisions avec les tables Medusa.

## 1. Préparer l'arborescence

```bash
ssh USER@USER.o2switch.net
mkdir -p ~/repositories ~/data/honey-cms/media ~/logs ~/private
chmod 700 ~/private
```

## 2. Cloner le repo et installer

```bash
cd ~/repositories
git clone git@github.com:USER/honey-selling-site-cms.git
cd honey-selling-site-cms
cp .env.example .env
```

Édite `.env` :

```env
PAYLOAD_SECRET=<32+ caractères aléatoires>
DATABASE_URI=file:/home/USER/data/honey-cms/payload.db
PAYLOAD_PUBLIC_SERVER_URL=https://cms.miellerie.fr
BUILD_WEBHOOK_URL=https://www.miellerie.fr/__hooks/rebuild.php
BUILD_WEBHOOK_SECRET=<le même que dans frontend/ et commerce/>
PORT=3000
NODE_ENV=production
```

⚠️ Le chemin SQLite **doit être absolu**. Voir [SQLITE_PATH_FIX.md](./SQLITE_PATH_FIX.md).

## 3. Configurer l'app Node.js dans cPanel

cPanel → **Setup Node.js App** → Create Application :

| Champ                  | Valeur                                                |
|------------------------|-------------------------------------------------------|
| Node.js version        | 24.x                                                  |
| Application mode       | Production                                            |
| Application root       | `repositories/honey-selling-site-cms`                 |
| Application URL        | `cms.miellerie.fr`                                    |
| Application startup file | `server.js`                                         |
| Passenger log file     | `logs/honey-cms.log`                                  |

Click **Run NPM Install** dans cPanel, puis **Start** l'app.

## 4. Build Next.js

cPanel ouvre un terminal dans l'environnement virtualenv Node :

```bash
source /home/USER/nodevenv/repositories/honey-selling-site-cms/24/bin/activate
cd ~/repositories/honey-selling-site-cms
npm run build
```

Puis **Restart** l'application dans cPanel.

## 5. Créer le premier admin

Ouvre `https://cms.miellerie.fr/admin` → formulaire de création du compte
admin (Payload détecte l'absence d'utilisateur).

## 6. Vérifier le webhook

Crée/modifie une page dans l'admin. Côté frontend :

```bash
tail -f ~/logs/honey-webhook.log
```

doit afficher `OK build queued by webhook` puis le log de `build_astro.sh`.

## Backups

cPanel → **Cron jobs** :

```bash
0 3 * * * sqlite3 /home/USER/data/honey-cms/payload.db ".backup '/home/USER/backups/payload-$(date +\%F).db'"
0 4 * * 0 find /home/USER/backups -name 'payload-*.db' -mtime +30 -delete
```

## Médias

`Media` upload dans `~/data/honey-cms/media` (pas dans le repo, pas dans
le web root). Pour exposer publiquement les fichiers, soit :

- Servir via une route Next.js Payload (par défaut, `/media/<filename>`).
- Migrer vers S3 / Backblaze B2 avec `@payloadcms/storage-s3` (recommandé
  pour la prod : redondance + CDN).

## Pièges

- **`Cannot find module 'next'`** au démarrage : tu n'as pas activé le
  virtualenv cPanel avant `npm install`. Réinstalle via le bouton cPanel.
- **DB vide après un deploy** : voir [SQLITE_PATH_FIX.md](./SQLITE_PATH_FIX.md).
- **Permission denied sur `media/`** : `chmod 755 ~/data/honey-cms/media`.
- **Webhook 401** : `BUILD_WEBHOOK_SECRET` diffère entre cms/ et frontend/.
