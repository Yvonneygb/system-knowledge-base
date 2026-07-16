# -*- coding: utf-8 -*-
"""Full trace from L708 to end - show ALL divs."""
import sys, re
sys.stdout.reconfigure(encoding='utf-8')

p = r'C:\Users\ARROW\.qclaw\workspace\kb\docs\家装管理\项目往来\家装真实性核销\index.md'
lines = open(p, encoding='utf-8').readlines()

stack = []
for i in range(707, len(lines)):
    line = lines[i]
    cleaned = re.sub(r'style="[^"]*"', '', line)
    opens = len(re.findall(r'<div(\s|>|$)', cleaned))
    closes = len(re.findall(r'</div>', cleaned))
    
    for _ in range(opens):
        id_m = re.search(r'id="([^"]*)"', cleaned)
        cls_m = re.search(r'class="([^"]*)"', cleaned)
        tag = id_m.group(1) if id_m else (cls_m.group(1) if cls_m else 'anon')
        stack.append((i + 1, tag))
    
    for _ in range(closes):
        if stack:
            closed = stack.pop()
            print(f'  L{i+1}: CLOSE {closed[1]} (opened L{closed[0]})')
        else:
            print(f'  L{i+1}: EXTRA CLOSE')

print(f'\nRemaining stack: {stack}')
print(f'Stack count: {len(stack)}')
