/**
 * CDT502 Code Block Enhancement Script
 * Uses highlight.js for syntax highlighting
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize highlight.js
  if (typeof hljs !== 'undefined') {
    hljs.highlightAll();
  }
  
  // Add line numbers and copy buttons after highlighting
  setTimeout(enhanceCodeBlocks, 100);
});

function enhanceCodeBlocks() {
  const codeBlocks = document.querySelectorAll('.step-section pre code');
  
  codeBlocks.forEach((code) => {
    const pre = code.parentElement;
    
    // Skip if already processed
    if (pre.classList.contains('code-enhanced')) return;
    pre.classList.add('code-enhanced');
    
    // Get language from highlight.js class
    let language = 'text';
    const langMatch = code.className.match(/language-(\w+)/);
    if (langMatch) {
      language = langMatch[1];
    }
    
    // Add line numbers
    addLineNumbers(code);
    
    // Add language badge
    const badge = document.createElement('span');
    badge.className = 'code-language-badge';
    badge.textContent = language;
    pre.appendChild(badge);
    
    // Add copy button
    addCopyButton(pre, code);
  });
}

function addLineNumbers(codeBlock) {
  const lines = codeBlock.innerHTML.split('\n');
  if (lines.length <= 1) return;
  
  // Remove last empty line
  if (lines[lines.length - 1].trim() === '') {
    lines.pop();
  }
  
  // Wrap each line in a div
  const numberedLines = lines.map((line, index) => {
    return `<div class="code-line" data-line="${index + 1}">${line || ' '}</div>`;
  });
  
  codeBlock.innerHTML = numberedLines.join('');
}

function addCopyButton(pre, code) {
  // Skip if already has copy button
  if (pre.querySelector('.code-copy-btn')) return;
  
  const text = code.textContent;
  
  // Create copy button
  const copyBtn = document.createElement('button');
  copyBtn.className = 'code-copy-btn';
  copyBtn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
    Copy
  `;
  copyBtn.title = 'Copy code';
  
  // Copy functionality
  copyBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    navigator.clipboard.writeText(text).then(() => {
      copyBtn.classList.add('copied');
      copyBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
        </svg>
        Copied!
      `;
      
      setTimeout(() => {
        copyBtn.classList.remove('copied');
        copyBtn.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          Copy
        `;
      }, 2000);
    }).catch(err => {
      console.error('Failed to copy:', err);
    });
  });
  
  pre.appendChild(copyBtn);
}
