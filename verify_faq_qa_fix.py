# -*- coding: utf-8 -*-
import sys
sys.stdout.reconfigure(encoding='utf-8')

p = r'C:\Users\ARROW\.qclaw\workspace\kb\docs\.vitepress\dist\家装管理\项目往来\家装真实性核销\index.html'
html = open(p, encoding='utf-8').read()

# Find faq-qa and check if it's inside err-detail-10
faq_qa_idx = html.find('faq-qa')
err_10_idx = html.find('err-detail-10')

# Find the closing of err-detail-10
# err-detail-10 is <div id="err-detail-10" class="error-detail-overlay">
# It should close before faq-qa

# Count div opens and closes between err-detail-10 and faq-qa
between = html[err_10_idx:faq_qa_idx]
opens = between.count('<div')
closes = between.count('</div>')
print(f'Between err-detail-10 and faq-qa:')
print(f'  <div> opens: {opens}')
print(f'  </div> closes: {closes}')
print(f'  Balance: {opens - closes}')
# If balance = 0, err-detail-10 is properly closed before faq-qa

# Also check if faq-qa has display:none in SSR output
faq_qa_context = html[faq_qa_idx-50:faq_qa_idx+100]
print(f'\nContext around faq-qa:')
print(faq_qa_context)
