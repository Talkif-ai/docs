# Changelog

Notable changes to docs.talkif.ai and the API/SDK definition in this repository.

## 2026-11-02

### Fixed
- Write prompts: no longer says `eleven_v3_conversational` performs delivery tags until 13 October 2026 — that model retired on that date; `eleven_v4_turbo` is the tag-capable voice.
- Choose models and voices: names the Deepgram model by its catalogue id (`nova-3-general`), and the suggested starting LLM is `gpt-5.6-luna` without a temperature setting, which it does not accept.
