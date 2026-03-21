#!/usr/bin/env python3
"""
将 Markdown 中的三反引号代码块转换为 Jekyll's {% highlight %} 语法
以便 Rouge 正确处理语法高亮
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
    
    # 替换三反引号代码块为 {% highlight %} 语法
    # 匹配模式: ```python\n...\n```
    # 替换为: {% highlight python %}\n...\n{% endhighlight %}
    
    def replace_code_block(match):
        lang = match.group(1) or 'text'
        code = match.group(2).strip()
        return f"{{% highlight {lang} %}}\n{code}\n{{% endhighlight %}}"
    
    # 模式: ```[lang]\ncode\n```
    pattern = r'```(\w*)\n(.*?)\n```'
    content = re.sub(pattern, replace_code_block, content, flags=re.DOTALL)
    
    if original != content:
        with open(filepath, 'w') as f:
            f.write(content)
        print(f"Fixed: {filepath}")
    else:
        print(f"No changes: {filepath}")
