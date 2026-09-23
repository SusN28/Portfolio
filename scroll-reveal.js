document.addEventListener('DOMContentLoaded', () => {
  const revealItems = document.querySelectorAll(
      '.skill-row, .project-entry, .copy, .contact-section'
  );

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12 });

    revealItems.forEach(item => revealObserver.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add('is-visible'));
  }

  document.querySelectorAll('[data-gallery]').forEach(gallery => {
    const track = gallery.querySelector('.gallery-track');
    const slides = gallery.querySelectorAll('.gallery-track img');
    const previousButton = gallery.querySelector('[data-gallery-previous]');
    const nextButton = gallery.querySelector('[data-gallery-next]');
    let currentSlide = 0;

    function showSlide(slideNumber) {
      currentSlide = (slideNumber + slides.length) % slides.length;
      track.style.transform = `translateX(-${currentSlide * 100}%)`;
    }

    previousButton.addEventListener('click', () => {
      showSlide(currentSlide - 1);
    });

    nextButton.addEventListener('click', () => {
      showSlide(currentSlide + 1);
    });
  });

  const sections = document.querySelectorAll('main section[id]');
  const navigationLinks = document.querySelectorAll('.site-header nav a');

  if ('IntersectionObserver' in window) {
    const navigationObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          return;
        }

        navigationLinks.forEach(link => {
          const isCurrentSection = link.getAttribute('href') === `#${entry.target.id}`;
          link.classList.toggle('active', isCurrentSection);
        });
      });
    }, { rootMargin: '-35% 0px -55% 0px' });

    sections.forEach(section => navigationObserver.observe(section));
  }
});
