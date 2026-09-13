const body = document.body;
const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.main-nav');
const textSizeButton = document.querySelector('.text-size-button');

menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  menuButton.querySelector('.sr-only').textContent = open ? '메뉴 열기' : '메뉴 닫기';
  nav.classList.toggle('open', !open);
  body.classList.toggle('menu-open', !open);
});

nav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.querySelector('.sr-only').textContent = '메뉴 열기';
    nav.classList.remove('open');
    body.classList.remove('menu-open');
  });
});

textSizeButton.addEventListener('click', () => {
  const pressed = textSizeButton.getAttribute('aria-pressed') === 'true';
  textSizeButton.setAttribute('aria-pressed', String(!pressed));
  textSizeButton.lastChild.textContent = pressed ? ' 글자 크게' : ' 원래 크기';
  body.classList.toggle('large-text', !pressed);
});

const tabs = [...document.querySelectorAll('[role="tab"]')];

function activateTab(selected) {
  tabs.forEach((tab) => {
    const active = selected === tab;
    tab.classList.toggle('active', active);
    tab.setAttribute('aria-selected', String(active));
    tab.tabIndex = active ? 0 : -1;
    document.querySelector(`[data-panel="${tab.dataset.topic}"]`).hidden = !active;
  });
}

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => activateTab(tab));
  tab.addEventListener('keydown', (event) => {
    if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    event.preventDefault();
    const direction = event.key === 'ArrowRight' ? 1 : -1;
    const next = tabs[(index + direction + tabs.length) % tabs.length];
    activateTab(next);
    next.focus();
  });
});

document.querySelectorAll('.faq-list button').forEach((button) => {
  button.addEventListener('click', () => {
    const open = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', String(!open));
    button.closest('article').querySelector('.answer').hidden = open;
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    observer.unobserve(entry.target);
  });
}, { threshold: 0.1 });

document.querySelectorAll('.appear').forEach((element) => observer.observe(element));
