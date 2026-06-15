#!/usr/bin/env python3
"""
Viewer — 页面编号脚本

扫描目录下所有 .html 文件，按文件名排序后分配唯一编号。
在每个 HTML 的 <head> 中注入 <meta name="x-viewer-page-id" content="N">，
使 counter.js / unique.js / comment.js 自动识别并通过独立 tag 存储数据。

用法：
    python assign_pages.py [目录路径]

    若不传路径，默认扫描当前目录（*.html）。
    已存在的编号不会重复分配，只会为新文件追加编号。
"""

import os
import sys
import re

META_TAG = '<meta name="x-viewer-page-id" content="{page_id}">'


def find_html_files(directory):
    """扫描目录下所有 .html 文件，按文件名排序"""
    files = sorted(
        f for f in os.listdir(directory)
        if f.endswith('.html') and os.path.isfile(os.path.join(directory, f))
    )
    return files


def extract_page_id(html_path):
    """从 HTML 文件中提取已分配的 page id，没有则返回 None"""
    try:
        with open(html_path, 'r', encoding='utf-8') as f:
            content = f.read()
        match = re.search(r'<meta\s+name="x-viewer-page-id"\s+content="(\d+)"\s*/?>', content)
        if match:
            return int(match.group(1))
    except Exception:
        pass
    return None


def inject_page_id(html_path, page_id):
    """在 HTML 的 <head> 中注入 page id meta 标签"""
    with open(html_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 检查是否已有
    if re.search(r'<meta\s+name="x-viewer-page-id"\s+content="\d+"\s*/?>', content):
        # 替换已有
        content = re.sub(
            r'<meta\s+name="x-viewer-page-id"\s+content="\d+"\s*/?>',
            META_TAG.format(page_id=page_id),
            content
        )
        print(f'  更新: {os.path.basename(html_path)} → page #{page_id}')
    else:
        # 在 <head> 内插入
        head_match = re.search(r'<head[^>]*>', content, re.IGNORECASE)
        if head_match:
            pos = head_match.end()
            content = content[:pos] + '\n    ' + META_TAG.format(page_id=page_id) + content[pos:]
            print(f'  注入: {os.path.basename(html_path)} → page #{page_id}')
        else:
            print(f'  跳过: {os.path.basename(html_path)} (找不到 <head>)')
            return False

    with open(html_path, 'w', encoding='utf-8') as f:
        f.write(content)
    return True


def main():
    directory = sys.argv[1] if len(sys.argv) > 1 else '.'
    directory = os.path.abspath(directory)

    if not os.path.isdir(directory):
        print(f'错误："{directory}" 不是有效目录')
        sys.exit(1)

    html_files = find_html_files(directory)

    if not html_files:
        print('当前目录没有 .html 文件。')
        return

    print(f'扫描到 {len(html_files)} 个 HTML 文件：\n')

    # 先读取已有编号，找出最大编号
    existing_ids = {}
    for f in html_files:
        fpath = os.path.join(directory, f)
        pid = extract_page_id(fpath)
        if pid is not None:
            existing_ids[f] = pid

    next_id = max(existing_ids.values()) + 1 if existing_ids else 1

    # 为没有编号的文件分配新编号
    assigned = 0
    for f in html_files:
        fpath = os.path.join(directory, f)
        if f in existing_ids:
            print(f'  #{existing_ids[f]}  {f} (已有)')
        else:
            inject_page_id(fpath, next_id)
            next_id += 1
            assigned += 1

    print(f'\n完成：新分配 {assigned} 个编号，共 {len(html_files)} 个页面。')
    print('现在 counter.js / unique.js / comment.js 会自动为每个页面使用独立的数据。')


if __name__ == '__main__':
    main()
