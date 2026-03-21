#!/usr/bin/env python3
"""
直接在 HTML 元素上添加内联样式，绕过所有 CSS 问题
"""

import glob

files = glob.glob('/home/xun/xun-n-.github.io/_cdt502_steps/step-*.md') + \
        ['/home/xun/xun-n-.github.io/cdt502/overview.md', 
         '/home/xun/xun-n-.github.io/cdt502/methodology.md',
         '/home/xun/xun-n-.github.io/cdt502/evolution.md']

for filepath in files:
    with open(filepath, 'r') as f:
        content = f.read()
    
    # 检查是否已经处理过
    if 'class="highlight" style="' in content:
        print(f"Already processed: {filepath}")
        continue
    
    # 替换 highlight 标签，添加内联样式
    original = content
    content = content.replace(
        '<figure class="highlight">',
        '<figure class="highlight" style="background: #0f172a !important; color: #ffffff !important;">'
    )
    
    if content != original:
        with open(filepath, 'w') as f:
            f.write(content)
        print(f"Fixed: {filepath}")
    else:
        print(f"No changes: {filepath}")

print("\nDone! All highlight blocks now have inline styles.")
