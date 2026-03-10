
document.addEventListener('DOMContentLoaded', () => {

  // ── SCROLL REVEAL ──
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');

        // Animate skill bars when they enter view
        const bar = entry.target.querySelector('.skill-bar-fill');
        if (bar) {
          const target = bar.dataset.width;
          bar.style.width = target;
        }
      }
    });
  }, { threshold: 0.12 });

  const revealTargets = document.querySelectorAll(
    '.skill-card, .stack-item, .creative-card, .project-card, .about-text, .avatar-box'
  );
  revealTargets.forEach(el => {
    el.classList.add('hidden-start');
    revealObserver.observe(el);
  });

  // ── ACTIVE NAV ──
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-links a');

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
