# -*- coding: utf-8 -*-
import sys
sys.stdout.reconfigure(encoding='utf-8')

p = r'C:\Users\ARROW\.qclaw\workspace\kb\docs\.vitepress\dist\家装管理\项目往来\家装真实性核销\index.html'
html = open(p, encoding='utf-8').read()

# Check all section IDs
import re
ids = re.findall(r'id="(biz-intro|biz-flow|key-logic|detail-logic|permission|faq|faq-qa|changelog|history)"', html)
print(f'Section IDs found: {len(ids)}')
for id in ids:
    print(f'  - {id}')

# Check dlm-mod-num
nums = re.findall(r'dlm-mod-num">(\d)', html)
print(f'\nDetail-logic modules: {len(nums)} ({nums})')

# Check tr count
tr_count = html.count('<tr>')
print(f'\nTotal <tr> count: {tr_count}')

# Check Q1-Q6
for q in ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6']:
    count = html.count(q)
    print(f'  {q}: {count} occurrences')

# Check file size
print(f'\nHTML size: {len(html)} bytes ({len(html)/1024:.1f} KB)')
