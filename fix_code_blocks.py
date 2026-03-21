#!/usr/bin/env python3
"""
处理 <div class="code-block"><pre><code> 形式的代码块
为它们添加 highlight.js 的 language class
"""

import re
import glob

files = glob.glob('/home/xun/xun-n-.github.io/_cdt502_steps/step-*.md') + \
        ['/home/xun/xun-n-.github.io/cdt502/overview.md', 
         '/home/xun/xun-n-.github.io/cdt502/methodology.md',
         '/home/xun/xun-n-.github.io/cdt502/evolution.md']

for filepath in files:
    with open(filepath, 'r') as f:
        content = f.read()
    
    original = content
    
    # 检测语言并替换 <pre><code> 为 <pre><code class="language-xxx">
    
    # 检测 Python 代码
    def detect_and_fix_python(match):
        code = match.group(1)
        # Check for Python keywords
        if any(kw in code for kw in ['import ', 'def ', 'print(', 'pd.', 'df.']):
            return f'<div class="code-block"><pre><code class="language-python">{code}</code></pre></div>'
        return match.group(0)
    
    # 检测 SQL 代码
    def detect_and_fix_sql(match):
        code = match.group(1)
        if any(kw in code for kw in ['SELECT ', 'FROM ', 'WHERE ', 'WITH ', 'GROUP BY', 'ORDER BY']):
            return f'<div class="code-block"><pre><code class="language-sql">{code}</code></pre></div>'
        return match.group(0)
    
    # 替换 <pre><code> 形式的代码块
    # 模式: <div class="code-block"><pre><code>code</code></pre></div>
    pattern = r'<div class="code-block"><pre><code>(.*?)</code></pre></div>'
    content = re.sub(pattern, lambda m: detect_and_fix_sql(m) if 'SELECT' in m.group(1) else detect_and_fix_python(m), content, flags=re.DOTALL)
    
    if original != content:
        with open(filepath, 'w') as f:
            f.write(content)
        print(f"Fixed: {filepath}")
    else:
        print(f"No changes: {filepath}")
