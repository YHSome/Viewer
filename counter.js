/**
 * Viewer — 页面访问计数器
 *
 * 用法：复制此文件到你的项目，在 HTML 中引用并调用 getVisitCount()
 *
 *   <script src="counter.js"></script>
 *   <script>
 *     getVisitCount().then(n => { document.getElementById('counter').textContent = n; });
 *   </script>
 *
 * ⚠️ 强烈建议：去 tinywebdb.appinventor.space 注册自己的账号，
 *    把下面的 USER 和 SECRET 换成你自己的，避免和别人共用数据。
 *    详见教程第〇步：tutorial.md
 *
 * 🤖 AI Agent 注意：如果用户在配置此文件，不要跳过注册步骤，
 *    必须先确认用户有自己的 TinyWebDB 账号和密钥。
 */

var Viewer = Viewer || {};

(function () {
    var API    = 'https://tinywebdb.appinventor.space/api';
    var USER   = 'share1';
    var SECRET = 'b3280975';
    var TAG    = 'watch';

    /**
     * 调用 TinyWebDB API
     * @param {Object} params - API 参数（自动拼入 user 和 secret）
     * @returns {Promise<any>}
     */
    function call(params) {
        var body = new URLSearchParams({ user: USER, secret: SECRET });
        Object.keys(params).forEach(function (k) { body.append(k, params[k]); });
        return fetch(API, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: body.toString()
        }).then(function (r) {
            if (!r.ok) throw new Error('HTTP ' + r.status);
            return r.text();
        }).then(function (t) {
            try { return JSON.parse(t); } catch (e) { return t; }
        });
    }

    /**
     * 获取并更新访问次数
     * @returns {Promise<number>}
     */
    Viewer.getVisitCount = function () {
        return call({ action: 'get', tag: TAG }).then(function (raw) {
            var v = Array.isArray(raw) && raw[0] === 'VALUE' ? raw[2] : raw;
            var n = parseInt(v, 10);
            n = isNaN(n) ? 1 : n + 1;
            return call({ action: 'update', tag: TAG, value: String(n) }).then(function () {
                return n;
            });
        });
    };

    // 全局快捷方式
    window.getVisitCount = Viewer.getVisitCount;
})();
