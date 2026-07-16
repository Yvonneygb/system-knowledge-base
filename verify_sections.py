# -*- coding: utf-8 -*-
"""Verify all sections in dist output."""
import sys, re
sys.stdout.reconfigure(encoding='utf-8')

p = r'C:\Users\ARROW\.qclaw\workspace\kb\docs\.vitepress\dist\家装管理\项目往来\家装真实性核销\index.html'
html = open(p, encoding='utf-8').read()

sections = ['biz-intro', 'biz-flow', 'key-logic', 'detail-logic', 'permission', 'faq', 'changelog', 'history', 'faq-qa']
for s in sections:
    if f'id="{s}"' in html:
        print(f'[OK] {s}')
    else:
        print(f'[MISSING] {s}')

# Count tables
tables = len(re.findall(r'<table', html))
print(f'\nTables: {tables}')

# Count tr rows
trs = len(re.findall(r'<tr', html))
print(f'TR rows: {trs}')

# Check tab labels
tabs = re.findall(r'data-tab="([^"]*)"', html)
print(f'Tab labels: {tabs}')
