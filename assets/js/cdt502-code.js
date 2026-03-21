/**
 * CDT502 Code Block Enhancement Script
 * Adds copy buttons and Prism.js line numbers
 */

document.addEventListener('DOMContentLoaded', function() {
  enhanceCodeBlocks();
  addCopyButtons();
});

function enhanceCodeBlocks() {
  const codeBlocks = document.querySelectorAll('.step-section pre code');
  
  codeBlocks.forEach((code) => {
    const pre = code.parentElement;
    
    // Skip if already processed
    if (pre.classList.contains('code-enhanced')) return;
    pre.classList.add('code-enhanced');
    
    // Get language from class (e.g., "language-python")
    let language = 'text';
    const langMatch = code.className.match(/language-(\w+)/);
    if (langMatch) {
      language = langMatch[1];
    } else {
      // Try to detect from content
      const text = code.textContent;
      if (text.includes('import pandas') || text.includes('def ') || text.includes('print(')) {
        language = 'python';
        code.classList.add('language-python');
      } else if (text.includes('SELECT ') || text.includes('FROM ') || text.includes('WHERE ')) {
        language = 'sql';
        code.classList.add('language-sql');
      }
    }
    
    // Add line numbers class for Prism
    pre.classList.add('line-numbers');
    
    // Add language badge
    const badge = document.createElement('span');
    badge.className = 'code-language-badge';
    badge.textContent = language;
    pre.appendChild(badge);
  });
  
  // Re-run Prism highlighting
  if (typeof Prism !== 'undefined') {
    Prism.highlightAll();
  }
}

function addCopyButtons() {
  const codeBlocks = document.querySelectorAll('.step-section pre');
  
  codeBlocks.forEach((pre) => {
    // Skip if already has copy button
    if (pre.querySelector('.code-copy-btn')) return;
    
    const code = pre.querySelector('code');
    if (!code) return;
    
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
  });
}
