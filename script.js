// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const primaryNav = document.getElementById('primaryNav');
if (menuToggle && primaryNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = primaryNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

// Highlight active nav link
(function highlightNav() {
  const links = document.querySelectorAll('#primaryNav a');
  let page = location.pathname.split('/').pop() || 'index.html';
  links.forEach(a => {
    const href = a.getAttribute('href');
    if ((page === '' && href === 'index.html') || href === page) {
      a.classList.add('active');
    }
  });
})();

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

// Newsletter form
const newsForm = document.getElementById('newsletter-form');
if (newsForm) {
  newsForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = /** @type {HTMLInputElement} */(document.getElementById('newsletter-email')).value.trim();
    const msg = document.getElementById('newsletter-msg');
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    msg.textContent = ok ? 'Thanks for subscribing! Fresh news is on the way.' : 'Please enter a valid email address.';
  });
}

// Contact form
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = /** @type {HTMLInputElement} */(document.getElementById('name')).value.trim();
    const email = /** @type {HTMLInputElement} */(document.getElementById('email')).value.trim();
    const message = /** @type {HTMLTextAreaElement} */(document.getElementById('message')).value.trim();
    const msgEl = document.getElementById('contact-msg');
    if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || message.length < 5) {
      msgEl.textContent = 'Please complete all fields with a valid email and a short message.';
      return;
    }
    msgEl.textContent = 'Thanks! Your message has been sent (simulated). We will reply soon.';
    contactForm.reset();
  });
}

// Blog search filter
const blogSearch = document.getElementById('blog-search');
if (blogSearch) {
  const list = document.getElementById('blog-list');
  blogSearch.addEventListener('input', () => {
    const q = blogSearch.value.toLowerCase();
    list.querySelectorAll('li').forEach(li => {
      const t = li.textContent.toLowerCase();
      li.style.display = t.includes(q) ? '' : 'none';
    });
  });
}

// Shop search + cart (simulated)
const shopSearch = document.getElementById('shop-search');
if (shopSearch) {
  const grid = document.getElementById('shop-grid');
  shopSearch.addEventListener('input', () => {
    const q = shopSearch.value.toLowerCase();
    grid.querySelectorAll('.product').forEach(item => {
      const tags = (item.getAttribute('data-tags') || '').toLowerCase();
      const title = item.querySelector('h2').textContent.toLowerCase();
      item.style.display = (tags.includes(q) || title.includes(q)) ? '' : 'none';
    });
  });
}
const cartEl = document.getElementById('cart');
if (cartEl) {
  const items = [];
  document.querySelectorAll('.add-cart').forEach(btn => {
    btn.addEventListener('click', () => {
      const name = btn.dataset.name;
      const price = Number(btn.dataset.price);
      items.push({ name, price });
      const total = items.reduce((s, i) => s + i.price, 0).toFixed(2);
      cartEl.textContent = `Cart: ${items.length} item(s) — $${total}`;
    });
  });
}

// Subscriptions
const subButtons = document.querySelectorAll('.subscribe');
if (subButtons.length) {
  const msg = document.getElementById('sub-msg');
  subButtons.forEach(b => b.addEventListener('click', () => {
    msg.textContent = `Thanks! “${b.dataset.plan}” subscription added (simulated).`;
  }));
}

// Gallery lightbox
const lightbox = document.getElementById('lightbox');
if (lightbox) {
  const lightImg = document.getElementById('lightbox-img');
  const closeBtn = lightbox.querySelector('.lightbox-close');
  document.getElementById('gallery').addEventListener('click', (e) => {
    const link = e.target.closest('a.glight');
    if (!link) return;
    e.preventDefault();
    lightImg.src = link.href;
    lightbox.hidden = false;
  });
  closeBtn.addEventListener('click', () => lightbox.hidden = true);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) lightbox.hidden = true;
  });
}