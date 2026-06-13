# 新手教程：给你的 HTML 页面加上访问计数器

> ⬅ [返回项目说明](README.md)

本教程面向**刚刚做完一个 HTML 页面**、想加一个「页面打开次数」功能的用户。全程不需要安装任何软件，复制粘贴即可完成。

---

## 你将学会

- 在页面上显示一个访问计数器
- 每次刷新页面，数字自动 +1
- 刷新后数字不会重置（数据存在云端）

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

1. 将 [`counter.js`](counter.js) 下载到你的项目文件夹（和你的 `.html` 文件放在一起）

2. 在 `</body>` **的上一行**，加入这两行：

```html
    <!-- ↓↓↓ 新增：计数器 ↓↓↓ -->
    <script src="counter.js"></script>
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

A: 把每个页面的 `counter.js` 复制一份（比如 `counter_page2.js`），把文件里的 `var TAG = 'watch';` 改成不同的名字，比如 `var TAG = 'page1';`、`var TAG = 'page2';`。

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
