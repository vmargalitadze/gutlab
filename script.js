

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
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.before-after-slider');
    const beforeImage = document.querySelector('.before-image');
    const afterImage = document.querySelector('.after-image');
    const sliderHandle = document.querySelector('.slider-handle');
    const leftArrow = document.querySelector('.nav-arrow-left');
    const rightArrow = document.querySelector('.nav-arrow-right');
    
    // Image sets for before-after slider
    const imageSets = [
        { before: 'images/work/1.jpg', after: 'images/work/11.jpg' },
        { before: 'images/work/2.jpg', after: 'images/work/22.jpg' },
        { before: 'images/work/3.jpg', after: 'images/work/33.jpg' }
    ];
    
    let currentImageSet = 0;
    
    // Function to change images
    function changeImageSet(direction) {
        if (direction === 'left') {
            currentImageSet = (currentImageSet - 1 + imageSets.length) % imageSets.length;
        } else if (direction === 'right') {
            currentImageSet = (currentImageSet + 1) % imageSets.length;
        }
        
        const newSet = imageSets[currentImageSet];
        beforeImage.src = newSet.before;
        afterImage.src = newSet.after;
        
        // Reset slider to 50%
        updateSlider(50);
    }
    
    // Navigation arrow events
    if (leftArrow) {
        leftArrow.addEventListener('click', function() {
            changeImageSet('left');
        });
    }
    
    if (rightArrow) {
        rightArrow.addEventListener('click', function() {
            changeImageSet('right');
        });
    }
    
    if (!slider || !beforeImage || !sliderHandle) {
        return;
    }
    
    let isDragging = false;
    
    function updateSlider(position) {
        const percentage = Math.max(0, Math.min(100, position));
        
        // გამოვიყენოთ clip-path სწორად
        beforeImage.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
        sliderHandle.style.left = percentage + '%';
    }
    
    function getPosition(e) {
        const rect = slider.getBoundingClientRect();
        const x = e.clientX - rect.left;
        return (x / rect.width) * 100;
    }
    
    // Mouse events
    slider.addEventListener('mousedown', function(e) {
        isDragging = true;
        updateSlider(getPosition(e));
        e.preventDefault();
    });
    
    document.addEventListener('mousemove', function(e) {
        if (isDragging) {
            updateSlider(getPosition(e));
        }
    });
    
    document.addEventListener('mouseup', function() {
        isDragging = false;
    });
    
    // Touch events for mobile
    slider.addEventListener('touchstart', function(e) {
        isDragging = true;
        updateSlider(getPosition(e.touches[0]));
        e.preventDefault();
    });
    
    document.addEventListener('touchmove', function(e) {
        if (isDragging) {
            updateSlider(getPosition(e.touches[0]));
            e.preventDefault();
        }
    });
    
    document.addEventListener('touchend', function() {
        isDragging = false;
    });
    
    // Initialize at 50%
    updateSlider(50);
});

