# intercom-service (ICS) — openDesk Edu Fork

ICS is an intermediary for communication between applications like SOGo, ILIAS,
OpenCloud, Nextcloud, XWiki and Matrix. The functionalities File-picker, Video conference,
create and accessing the Univention-Portal navigation endpoint from other apps
require the app intercom service.

This is an **openDesk Edu fork** of the upstream
[Univention intercom-service](https://github.com/univention/intercom-service) (AGPL-3.0).

## What's different from upstream

- **Standard Node.js base image** — no Univention UCS/UCs-base-image dependency
- **OpenCloud support** — new `/oc` route replacing Nextcloud as primary file service
- **SOGo Groupware support** — new `/sogo` route for CalDAV/CardDAV proxying
- **ILIAS LMS support** — new `/ilias` route for REST API / file upload proxying
- **Health endpoint** — `/health` returns `{"status": "ok"}`
- **`opendesk_username`** as default username claim

## Upstream

- **Source**: https://github.com/univention/intercom-service
- **Documentation**: https://docs.software-univention.de/intercom-service/latest/
- **License**: GNU Affero General Public License v3.0 (AGPL-3.0)

## Endpoints

| Path | Auth | Backend | Description |
|------|------|---------|-------------|
| `/oc/` | OIDC | OpenCloud | File picker, WebDAV |
| `/sogo/` | OIDC | SOGo | CalDAV, CardDAV |
| `/ilias/` | OIDC | ILIAS | REST API, file upload |
| `/fs/` | OIDC | Nextcloud | Legacy — upstream compatibility |
| `/wiki/` | OIDC | XWiki | RSS feeds, content |
| `/nob/` | OIDC | Nordeck | Matrix meeting widget bot |
| `/navigation.json` | OIDC | Portal | Portal central nav data |
| `/silent` | OIDC | — | Silent login (iframe) |
| `/backchannel-logout` | — | Keycloak | OIDC session logout |
| `/uuid` | OIDC | — | User identity claim |
| `/health` | — | — | Health check |

## Development

```bash
cd intercom
cp .env.example .env.prod
# Edit .env.prod with your values
yarnpkg install
yarn start
```

## Build

```bash
# Production image
docker build -f docker/intercom-service/Dockerfile --target final -t intercom-service:latest .

# Development image
docker build -f docker/intercom-service/Dockerfile --target dev -t intercom-service:dev .
```

## License

AGPL-3.0-only — see [LICENSE](LICENSE).
SPDX-FileCopyrightText: 2024-2025 Univention GmbH
SPDX-FileCopyrightText: 2026 openDesk Edu Team
