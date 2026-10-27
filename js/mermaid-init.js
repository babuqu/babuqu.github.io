(() => {
  const mermaidSelector = 'pre code.mermaid, pre code.language-mermaid, pre code.lang-mermaid, pre code[class~="mermaid"]';

  const renderMermaid = () => {
    const blocks = [...document.querySelectorAll(mermaidSelector)];
    if (!blocks.length || !window.mermaid) return;

    blocks.forEach((code, index) => {
      const container = document.createElement('div');
      container.className = 'mermaid';
      container.id = `mermaid-diagram-${index + 1}`;
      container.textContent = code.textContent;
      code.parentElement.replaceWith(container);
    });

    window.mermaid.initialize({ startOnLoad: false, securityLevel: 'strict' });
    window.mermaid.run({ querySelector: '.mermaid' });
  };

  const loadMermaid = () => {
    if (!document.querySelector(mermaidSelector)) return;
    if (window.mermaid) {
      renderMermaid();
      return;
    }

    const script = document.createElement('script');
    const root = document.querySelector('meta[name="hexo-site-root"]')?.content || '/';
    script.src = new URL(`${root.replace(/\/?$/, '/')}js/mermaid.bundle.js`, window.location.origin).href;
    script.onload = renderMermaid;
    script.onerror = () => console.error('Failed to load the local Mermaid library.');
    document.head.appendChild(script);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadMermaid, { once: true });
  } else {
    loadMermaid();
  }
})();