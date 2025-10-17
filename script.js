

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
    
    console.log('Elements found:', {
        slider: !!slider,
        beforeImage: !!beforeImage,
        afterImage: !!afterImage,
        sliderHandle: !!sliderHandle
    });
    
    // Log image sources
    console.log('Before image source:', beforeImage.src);
    console.log('After image source:', afterImage.src);
    
    // Check image loading
    beforeImage.addEventListener('load', () => {
        console.log('✅ Before image (2.jpg) loaded successfully');
        console.log('Before image dimensions:', beforeImage.naturalWidth, 'x', beforeImage.naturalHeight);
    });
    
    beforeImage.addEventListener('error', () => {
        console.log('❌ Before image (2.jpg) failed to load');
    });
    
    afterImage.addEventListener('load', () => {
        console.log('✅ After image (1.jpg) loaded successfully');
        console.log('After image dimensions:', afterImage.naturalWidth, 'x', afterImage.naturalHeight);
    });
    
    afterImage.addEventListener('error', () => {
        console.log('❌ After image (1.jpg) failed to load');
    });
    
    if (!slider || !beforeImage || !sliderHandle) {
        console.log('Slider elements not found');
        return;
    }
    
    let isDragging = false;
    
    function updateSlider(position) {
        const percentage = Math.max(0, Math.min(100, position));
        
        // გამოვიყენოთ clip-path სწორად
        beforeImage.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
        sliderHandle.style.left = percentage + '%';
        
        console.log('Slider updated to:', percentage + '%');
        
        if (percentage < 25) {
            console.log('🔍 Currently showing mostly AFTER image (1.jpg)');
        } else if (percentage > 75) {
            console.log('🔍 Currently showing mostly BEFORE image (2.jpg)');
        } else {
            console.log('🔍 Currently showing both images mixed');
        }
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
    console.log('🎯 Slider initialized at 50% - should show both images');
});

