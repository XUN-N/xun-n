/**
 * CDT502 Code Block Enhancement Script
 * Features:
 * - Copy code button
 * - Line numbers display
 * - Syntax highlighting enhancement
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize code blocks
  enhanceCodeBlocks();
});

function enhanceCodeBlocks() {
  const codeBlocks = document.querySelectorAll('pre code');
  
  codeBlocks.forEach((codeBlock, index) => {
    const pre = codeBlock.parentElement;
    const parent = pre.parentElement;
    
    // Skip if already enhanced
    if (parent.classList.contains('code-block-wrapper')) return;
    
    // Get language from class (e.g., "language-python")
    const langClass = Array.from(codeBlock.classList).find(c => c.startsWith('language-'));
    const language = langClass ? langClass.replace('language-', '') : 'code';
    
    // Get filename from data attribute or detect from content
    const filename = pre.dataset.filename || detectFilename(codeBlock.textContent, language);
    
    // Create enhanced code block structure
    const wrapper = createCodeBlockWrapper(pre, codeBlock, filename, language, index);
    
    // Replace original with enhanced version
    parent.insertBefore(wrapper, pre);
    pre.remove();
  });
}

function detectFilename(code, language) {
  // Try to detect filename from common patterns
  if (code.includes('def ') || code.includes('import pandas')) return 'analysis.py';
  if (code.includes('function') || code.includes('const ')) return 'script.js';
  if (code.includes('<html') || code.includes('<div')) return 'index.html';
  if (code.includes('{') && code.includes('}')) return 'styles.css';
  return language === 'python' ? 'script.py' : 
         language === 'javascript' ? 'script.js' : 
         language === 'html' ? 'index.html' : 'code.txt';
}

function createCodeBlockWrapper(pre, codeBlock, filename, language, index) {
  const wrapper = document.createElement('div');
  wrapper.className = 'code-block-wrapper';
  wrapper.id = `code-block-${index}`;
  
  // Header with filename and copy button
  const header = document.createElement('div');
  header.className = 'code-block-header';
  header.innerHTML = `
    <span class="code-block-filename">${filename}</span>
    <button class="code-copy-btn" onclick="copyCode(${index})" title="Copy code">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
      <span>Copy</span>
    </button>
  `;
  
  // Body with line numbers
  const body = document.createElement('div');
  body.className = 'code-block-body';
  
  const codeText = codeBlock.textContent;
  const lines = codeText.split('\n');
  
  // Generate line numbers
  let lineNumbersHTML = '';
  let codeHTML = '';
  
  lines.forEach((line, i) => {
    if (i === lines.length - 1 && line.trim() === '') return; // Skip last empty line
    lineNumbersHTML += `<span>${i + 1}</span>`;
    codeHTML += escapeHtml(line) + '\n';
  });
  
  body.innerHTML = `
    <div class="code-with-lines">
      <div class="line-numbers">${lineNumbersHTML}</div>
      <div class="code-content">
        <pre><code class="${codeBlock.className}">${codeHTML}</code></pre>
      </div>
    </div>
  `;
  
  // Store original code for copying
  wrapper.dataset.code = codeText;
  
  wrapper.appendChild(header);
  wrapper.appendChild(body);
  
  return wrapper;
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function copyCode(index) {
  const wrapper = document.getElementById(`code-block-${index}`);
  const code = wrapper.dataset.code;
  const btn = wrapper.querySelector('.code-copy-btn');
  
  navigator.clipboard.writeText(code).then(() => {
    // Show copied state
    btn.classList.add('copied');
    btn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
      </svg>
      <span>Copied!</span>
    `;
    
    // Reset after 2 seconds
    setTimeout(() => {
      btn.classList.remove('copied');
      btn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
        <span>Copy</span>
      `;
    }, 2000);
  }).catch(err => {
    console.error('Failed to copy:', err);
    alert('Failed to copy code');
  });
}

// Enhance collapsible code blocks
document.addEventListener('DOMContentLoaded', function() {
  const details = document.querySelectorAll('details');
  
  details.forEach(detail => {
    // Add smooth animation for details
    detail.addEventListener('toggle', function() {
      if (this.open) {
        this.style.animation = 'slideDown 0.3s ease';
      }
    });
  });
});

// Add CSS animation keyframes
const style = document.createElement('style');
style.textContent = `
  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(style);
