# AI-Native Pattern Intelligence System
**PEIP Platform — Intelligence Expansion**

## What Was Built

This upgrade transforms the platform from a **regex-file scanner** into a full **AI-code-convention intelligence engine**.

---

## Core Insight

> AI coding tools generate **statistically predictable** code.  
> That predictability is the attack surface.

| AI Tool | Repeated Pattern Generated |
|---|---|
| Copilot | `OPENAI_API_KEY=`, standard .env blocks |
| Cursor | `.cursorrules`, full env scaffolding |
| v0 / Bolt | boilerplate Next.js + Supabase configs |
| Replit | `.replit` + env injection (highest leak rate) |
| ChatGPT | Characteristic comment patterns |

---

## New Files Created

### `services/intelligence/` — New Intelligence Module

| File | Purpose |
|---|---|
| `aiPatternDictionary.js` | Master knowledge base: 20+ provider signatures, framework prefix maps, AI tool fingerprints, starter templates, context signals, semantic terms |
| `patternExpansionEngine.js` | Seed → full variable universe expansion (e.g. `OPENAI_API_KEY` → 200+ variants across all frameworks) |
| `queryGenerator.js` | Context-aware search query factory: keyword → 100s of ranked dorks per connector |
| `aiCodeFingerprinter.js` | Detects AI-generated code sources (higher leak probability) |
| `contextCorrelationScorer.js` | Compounds multiple independent signals into a confidence multiplier |
| `intelligencePipeline.js` | Top-level orchestrator — single entry point for the full intelligence pass |

### Modified Files

| File | Change |
|---|---|
| `services/workers/detectWorker.js` | Every finding now runs through `intelligencePipeline.analyze()` before scoring |
| `routes/intelligence.js` | Added 7 new REST endpoints |

---

## How the Detection Stack Works Now

```
Raw Finding (snippet + filePath + platform)
          │
          ▼
┌─────────────────────────┐
│  DetectionEngine        │  Regex + entropy patterns (existing)
│  + Expanded Patterns    │  200+ AI-generated var name variants
└──────────┬──────────────┘
           │
           ▼
┌─────────────────────────┐
│  AI Code Fingerprinter  │  Copilot? Cursor? v0? Replit? → leakRisk bonus
└──────────┬──────────────┘
           │
           ▼
┌─────────────────────────┐
│  Context Correlation    │  File type + SDK imports + API URLs + CI/CD signals
│  Scorer                 │  → compound confidence multiplier
└──────────┬──────────────┘
           │
           ▼
┌─────────────────────────┐
│  Enriched Severity      │  MEDIUM can upgrade to HIGH if AI + context confirm
│  Computation            │  HIGH can upgrade to CRITICAL if context_score > 0.90
└──────────┬──────────────┘
           │
           ▼
┌─────────────────────────┐
│  ScoringEngine          │  Receives enriched signals, not just raw regex matches
└──────────┬──────────────┘
           │
           ▼
        persist queue
```

---

## Variable Expansion Example

Seed: `GEMINI_API_KEY`

Engine expands to **200+ variants** including:

```
GEMINI_KEY               GEMINI_SECRET            GEMINI_ACCESS_TOKEN
GOOGLE_GEMINI_API_KEY    GOOGLE_AI_API_KEY         GOOGLE_GENAI_KEY
NEXT_PUBLIC_GEMINI_API_KEY   VITE_GEMINI_API_KEY   REACT_APP_GEMINI_API_KEY
NUXT_GEMINI_API_KEY      EXPO_PUBLIC_GEMINI_API_KEY  GATSBY_GEMINI_KEY
PALM_API_KEY             GOOGLE_GENAI_API_KEY      GEMINI_TOKEN
... (200+ total)
```

Each variant generates its own search dork set — targeting GitHub, GitLab, Google, Wayback, Docker.

---

## Query Generation Example

Keyword: `"acmecorp"`

Produces queries like:

```
"OPENAI_API_KEY=" "acmecorp"                     [priority: 90]
"sk-proj-" "acmecorp"                            [priority: 100]
"FIREBASE_API_KEY=" filename:.env                 [priority: 80]
"import { GoogleGenerativeAI }" "acmecorp"        [priority: 85]
".cursor/" "acmecorp"                             [priority: 70]
"SUPABASE_SERVICE_ROLE_KEY=" "acmecorp"           [priority: 90]
... (up to 200 queries, ranked by signal strength)
```

---

## New REST Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/api/v1/intelligence/providers` | Full provider catalog |
| `GET` | `/api/v1/intelligence/providers/:key` | Single provider + expanded vars |
| `POST` | `/api/v1/intelligence/expand` | Expand a seed variable across frameworks |
| `POST` | `/api/v1/intelligence/queries` | Generate scan queries for a keyword |
| `GET` | `/api/v1/intelligence/sweeps` | Scheduled provider sweep queries |
| `GET` | `/api/v1/intelligence/frameworks` | Framework prefix conventions |
| `GET` | `/api/v1/intelligence/ai-tools` | AI tool fingerprints + leak risks |

---

## Provider Coverage

### AI/ML Providers (CRITICAL/HIGH severity)
OpenAI · Anthropic · Google Gemini · Groq · DeepSeek · Mistral · Cohere · HuggingFace · Vercel AI SDK · LangChain · Replicate · Stability AI

### Cloud/Platform
Firebase · Supabase · PlanetScale · Vercel

---

## Safety Guarantees

All intelligence operations are:
- ✅ **Read-only** — no writes, no auth, no API calls to validate secrets
- ✅ **Pattern-based** — never executes or verifies discovered values
- ✅ **Redaction-first** — raw secret values never stored; only metadata + hashes
- ✅ **Passive** — all discovery via public search indexing only

> [!IMPORTANT]
> The query generator produces **search queries for public indexes only**.
> No direct network probing, credential testing, or authentication bypass is performed.
