/**
 * Viewer — 独立访客计数器
 * 基于 Cookie 判重，首次访问才 +1，通过 TinyWebDB 持久化存储
 */

var Viewer = Viewer || {};

(function () {
    var API    = 'https://tinywebdb.appinventor.space/api';
    var USER   = 'share1';
    var SECRET = 'b3280975';
    var TAG    = 'unique_watch';
    var COOKIE_NAME = 'viewer_visited';

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

    /** 从 get 返回中提取值 */
    function extractVal(raw, tag) {
        var v = raw;
        if (Array.isArray(raw) && raw[0] === 'VALUE') { v = raw[2]; }
        else if (typeof raw === 'object' && raw !== null && raw[tag] !== undefined) { v = raw[tag]; }
        return v;
    }

    /** 检查 Cookie 是否存在 */
    function hasCookie(name) {
        return document.cookie.split(';').some(function (c) {
            return c.trim().indexOf(name + '=') === 0;
        });
    }

    /** 设置持久 Cookie */
    function setCookie(name, value, days) {
        var expires = '';
        if (days) {
            var d = new Date();
            d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
            expires = '; expires=' + d.toUTCString();
        }
        document.cookie = name + '=' + value + expires + '; path=/; SameSite=Lax';
    }

    /**
     * 获取独立访客数
     * 首次访问（无 Cookie）→ +1 再返回
     * 回访（有 Cookie）→ 直接返回当前值
     * @returns {Promise<{count: number, isNew: boolean}>}
     */
    Viewer.getUniqueCount = function () {
        return call({ action: 'get', tag: TAG }).then(function (raw) {
            var v = extractVal(raw, TAG);
            var curNum = parseInt(v, 10);
            if (isNaN(curNum)) curNum = 0;

            var isNew = !hasCookie(COOKIE_NAME);

            if (isNew) {
                setCookie(COOKIE_NAME, '1', 365);
                curNum = curNum + 1;
                return call({ action: 'update', tag: TAG, value: String(curNum) }).then(function () {
                    return { count: curNum, isNew: true };
                });
            }

            return { count: curNum, isNew: false };
        });
    };
})();
