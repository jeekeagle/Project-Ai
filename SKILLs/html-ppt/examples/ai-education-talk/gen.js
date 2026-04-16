const fs = require('fs');
const out = 'C:\\Users\\Lenovo\\AppData\\Roaming\\LobsterAI\\SKILLs\\html-ppt\\examples\\ai-education-talk\\index.html';
const js = 'C:\\Users\\Lenovo\\AppData\\Roaming\\LobsterAI\\SKILLs\\html-ppt\\examples\\ai-education-talk\\gen.js';
// This script generates the HTML. Run with: node gen.js
// We write a placeholder so this file can be executed
fs.writeFileSync(out, '<!DOCTYPE html><html lang="zh-CN"><head><meta charset="utf-8"><title>AI 赋能教育教学</title></head><body><p>生成中...</p></body></html>', 'utf8');
console.log('Placeholder written. Use node gen_full.js to generate the full deck.');
