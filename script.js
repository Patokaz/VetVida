//heropage
document.querySelectorAll('.hero-slider').forEach(sliderSection => {
  const slidesContainer = sliderSection.querySelector('.slides');
  const slides = sliderSection.querySelectorAll('.slide');
  const nextBtn = sliderSection.querySelector('.next');
  const prevBtn = sliderSection.querySelector('.prev');

  let index = 0;
  let currentTranslate = 0;
  let previousTranslate = 0;
  let animationID;
  let slideWidth = slides[0].clientWidth;
  let isDragging = false;
  let startX = 0;

  function updateSlider() {
    currentTranslate = -index * slideWidth;
    previousTranslate = currentTranslate;
    slidesContainer.style.transition = 'transform 0.6s ease-in-out';
    slidesContainer.style.transform = `translateX(${currentTranslate}px)`;
    slidesContainer.addEventListener('transitionend', () => {
      slidesContainer.style.transition = 'none';
    });
  }

  // BotÃµes
  nextBtn.addEventListener('click', () => {
    index = (index + 1) % slides.length;
    updateSlider();
  });

  prevBtn.addEventListener('click', () => {
    index = (index - 1 + slides.length) % slides.length;
    updateSlider();
  });

  // Auto-play
  setInterval(() => {
    index = (index + 1) % slides.length;
    updateSlider();
  }, 5000);

  // Drag & touch
  function setSliderDragging(active) {
    slidesContainer.style.cursor = active ? 'grabbing' : 'grab';
    slidesContainer.style.userSelect = active ? 'none' : 'auto';
  }

  function touchStart(i) {
    return function (event) {
      isDragging = true;
      startX = getPositionX(event);
      animationID = requestAnimationFrame(animation);
      setSliderDragging(true);
    };
  }

  function touchMove(event) {
    if (!isDragging) return;
    const currentX = getPositionX(event);
    const deltaX = currentX - startX;
    currentTranslate = previousTranslate + deltaX;
  }

  function touchEnd() {
    cancelAnimationFrame(animationID);
    isDragging = false;
    const movedBy = currentTranslate - previousTranslate;

    if (movedBy < -slideWidth / 4 && index < slides.length - 1) {
      index++;
    }
    if (movedBy > slideWidth / 4 && index > 0) {
      index--;
    }

    updateSlider();
    previousTranslate = -index * slideWidth;
    setSliderDragging(false);
  }

  function getPositionX(event) {
    return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
  }

  function animation() {
    setSliderPosition();
    if (isDragging) requestAnimationFrame(animation);
  }

  function setSliderPosition() {
    slidesContainer.style.transform = `translateX(${currentTranslate}px)`;
  }

  slides.forEach((slide, i) => {
    slide.addEventListener('mousedown', touchStart(i));
    slide.addEventListener('mousemove', touchMove);
    slide.addEventListener('mouseup', touchEnd);
    slide.addEventListener('mouseleave', () => {
      if (isDragging) touchEnd();
    });

    slide.addEventListener('touchstart', touchStart(i));
    slide.addEventListener('touchmove', touchMove);
    slide.addEventListener('touchend', touchEnd);
  });

});


//container clinica

  const buttons = document.querySelectorAll('.esquerda-clinica button');
  const tabs = document.querySelectorAll('.tab');

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      buttons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      tabs.forEach(tab => tab.classList.remove('active'));
      const targetId = button.getAttribute('data-target');
      document.getElementById(targetId).classList.add('active');
    });
  });

  buttons[0].classList.add('active');
  tabs[0].classList.add('active');



  
  const customSlidesContainer = document.querySelector('.custom-slides');
  const customSlides = document.querySelectorAll('.custom-slide');
  const customTotalSlides = customSlides.length;
  let customIndex = 0;

  function updateCustomSlider() {
    customSlidesContainer.style.transform = `translateX(-${customIndex * 100}%)`;
  }

  document.querySelector('.custom-next').addEventListener('click', () => {
    customIndex = (customIndex + 1) % customTotalSlides;
    updateCustomSlider();
  });

  document.querySelector('.custom-prev').addEventListener('click', () => {
    customIndex = (customIndex - 1 + customTotalSlides) % customTotalSlides;
    updateCustomSlider();
  });

  // Autoplay a cada 3 segundos
  setInterval(() => {
    customIndex = (customIndex + 1) % customTotalSlides;
    updateCustomSlider();
  }, 3000);


  
  const wppButton = document.getElementById("wpp-button");

window.addEventListener("scroll", () => {
  if (window.scrollY > 0) { // aparece depois de rolar 300px
    wppButton.classList.add("visible");
  } else {
    wppButton.classList.remove("visible");
  }
});