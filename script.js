document.addEventListener('DOMContentLoaded', function() {
    const documentItems = [
        { id: 'license-download', pdf: 'pdf/1.pdf', name: 'Лицензия.pdf' },
        { id: 'sanitary-download', pdf: 'pdf/2.pdf', name: 'Санитарное заключение.pdf' },
        { id: 'price-download', pdf: 'pdf/3.pdf', name: 'Прайс для клиник и врачей.pdf' },
        { id: 'loyalty-download', pdf: 'pdf/4.pdf', name: 'Программа лояльности.pdf' },
        { id: 'order-form-download', pdf: 'pdf/5.pdf', name: 'Форма заказа наряда.pdf' }
    ];
    
    documentItems.forEach(item => {
        const element = document.getElementById(item.id);
        
        if (element) {
            element.style.cursor = 'pointer';
            
            element.addEventListener('click', function() {
                const link = document.createElement('a');
                link.href = item.pdf;
                link.download = item.name;
                link.target = '_blank';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            });
            
            element.addEventListener('mouseenter', function() {
                element.style.opacity = '0.8';
            });
            
            element.addEventListener('mouseleave', function() {
                element.style.opacity = '1';
            });
        }
    });
});

// ===== Equipment Carousel =====
document.addEventListener('DOMContentLoaded', function() {
  const viewport = document.querySelector('.carousel-viewport');
  const track = document.querySelector('.carousel-track');
  const cards = document.querySelectorAll('.carousel-card');
  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');
  if (!viewport || !track || cards.length === 0) return;

  let index = 0;
  let cardsPerView = 3;

  function computeCardsPerView() {
    const w = viewport.clientWidth;
    if (w <= 600) return 1;
    if (w <= 1024) return 2;
    return 3;
  }

  function update() {
    cardsPerView = computeCardsPerView();
    const gap = parseInt(getComputedStyle(track).gap) || 16;
    const cardWidth = (viewport.clientWidth - gap * (cardsPerView - 1)) / cardsPerView;
    cards.forEach(c => c.style.flexBasis = cardWidth + 'px');

    const maxIndex = Math.max(0, cards.length - cardsPerView);
    index = Math.min(index, maxIndex);
    const offset = index * (cardWidth + gap);
    track.style.transform = `translateX(${-offset}px)`;
  }

  function next() {
    const maxIndex = Math.max(0, cards.length - cardsPerView);
    index = Math.min(maxIndex, index + 1);
    update();
  }

  function prev() {
    index = Math.max(0, index - 1);
    update();
  }

  nextBtn && nextBtn.addEventListener('click', next);
  prevBtn && prevBtn.addEventListener('click', prev);

  // Drag/Swipe
  let isDown = false;
  let startX = 0;
  let startTransform = 0;

  function currentTranslate() {
    const m = /translateX\((-?\d+(?:\.\d+)?)px\)/.exec(track.style.transform || '');
    return m ? parseFloat(m[1]) : 0;
  }

  viewport.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.clientX;
    startTransform = currentTranslate();
    e.preventDefault();
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    const dx = e.clientX - startX;
    track.style.transition = 'none';
    track.style.transform = `translateX(${startTransform + dx}px)`;
  });

  window.addEventListener('mouseup', () => {
    if (!isDown) return;
    isDown = false;
    track.style.transition = '';
    // snap to nearest card
    const gap = parseInt(getComputedStyle(track).gap) || 16;
    const cardWidth = cards[0].getBoundingClientRect().width;
    const offset = -currentTranslate();
    index = Math.round(offset / (cardWidth + gap));
    prev(); // clamp via update path, then step back to correct index
    index = Math.max(0, index);
    const maxIndex = Math.max(0, cards.length - cardsPerView);
    index = Math.min(index, maxIndex);
    update();
  });

  // Touch
  viewport.addEventListener('touchstart', (e) => {
    isDown = true;
    startX = e.touches[0].clientX;
    startTransform = currentTranslate();
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (!isDown) return;
    const dx = e.touches[0].clientX - startX;
    track.style.transition = 'none';
    track.style.transform = `translateX(${startTransform + dx}px)`;
  }, { passive: true });

  window.addEventListener('touchend', () => {
    if (!isDown) return;
    isDown = false;
    track.style.transition = '';
    const gap = parseInt(getComputedStyle(track).gap) || 16;
    const cardWidth = cards[0].getBoundingClientRect().width;
    const offset = -currentTranslate();
    index = Math.round(offset / (cardWidth + gap));
    index = Math.max(0, index);
    const maxIndex = Math.max(0, cards.length - cardsPerView);
    index = Math.min(index, maxIndex);
    update();
  });

  window.addEventListener('resize', update);
  update();
});


document.addEventListener('DOMContentLoaded', function() {
  const consent = document.getElementById('consent');
  const submitBtn = document.querySelector('.submit-btn');
  if (!consent || !submitBtn) return;

  function sync() {
    submitBtn.disabled = !consent.checked;
  }

  consent.addEventListener('change', sync);
  sync();
});


document.addEventListener('DOMContentLoaded', function() {
  const iframe = document.getElementById('heroVideo');
  const btn = document.querySelector('.hero-play');
  if (!iframe || !btn) return;

  let isPlaying = true; // Assume autoplay starts playing

  function toggleVideo() {
    if (isPlaying) {
      // Pause by reloading iframe without autoplay
      iframe.src = iframe.src.replace('?autoplay=1', '');
      btn.style.display = 'flex';
      isPlaying = false;
    } else {
      // Play by reloading iframe with autoplay
      iframe.src = iframe.src.includes('?') ? 
        iframe.src.replace('?', '?autoplay=1&') : 
        iframe.src + '?autoplay=1';
      btn.style.display = 'none';
      isPlaying = true;
    }
  }

  function playVideo() {
    if (!isPlaying) {
      iframe.src = iframe.src.includes('?') ? 
        iframe.src.replace('?', '?autoplay=1&') : 
        iframe.src + '?autoplay=1';
      btn.style.display = 'none';
      isPlaying = true;
    }
  }

  btn.addEventListener('click', playVideo);
  iframe.addEventListener('click', toggleVideo);
});


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
  
    document.addEventListener('click', function (e) {
      if (!navContainer.contains(e.target) && !burgerMenu.contains(e.target)) {
        burgerMenu.classList.remove('active');
        navContainer.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        burgerMenu.classList.remove('active');
        navContainer.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });

document.addEventListener('DOMContentLoaded', function() {
    const phoneItems = document.querySelectorAll('.contact-item');
    
    phoneItems.forEach(item => {
        const icon = item.querySelector('i');
        const text = item.querySelector('span');
        
        if (icon && text) {
            if (icon.classList.contains('fa-phone')) {
                item.style.cursor = 'pointer';
                item.addEventListener('click', function() {
                    const phoneNumber = text.textContent.trim();
                    const cleanNumber = phoneNumber.replace(/\s/g, '');
                    window.open(`tel:${cleanNumber}`, '_self');
                });
                
                item.addEventListener('mouseenter', function() {
                    item.style.opacity = '0.8';
                });
                
                item.addEventListener('mouseleave', function() {
                    item.style.opacity = '1';
                });
            }
            
            if (icon.classList.contains('fa-envelope')) {
                item.style.cursor = 'pointer';
                item.addEventListener('click', function() {
                    const email = text.textContent.trim();
                    window.open(`mailto:${email}`, '_self');
                });
                
                item.addEventListener('mouseenter', function() {
                    item.style.opacity = '0.8';
                });
                
                item.addEventListener('mouseleave', function() {
                    item.style.opacity = '1';
                });
            }
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const equipmentItems = document.querySelectorAll('.equipment-item');
    const scannerInfo = document.querySelector('.scanner-info');
    
    const equipmentData = {
        'sirona': {
            title: 'Системы Sirona позволяют внедрить полноценный цифровой цикл — от сканирования до готовой реставрации в клинике или лаборатории.',
            benefits: [
                'Полный цифровой поток — единая экосистема сканер → ПО → фрезер → печать/полировка',
                'Высокая точность посадки — микронная повторяемость, сниженное количество переделок',
                'Быстрое изготовление — вкладки, коронки, виниры и мосты за одно посещение',
                'Совместимость с материалами — цирконий, стеклокерамика, композиты, PMMA',
                'Интеграция с лабораториями — обмен STL/PLY, облачная передача кейсов',
                'Обучающие пресеты — готовые библиотеки анатомии и режимы обработки для типовых клинических случаев'
            ],
            conclusion: 'Преимущества: скорость, предсказуемость результата, контроль качества на каждом этапе, экономия времени врача и пациента.'
        },
        'halot': {
            title: 'Линейка Halot решает задачи 3D-моделирования и аддитивного производства в стоматологии — от печати моделей челюстей до изготовления шаблонов и кап.',
            benefits: [
                'Высокая детализация печати — точная передача краевых линий и межзубных промежутков',
                'Стабильная оптика и матрицы — корректная геометрия без искажений по полю',
                'Широкий диапазон материалов — модели, временные реставрации, хирургические шаблоны, капы',
                'Предустановленные профили — оптимальные режимы полимеризации под популярные смолы',
                'Простая постобработка — УФ-камеры от того же производителя, предсказуемое отверждение',
                'Интеграция с CAD — импорт STL/OBJ, корректная поддержка и автоматическая расстановка стоек',
            ],
            conclusion: 'Преимущества: чистая геометрия, стабильный процесс, низкая себестоимость печати и быстрая окупаемость оборудования.'
        },
        'scanner': {
            title: 'Интраоральные сканеры позволяют заменить традиционные слепки на точное цифровое 3D-сканирование полости рта',
            benefits: [
                'Точность и комфорт — быстрое и безболезненное снятие формы зубов',
                'Цветное 3D-изображение — мгновенный результат для врача и техника',
                'Быстрая передача данных — слепок мгновенно отправляется на моделирование',
                'Интеграция с CAD/CAM — сканы напрямую используются для коронок, виниров, мостов, колпачков'
            ],
            conclusion: 'Преимущества: скорость, комфорт, отсутствие ошибок, которые бывают при обычных слепках.'
        },
        'cad-cam': {
            title: 'Современные CAD-решения упрощают планирование и проектирование ортопедических конструкций, повышая точность и скорость изготовления.',
            benefits: [
                'Digital Smile Design — моделирование формы и пропорций с привязкой к фото пациента',
                'Автоматизированные библиотеки — анатомические коронки, вкладки, мосты, абатменты',
                'Экспертные инструменты — контроль окклюзии, контактов, межпроксимальных зон',
                'Экспорт без потерь — открытые форматы STL/PLY/OBJ для любого CAM и 3D-принтера',
                'CAM-модули — стратегии фрезерования под цирконий, керамику, PMMA, титановые заготовки',
                'Коллаборация — облачный обмен проектами с лабораторией и внутри клиники',
            ],
            conclusion: 'Преимущества: прогнозируемый дизайн, меньше ручных корректировок, экономия времени врача и техника, быстрая подготовка к производству.'
        },
        'sandblaster': {
            title: 'Пескоструйные системы обеспечивают чистую и равномерную шероховатость поверхности для надежной фиксации облицовочных материалов.',
            benefits: [
                'Точная калибровка давления — стабильный микрорельеф без перегрева заготовки',
                'Разные фракции абразива — корунд/стеклянные шарики под задачи препарирования и финиша',
                'Замкнутый контур пыли — чистое рабочее место, защита оператора и деталей',
                'Быстрая смена сопел — оперативный переход между режимами обработки',
                'Экономичный расход — оптимизированная подача абразива, понятное обслуживание',
                'Подготовка под склейку и облицовку — повышенная смачиваемость и прочность сцепления'
            ],
            conclusion: 'Преимущества: воспроизводимое качество поверхности, сокращение брака, долговечность соединения керамики с каркасом.'
        }
    };
    
    function updateScannerInfo(equipmentType) {
        const data = equipmentData[equipmentType];
        if (!data || !scannerInfo) return;
        
        scannerInfo.innerHTML = `
            <h3>${data.title}</h3>
            <ul class="scanner-benefits">
                ${data.benefits.map(benefit => `<li>${benefit}</li>`).join('')}
            </ul>
            <p class="scanner-conclusion">${data.conclusion}</p>
        `;
    }
    
    equipmentItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            equipmentItems.forEach(el => el.classList.remove('equipment-item-active'));
            
            item.classList.add('equipment-item-active');
            
            const title = item.querySelector('h3').textContent.toLowerCase();
            let equipmentType = 'scanner';
            
            if (title.includes('sirona')) {
                equipmentType = 'sirona';
            } else if (title.includes('halot')) {
                equipmentType = 'halot';
            } else if (title.includes('сканер')) {
                equipmentType = 'scanner';
            } else if (title.includes('cad') || title.includes('cam')) {
                equipmentType = 'cad-cam';
            } else if (title.includes('пескоструй')) {
                equipmentType = 'sandblaster';
            }
            
            updateScannerInfo(equipmentType);
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.before-after-slider');
    const beforeImage = document.querySelector('.before-image');
    const afterImage = document.querySelector('.after-image');
    const sliderHandle = document.querySelector('.slider-handle');
    const leftArrow = document.querySelector('.nav-arrow-left');
    const rightArrow = document.querySelector('.nav-arrow-right');
    
    const imageSets = [
        { before: 'images/work/1.jpg', after: 'images/work/11.jpg' },
        { before: 'images/work/2.jpg', after: 'images/work/22.jpg' },
        { before: 'images/work/3.jpg', after: 'images/work/33.jpg' }
    ];
    
    let currentImageSet = 0;
    
    function changeImageSet(direction) {
        if (direction === 'left') {
            currentImageSet = (currentImageSet - 1 + imageSets.length) % imageSets.length;
        } else if (direction === 'right') {
            currentImageSet = (currentImageSet + 1) % imageSets.length;
        }
        
        const newSet = imageSets[currentImageSet];
        beforeImage.src = newSet.before;
        afterImage.src = newSet.after;
        
        updateSlider(50);
    }
    
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
        
        beforeImage.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
        sliderHandle.style.left = percentage + '%';
    }
    
    function getPosition(e) {
        const rect = slider.getBoundingClientRect();
        const x = e.clientX - rect.left;
        return (x / rect.width) * 100;
    }
    
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
    
    updateSlider(50);
});