# Translation / Locale Data Audit Report

**Generated:** March 10, 2025  
**Supported Languages (28):** en, hi, bn, te, ta, mr, gu, pa, ml, kn, or, as, mai, sd, kok, ne, ks, ur, zh, ja, ar, es, fr, pt, de, ru, it, ko

---

## Summary

| File | Status | Missing Keys | English Fallback Locales |
|------|--------|--------------|--------------------------|
| `strings.json` | ✅ Complete | None | None |
| `profile.json` | ✅ Complete | None | None |
| `categories.json` | ✅ Complete | None | None |
| `cover.json` | ⚠️ English fallbacks | None | 17 Indian + 5 other (22 locales) |
| `education.json` | ⚠️ English fallbacks | None | 17 Indian locales |
| `updates.json` | ⚠️ Heavy English fallbacks | None | 24 locales (all except en, es, fr, ko) |
| `skills.json` | ✅ Complete | None | None |
| `experience.json` | ✅ Complete | None | None |
| `portfolio.json` | ✅ Complete | None | None |
| `achievements.json` | ✅ Complete | None | None |
| `extracurriculars.json` | ✅ Complete | None | None |
| `contact.json` | ✅ Complete | None | None |

---

## 1. `public/data/strings.json`

**Status:** ✅ **Complete**

- All 28 locales present
- All 59 string keys present in every locale
- No missing keys
- No English placeholder fallbacks detected

---

## 2. `public/data/profile.json`

**Status:** ✅ **Complete**

- All 28 locales present
- Keys: `localized_name`, `localized_name_stylized`, `status_message_available_for_freelance`, `roles`, `name_pronunciation_ipa`, `name_pronunciation_audio_url`
- Note: English has 3 roles; some locales (es, fr, etc.) have 2 roles — acceptable localization choice

---

## 3. `public/data/categories.json`

**Status:** ✅ **Complete**

- All 4 categories (home, background, showcase, more) have all 28 locales
- Each category has `title` key fully translated

---

## 4. `public/data/sections/cover.json`

**Status:** ⚠️ **English Fallbacks — Needs Translation**

### 4.1 ArticleStats (items 1–3) — `text` field

| En key | Affected Locales | Current Value (English fallback) |
|--------|------------------|----------------------------------|
| Years Experience | bn, te, ta, mr, gu, pa, ml, kn, or, as, mai, sd, kok, ne, ks, ur | `"Years Experience"` |
| Production Features | bn, te, ta, mr, gu, pa, ml, kn, or, as, mai, sd, kok, ne, ks, ur | `"Production Features"` |
| Users Impacted | bn, te, ta, mr, gu, pa, ml, kn, or, as, mai, sd, kok, ne, ks, ur | `"Users Impacted"` |

**Properly translated in:** en, es, fr, ko, hi, zh, ja, ar, pt, de, ru, it

### 4.2 ArticleCards (Expertise items 1–3) — `title` and `text` fields

| En key | Affected Locales | Current Value (English fallback) |
|--------|------------------|----------------------------------|
| Frontend Development | bn, te, ta, mr, gu, pa, ml, kn, or, as, mai, sd, kok, ne, ks, ur | `"Frontend Development"` + `"Building scalable and maintainable React applications."` |
| Component Architecture | bn, te, ta, mr, gu, pa, ml, kn, or, as, mai, sd, kok, ne, ks, ur | `"Component Architecture"` + `"Designing reusable and modular UI systems."` |
| Performance Optimization | bn, te, ta, mr, gu, pa, ml, kn, or, as, mai, sd, kok, ne, ks, ur | `"Performance Optimization"` + `"Improving load times and application performance."` |

**Properly translated in:** en, es, fr, ko, hi, zh, ja, ar, pt, de, ru, it

### Priority

High — cover section is the main landing view. Indian languages (bn, te, ta, mr, gu, pa, ml, kn, or, as, mai, sd, kok, ne, ks, ur) all show English text.

---

## 5. `public/data/sections/education.json`

**Status:** ⚠️ **English Fallbacks — Needs Translation**

### 5.1 Education item 1 (B.Tech)

**Key:** `text`  
**Affected locales:** bn, te, ta, mr, gu, pa, ml, kn, or, as, mai, sd, kok, ne, ks, ur  

**Current (English):** `"Graduated with a B.Tech (Hons) in Computer Science. CGPA: 8.33"`

Properly translated in: en, es, fr, ko, hi, zh, ja, ar, pt, de, ru, it

### 5.2 Education item 2 (Higher Secondary)

**Key:** `text`  
**Affected locales:** bn, te, ta, mr, gu, pa, ml, kn, or, as, mai, sd, kok, ne, ks, ur  

**Current (English):** `"Completed Higher Secondary (12th grade) under CBSE board with 82.2% marks."`

### 5.3 Education item 3 (Secondary)

**Key:** `text`  
**Affected locales:** bn, te, ta, mr, gu, pa, ml, kn, or, as, mai, sd, kok, ne, ks, ur  

**Current (English):** `"Completed Secondary (10th grade) under CBSE board with 9.2 CGPA."`

### Priority

High — education section is user-facing. Same 17 Indian locales need translations.

---

## 6. `public/data/sections/updates.json`

**Status:** ⚠️ **Heavy English Fallbacks — Needs Translation**

### 6.1 ArticleFacts items (Stats)

All non–en/es/fr/ko locales use English for `text`:

| Item | En text | Affected locales |
|------|---------|------------------|
| 1 | "Apps Published" | hi, bn, te, ta, mr, gu, pa, ml, kn, or, as, mai, sd, kok, ne, ks, ur, zh, ja, ar, pt, de, ru, it |
| 2 | "Stars on GitHub" | Same 24 locales |
| 3 | "Countries visited" | Same 24 locales |

Plus additional ArticleFacts/ArticleThread items that repeat this pattern.

### 6.2 Pattern

- **Properly translated:** en, es, fr, ko only  
- **English fallback:** hi, bn, te, ta, mr, gu, pa, ml, kn, or, as, mai, sd, kok, ne, ks, ur, zh, ja, ar, pt, de, ru, it

### Priority

High — updates section shows English in 24 of 28 locales.

---

## 7. `public/data/sections/skills.json`

**Status:** ✅ **Complete**

- All 28 locales present for title and all skill items
- Full translations across all locales

---

## 8. `public/data/sections/experience.json`

**Status:** ✅ **Complete**

- All 28 locales present for all experience entries
- Full translations across all locales

---

## 9. `public/data/sections/portfolio.json`

**Status:** ✅ **Complete**

- All 28 locales present for categories and portfolio items
- Full translations across all locales

---

## 10. `public/data/sections/achievements.json`

**Status:** ✅ **Complete**

- All 28 locales present for certifications and achievements
- Full translations across all locales

---

## 11. `public/data/sections/extracurriculars.json`

**Status:** ✅ **Complete**

- All 28 locales present for volunteer work and activities
- Full translations across all locales

---

## 12. `public/data/sections/contact.json`

**Status:** ✅ **Complete**

- All 28 locales present for contact form (thank you, title, footer) and info list
- Full translations across all locales

---

## Recommended Action Plan

### Phase 1 — Cover section (cover.json)

1. Translate ArticleStats `text` for: Years Experience, Production Features, Users Impacted (17 Indian locales).
2. Translate ArticleCards Expertise `title` and `text` for: Frontend Development, Component Architecture, Performance Optimization (17 Indian locales).

### Phase 2 — Education section (education.json)

1. Translate `text` for B.Tech, Higher Secondary, and Secondary items (17 Indian locales).

### Phase 3 — Updates section (updates.json)

1. Translate all ArticleFacts and ArticleThread item `text` fields (24 locales: Indian languages + zh, ja, ar, pt, de, ru, it).

### Locales needing most work

- **Indian languages (17):** bn, te, ta, mr, gu, pa, ml, kn, or, as, mai, sd, kok, ne, ks, ur (plus hi for updates)
- **Other (7):** zh, ja, ar, pt, de, ru, it (updates.json only)

---

## Appendix: Reference translations (cover ArticleStats)

| Key | es | fr | ko | hi |
|-----|----|----|----|----|
| Years Experience | Años de experiencia | Années d'expérience | 년 경력 | वर्षों का अनुभव |
| Production Features | Funcionalidades en producción | Fonctionnalités en production | 프로덕션 기능 | प्रोडक्शन फीचर्स |
| Users Impacted | Usuarios impactados | Utilisateurs impactés | 영향받은 사용자 | प्रभावित उपयोगकर्ता |

Use these as reference when adding translations for Indian and other locales.
