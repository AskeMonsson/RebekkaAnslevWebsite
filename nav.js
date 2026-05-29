/* nav.js — shared navigation & footer injected on every page */

(function () {
  const pages = [
    { label: 'Terapi',     href: '/subpages/terapi.html' },
    { label: 'Workshops & foredrag',  href: '/subpages/workshops.html' },
    { label: 'Forfatter',  href: '/subpages/forfatter.html' },
    { label: 'Til virksomheder',    href: '/subpages/til_virksomheder.html' },
    { label: 'Priser',     href: '/subpages/priser.html' },
    { label: 'Om mig',     href: '/subpages/om_mig.html' },
    { label: 'Kontakt',    href: '/subpages/kontakt.html' },

  ];

  // Mark active link based on current filename
  const current = window.location.pathname.split('/').pop() || 'index.html';

  const navLinks = pages.map(p => {
    const active = current === p.href ? ' class="active"' : '';
    return `<li><a href="${p.href}"${active}>${p.label}</a></li>`;
  }).join('');

  const mobileLinks = pages.map(p =>
    `<a href="${p.href}">${p.label}</a>`
  ).join('');

  // Inject nav
  document.getElementById('site-nav').innerHTML = `
    <nav id="navbar">
      <a class="nav-logo" href="/index.html" aria-label="Hjem">
        <img src="/images/logo.png" alt="Rebekka Anslev logo" onerror="this.style.display='none'">
        <span>Rebekka Anslev</span>
      </a>
      <ul class="nav-links">${navLinks}</ul>
      <div class="hamburger" id="hamburger">
        <span></span><span></span><span></span>
      </div>
    </nav>
    <div class="mobile-menu" id="mobileMenu">
      ${mobileLinks}
    </div>
  `;

  // Inject footer
  document.getElementById('site-footer').innerHTML = `
    <footer>
      <a class="footer-logo" href="/index.html">Rebekka Anslev</a>
      <div class="footer-links">
        ${pages.map(p => `<a href="${p.href}">${p.label}</a>`).join('')}
      </div>
      <span class="footer-copy">CVR 44261022 · © Alle rettigheder forbeholdes</span>
    </footer>
  `;

  // Nav scroll shadow
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  });

  // Hamburger toggle
  document.getElementById('hamburger').addEventListener('click', () => {
    document.getElementById('mobileMenu').classList.toggle('open');
  });
  document.getElementById('mobileMenu').addEventListener('click', (e) => {
    if (e.target.tagName === 'A') document.getElementById('mobileMenu').classList.remove('open');
  });

  // Scroll-triggered fade-up
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
})();