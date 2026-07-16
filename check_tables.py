# -*- coding: utf-8 -*-
"""Find all unclosed <tbody> tags."""
import sys, re
sys.stdout.reconfigure(encoding='utf-8')

p = r'C:\Users\ARROW\.qclaw\workspace\kb\docs\家装管理\项目往来\家装真实性核销\index.md'
lines = open(p, encoding='utf-8').readlines()

stack = []
issues = []
for i, line in enumerate(lines):
    if '<tbody>' in line:
        stack.append((i + 1, 'tbody'))
    if '</tbody>' in line:
        if stack and stack[-1][1] == 'tbody':
            stack.pop()
        else:
            issues.append(f'L{i+1}: </tbody> without matching <tbody>')
    
    if '<table' in line:
        stack.append((i + 1, 'table'))
    if '</table>' in line:
        if stack and stack[-1][1] == 'table':
            stack.pop()
        else:
            issues.append(f'L{i+1}: </table> without matching <table>')

print(f'Unclosed tags: {stack}')
print(f'Issues: {issues}')
print(f'Total lines: {len(lines)}')

# Show context around each unclosed tag
for ln, tag in stack:
    print(f'\n=== {tag} opened at L{ln} ===')
    start = max(0, ln - 3)
    end = min(len(lines), ln + 5)
    for i in range(start, end):
        print(f'  L{i+1}: {lines[i].rstrip()[:100]}')
