// Add imports above this line
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { galleryItems } from './gallery-items';

// Change code below this line
const galleryItemsEl = document.querySelector('.gallery');
const galleryImgAll = createGalleryItems(galleryItems);
const galleryImgEl = document.querySelectorAll('.gallery__image')

galleryItemsEl.insertAdjacentHTML('beforeend', galleryImgAll);

function createGalleryItems(galleryItems) {
    return galleryItems.map(({preview, original, description}) => {
        return `
<li class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      alt="${description}"
    />
  </a>
</li>`
    }).join('');
}
const lightbox = new SimpleLightbox('.gallery a', {
    caption: true,
    captionsData: 'alt',
    captionDelay: 250,
  });


console.log(createGalleryItems(galleryItems));
console.log(galleryItems);

