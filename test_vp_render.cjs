const fs = require('fs');
const path = require('path');

async function main() {
  const vitepress = require('C:/Users/ARROW/.qclaw/workspace/kb/node_modules/vitepress');
  const mdPath = 'C:/Users/ARROW/.qclaw/workspace/kb/docs/家装管理/项目往来/家装真实性核销/index.md';
  const outPath = 'C:/Users/ARROW/.qclaw/workspace/debug_render2.html';
  
  const mdContent = fs.readFileSync(mdPath, 'utf-8');
  const renderer = await vitepress.createMarkdownRenderer(
    'C:/Users/ARROW/.qclaw/workspace/kb/docs/.vitepress/config.ts',
    {
      base: '/',
      srcDir: 'C:/Users/ARROW/.qclaw/workspace/kb/docs',
      assetsDir: 'assets',
      cleanUrls: false,
    }
  );
  
  const html = renderer.render(mdContent);
  fs.writeFileSync(outPath, html, 'utf-8');
  const lines = html.split('\n').length;
  console.log(`Rendered ${lines} lines, ${html.length} bytes to ${outPath}`);
}

main().catch(e => {
  console.error(e.message);
  process.exit(1);
});
