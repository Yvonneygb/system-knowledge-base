# -*- coding: utf-8 -*-
import sys
sys.stdout.reconfigure(encoding='utf-8')

p = r'C:\Users\ARROW\.qclaw\workspace\kb\docs\.vitepress\dist\家装管理\项目往来\家装真实性核销\index.html'
t = open(p, encoding='utf-8').read()
i = t.find('id="changelog"')
j = t.find('id="history"')
s = t[i:j]
# Show first 3000 chars
print(s[:3000])
