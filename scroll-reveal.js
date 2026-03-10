
// ════════════════════════════════
// SCROLL REVEAL & NAV HIGHLIGHT
// ════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {

  // Scroll reveal
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(
    '.tech-item, .stack-item, .creative-card, .project-card, .about-text, .avatar-box'
  ).forEach(el => {
    el.classList.add('hidden-start');
    revealObserver.observe(el);
  });

  // Active nav highlight
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(a => a.classList.remove('active'));
        const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  sections.forEach(s => navObserver.observe(s));

});
