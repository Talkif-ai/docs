# Talkif Docs

Source for **[docs.talkif.ai](https://docs.talkif.ai)** and the generated Talkif SDKs, built with [Fern](https://buildwithfern.com).

| Path | What it is |
| --- | --- |
| `fern/docs.yml` | Site config: navigation, theme, tabs, redirects |
| `fern/docs/pages/` | Guides (MDX) — one folder per section: `getting-started`, `concepts`, `build`, `telephony`, `calls`, `integrate`, `account`, `reference` |
| `fern/docs/changelog/` | Changelog — one `YYYY-MM-DD.mdx` per release; the newest entry carries a `versions:` stamp the sync routine reads |
| `fern/openapi.json` | The public API definition — a curated snapshot, see below |
| `fern/overlays.yml` | Docs/SDK-only adjustments layered on the spec (server URL, pagination, wording) |
| `fern/generators.yml` | SDK generators → [talkif-typescript](https://github.com/Talkif-ai/talkif-typescript), [talkif-python](https://github.com/Talkif-ai/talkif-python) |
| `fern/snapshots/` | Public data (models, pricing, error codes) the tables are generated from |
| `fern/scripts/` | `sync-api.mjs` refreshes the spec + snapshots; `generate-snippets.mjs` renders the tables |

## Working locally

```sh
npm i -g fern-api
cd fern
fern check              # validate config, spec, overlays
fern docs dev           # local preview
fern docs broken-links  # link check
```

## Updating the API reference

```sh
BACKEND_URL=<api base url> node fern/scripts/sync-api.mjs
```

This rewrites `fern/openapi.json`, `fern/snapshots/*.json` and regenerates the Markdown tables. **Review the diff before committing** — merging is the moment an endpoint becomes public. Pushing to `main` republishes the site.

## Contributing

Typos and clarifications: open a PR — every page has an *Edit this page* link. For API behaviour or field descriptions, the fix belongs upstream in the API definition, not in `openapi.json` by hand.
