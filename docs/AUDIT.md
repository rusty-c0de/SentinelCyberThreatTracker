# Repository preparation audit

Prepared 2026-11-05 from Sentinel source revision `1db152193c107a7ec9d76ba53f4242616daddb5e`. The original checkout and live website were not changed. This is a curated source export, not a deployment or a backup of hosted application data.

## Scope and preservation

The audit traced application imports, static asset references, Worker bindings, build plugins, package dependencies, migrations, and verification scripts. The existing App Router layout remains in `app/`; moving it into a different convention would add risk without improving this project.

All retained product files are byte-identical to the original:

| Area | Files preserved exactly |
| --- | ---: |
| Pages, API route, feature components, global styles (`app/`) | 13 |
| Feature modules and country data (`lib/`) | 15 |
| Branding images, map geometry, map attribution (`public/`) | 5 |
| SQL migrations and Drizzle metadata (`drizzle/`) | 9 |
| Database schema (`db/schema.ts`) | 1 |

The three existing verification scripts are also unchanged. This preserves the visual design, routing, responsive CSS, globe rendering/interactions, fixed installations, log parsing/analysis, password gates, reports, intelligence feed, commander documents, and Outlook draft behavior.

## Removed or excluded

| Category | Reason |
| --- | --- |
| `node_modules/`, `dist/`, `.wrangler/`, local caches and work directories | Installed dependencies, generated output, private local data, or temporary state; recreated locally |
| 61 `components/ui/` files, mobile hook, utility helper, `components.json`, vendor shadcn stylesheet | No application imports or stylesheet references |
| Unused connector helpers/error component, connector preview workers/plugins, optional ChatGPT-auth helper | No Sentinel features call these; the Worker now forwards directly to the same Vinext handler |
| D1 example application and unused `db/index.ts` wrapper | Examples/unreferenced helper; real schema and migrations retained |
| `public/favicon.svg` | Unreferenced; current metadata uses the retained Space Force image |
| Workspace-specific installer, environment, execution-profile, and build wrappers | Replaced with normal pnpm, Vinext, and Wrangler commands |
| Previous exports, editor/OS metadata, logs, test output | Not source; excluded by curated selection and ignore rules |
| Original hosted project ID | Avoid binding a new deployment to the live project |

The source tree decreased from **156 tracked files to 65 curated files**, including new configuration/documentation. Installed dependencies and local state are not included in either source count.

Direct dependencies decreased from **44 to 22**: 24 runtime dependencies became 5; 20 development dependencies became 17. Removed packages supported the unused UI kit or connector preview (`zod`, `json-rpc-2.0`, `raw-body`, and `tw-animate-css` included). ESLint and its configuration remain for future maintenance.

The existing pnpm 11.25.0 lockfile was pruned from **842 to 696 package records**. No package records were added, and every retained package record and direct resolved version matches the original. No frameworks or dependencies were upgraded. Native build approvals and the existing `miniflare>sharp` override remain.

## Configuration changes

- Added portable `wrangler.jsonc` with the existing compatibility date/flags and local D1/R2 bindings. Its database ID is explicitly a placeholder.
- Simplified Vite configuration while retaining the licensed `sites()` build integration. Its unused local sign-in mock is disabled; Sentinel still uses its own existing server password gates.
- Retained `.openai/hosting.json` as a logical DB/R2 binding manifest, without the hosted project identity.
- Added development, production build/HTTPS preview, test/typecheck, migration, and deployment scripts. Deployment rebuilds before publishing to prevent stale configuration.
- Added an empty `.env.example` and ignore rules covering actual environment values, generated output, credentials, and local state.
- TypeScript explicitly loads existing framework/Vite/Worker types rather than depending on an exported generated `next-env.d.ts`.
- Kept Drizzle snapshots/journal because future `db:generate` operations need them. Kept the small existing Next configuration as part of the framework convention.

## Validation actually performed

Validation ran in a separate copy, without reusing the original installed `node_modules`. Node **24.22.1** and pnpm **11.25.0** were used on Linux.

| Check | Result |
| --- | --- |
| Fresh `pnpm install --frozen-lockfile` (cache/store options supplied) | Passed; 494 packages installed and native install hooks completed |
| `pnpm typecheck` | Passed |
| `pnpm test` | Passed: polar/dateline rendering, ingestion/parsing, analysis thresholds, approved-target enforcement, auth/session isolation, commander documents, feed/cache behavior |
| `pnpm build` | Passed with the final portable Worker configuration |
| `pnpm db:migrate:local` | All four migrations applied successfully |
| `pnpm dev` and HTTP runtime checks | Passed: all three pages, asset hashes, both logins, directory, D1/R2, duplicate/invalid-target rejection, commander AAR, logout |
| `pnpm preview` and HTTPS runtime checks | Passed: built pages/assets, Secure cookies, both logins, reports/logs and AAR persisted from development, logout invalidation |
| `pnpm lint` | **Existing debt: 37 errors and 14 warnings**; same rules/positions as the original retained source |

Lint findings include explicit `any` types, React hook/purity/immutability rules, unused values/dependencies, and `prefer-const`. They were not suppressed or repaired through an application refactor in this migration. The build also reports Vinext's existing beta route-classification warning; all corresponding pages and the API were exercised successfully.

Scans found no configured application passwords, recognized API/token/private-key signatures, installed dependencies, build outputs, caches, or nested archives in the delivery. Synthetic credentials in the unchanged isolated test fixtures are deliberate test data. Pattern scanning is not a comprehensive security assessment.

## Remaining owner steps

1. Extract the source, review it, and push it to your shared GitHub repository using the README. Choose a software license and confirm branding permissions before public distribution; no ownership/license terms were invented.
2. Provision a new Cloudflare Worker, D1 database, and R2 bucket; update resource names/ID, configure two private server secrets, and apply migrations. GitHub stores source; GitHub Pages cannot run this backend.
3. Update the public origin in `lib/site-metadata.ts` and `lib/outlook-draft.ts` for a new deployment. Their existing public URL was preserved deliberately.
4. Migrate existing hosted D1/R2 data separately if required. Reports, contacts, documents, uploads, and sessions are not in this source archive. Never add production data dumps to the repository.
5. Replace dummy POC addresses with real authorized contacts before operational email use.
6. Address the existing lint backlog and review access requirements before calling the application fully production-hardened. The commander gate is a second shared password, not individual identity or RBAC. Vinext remains the same beta version by design.

No remote database migrations, cloud deployment, GitHub push, or production-data migration were performed. Live publisher availability was not independently certified; feed behavior was validated using the existing deterministic fixtures. The exported source preserves the current UI rather than introducing a new design.
