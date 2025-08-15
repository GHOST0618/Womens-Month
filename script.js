// script.js - smooth scrolling, reveal on scroll, simple image lightbox

document.addEventListener('DOMContentLoaded', () => {

  // Smooth scrolling for in-page anchors
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e){
      e.preventDefault();
      const id = this.getAttribute('href');
      if (id && document.querySelector(id)) {
        document.querySelector(id).scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Reveal-on-scroll for .card
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.card').forEach(c => observer.observe(c));

  // Image lightbox: open on click for elements with data-large attribute
  const modal = document.getElementById('lightbox-modal');
  const modalInner = document.getElementById('lightbox-inner');

  document.querySelectorAll('[data-large]').forEach(img => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', () => {
      const src = img.getAttribute('data-large') || img.src;
      modalInner.innerHTML = `<img src="${src}" alt="${img.alt || ''}">`;
      modal.style.display = 'flex';
    });
  });

  // close modal
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.style.display = 'none';
    });
  }

});
