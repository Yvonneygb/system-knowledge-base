# -*- coding: utf-8 -*-
import sys, re
sys.stdout.reconfigure(encoding='utf-8')

p = r'C:\Users\ARROW\.qclaw\workspace\kb\docs\.vitepress\dist\家装管理\项目往来\家装真实性核销\index.html'
html = open(p, encoding='utf-8').read()

# Find tab names
keywords = ['业务介绍', '业务流', '重点逻辑', '详细逻辑', '权限控制', 'FAQ', '更新记录', '历史排查记录']
for kw in keywords:
    count = html.count(kw)
    print(f'{kw}: {count} occurrences')

# Find SVG icons (should be inline)
svgs = len(re.findall(r'<svg', html))
print(f'\nSVG icons: {svgs}')

# Find PrismJS code blocks
codes = len(re.findall(r'<code', html))
print(f'Code blocks: {codes}')

# Find language-sql
sqls = len(re.findall(r'language-sql', html))
print(f'SQL highlights: {sqls}')

# File size
import os
sz = os.path.getsize(p)
print(f'\nFile size: {sz:,} bytes ({sz/1024:.1f} KB)')
