# -*- coding: utf-8 -*-
"""Check div balance and find unclosed tags."""
import sys, re
sys.stdout.reconfigure(encoding='utf-8')

p = r'C:\Users\ARROW\.qclaw\workspace\kb\docs\家装管理\项目往来\家装真实性核销\index.md'
lines = open(p, encoding='utf-8').readlines()

stack = []
for i, line in enumerate(lines):
    # Count <div> opens and </div> closes (ignoring style attrs)
    cleaned = re.sub(r'style="[^"]*"', '', line)
    opens = len(re.findall(r'<div(\s|>|$)', cleaned))
    closes = len(re.findall(r'</div>', cleaned))
    
    for _ in range(opens):
        # Extract id or class
        id_m = re.search(r'id="([^"]*)"', cleaned)
        cls_m = re.search(r'class="([^"]*)"', cleaned)
        tag = id_m.group(1) if id_m else (cls_m.group(1) if cls_m else 'anon')
        stack.append((i + 1, tag))
    
    for _ in range(closes):
        if stack:
            stack.pop()
        else:
            print(f'L{i+1}: EXTRA </div> (no matching open)')

print(f'Unclosed divs: {stack}')
print(f'Total lines: {len(lines)}')

# Show context
for ln, tag in stack:
    print(f'\n=== {tag} opened at L{ln} ===')
    start = max(0, ln - 2)
    end = min(len(lines), ln + 3)
    for i in range(start, end):
        print(f'  L{i+1}: {lines[i].rstrip()[:100]}')
