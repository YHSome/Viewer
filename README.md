# Viewer — 计数器、评论一体化纯js组件

> 前记：作者在23年的时候刚开始玩纯静态网页写博客（现在已经看不见了），看到别人每一篇文章都有阅读量统计和评论，羡慕得飞起，也想给自己的博客搞一个。但是苦于当时的ai编程尚且不成熟，实现思路是有了，但是一直不会实现，因此就一直没有实现这个小愿望。最近用了ai agent之后感觉就像是开辟新大陆一样，也是终于有机会实现当年的小遗憾了。

> 📖 [English version](README_en.md)

基于 TinyWebDB 云数据库的纯前端页面访问计数器。复制 `counter.js` + 一行代码，为静态网页加上访问计数。

> 👉 **刚做完 HTML 页面？** 看 [📖 新手教程 — 手把手教你加上计数器](tutorial.md)，复制粘贴即可，五分钟搞定。

> 🤖 **不想动手？** 把教程丢给 Claude，说"帮我加上计数器"就行。

## 项目结构

```
Viewer/
├── index.html                    # 演示页面
├── index1.html                   # 演示页面（第二页）
├── README.md                     # 项目说明文档
├── README_en.md                  # 英文版项目说明
├── tutorial.md                   # 新手教程（中文）
├── tutorial_en.md                # 新手教程（英文）
├── js/                           # 核心脚本
│   ├── global.js                 # 全站累计浏览量
│   ├── counter.js                # 单页累计浏览量
│   ├── unique.js                 # 单页独立访客数
│   └── comment.js                # 评论系统
└── tools/                        # 辅助工具
    └── assign_pages.py           # 页面编号脚本
```

## 快速体验

```bash
cd Viewer
python -m http.server 8080
# 浏览器打开 http://localhost:8080/index.html
```

每次刷新页面，计数器 +1。打开 `index1.html` 查看多页面独立计数效果。

## 功能

| 模块 | 文件 | 说明 |
|------|------|------|
| 全站浏览量 | `js/global.js` | 所有页面共享，每次刷新 +1 |
| 单页浏览量 | `js/counter.js` | 每页独立计数，每次刷新 +1 |
| 单页独立访客 | `js/unique.js` | 基于 localStorage 判重，同设备只计一次 |
| 评论系统 | `js/comment.js` | 访客留言，含昵称/邮箱/内容/时间 |

共同特点：零依赖、复制即用、云端持久化、不绑定 UI。

### 多页面支持

每个页面通过 `<meta name="x-viewer-page-id" content="N">` 声明编号，JS 自动使用独立的数据 tag，互不干扰。

使用编号脚本自动管理：

```bash
python tools/assign_pages.py
```

- 自动扫描目录下所有 `.html` 文件
- 为每个文件分配唯一编号并注入 meta 标签
- 已编号的页面跳过，已删除的编号永不重用
- 编号记录持久化在 `tools/.viewer_pages.json`

### 工作流程

```
页面加载 → 读取 meta 编号
              │
         get('watch_N') ← N 为页面编号
              │
    ┌─────────┴─────────┐
    │ 有值              │ 无值 / 首次访问
    │ old = parseInt()  │ old = NaN
    │ new = old + 1     │ new = 1
    └─────────┬─────────┘
              │
         update('watch_N', new)
              │
         返回 new → 页面渲染
```

## 部署注意

| 环境 | 是否可用 |
|------|----------|
| `http://localhost` | ✅ 正常 |
| GitHub Pages（`https://`） | ✅ 正常（需 TinyWebDB 允许 CORS） |
| 直接双击打开（`file://`） | ❌ 浏览器安全策略禁止跨域 fetch |

## ⚠️ 安全警告

> **静态网页的源代码对所有访问者可见。**
>
> 任何人按 F12 即可获取 `user` 和 `secret`，从而拥有对该 TinyWebDB 数据库的**完全读写权限**。
>
> - ❌ **不要**将密码、密钥等敏感数据存入此 TinyWebDB
> - ❌ **不要**用同一个 `user/secret` 存放重要业务数据
> - ✅ 此计数器仅适合存放**无敏感性的公开数据**（如访问次数）
> - ✅ 如需存放敏感数据，应使用有后端鉴权的自建服务

## TinyWebDB 接口参考

### 示例地址

在线浏览 / 导入 / 导出数据库：

```
https://tinywebdb.appinventor.space/webdb-share1-b3280975
```

### API 信息

| 项目 | 值 |
|------|-----|
| API 地址 | `https://tinywebdb.appinventor.space/api` |
| 请求类型 | `POST` |
| Content-Type | `application/x-www-form-urlencoded` |

### 必选参数

| 参数 | 值 | 说明 |
|------|-----|------|
| `user` | `aaaaa` | 用户名 |
| `secret` | `d1bdf09a` | 密钥 |
| `action` | `get` \| `update` \| `delete` \| `count` \| `search` | 操作类型 |

### 各 action 参数与返回值

**update**（更新）

| 参数 | 必填 | 说明 |
|------|------|------|
| `tag` | 是 | 变量名 |
| `value` | 是 | 变量值 |

> 无返回值。

**get**（读取）

| 参数 | 必填 | 说明 |
|------|------|------|
| `tag` | 是 | 变量名 |

> 返回变量的值。

**delete**（删除）

| 参数 | 必填 | 说明 |
|------|------|------|
| `tag` | 是 | 变量名 |

> 无返回值。

**count**（计数）

> 无其他参数，返回数据库中保存的变量个数。

**search**（查询）

| 参数 | 必填 | 默认值 | 说明 |
|------|------|--------|------|
| `no` | 否 | `1` | 起始编号 |
| `count` | 否 | `1` | 返回的变量个数 |
| `tag` | 否 | 空 | 变量名包含的字符（模糊匹配） |
| `type` | 否 | `both` | 返回范围：`tag` / `value` / `both` |

> 最多返回 100 条数据。
