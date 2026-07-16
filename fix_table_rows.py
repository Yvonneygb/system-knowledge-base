# -*- coding: utf-8 -*-
"""Fix changelog tables: move <tr> rows inside <tbody>."""
import sys, re
sys.stdout.reconfigure(encoding='utf-8')

p = r'C:\Users\ARROW\.qclaw\workspace\kb\docs\家装管理\项目往来\家装真实性核销\index.md'
lines = open(p, encoding='utf-8').readlines()

# Strategy: For each month card, the <tr> rows are currently between kl-card-header and <table>.
# We need to move them inside <tbody>...</tbody>.
# Pattern per month:
#   <div class="kl-card-header">...month...</div>
#   <tr>...</tr>  (multiple)
#   <tr>...</tr>
#   <table class="kl-table" ...>
#     <thead>...</thead>
#     <tbody>
#     </tbody>
#   </table>
#
# Target:
#   <div class="kl-card-header">...month...</div>
#   <table class="kl-table" ...>
#     <thead>...</thead>
#     <tbody>
#       <tr>...</tr>
#       <tr>...</tr>
#     </tbody>
#   </table>

new_lines = []
i = 0
fixed = 0
while i < len(lines):
    line = lines[i]
    
    # Detect <tr> line after kl-card-header (changelog area)
    if '<tr><td>' in line and i > 0:
        # Check if previous non-tr line is kl-card-header or another tr
        # Collect all consecutive <tr> lines
        tr_lines = []
        j = i
        while j < len(lines) and '<tr><td>' in lines[j]:
            tr_lines.append(lines[j])
            j += 1
        
        # Now j should point to the <table> line
        # Skip to find <table>
        while j < len(lines) and '<table' not in lines[j]:
            j += 1
        
        if j < len(lines) and '<table' in lines[j]:
            # Found table. Now find <tbody>
            k = j + 1
            while k < len(lines) and '<tbody>' not in lines[k]:
                k += 1
            if k < len(lines) and '<tbody>' in lines[k]:
                # Find </tbody>
                m = k + 1
                while m < len(lines) and '</tbody>' not in lines[m]:
                    m += 1
                if m < len(lines) and '</tbody>' in lines[m]:
                    # Insert tr_lines before </tbody>
                    # Write table, thead, tbody
                    # Write from j to k (inclusive)
                    for x in range(j, k + 1):
                        new_lines.append(lines[x])
                    # Write tr_lines with proper indentation (6 spaces = inside tbody)
                    for tr in tr_lines:
                        # Re-indent to 6 spaces
                        stripped = tr.strip()
                        new_lines.append(f'      {stripped}\n')
                    # Write </tbody> and </table>
                    for x in range(m, m + 2):  # </tbody> and </table>
                        if x < len(lines):
                            new_lines.append(lines[x])
                    fixed += 1
                    i = m + 2  # Skip past </table>
                    continue
    
    new_lines.append(line)
    i += 1

print(f'Fixed {fixed} month tables')
open(p, 'w', encoding='utf-8').writelines(new_lines)
print(f'File: {len(new_lines)} lines')
