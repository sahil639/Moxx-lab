/* Moxx Lab — shared interface behaviour: light / dark theme and flat bar sliders.
   Loaded in <head> (blocking) so the theme is set before the first paint. */
(() => {
  const KEY = 'moxx-theme', root = document.documentElement;
  const mq = matchMedia('(prefers-color-scheme: light)');
  const stored = () => { try { const v = localStorage.getItem(KEY); return v==='light'||v==='dark' ? v : null; } catch(e){ return null; } };
  const system = () => mq.matches ? 'light' : 'dark';

  function apply(t){
    root.dataset.theme = t;
    const b = document.querySelector('.theme-toggle');
    if (b){ b.setAttribute('aria-label', t==='dark' ? 'Switch to light mode' : 'Switch to dark mode'); b.title = b.getAttribute('aria-label'); }
    dispatchEvent(new CustomEvent('moxx-theme', {detail:t}));
  }
  function set(t, from){
    if (t === root.dataset.theme) return;
    const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!document.startViewTransition || calm || !from){ apply(t); return; }
    const r = from.getBoundingClientRect();
    root.style.setProperty('--vt-x', (r.left + r.width/2) + 'px');
    root.style.setProperty('--vt-y', (r.top + r.height/2) + 'px');
    document.startViewTransition(() => apply(t));
  }
  root.dataset.theme = stored() || system();
  mq.addEventListener('change', () => { if (!stored()) apply(system()); });   // follow the system until the user chooses

  /* sliders: keep --p (the filled share) in step with the value, however it is set */
  const desc = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value');
  function paint(el){
    const min = parseFloat(el.min) || 0, max = el.max === '' ? 100 : parseFloat(el.max);
    const v = parseFloat(desc.get.call(el));
    el.style.setProperty('--p', (max > min ? Math.max(0, Math.min(1, (v-min)/(max-min))) * 100 : 0) + '%');
  }
  function enhance(el){
    if (el.__bar) return; el.__bar = true;
    Object.defineProperty(el, 'value', { configurable:true,
      get(){ return desc.get.call(this); },
      set(v){ desc.set.call(this, v); paint(this); } });
    el.addEventListener('input', () => paint(el));
    paint(el);
  }
  const scan = n => { if (n.nodeType !== 1) return;
    if (n.matches('input[type=range]')) enhance(n);
    n.querySelectorAll && n.querySelectorAll('input[type=range]').forEach(enhance); };

  function ready(){
    scan(document.body);
    new MutationObserver(ms => { for (const m of ms){
      if (m.type === 'attributes') paint(m.target);
      else m.addedNodes.forEach(scan);
    } }).observe(document.body, {childList:true, subtree:true, attributes:true, attributeFilter:['min','max']});

    const b = document.createElement('button');
    b.type = 'button'; b.className = 'theme-toggle';
    b.innerHTML = '<i><svg class="sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><circle cx="12" cy="12" r="4.2" fill="currentColor"/><path d="M12 2.5v2.4M12 19.1v2.4M2.5 12h2.4M19.1 12h2.4M5.3 5.3 7 7M17 17l1.7 1.7M18.7 5.3 17 7M7 17l-1.7 1.7"/></svg>'
      + '<svg class="moon" viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 14.2A8.6 8.6 0 0 1 9.8 3.5a8.6 8.6 0 1 0 10.7 10.7z"/></svg></i>';
    b.onclick = () => { const t = root.dataset.theme === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem(KEY, t); } catch(e){}
      set(t, b); };
    const head = document.querySelector('#panel h1, #ui h2');
    if (head) head.append(b); else { b.classList.add('float'); document.body.append(b); }
    apply(root.dataset.theme);
  }
  if (document.readyState === 'loading') addEventListener('DOMContentLoaded', ready); else ready();

  window.MoxxUI = { get theme(){ return root.dataset.theme; }, set };
})();
