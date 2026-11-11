# Changelog

Notable changes to docs.talkif.ai and the API/SDK definition in this repository.

## 2026-11-11

### Added
- New page Account → Talkif for iPhone and Mac (`/account/iphone-and-mac-apps`): signing in and signing up in the apps, the AI services consent and how to withdraw it, buying credit and plans with In-App Purchase (monthly and yearly, Pro monthly only, managed and refunded by Apple, not cancelled by deleting the Talkif account), alerts on the iPhone, "Is this you calling?", and answering transferred calls. The Mac app is marked as coming to the Mac App Store.

## 2026-11-03

### Changed
- API reference synced with production API 0.1.368: `POST /calls/{callId}/end` is `end_active_call` and `GET /calls/webrtc/ice-servers` is `get_webrtc_ice_servers` (reference pages `calls/end-active-call`, `calls/get-webrtc-ice-servers`); the request-name overlay for the old duplicate is removed. Descriptions of phone numbers, public call status, `GET /calls` and `ring_target_required` updated; the unused `AgentRuntime` schema is gone.
- Choose models and voices, Test and publish: a retired model is switched to its replacement on save, validate, test call and publish, with a `model_upgraded` warning, instead of failing with `invalid_model`.
- Write prompts: `system.*` follows the caller's timezone; new `system.weekday` and `contact.recentCalls`. Contacts: the timezone also sets the time in `system.*`.
- Bring your own SIP trunk: the provider delete dialog no longer has a keep/release choice.
- Changelog: new entry for November 3, 2026; links in the November 2 entry and on Web calls point to the renamed reference pages.

## 2026-11-02

### Changed
- API reference synced with production API 0.1.367: 25 operations added (call history/active/details/end, the realtime events WebSocket, browser calls, published flows, flow duplicate/status/tags, account templates, campaign and phone cost breakdowns, campaign counts, contact import preview, default TTS voices, owned numbers, phone number usage); `GET /roles` and `GET /permissions` removed (API keys cannot call them).
- Error codes, models and voices tables follow the production catalog: GPT-6 Sol/Luna, Sonic 3.6 and Grok Voice Transcribe 2.0 added; retired OpenAI, Anthropic, Google, Rime, Sonic 3 and Nova 2 models removed.
- `generate-snippets.mjs` deletes generated tables for providers that left the catalog.

### Fixed
- Write prompts: no longer says `eleven_v3_conversational` performs delivery tags until 13 October 2026 — that model retired on that date; `eleven_v4_turbo` is the tag-capable voice.
- Choose models and voices: names the Deepgram model by its catalogue id (`nova-3-general`), and the suggested starting LLM is `gpt-5.6-luna` without a temperature setting, which it does not accept.
- Choose models and voices: no Rime or Google voice settings, no Google STT; Cartesia Emotion applies to every Cartesia model. Templates: the baseline LLM is `gpt-5.6-luna`.
- Changelog 2026-10-02: `GET /roles` and `GET /permissions` are no longer linked to API reference pages that were removed.
