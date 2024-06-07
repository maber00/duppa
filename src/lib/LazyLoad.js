// src/scripts/LazyLoad.js
document.addEventListener('DOMContentLoaded', () => {
  const lazyImages = document.querySelectorAll('img.lazy[data-src]');
  lazyImages.forEach(img => {
    const src = img.getAttribute('data-src');
    if (src) {
      img.setAttribute('src', src);
      img.removeAttribute('data-src');
      img.classList.remove('lazy');
    }
  });
});
