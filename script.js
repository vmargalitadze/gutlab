

document.addEventListener('DOMContentLoaded', function () {
    const burgerMenu = document.getElementById('burger-menu');
    const navContainer = document.getElementById('nav-container');
  
    if (!burgerMenu || !navContainer) return;
  
    burgerMenu.addEventListener('click', function (e) {
      e.stopPropagation();
      burgerMenu.classList.toggle('active');
      navContainer.classList.toggle('active');
      document.body.style.overflow = navContainer.classList.contains('active') ? 'hidden' : '';
    });
  
    // გარეთ დაკლიკებით დახურვა
    document.addEventListener('click', function (e) {
      if (!navContainer.contains(e.target) && !burgerMenu.contains(e.target)) {
        burgerMenu.classList.remove('active');
        navContainer.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  
    // Escape ღილაკით დახურვა
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        burgerMenu.classList.remove('active');
        navContainer.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });
// Before/After Image Slider

