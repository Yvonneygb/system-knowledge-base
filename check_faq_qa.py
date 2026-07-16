# -*- coding: utf-8 -*-
import sys, re
sys.stdout.reconfigure(encoding='utf-8')

p = r'C:\Users\ARROW\.qclaw\workspace\kb\docs\.vitepress\dist\家装管理\项目往来\家装真实性核销\index.html'
html = open(p, encoding='utf-8').read()

# Find faq-qa section
idx = html.find('faq-qa')
if idx >= 0:
    # Show 200 chars around it
    start = max(0, idx - 100)
    end = min(len(html), idx + 300)
    print(f'faq-qa found at char {idx}:')
    print(html[start:end])
else:
    print('faq-qa NOT found in dist output!')

# Also check detail-logic content
print('\n\n=== detail-logic section ===')
dl_idx = html.find('id="detail-logic"')
if dl_idx >= 0:
    end = min(len(html), dl_idx + 2000)
    print(html[dl_idx:end])
