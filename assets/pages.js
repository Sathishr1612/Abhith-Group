/* ==========================================================================
   ABHITH MANPOWER SERVICES - INNER PAGE INTERACTIONS
   Lightbox, gallery filters and the contact / quote form.
   Vanilla JS + Bootstrap 5 (bundle already loaded on every page).
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Back-to-top button is a div, so make it keyboard accessible too
  const backToTopBtn = document.getElementById('backToTopBtn');
  backToTopBtn?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });

  initLightbox();
  initGalleryFilters();
  initEnquiryForm();
});

/* --- 1. Lightbox: any <a data-lightbox="group" href="media"> --- */
function initLightbox() {
  const triggers = Array.from(document.querySelectorAll('[data-lightbox]'));
  if (!triggers.length || typeof bootstrap === 'undefined') return;

  document.body.insertAdjacentHTML('beforeend', `
    <div class="modal fade pg-lightbox" id="pgLightbox" tabindex="-1" aria-label="Media viewer" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-xl">
        <div class="modal-content">
          <div class="modal-body flex-column">
            <div class="pg-lightbox-media" id="pgLightboxMedia"></div>
            <div class="pg-lightbox-caption" id="pgLightboxCaption"></div>
          </div>
        </div>
      </div>
      <button type="button" class="pg-lightbox-close" data-bs-dismiss="modal" aria-label="Close"><i class="bi bi-x-lg"></i></button>
      <button type="button" class="pg-lightbox-nav prev" aria-label="Previous"><i class="bi bi-chevron-left"></i></button>
      <button type="button" class="pg-lightbox-nav next" aria-label="Next"><i class="bi bi-chevron-right"></i></button>
    </div>`);

  const modalEl = document.getElementById('pgLightbox');
  const modal = new bootstrap.Modal(modalEl);
  const mediaBox = document.getElementById('pgLightboxMedia');
  const captionBox = document.getElementById('pgLightboxCaption');
  const prevBtn = modalEl.querySelector('.pg-lightbox-nav.prev');
  const nextBtn = modalEl.querySelector('.pg-lightbox-nav.next');
  let group = [];
  let index = 0;

  const isVideo = (src) => /\.(mp4|webm|mov)(#.*)?$/i.test(src);

  function show(i) {
    index = (i + group.length) % group.length;
    const item = group[index];
    const src = item.getAttribute('href');
    const caption = item.getAttribute('data-caption') || '';
    mediaBox.innerHTML = isVideo(src)
      ? `<video src="${src}" controls autoplay playsinline></video>`
      : `<img src="${src}" alt="${caption.replace(/"/g, '&quot;')}">`;
    captionBox.textContent = caption;
    const multi = group.length > 1;
    prevBtn.style.display = multi ? '' : 'none';
    nextBtn.style.display = multi ? '' : 'none';
  }

  triggers.forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const name = el.getAttribute('data-lightbox');
      group = Array.from(document.querySelectorAll(`[data-lightbox="${name}"]`))
        .filter((g) => !g.classList.contains('is-hidden'));
      show(group.indexOf(el));
      modal.show();
    });
  });

  prevBtn.addEventListener('click', () => show(index - 1));
  nextBtn.addEventListener('click', () => show(index + 1));

  modalEl.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') show(index - 1);
    if (e.key === 'ArrowRight') show(index + 1);
  });

  // Stop any playing video when the viewer closes
  modalEl.addEventListener('hidden.bs.modal', () => {
    mediaBox.innerHTML = '';
  });
}

/* --- 2. Gallery category filters --- */
function initGalleryFilters() {
  const buttons = document.querySelectorAll('.pg-filter-btn');
  const items = document.querySelectorAll('.pg-gallery-item');
  if (!buttons.length) return;

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');
      buttons.forEach((b) => {
        b.classList.toggle('active', b === btn);
        b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
      });
      items.forEach((item) => {
        const match = filter === 'all' || item.getAttribute('data-category') === filter;
        item.classList.toggle('is-hidden', !match);
      });
    });
  });
}

/* --- 3. Contact / quote form --- */
function initEnquiryForm() {
  const form = document.getElementById('enquiryForm');
  if (!form) return;

  // Pre-select a service passed from a CTA: contact.html?service=PSO%20Services#enquiry
  const requested = new URLSearchParams(window.location.search).get('service');
  const select = form.querySelector('#enqService');
  if (requested && select) {
    const option = Array.from(select.options).find((o) => o.value === requested);
    if (option) select.value = option.value;
  }

  const status = document.getElementById('enquiryStatus');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      form.querySelector(':invalid')?.focus();
      return;
    }

    const data = Object.fromEntries(new FormData(form).entries());
    const subject = `Website Enquiry – ${data.service} – ${data.company}`;
    const body = [
      `Full Name: ${data.name}`,
      `Company / Organization: ${data.company}`,
      `Phone Number: ${data.phone}`,
      `Email Address: ${data.email}`,
      `Location / City: ${data.location}`,
      `Services Required: ${data.service}`,
      '',
      'Message:',
      data.message
    ].join('\n');

    const to = (window.AbhithLayout && window.AbhithLayout.contact.emails[0]) || 'abhithservices@gmail.com';
    window.location.href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    if (status) {
      status.classList.remove('d-none');
      status.focus();
    }
    form.classList.remove('was-validated');
  });
}
