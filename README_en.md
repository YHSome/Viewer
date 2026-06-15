# Viewer — Counter & Comments, Pure JS Components

> **Preface:** Back in 2023, the author started tinkering with static blogs (long gone now). Seeing every other blog with a read-count feature made me envious — I wanted one too. I knew the theory, but AI-assisted coding wasn't mature enough back then, and I could never quite build it. That little wish sat on the shelf for years. Recently, after trying AI agents, it felt like discovering a new continent — and I finally got to close that chapter.

> 📖 [中文文档](README.md)

A pure frontend page visit counter powered by the TinyWebDB cloud database. Copy `counter.js` + one line of code to add visit counting to any static HTML page.

> 👉 **Just finished your HTML page?** Check out the [📖 Beginner's Tutorial — add a counter in 5 minutes](tutorial_en.md). Copy, paste, done.

> 🤖 **Don't want to do it yourself?** Throw the tutorial at Claude and say "add the counter for me."

## Project Structure

```
Viewer/
├── index.html                    # Demo page
├── index1.html                   # Demo page (second page)
├── README.md                     # Project docs (Chinese)
├── README_en.md                  # Project docs (English)
├── tutorial.md                   # Beginner's tutorial (Chinese)
├── tutorial_en.md                # Beginner's tutorial (English)
├── js/                           # Core scripts
│   ├── global.js                 # Site-wide page view counter
│   ├── counter.js                # Per-page view counter
│   ├── unique.js                 # Per-page unique visitor counter
│   └── comment.js                # Comment system
└── tools/                        # Utilities
    └── assign_pages.py           # Page ID assignment script
```

## Quick Start

```bash
cd Viewer
python -m http.server 8080
# Open http://localhost:8080/index.html in browser
```

Each page refresh increments the counter by 1.

## Features

| Module | File | Description |
|--------|------|-------------|
| Site-wide Views | `js/global.js` | Shared across all pages, +1 every refresh |
| Page Views | `js/counter.js` | Per-page counter, +1 every refresh |
| Unique Visitors | `js/unique.js` | One count per device via localStorage |
| Comment System | `js/comment.js` | Visitor messages with name/email/content/timestamp |

All modules share: zero dependencies, copy & use, cloud persistence, logic-only.

### Multi-page Support

Each page declares an ID via `<meta name="x-viewer-page-id" content="N">`. The JS scripts automatically namespace data by page ID, keeping each page's counts and comments isolated.

Use the assignment script:

```bash
python tools/assign_pages.py
```

- Scans all `.html` files in the directory
- Assigns a unique, permanent ID to each file
- Injects the meta tag automatically
- Deleted IDs are never reused (recorded in `tools/.viewer_pages.json`)

### How It Works

```
Page load → read meta page ID
               │
         get('watch_N') ← N = page ID
               │
    ┌──────────┴──────────┐
    │ Value exists         │ First visit / no value
    │ old = parseInt()     │ old = NaN
    │ new = old + 1        │ new = 1
    └──────────┬──────────┘
               │
          update('watch_N', new)
               │
          return new → render on page
```

## Deployment Notes

| Environment | Works? |
|-------------|--------|
| `http://localhost` | ✅ Yes |
| GitHub Pages (`https://`) | ✅ Yes (requires TinyWebDB CORS support) |
| Direct open (`file://`) | ❌ No — browser security blocks cross-origin fetch |

## ⚠️ Security Warning

> **Static page source code is visible to everyone.**
>
> Anyone pressing F12 can see `user` and `secret` in the script, gaining full read/write access to the TinyWebDB database.
>
> - ❌ **Never** store passwords, keys, or personal data in this TinyWebDB
> - ❌ **Never** use the same `user/secret` for sensitive business data
> - ✅ This counter is only suitable for **non-sensitive public data** (e.g. visit counts)
> - ✅ For sensitive data, use a backend-authenticated service

## TinyWebDB API Reference

### Data Browser

Browse / import / export data online:

```
https://tinywebdb.appinventor.space/webdb-share1-b3280975
```

### API Info

| Item | Value |
|------|-------|
| Endpoint | `https://tinywebdb.appinventor.space/api` |
| Method | `POST` |
| Content-Type | `application/x-www-form-urlencoded` |

### Required Parameters

| Parameter | Value | Description |
|-----------|-------|-------------|
| `user` | `aaaaa` | Username |
| `secret` | `d1bdf09a` | Secret key |
| `action` | `get` \| `update` \| `delete` \| `count` \| `search` | Operation type |

### Action Parameters & Return Values

**update**

| Parameter | Required | Description |
|-----------|----------|-------------|
| `tag` | Yes | Variable name |
| `value` | Yes | Variable value |

> No return value.

**get**

| Parameter | Required | Description |
|-----------|----------|-------------|
| `tag` | Yes | Variable name |

> Returns the variable's value.

**delete**

| Parameter | Required | Description |
|-----------|----------|-------------|
| `tag` | Yes | Variable name |

> No return value.

**count**

> No additional parameters. Returns the total number of stored variables.

**search**

| Parameter | Required | Default | Description |
|-----------|----------|---------|-------------|
| `no` | No | `1` | Start index |
| `count` | No | `1` | Number of results |
| `tag` | No | (empty) | Substring match on variable name |
| `type` | No | `both` | Search scope: `tag` / `value` / `both` |

> Returns up to 100 results.

## License

MIT
