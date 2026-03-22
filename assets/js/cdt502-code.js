/**
 * CDT502 Code Block Enhancement Script
 * Adds copy buttons and line numbers to Rouge-highlighted code blocks
 */

document.addEventListener('DOMContentLoaded', function() {
  enhanceCodeBlocks();
});

function enhanceCodeBlocks() {
  // Find all Rouge highlight containers
  const codeBlocks = document.querySelectorAll('.highlight');
  
  codeBlocks.forEach((highlight, index) => {
    // Skip if already processed
    if (highlight.classList.contains('code-enhanced')) return;
    highlight.classList.add('code-enhanced');
    
    const pre = highlight.querySelector('pre');
    const code = pre.querySelector('code');
    
    if (!code) return;
    
    // Detect language from content
    let language = detectLanguage(code.textContent);
    
    // Add language badge
    const badge = document.createElement('span');
    badge.className = 'code-language-badge';
    badge.textContent = language;
    highlight.appendChild(badge);
    
    // Add copy button
    addCopyButton(highlight, code);
  });
}

function detectLanguage(code) {
  // Check for Python
  if (code.includes('import ') || code.includes('def ') || code.includes('print(') || 
      code.includes('pd.') || code.includes('df.') || code.includes('plt.')) {
    return 'python';
  }
  
  // Check for SQL
  if (code.includes('SELECT ') || code.includes('FROM ') || code.includes('WHERE ') || 
      code.includes('WITH ') || code.includes('GROUP BY') || code.includes('ORDER BY')) {
    return 'sql';
  }
  
  // Check for JavaScript/TypeScript
  if (code.includes('function') || code.includes('const ') || code.includes('let ') || 
      code.includes('var ') || code.includes('=>')) {
    return 'javascript';
  }
  
  // Check for HTML
  if (code.includes('<html') || code.includes('<div') || code.includes('</')) {
    return 'html';
  }
  
  // Check for CSS
  if (code.includes('{') && code.includes('}') && code.includes(':') && !code.includes('def ')) {
    return 'css';
  }
  
  return 'code';
}

function addCopyButton(highlight, code) {
  // Skip if already has copy button
  if (highlight.querySelector('.code-copy-btn')) return;
  
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
  
  highlight.appendChild(copyBtn);
}
