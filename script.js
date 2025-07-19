
document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.main-header');
    const headerScrollThreshold = 50;

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        if (scrollY > headerScrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    window.dispatchEvent(new Event('scroll'));
});


document.addEventListener('DOMContentLoaded', () => {
  const observers = document.querySelectorAll('.animate-on-scroll');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });

  observers.forEach(el => observer.observe(el));
});
