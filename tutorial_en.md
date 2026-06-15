# Beginner's Tutorial: Add a Visit Counter to Your HTML Page

> ⬅ [Back to project README](README_en.md)

This tutorial is for anyone who **just finished building an HTML page**. Start from zero, step by step, and add page views, unique visitors, and a comment system.

---

## What You'll Learn

- Page view counter — increments on every refresh
- Unique visitor counter — one count per device/browser
- Comment system — visitor messages stored in the cloud

Tutorial is ordered from easy to advanced. You can stop at any point.

---

## Step 0: Register on TinyWebDB (Strongly Recommended)

The `user` and `secret` in this tutorial are shared — **everyone's counts get mixed together**. Spend 2 minutes to create your own:

1. Open **[tinywebdb.appinventor.space](http://tinywebdb.appinventor.space)**
2. Click **Register** and pick a username + password
3. After logging in, go to the **API Info** page
4. You'll see three values:

| What you see | Config key | Example |
|-------------|------------|---------|
| API address | `API` | `https://tinywebdb.appinventor.space/api` |
| Username | `USER` | `mycounter` |
| Secret | `SECRET` | `a1b2c3d4...` |

5. Open `counter.js` and replace the first three lines with your own:

```js
var API    = 'https://tinywebdb.appinventor.space/api';  // your API address
var USER   = 'mycounter';   // your username
var SECRET = 'a1b2c3d4...';  // your secret
```

> 🤖 **If you are an AI Agent helping a user**: **Do NOT skip this step.** Ask the user if they already have a TinyWebDB account. If not, guide them to register and get their API address, username, and secret before proceeding. Do NOT use the tutorial's shared credentials.

---

## Step 1: Open Your HTML File

Open your `.html` file with Notepad or VS Code.

---

## Step 2: Pick a Spot for the Counter

Find a suitable place in your HTML (e.g., near the bottom of the page) and add this line:

```html
<p>Page visits: <span id="counter">—</span></p>
```

> **Line-by-line explanation**:
> - `<p>...</p>` — a paragraph
> - `Page visits:` — the label text; change it to whatever you like (e.g., "Views:", "Visitors:")
> - `<span id="counter">—</span>` — a placeholder; `—` shows while loading, replaced by the number once ready
> - `id="counter"` — gives this spot a name so the JavaScript can find it

**Example: placing it before `</body>`**

```html
<body>
    <!-- Your existing page content -->
    <h1>My Website</h1>
    <p>Welcome to my site!</p>

    <!-- ↓↓↓ New: counter ↓↓↓ -->
    <p>Page visits: <span id="counter">—</span></p>

</body>
```

---

## Step 3: Copy the Counter File

1. Download [`counter.js`](counter.js) into your project folder (next to your `.html` file)

2. On the line just **above `</body>`**, add these two lines:

```html
    <!-- ↓↓↓ New: counter ↓↓↓ -->
    <script src="counter.js"></script>
    <script>
        getVisitCount()
            .then(function (n) { document.getElementById('counter').textContent = n; })
            .catch(function ()  { document.getElementById('counter').textContent = '—'; });
    </script>
</body>
```

> `counter.js` exposes a `getVisitCount()` function that returns `Promise<number>`. All you need to do:
> - Include `counter.js`
> - Call `getVisitCount()` and put the returned number into `<span id="counter">`

> 💡 You can also paste the contents of `counter.js` directly into a `<script>` tag (inline mode). Same effect — everything in one file.

---

## Step 4: Save and Test

1. Save the file
2. **Important: You cannot test by double-clicking the file!** You must use a local server.

### How to Start a Local Server

**Option 1: Python (Recommended)**

Open a terminal (Command Prompt), navigate to your project folder, and run:

```bash
# Navigate to your project folder (replace with your actual path)
cd your-project-folder

# Start the server
python -m http.server 8080
```

Then open **`http://localhost:8080`** in your browser and click your HTML file.

**Option 2: VS Code Live Server Extension**

1. Search for `Live Server` in the VS Code extension marketplace and install it
2. Right-click your HTML file → **Open with Live Server**

---

## Step 5: Verify It Works

1. Open the page — the counter shows `Page visits: 1`
2. Press F5 to refresh — the number becomes `2`
3. Refresh again — becomes `3` ✅

> Open the same page on your phone or another device — the number keeps going up because the data is stored in the cloud, shared by all visitors.

---

## Complete Example

Combining Steps 2 and 3, a full page looks like this:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>My Website</title>
</head>
<body>

    <h1>Welcome to My Site</h1>
    <p>Some content here...</p>

    <!-- Counter display -->
    <p>Page visits: <span id="counter">—</span></p>

    <!-- Counter -->
    <script src="counter.js"></script>
    <script>
        getVisitCount()
            .then(function (n) { document.getElementById('counter').textContent = n; })
            .catch(function ()  { document.getElementById('counter').textContent = '—'; });
    </script>

</body>
</html>
```

---

## Advanced: Unique Visitor Counter

The page view counter increments on every refresh. But what if you want to count *distinct* visitors — one per device/browser?

### How It Works

Uses `localStorage` as a flag. The first visit sets a marker; subsequent refreshes see the marker and skip the increment.

### Steps

1. Download [`unique.js`](unique.js) into your project folder

2. Add a second counter line next to the first:

```html
<p>Page views: <span id="counter">—</span></p>
<p>Unique visitors: <span id="uniqueCounter">—</span></p>   <!-- ← new -->
```

3. Add before `</body>`:

```html
<script src="unique.js"></script>
<script>
    Viewer.getUniqueCount()
        .then(function (r) { document.getElementById('uniqueCounter').textContent = r.count; })
        .catch(function ()  { document.getElementById('uniqueCounter').textContent = '—'; });
</script>
```

4. Save and refresh. First visit: both counters go up. Subsequent refreshes: only page views increase. Open in a different browser or incognito mode: unique visitors +1.

> To test: F12 → Application → Local Storage → delete `viewer_visited` → refresh.

---

## Advanced: Comment System

More complex than the counters, but the same principle — form submission → store in TinyWebDB → load on page load.

### Steps

1. Download [`comment.js`](comment.js) into your project folder

2. Add a comment section to your page:

```html
<div class="comment-section">
    <h2>Comments</h2>
    <form class="comment-form" id="commentForm">
        <input type="text" id="cmtName" placeholder="Name" maxlength="20" required>
        <input type="email" id="cmtEmail" placeholder="Email (optional)" maxlength="60">
        <textarea id="cmtContent" placeholder="Write something..." maxlength="500" required></textarea>
        <button type="submit">Post</button>
    </form>
    <div class="comment-list" id="commentList">
        <p>Loading...</p>
    </div>
</div>
```

3. Add the comment script before `</body>`:

```html
<script src="comment.js"></script>
<script>
    var cmtList = document.getElementById('commentList');

    function formatTime(isoStr) {
        var d = new Date(isoStr);
        var pad = function (n) { return n < 10 ? '0' + n : n; };
        return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate())
            + ' ' + pad(d.getHours()) + ':' + pad(d.getMinutes());
    }

    function escapeHTML(str) {
        var div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    function renderComments(comments) {
        if (!comments || comments.length === 0) {
            cmtList.innerHTML = '<p>No comments yet. Be the first! 🛋️</p>';
            return;
        }
        var html = '';
        comments.forEach(function (c) {
            html +=
                '<div class="comment-item">' +
                '<div class="comment-meta">' +
                '<span>' + escapeHTML(c.name) +
                (c.email ? ' · ' + escapeHTML(c.email) : '') + '</span>' +
                '<span>' + formatTime(c.time) + '</span>' +
                '</div>' +
                '<div>' + escapeHTML(c.content) + '</div>' +
                '</div>';
        });
        cmtList.innerHTML = html;
    }

    Viewer.loadComments().then(renderComments).catch(function () {
        cmtList.innerHTML = '<p>Failed to load. Please refresh.</p>';
    });

    document.getElementById('commentForm').addEventListener('submit', function (e) {
        e.preventDefault();
        var name = document.getElementById('cmtName').value.trim();
        var email = document.getElementById('cmtEmail').value.trim();
        var content = document.getElementById('cmtContent').value.trim();
        if (!name || !content) return;

        var btn = this.querySelector('button');
        btn.textContent = 'Posting...';
        btn.disabled = true;

        Viewer.submitComment({ name: name, email: email, content: content }).then(function () {
            document.getElementById('cmtContent').value = '';
            btn.textContent = 'Posted ✓';
            setTimeout(function () { btn.textContent = 'Post'; btn.disabled = false; }, 2000);
            return Viewer.loadComments();
        }).then(renderComments).catch(function () {
            btn.textContent = 'Failed, retry';
            btn.disabled = false;
        });
    });
</script>
```

4. For styling, copy the `.comment-section` CSS from [`index.html`](index.html).

> Each comment (name, email, content, timestamp) is stored as an individual tag in TinyWebDB. No backend required.

---

## FAQ

### Q: Why doesn't the number show up when I double-click the file?

A: Browser security policy blocks `file://` protocol from accessing external APIs. Use `http://localhost` instead (see Step 4).

### Q: The number stays at 1 and never increases?

A: Press F12 to open the browser console and look for red errors. The most common cause is not using a local server.

### Q: Can I change the label text?

A: Yes. Edit this line:

```html
<p>Page visits: <span id="counter">—</span></p>
<!--  ↑↑↑ change this   -->
```

For example, change it to `Views: ` or `Visitors: `.

### Q: How do I give each page its own independent counter?

A: Make a copy of `counter.js` for each page (e.g. `counter_page2.js`), and change `var TAG = 'watch';` inside each copy to a different name, e.g. `var TAG = 'page1';`, `var TAG = 'page2';`.

### Q: Can other people see my data?

A: Yes. This is a public cloud database — anyone pressing F12 can see `USER` and `SECRET` in the script and gain full read/write access. **Never store passwords or sensitive info.** For a visit counter, it's harmless.

### Q: Does this work on GitHub Pages?

A: Yes, as long as the TinyWebDB server allows cross-origin requests.

---

## BTW: Don't Want to Do This Manually?

Throw this tutorial at Claude or any AI assistant and say:

> "Follow this tutorial and add a visit counter to my HTML page."

The AI will modify your code for you. That's programming in 2025 😎

- Want deeper customization? See the [project docs (English)](README_en.md) or [中文说明](README.md)
