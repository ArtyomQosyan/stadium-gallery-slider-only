'use strict';

const slider = document.getElementById('stadium-slider');
const list = document.getElementById('slides');
const status = document.getElementById('status');

function createSlide(item) {
  const slide = document.createElement('li');
  slide.className = 'splide__slide';

  const image = document.createElement('img');
  image.src = item.image;
  image.alt = item.title;
  image.loading = 'lazy';
  slide.append(image);

  const content = document.createElement('div');
  content.className = 'slide-content';

  const title = document.createElement('h2');
  title.textContent = item.title;
  const description = document.createElement('p');
  description.textContent = item.description;

  content.append(title, description);
  slide.append(content);
  return slide;
}

async function init() {
  try {
    const response = await fetch('./slides.json');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const items = await response.json();
    if (!Array.isArray(items) || !items.length || !items.every(item =>
      item && typeof item.image === 'string' &&
      typeof item.title === 'string' && typeof item.description === 'string'
    )) throw new Error('Invalid slides.json');

    const fragment = document.createDocumentFragment();
    items.forEach(item => fragment.append(createSlide(item)));
    list.append(fragment);

    status.hidden = true;
    slider.hidden = false;
    new Splide(slider, {
      type: 'loop',
      perPage: 3,
      perMove: 1,
      gap: '24px',
      padding: '6%',
      pagination: true,
      arrows: true,
      breakpoints: {
        900: { perPage: 2, padding: '4%', gap: '16px' },
        600: { perPage: 1, padding: '12%', gap: '12px' },
      },
    }).mount();
  } catch (error) {
    console.error('Failed to load slider:', error);
    status.textContent = 'სლაიდერი ვერ ჩაიტვირთა. გამოიყენე Live Server და შეამოწმე slides.json.';
  }
}

init();
