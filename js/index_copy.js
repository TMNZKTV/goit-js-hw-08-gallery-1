import galleryItems from './gallery-items.js';

const refs = {
  lightbox: document.querySelector('.lightbox'),
  gallery: document.querySelector('.gallery'),
  btnCloseLightbox: document.querySelector(
    'button[data-action="close-lightbox"]',
  ),
  lightboxOverlay: document.querySelector('.lightbox__overlay'),
  lightboxImage: document.querySelector('.lightbox__image'),
  lightboxContent: document.querySelector('.lightbox__content'),
};

let counterImg = '';
galleryItems.forEach(
  (item, i) =>
    (counterImg += `<li class="gallery__item">
    <a
      class="gallery__link"
      href="${item.original}"
    >
      <img
        class="gallery__image"
        src="${item.preview}"
        data-source="${item.original}"
        data-index="${i}"
        alt="${item.description}"
      />
    </a>
  </li>`),
);

const createBtn = () => {
  const btnLeft = document.createElement('button');
  const btnRight = document.createElement('button');
  btnLeft.type = 'button';
  btnRight.type = 'button';
  btnLeft.classList.add('lightbox__btn--left', 'lightbox__btn');
  btnRight.classList.add('lightbox__btn--right', 'lightbox__btn');

  refs.lightboxContent.append(btnLeft, btnRight);
};

refs.gallery.insertAdjacentHTML('beforeend', counterImg);
createBtn();

const btnLeftEl = document.querySelector('.lightbox__btn--left');
const btnRightEl = document.querySelector('.lightbox__btn--right');

const openModalHandler = event => {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') {
    return;
  }

  const currentImg = event.target;
  refs.lightbox.classList.add('is-open');
  changeAtribute(currentImg);

  refs.btnCloseLightbox.addEventListener('click', closeModalHandler);
  refs.lightboxOverlay.addEventListener('click', closeOverlayHandler);
  btnRightEl.addEventListener('click', clickBtnHandler);
  btnLeftEl.addEventListener('click', clickBtnHandler);
  window.addEventListener('keydown', closeEscHandler);
  window.addEventListener('keydown', downArrowHandler);
};

refs.gallery.addEventListener('click', openModalHandler);

const changeAtribute = item => {
  refs.lightboxImage.src = item.dataset.source;
  refs.lightboxImage.alt = item.alt;
  refs.lightboxImage.dataset.index = item.dataset.index;
};

const closeModalHandler = () => {
  refs.lightbox.classList.remove('is-open');
  refs.lightboxImage.src = '';
};

const closeOverlayHandler = event => {
  if (event.target === event.currentTarget) {
    closeModalHandler();
  }
};

const closeEscHandler = event => {
  if (event.code === 'Escape') {
    closeModalHandler();
  }
};

const nextImg = i => {
  if (i < 0) {
    i = refs.gallery.children.length - 1;
  }
  if (i > refs.gallery.children.length - 1) {
    i = 0;
  }

  const nextImg = document.querySelector(`img[data-index='${i}']`);
  changeAtribute(nextImg);
};

const downArrowHandler = event => {
  const currentIdx = +refs.lightboxImage.dataset.index;
  if (event.code === 'ArrowLeft') {
    nextImg(currentIdx - 1);
  }
  if (event.code === 'ArrowRight') {
    nextImg(currentIdx + 1);
  }
};

const clickBtnHandler = event => {
  const currentIdx = +refs.lightboxImage.dataset.index;
  if (event.target.classList.contains('lightbox__btn--left')) {
    nextImg(currentIdx - 1);
  }
  if (event.target.classList.contains('lightbox__btn--right')) {
    nextImg(currentIdx + 1);
  }
};
