# 新手教程：给你的 HTML 页面加上访问计数器

> ⬅ [返回项目说明](README.md)

本教程面向**刚刚做完一个 HTML 页面**的用户。从零开始，一步步加上累计浏览量、独立访客数、评论系统。

---

## 你将学会

- 累计浏览量 — 每次刷新 +1
- 独立访客数 — 同一个人多次刷新只计一次
- 评论系统 — 访客留言，数据存云端

教程按难度从易到难排列，可以只做前两部分。

---

## 第〇步：注册 TinyWebDB（强烈建议）

教程里的 `user` 和 `secret` 是公共的，**所有人都共用同一份数据**，你的计数会和别人的混在一起。建议花 2 分钟注册一个自己的：

1. 打开 **[tinywebdb.appinventor.space](http://tinywebdb.appinventor.space)**
2. 点击页面上的 **注册**，填个用户名和密码
3. 登录后，点击 **API 信息** 页面
4. 你会看到三样东西：

| 你看到的 | 对应配置 | 示例 |
|----------|----------|------|
| API 地址 | `API` | `https://tinywebdb.appinventor.space/api` |
| 用户名 | `USER` | `mycounter` |
| 密钥 | `SECRET` | `a1b2c3d4...` |

5. 打开 `counter.js`，把开头这三行换成你自己的：

```js
var API    = 'https://tinywebdb.appinventor.space/api';  // 你的 API 地址
var USER   = 'mycounter';   // 换成你的用户名
var SECRET = 'a1b2c3d4...';  // 换成你的密钥
```

> 🤖 **如果你是 AI Agent 在帮用户配置**：**一定不能跳过这一步**。先问用户是否已有 TinyWebDB 账号，没有的话引导用户去注册，拿到 API 地址、用户名、密钥后再继续。不要直接用教程里的公共账号。

---

## 第一步：打开你的 HTML 文件

用记事本或 VS Code 打开你做好的 `.html` 文件。

---

## 第二步：选一个位置放计数器

在你的 HTML 里找一个合适的位置（比如页面底部），加入下面这行：

```html
<p>页面打开次数：<span id="counter">—</span></p>
```

> **逐字解释**：
> - `<p>...</p>` — 一个段落
> - `页面打开次数：` — 你想显示的文案，可以改成「阅读量：」「访问量：」等
> - `<span id="counter">—</span>` — 一个占位符，`—` 是加载前的默认显示，加载完成后会被替换成数字
> - `id="counter"` — 给这个位置起个名字，后面 JS 通过这个名字找到它

**示例：放在 `</body>` 前面**

```html
<body>
    <!-- 你原来的页面内容 -->
    <h1>我的网页</h1>
    <p>欢迎来到我的网站！</p>

    <!-- ↓↓↓ 新增：计数器 ↓↓↓ -->
    <p>页面打开次数：<span id="counter">—</span></p>

</body>
```

---

## 第三步：复制计数器文件

1. 将 [`counter.js`](js/counter.js) 下载到你的项目文件夹（和你的 `.html` 文件放在一起）

2. 在 `</body>` **的上一行**，加入这两行：

```html
    <!-- ↓↓↓ 新增：计数器 ↓↓↓ -->
    <script src="js/counter.js"></script>
    <script>
        getVisitCount()
            .then(function (n) { document.getElementById('counter').textContent = n; })
            .catch(function ()  { document.getElementById('counter').textContent = '—'; });
    </script>
</body>
```

> `counter.js` 暴露了一个 `getVisitCount()` 函数，返回 `Promise<number>`。你只需：
> - 引入 `counter.js`
> - 调用 `getVisitCount()`，把返回的数字填到 `<span id="counter">` 里

> 💡 也可以把反斜杠里那个 `counter.js` 的内容直接粘贴到 `<script>` 标签里（内联方式），效果一样，只是代码都在一个文件里。

---

## 第四步：保存并测试

1. 保存文件
2. **重要：不能用双击打开文件的方式测试！** 必须通过本地服务器打开

### 如何启动本地服务器

**方法一：Python（推荐）**

打开终端（命令提示符），进入你的项目目录，运行：

```bash
# 进入项目目录（把路径换成你自己的）
cd 你的项目文件夹路径

# 启动服务器
python -m http.server 8080
```

然后浏览器打开 **`http://localhost:8080`**，点击你的 HTML 文件。

**方法二：VS Code Live Server 插件**

1. 在 VS Code 扩展商店搜索 `Live Server` 并安装
2. 右键你的 HTML 文件 → **Open with Live Server**

---

## 第五步：验证效果

1. 打开页面，计数器显示 `页面打开次数：1`
2. 按 F5 刷新页面，数字变成 `2`
3. 再刷新，变成 `3` ✅

> 用手机或其他设备打开同一个页面，数字会继续往上加——因为数据存在云端，所有设备共享。

---

## 完整示例

将第二步和第三步合在一起，一个完整的页面长这样：

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>我的网页</title>
</head>
<body>

    <h1>欢迎来到我的网站</h1>
    <p>这是一些内容……</p>

    <!-- 计数器显示 -->
    <p>页面打开次数：<span id="counter">—</span></p>

    <!-- 计数器 -->
    <script src="js/counter.js"></script>
    <script>
        getVisitCount()
            .then(function (n) { document.getElementById('counter').textContent = n; })
            .catch(function ()  { document.getElementById('counter').textContent = '—'; });
    </script>

</body>
</html>
```

---

## 进阶篇：独立访客数

上面的计数器每次刷新都 +1，适合统计「页面被打开几次」。但有时你想知道「有多少个不同的人来过」——同一个设备反复刷新只算一次，换台手机才算新访客。

### 原理

通过 `localStorage` 做标记：第一次访问时存一个标记，以后刷新发现标记已存在就跳过，不 +1。

### 步骤

1. 将 [`unique.js`](js/unique.js) 下载到项目文件夹

2. 在刚才的计数器旁边加一行：

```html
<p>页面打开次数：<span id="counter">—</span></p>
<p>独立访客数：<span id="uniqueCounter">—</span></p>   <!-- ← 新增 -->
```

3. 在 `</body>` 前加上：

```html
<script src="js/unique.js"></script>
<script>
    Viewer.getUniqueCount()
        .then(function (r) { document.getElementById('uniqueCounter').textContent = r.count; })
        .catch(function ()  { document.getElementById('uniqueCounter').textContent = '—'; });
</script>
```

4. 保存刷新。第一次打开两个数字都 +1。之后再刷新，只有浏览量 +1，访客数不变。换浏览器/隐私模式打开，访客数才会再 +1。

> 想测试？F12 → Application → Local Storage → 删掉 `viewer_visited` → 刷新即视为新访客。

---

## 高级篇：评论系统

比计数器复杂一些，但原理一样——表单提交 → 存到 TinyWebDB → 页面加载时读出来。

### 步骤

1. 将 [`comment.js`](js/comment.js) 下载到项目文件夹

2. 在页面里加一个评论区：

```html
<div class="comment-section">
    <h2>留言</h2>
    <form class="comment-form" id="commentForm">
        <input type="text" id="cmtName" placeholder="昵称" maxlength="20" required>
        <input type="email" id="cmtEmail" placeholder="邮箱（选填）" maxlength="60">
        <textarea id="cmtContent" placeholder="说点什么……" maxlength="500" required></textarea>
        <button type="submit">发 布</button>
    </form>
    <div class="comment-list" id="commentList">
        <p>加载中...</p>
    </div>
</div>
```

3. 在 `</body>` 前加上评论脚本：

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
            cmtList.innerHTML = '<p>暂无留言，来坐沙发 🛋️</p>';
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

    // 加载已有评论
    Viewer.loadComments().then(renderComments).catch(function () {
        cmtList.innerHTML = '<p>加载失败，请刷新重试</p>';
    });

    // 提交评论
    document.getElementById('commentForm').addEventListener('submit', function (e) {
        e.preventDefault();
        var name = document.getElementById('cmtName').value.trim();
        var email = document.getElementById('cmtEmail').value.trim();
        var content = document.getElementById('cmtContent').value.trim();
        if (!name || !content) return;

        var btn = this.querySelector('button');
        btn.textContent = '提交中...';
        btn.disabled = true;

        Viewer.submitComment({ name: name, email: email, content: content }).then(function () {
            document.getElementById('cmtContent').value = '';
            btn.textContent = '已发布 ✓';
            setTimeout(function () { btn.textContent = '发 布'; btn.disabled = false; }, 2000);
            return Viewer.loadComments();
        }).then(renderComments).catch(function () {
            btn.textContent = '失败，重试';
            btn.disabled = false;
        });
    });
</script>
```

4. 评论区的样式可以参考 [`index.html`](index.html) 里的 `.comment-section` 部分，直接复制过去就行。

> 每条评论包含昵称、邮箱、内容、时间，作为一个独立 tag 存储在 TinyWebDB。用完即走，无需后端。

---

## 常见问题

### Q: 为什么我双击打开不显示数字？

A: 浏览器安全策略禁止 `file://` 协议访问外网 API。必须用 `http://localhost` 方式打开（见第四步）。

### Q: 数字一直是 1，不增加？

A: 按 F12 打开浏览器控制台，看有没有红色报错。最常见的原因是没有用本地服务器打开。

### Q: 我可以改文案吗？

A: 可以。修改这行里的文字：

```html
<p>页面打开次数：<span id="counter">—</span></p>
<!--   ↑↑↑ 改这里   -->
```

比如改成 `阅读量：` 或 `Visits: `。

### Q: 怎么让多个页面各自独立计数？

A: 给每个页面运行 `python tools/assign_pages.py` 自动分配独立编号，或手动在 HTML 的 `<head>` 中加 `<meta name="x-viewer-page-id" content="1">` 和 `<meta name="x-viewer-page-id" content="2">`，JS 会自动为每个页面使用独立的数据 tag。

### Q: 我的数据会被别人看到吗？

A: 会。这是一个公开的云数据库，任何人按 F12 看到脚本里的 `USER` 和 `SECRET` 就能读写数据。**不要存放密码等敏感信息**，计数器场景无妨。

### Q: 部署到 GitHub Pages 能用吗？

A: 可以，只要 TinyWebDB 服务器允许跨域访问就能正常工作。

---

## BTW：不想手动操作？

把这篇教程丢给 Claude 或任意 AI 助手，说一句：

> "帮我按照这篇教程给我的 HTML 页面加上访问计数器"

AI 会直接帮你改好代码。这就是 2025 年的编程方式 😎

- 想要更深度的自定义？看 [项目说明文档](README.md)
