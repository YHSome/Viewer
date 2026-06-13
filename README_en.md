# Viewer — Page Visit Counter

> **Preface:** Back in 2023, the author started tinkering with static blogs (long gone now). Seeing every other blog with a read-count feature made me envious — I wanted one too. I knew the theory, but AI-assisted coding wasn't mature enough back then, and I could never quite build it. That little wish sat on the shelf for years. Recently, after trying AI agents, it felt like discovering a new continent — and I finally got to close that chapter.

> 📖 [中文文档](README.md)

A pure frontend page visit counter powered by the TinyWebDB cloud database. Copy `counter.js` + one line of code to add visit counting to any static HTML page.

> 👉 **Just finished your HTML page?** Check out the [📖 Beginner's Tutorial — add a counter in 5 minutes](tutorial_en.md). Copy, paste, done.

> 🤖 **Don't want to do it yourself?** Throw the tutorial at Claude and say "add the counter for me."

## Project Structure

```
Viewer/
├── index.html                    # Demo page
├── counter.js                    # Standalone counter script (copy & use)
├── README.md                     # Project docs (Chinese)
├── README_en.md                  # Project docs (English)
├── tutorial.md                   # Beginner's tutorial (Chinese)
└── tutorial_en.md                # Beginner's tutorial (English)
```

## Quick Start

```bash
cd Viewer
python -m http.server 8080
# Open http://localhost:8080/index.html in browser
```

Each page refresh increments the counter by 1.

## Features

- **Auto-read**: Fetches the current count from the database on page load
- **Auto-increment**: +1 on every visit and writes back to the database
- **Fallback**: Creates the record automatically on first visit (starts at 1)
- **Number-only output**: Labels stay in HTML; the counter only returns a number, decoupled from UI

## How It Works

```
Page load → get('watch')
               │
    ┌──────────┴──────────┐
    │ Value exists         │ First visit / no value
    │ old = parseInt()     │ old = NaN
    │ new = old + 1        │ new = 1
    └──────────┬──────────┘
               │
          update('watch', new)
               │
          return new → render on page
```

## Highlights

- **Zero dependencies** — pure JavaScript, no frameworks or libraries
- **Logic-only** — no DOM manipulation; reusable on any page
- **Persistent** — data lives in the TinyWebDB cloud, survives page closes
- **Lightweight** — client script ~50 lines, easy to customize

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
| `user` | `share1` | Username |
| `secret` | `b3280975` | Secret key |
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
