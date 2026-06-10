const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.snapshot-card, .interest-card, .timeline-item, .publication, .conference-block, .recognition-card, .skill-block, .gallery-item, .contact-card, .contact-form').forEach((element) => {
  element.style.opacity = '0';
  element.style.transform = 'translateY(16px)';
  element.style.transition = 'opacity 500ms ease, transform 500ms ease';
  observer.observe(element);
});

const animationStyle = document.createElement('style');
animationStyle.textContent = `.is-visible { opacity: 1 !important; transform: translateY(0) !important; }`;
document.head.appendChild(animationStyle);

const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.getAttribute('data-filter');

    filterButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');

    galleryItems.forEach((item) => {
      const category = item.getAttribute('data-category');
      item.style.display = (filter === 'all' || category === filter) ? 'block' : 'none';
    });
  });
});

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const closeLightbox = document.querySelector('.lightbox-close');
const prevButton = document.querySelector('.lightbox-prev');
const nextButton = document.querySelector('.lightbox-next');

let visibleImages = [];
let currentImageIndex = 0;

function getVisibleImages() {
  return Array.from(document.querySelectorAll('.gallery-item'))
    .filter((item) => item.style.display !== 'none')
    .map((item) => item.querySelector('img'));
}

function showImage(index) {
  if (!visibleImages.length) return;
  currentImageIndex = (index + visibleImages.length) % visibleImages.length;
  const image = visibleImages[currentImageIndex];
  lightboxImg.src = image.src;
  lightboxImg.alt = image.alt;
  lightboxCaption.textContent = image.dataset.caption || image.alt;
}

function openLightbox(clickedImage) {
  visibleImages = getVisibleImages();
  const index = visibleImages.indexOf(clickedImage);
  showImage(index >= 0 ? index : 0);
  lightbox.classList.add('active');
  lightbox.setAttribute('aria-hidden', 'false');
}

function closeGalleryLightbox() {
  lightbox.classList.remove('active');
  lightbox.setAttribute('aria-hidden', 'true');
}

galleryItems.forEach((item) => {
  item.addEventListener('click', () => openLightbox(item.querySelector('img')));
});

if (nextButton) nextButton.addEventListener('click', () => showImage(currentImageIndex + 1));
if (prevButton) prevButton.addEventListener('click', () => showImage(currentImageIndex - 1));
if (closeLightbox) closeLightbox.addEventListener('click', closeGalleryLightbox);

if (lightbox) {
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) closeGalleryLightbox();
  });
}

document.addEventListener('keydown', (event) => {
  if (!lightbox || !lightbox.classList.contains('active')) return;
  if (event.key === 'Escape') closeGalleryLightbox();
  if (event.key === 'ArrowRight') showImage(currentImageIndex + 1);
  if (event.key === 'ArrowLeft') showImage(currentImageIndex - 1);
});

const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    const accessKey = contactForm.querySelector('input[name="access_key"]')?.value || '';
    if (accessKey.includes('PASTE_YOUR_WEB3FORMS_ACCESS_KEY_HERE')) {
      event.preventDefault();
      alert('Before publishing, replace the Web3Forms access key placeholder in index.html. Until then, use the clickable email link.');
    }
  });
}
