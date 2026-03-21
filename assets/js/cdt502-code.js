/**
 * CDT502 Code Block Enhancement Script
 * Adds copy buttons to code blocks
 */

document.addEventListener('DOMContentLoaded', function() {
  addCopyButtons();
});

function addCopyButtons() {
  const codeBlocks = document.querySelectorAll('.step-section pre');
  
  codeBlocks.forEach((pre, index) => {
    // Skip if already has copy button
    if (pre.querySelector('.code-copy-btn')) return;
    
    const code = pre.textContent;
    
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
    copyBtn.addEventListener('click', function() {
      navigator.clipboard.writeText(code).then(() => {
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
