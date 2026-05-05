# SEO Reference: Full Audit Report Tables

The seo agent defaults to the Concise Report. Use these tables when the user requests a full audit, when the audit surfaces ten or more findings, or when establishing a baseline on a new project.

## Conventions Discovered

| Convention               | Value                                   | Evidence          |
| ------------------------ | --------------------------------------- | ----------------- |
| Framework / rendering    | [e.g. Next.js App Router SSR]           | `path/to/file:L1` |
| SEO API                  | [e.g. `metadata` export]                | `path/to/file:L1` |
| Structured data approach | [JSON-LD component / inline / none]     | `path/to/file:L1` |
| Sitemap generation       | [build script / dynamic route / static] | `path/to/file:L1` |
| AI crawler policy        | [allow / block / unset]                 | `robots.txt:L1`   |

## Technical SEO

| Area                | Status   | Notes |
| ------------------- | -------- | ----- |
| robots.txt          | ✅/⚠️/❌ |       |
| sitemap.xml         | ✅/⚠️/❌ |       |
| Canonical strategy  | ✅/⚠️/❌ |       |
| HTTPS / single host | ✅/⚠️/❌ |       |
| 404 handling        | ✅/⚠️/❌ |       |
| Core Web Vitals     | ✅/⚠️/❌ |       |

## On-Page SEO

| Page / Route | Title | Description | OG    | Headings | Internal Links |
| ------------ | ----- | ----------- | ----- | -------- | -------------- |
| /            | ✅/❌ | ✅/❌       | ✅/❌ | ✅/❌    | ✅/❌          |

## Structured Data

| Page / Route | Schema Types          | Server-Rendered | Schema Matches Page |
| ------------ | --------------------- | --------------- | ------------------- |
| /            | Organization, WebSite | ✅/❌           | ✅/❌               |

## GEO / AEO

| Signal                   | Status   | Notes |
| ------------------------ | -------- | ----- |
| llms.txt                 | ✅/⚠️/❌ |       |
| AI crawler policy        | ✅/⚠️/❌ |       |
| Author / dates           | ✅/⚠️/❌ |       |
| Citation-ready structure | ✅/⚠️/❌ |       |
| Entity consistency       | ✅/⚠️/❌ |       |
