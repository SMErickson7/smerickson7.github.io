// Click (or Enter/Space) on an image in a blog post to see it full size in a modal.
// Uses a native <dialog>, so Esc closes it and focus returns to the image on its own.
(function () {
  var images = document.querySelectorAll('.post .prose img');
  if (!images.length || typeof HTMLDialogElement !== 'function') return;

  var dialog = document.createElement('dialog');
  dialog.className = 'lightbox';
  dialog.setAttribute('aria-label', 'Enlarged image');
  dialog.innerHTML =
    '<button class="lightbox__close" type="button" aria-label="Close">×</button>' +
    '<img class="lightbox__img" alt="">';
  document.body.appendChild(dialog);
  var big = dialog.querySelector('.lightbox__img');

  function open(img) {
    big.src = img.currentSrc || img.src;
    big.alt = img.alt;
    dialog.showModal();
  }

  images.forEach(function (img) {
    img.classList.add('zoomable');
    img.setAttribute('tabindex', '0');
    img.setAttribute('role', 'button');
    img.setAttribute('aria-label', 'Enlarge image: ' + img.alt);
    img.addEventListener('click', function () { open(img); });
    img.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        open(img);
      }
    });
  });

  // Any click closes it: the image, the close button or the dark backdrop.
  dialog.addEventListener('click', function () { dialog.close(); });
  dialog.addEventListener('close', function () { big.removeAttribute('src'); });
})();
