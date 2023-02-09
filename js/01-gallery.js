import { galleryItems } from './gallery-items.js';
// Change code below this line

const refs = {
  galleryContainer: document.querySelector('.gallery'),
};

const markup = galleryItems
  .map(
    item => `<div class="gallery__item">
  <a class="gallery__link" href="${item.original}">
    <img
      class="gallery__image"
      src="${item.preview}"
      data-source="${item.original}"
      alt="${item.description}"
    />
  </a>
</div>`
  )
  .join('');

refs.galleryContainer.insertAdjacentHTML('beforeend', markup);

refs.galleryContainer.addEventListener('click', onImageClick);

function onImageClick(e) {
  e.preventDefault();

  if (e.target.nodeName !== 'IMG') return;

  const selectedImgLink = e.target.dataset.source;
  //   const selectedImgDescr = e.target.alt;
  //   console.log(`click on "${selectedImgDescr}"\n link: ${selectedImgLink}`);

  const modal = basicLightbox.create(
    `
      <div class="modal">
      <img src="${selectedImgLink}" width="800" height="600">
      </div>
      `,
    {
      onShow: modal => {
        document.addEventListener('keydown', onEsc);
      },
      onClose: modal => {
        document.removeEventListener('keydown', onEsc);
      },
    }
  );

  showModal();

  function showModal() {
    modal.show();
  }

  function onEsc(e) {
    // console.log(`Key ${e.key}`);
    // console.log(`KeyCode ${e.code}`);
    if (e.code === 'Escape') {
      modal.close();
    }
  }
}
