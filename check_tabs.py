# -*- coding: utf-8 -*-
import sys, re
sys.stdout.reconfigure(encoding='utf-8')

p = r'C:\Users\ARROW\.qclaw\workspace\kb\docs\.vitepress\dist\家装管理\项目往来\家装真实性核销\index.html'
html = open(p, encoding='utf-8').read()

# Find tab buttons
tabs = re.findall(r'tab-btn[^"]*"[^>]*>([^<]+)<', html)
print('Tab buttons:', tabs)

# Find all tab-related elements
tab_els = re.findall(r'class="tab-btn[^"]*"[^>]*data-target="([^"]*)"', html)
print('Tab data-targets:', tab_els)

# Find breadcrumb tabs
bc = re.findall(r'<span[^>]*class="bc-tab[^"]*"[^>]*>([^<]+)<', html)
print('BC tabs:', bc)

# Try another pattern
bc2 = re.findall(r'data-tab-id="([^"]*)"', html)
print('data-tab-id:', bc2)
