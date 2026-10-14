/* ==========================================================================
   ABHITH MANPOWER SERVICES - SHARED LAYOUT (HEADER + FOOTER)
   Single source for the site-wide header and footer.
   Usage (inside <body>):
     <script>AbhithLayout.render('header');</script>
     ...page content...
     <script>AbhithLayout.render('footer');</script>
   The active nav item is taken from <body data-page="...">.
   ========================================================================== */

(function () {
  const CONTACT = {
    phones: ['+91-84539-67564', '+91-70993-00519', '+91-91196-69675'],
    emails: ['abhithservices@gmail.com', 'recruitment.security@abhithgroup.com'],
    social: {
      linkedin: 'https://www.linkedin.com/company/abhith-services-security/',
      facebook: 'https://www.facebook.com/profile.php?id=61579662342986',
      instagram: 'https://www.instagram.com/abhithservices/',
      youtube: 'https://www.youtube.com/@abhithsecurityexperts/featured'
    }
  };

  const tel = (num) => 'tel:' + num.replace(/[^+\d]/g, '');

  const arrowSvg = `<svg class="btn-arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>`;

  const socialLinks = (cls) => `
    <a href="${CONTACT.social.linkedin}" target="_blank" rel="noopener" class="${cls}" aria-label="LinkedIn"><i class="bi bi-linkedin"></i></a>
    <a href="${CONTACT.social.facebook}" target="_blank" rel="noopener" class="${cls}" aria-label="Facebook"><i class="bi bi-facebook"></i></a>
    <a href="${CONTACT.social.instagram}" target="_blank" rel="noopener" class="${cls}" aria-label="Instagram"><i class="bi bi-instagram"></i></a>
    <a href="${CONTACT.social.youtube}" target="_blank" rel="noopener" class="${cls}" aria-label="YouTube"><i class="bi bi-youtube"></i></a>`;

  const megaItem = (href, icon, label) => `
                        <li>
                          <a href="${href}" class="mega-menu-service-link">
                            <span class="service-icon-box">
                              <i class="bi ${icon} service-icon"></i>
                              <span>${label}</span>
                            </span>
                            <i class="bi bi-arrow-right item-arrow"></i>
                          </a>
                        </li>`;

  function header(page) {
    const active = (key) => (page === key ? ' active' : '');
    const servicesActive = page === 'security' || page === 'facility' ? ' active' : '';

    return `
  <header class="header-wrapper" id="headerWrapper">
    <!-- Top slim navy trust strip -->
    <div class="top-trust-bar">
      <div class="container-fluid px-lg-5">
        <div class="d-flex justify-content-between align-items-center">
          <div class="d-flex align-items-center gap-4">
            <span class="trust-badge-pill">
              <i class="bi bi-shield-check"></i> ISO 9001:2015 / PSARA Licensed
            </span>
            <span class="d-none d-md-inline text-light-muted">|</span>
            <span class="d-none d-md-inline">
              <i class="bi bi-headset me-1 text-gold"></i> 24×7 Operational Desk:
              <a href="${tel(CONTACT.phones[0])}" class="text-white"><strong>${CONTACT.phones[0]}</strong></a>
            </span>
          </div>
          <div class="d-flex align-items-center gap-3 gap-lg-4">
            <span class="d-none d-lg-inline top-bar-hubs">
              <i class="bi bi-geo-alt me-1 text-gold"></i> Hubs: Guwahati (HQ) | Noida | Jaipur
            </span>
            <a href="mailto:${CONTACT.emails[0]}" class="text-white text-decoration-none d-none d-sm-inline">
              <i class="bi bi-envelope me-1 text-gold"></i> ${CONTACT.emails[0]}
            </a>
            <span class="d-none d-sm-inline text-light-muted opacity-50">|</span>
            <div class="d-flex align-items-center gap-3 fs-5">
              ${socialLinks('text-decoration-none')}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main White Navbar -->
    <nav class="main-navbar navbar navbar-expand-lg">
      <div class="container-fluid px-lg-5">

        <a class="navbar-brand me-4" href="index.html">
          <img src="assets/images/branding/abhith-manpower-services-logo.png" alt="Abhith Manpower Services Pvt. Ltd." class="header-logo-img">
        </a>

        <!-- Mobile Quick Apply + Hamburger Toggler -->
        <div class="d-flex align-items-center d-lg-none gap-2">
          <button type="button" class="btn-custom btn-custom-apply btn-sm py-2 px-3" data-bs-toggle="modal" data-bs-target="#jobApplyModal" aria-label="Apply for Job">
            <i class="bi bi-briefcase-fill me-1"></i> APPLY NOW
          </button>
          <button class="navbar-toggler border-0 shadow-none" type="button" data-bs-toggle="collapse"
            data-bs-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false"
            aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
        </div>

        <div class="collapse navbar-collapse" id="navbarContent">
          <ul class="navbar-menu navbar-nav mx-auto mb-2 mb-lg-0 align-items-lg-center">
            <li class="nav-item">
              <a class="nav-link-custom nav-link${active('home')}" href="index.html">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link-custom nav-link${active('about')}" href="about.html">About Us</a>
            </li>

            <!-- OUR SERVICES MEGA DROPDOWN -->
            <li class="nav-item dropdown dropdown-mega">
              <a class="nav-link-custom nav-link dropdown-toggle${servicesActive}" href="security-manpower.html" id="servicesDropdown" role="button"
                data-bs-toggle="dropdown" aria-expanded="false">
                Our Services <i class="bi bi-chevron-down ms-1 small text-gold"></i>
              </a>
              <div class="dropdown-menu mega-menu-content shadow-lg" aria-labelledby="servicesDropdown">
                <div class="mega-menu-inner">
                  <div class="row g-4">

                    <!-- COLUMN 1: SECURITY MANPOWER SERVICES -->
                    <div class="col-lg-6 mega-menu-col border-end-lg">
                      <a href="security-manpower.html" class="mega-menu-col-title pg-mega-title-link">
                        <i class="bi bi-shield-lock-fill"></i>
                        <span>SECURITY MANPOWER SERVICES</span>
                      </a>
                      <ul class="mega-menu-list">
                        ${megaItem('pso-armed.html', 'bi-shield-shaded', 'PSO – Armed')}
                        ${megaItem('bouncer-unarmed-bodyguard.html', 'bi-person-badge-fill', 'Bouncer &amp; Unarmed Bodyguard')}
                        ${megaItem('security-guards.html', 'bi-person-vcard-fill', 'Security Guards – Male &amp; Female')}
                      </ul>
                    </div>

                    <!-- COLUMN 2: FACILITY MANAGEMENT -->
                    <div class="col-lg-6 mega-menu-col">
                      <a href="facility-management.html" class="mega-menu-col-title pg-mega-title-link">
                        <i class="bi bi-building-gear"></i>
                        <span>FACILITY MANAGEMENT</span>
                      </a>
                      <ul class="mega-menu-list">
                        ${megaItem('building-manager.html', 'bi-building-fill-gear', 'Building Manager')}
                        ${megaItem('corporate-housekeepers.html', 'bi-houses-fill', 'Corporate Housekeepers')}
                        ${megaItem('professional-drivers.html', 'bi-car-front-fill', 'Professional Drivers')}
                        ${megaItem('janitorial-services.html', 'bi-stars', 'Janitorial Services')}
                      </ul>
                    </div>

                  </div>
                </div>
              </div>
            </li>

            <li class="nav-item">
              <a class="nav-link-custom nav-link${active('industries')}" href="industries-projects.html">Industries &amp; Projects</a>
            </li>
            <li class="nav-item">
              <a class="nav-link-custom nav-link${active('gallery')}" href="gallery.html">Gallery</a>
            </li>
        
            <li class="nav-item">
              <a class="nav-link-custom nav-link" href="index.html#testimonials">Testimonials</a>
            </li>
            <li class="nav-item">
              <a class="nav-link-custom nav-link${active('contact')}" href="contact.html">Contact Us</a>
            </li>
          </ul>

          <div class="header-cta-group d-flex align-items-center gap-2 gap-xl-3 ms-lg-3 mt-3 mt-lg-0">
            <button type="button" class="btn-custom btn-custom-apply header-apply-btn w-100 w-lg-auto" data-bs-toggle="modal" data-bs-target="#jobApplyModal" id="headerApplyBtn">
              <i class="bi bi-briefcase-fill me-1"></i> APPLY NOW
            </button>
            <a href="contact.html#enquiry" class="btn-custom btn-custom-gold w-100 w-lg-auto">
              REQUEST A QUOTE
              ${arrowSvg}
            </a>
          </div>
        </div>

      </div>
    </nav>
  </header>
  ${jobModal()}`;
  }

  function footer() {
    const year = new Date().getFullYear();
    const link = (href, label) => `<li><a href="${href}"><i class="bi bi-chevron-right me-1 text-gold"></i> ${label}</a></li>`;
    const sub = (href, label) => `<li class="ps-2"><a href="${href}">• ${label}</a></li>`;

    return `
  <footer class="footer-section" id="footer">
    <div class="container-fluid px-lg-5">

      <!-- Footer Top CTA Banner -->
      <div class="footer-cta-banner p-4 p-lg-5 mb-5 rounded-3">
        <div class="row align-items-center g-4">
          <div class="col-lg-8">
            <h3 class="footer-cta-title mb-2 text-white fw-bold">
              Need Reliable Manpower or Security Support?
            </h3>
            <p class="text-gold mb-0 small font-heading" style="letter-spacing: 0.05em;">
              We Protect. We are Secure. We Maintain. We Support.
            </p>
          </div>
          <div class="col-lg-4 text-lg-end">
            <a href="contact.html#enquiry" class="btn-custom btn-custom-gold">
              REQUEST A QUOTE
              <svg class="btn-arrow-icon ms-2" style="width: 20px; height: 20px;" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div class="row g-4 g-lg-5 mb-5">

        <!-- Col 1: Brand & Statement -->
        <div class="col-lg-4 col-md-6">
          <div class="footer-logo-box mb-3">
            <a href="index.html"><img src="assets/images/branding/abhith-manpower-services-logo.png" alt="Abhith Manpower Services Pvt. Ltd." class="footer-logo-img"></a>
          </div>
          <p class="footer-brand-desc mb-3">
            Abhith Manpower Services Pvt. Ltd. provides professional security, manpower, housekeeping and facility
            management solutions customized to client requirements.
          </p>
          <div class="footer-tagline-quote">
            WE HELP YOU SLEEP BETTER.
          </div>
        </div>

        <!-- Col 2: QUICK LINKS -->
        <div class="col-lg-2 col-md-6">
          <h4 class="footer-heading">QUICK LINKS</h4>
          <ul class="footer-links-list">
            ${link('index.html', 'Home')}
            ${link('about.html', 'About Us')}
            ${link('security-manpower.html', 'Our Services')}
            ${link('security-manpower.html', 'Security Manpower')}
            ${link('facility-management.html', 'Facility Management')}
            ${link('industries-projects.html', 'Industries &amp; Projects')}
            ${link('gallery.html', 'Gallery')}
            ${link('contact.html', 'Contact Us')}
          </ul>
        </div>

        <!-- Col 3: SERVICES -->
        <div class="col-lg-3 col-md-6">
          <h4 class="footer-heading">SERVICES</h4>
          <ul class="footer-links-list">
            <li><a href="security-manpower.html" class="fw-bold text-gold"><i class="bi bi-shield-check me-1"></i> Security Manpower Services</a></li>
            ${sub('security-guards.html', 'Security Guards')}
            ${sub('pso-armed.html', 'PSO Services')}
            ${sub('bouncer-unarmed-bodyguard.html', 'Bouncers &amp; Bodyguards')}
            <li class="mt-2"><a href="facility-management.html" class="fw-bold text-gold"><i class="bi bi-building-gear me-1"></i> Facility Management</a></li>
            ${sub('building-manager.html', 'Building Management')}
            ${sub('corporate-housekeepers.html', 'Housekeeping')}
            ${sub('professional-drivers.html', 'Drivers')}
            ${sub('facility-management-support.html', 'Facility Management')}
            ${sub('janitorial-services.html', 'Janitorial Services')}
          </ul>
        </div>

        <!-- Col 4: CONTACT -->
        <div class="col-lg-3 col-md-6">
          <h4 class="footer-heading">CONTACT</h4>
          <div class="footer-contact-block small">
            <div class="mb-3 d-flex"><i class="bi bi-geo-alt-fill text-gold me-2"></i>
              <span><strong>Head Office:</strong> 16/34, FC Road, Near Income Tax Office, Uzanbazar, Guwahati – 781001, Assam, India</span></div>
            <div class="mb-3 d-flex"><i class="bi bi-buildings-fill text-gold me-2"></i>
              <span><strong>Other Offices:</strong> Noida (Uttar Pradesh) | Jaipur (Rajasthan)</span></div>
            <div class="mb-3 d-flex"><i class="bi bi-telephone-fill text-gold me-2"></i>
              <span>${CONTACT.phones.map((p) => `<a href="${tel(p)}" class="pg-footer-link">${p}</a>`).join('<br>')}</span></div>
            <div class="mb-3 d-flex"><i class="bi bi-envelope-fill text-gold me-2"></i>
              <span>${CONTACT.emails.map((e) => `<a href="mailto:${e}" class="pg-footer-link">${e}</a>`).join('<br>')}</span></div>

            <div class="d-flex align-items-center flex-wrap gap-2 pt-3 border-top border-secondary border-opacity-25">
              <span class="small me-2 text-white-50">Social Media:</span>
              ${socialLinks('social-icon-link')}
            </div>
          </div>
        </div>

      </div>

      <!-- Bottom Bar -->
      <div class="footer-bottom-bar">
        <div>
          © ${year} Abhith Manpower Services Pvt. Ltd. All Rights Reserved.
        </div>
        <div class="d-flex align-items-center gap-4">
          <a href="terms-of-use.html#privacy" class="text-white-50 text-decoration-none">Privacy Policy</a>
          <span class="text-white-50">|</span>
          <a href="terms-of-use.html#terms" class="text-white-50 text-decoration-none">Terms &amp; Conditions</a>
          <div class="back-to-top-btn" id="backToTopBtn" title="Back to Top" role="button" tabindex="0" aria-label="Back to top">
            <i class="bi bi-arrow-up"></i>
          </div>
        </div>
      </div>

    </div>
  </footer>`;
  }

  function jobModal() {
    return `
  <!-- Simple Job Application Popup Modal -->
  <div class="modal fade job-apply-modal" id="jobApplyModal" tabindex="-1" aria-labelledby="jobApplyModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" style="max-width: 500px;">
      <div class="modal-content shadow-lg border-0 rounded-4 overflow-hidden">
        
        <!-- Header -->
        <div class="modal-header job-modal-header py-3 px-4 d-flex align-items-center justify-content-between">
          <div class="d-flex align-items-center gap-2">
            <div class="job-modal-icon-frame-sm">
              <i class="bi bi-person-badge-fill text-gold"></i>
            </div>
            <div>
              <h5 class="modal-title fw-bold text-white mb-0" id="jobApplyModalLabel">
                Apply for Job &bull; नौकरी हेतु आवेदन
              </h5>
              <p class="text-white-50 small mb-0" style="font-size: 0.76rem;">Abhith Manpower Services Pvt. Ltd.</p>
            </div>
          </div>
          <button type="button" class="btn-close btn-close-white shadow-none" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>

        <!-- Body -->
        <div class="modal-body p-4 bg-white">
          
          <!-- Success Alert Card -->
          <div id="modalJobAlert" class="job-success-card d-none text-center p-4 rounded-3">
            <div class="job-success-icon mb-2"><i class="bi bi-check-lg"></i></div>
            <h5 class="fw-bold text-navy mb-1">आवेदन सफलतापूर्वक जमा हुआ!</h5>
            <p class="text-success fw-bold small mb-2">Application Submitted Successfully!</p>
            <div class="p-2 px-3 bg-white rounded-3 border d-inline-block small text-navy mb-3">
              Reference ID: <strong id="modalJobRefId" class="text-gold-dark">ABH-000000</strong>
            </div>
            <p class="small text-muted mb-3">Our recruitment team will review your application and contact you soon.<br><span class="text-navy">हमारी टीम आपसे जल्द संपर्क करेगी।</span></p>
            <button type="button" class="btn-custom btn-custom-gold btn-sm px-4 py-2 border-0" data-bs-dismiss="modal">
              OK / बंद करें
            </button>
          </div>

          <!-- Simple 5-field Form -->
          <form id="headerJobApplyForm" class="needs-validation" novalidate onsubmit="window.handleHeaderJobSubmit(event)">
            <div class="row g-3">
              
              <!-- Full Name -->
              <div class="col-12">
                <label for="mJobName" class="form-label fw-bold text-navy small mb-1">
                  Full Name / पूरा नाम <span class="text-danger">*</span>
                </label>
                <input type="text" class="form-control py-2" id="mJobName" name="name" placeholder="e.g. Ramesh Kumar" required>
                <div class="invalid-feedback">कृपया अपना नाम लिखें (Enter full name).</div>
              </div>

              <!-- Phone Number -->
              <div class="col-12">
                <label for="mJobPhone" class="form-label fw-bold text-navy small mb-1">
                  Phone Number / मोबाइल नंबर <span class="text-danger">*</span>
                </label>
                <input type="tel" class="form-control py-2" id="mJobPhone" name="phone" placeholder="10-digit number e.g. 9876543210" pattern="[0-9]{10}" required>
                <div class="invalid-feedback">कृपया 10 अंकों का मोबाइल नंबर डालें (10-digit number).</div>
              </div>

              <!-- Job Role -->
              <div class="col-md-6">
                <label for="mJobRole" class="form-label fw-bold text-navy small mb-1">
                  Job Role / पद चुनें <span class="text-danger">*</span>
                </label>
                <select class="form-select py-2" id="mJobRole" name="role" required>
                  <option value="" selected disabled>Select Role / पद चुनें</option>
                  <option value="Security Guard">Security Guard (सुरक्षा गार्ड)</option>
                  <option value="Gunman / PSO">Armed Gunman / PSO (गनमैन)</option>
                  <option value="Bouncer">Bouncer &amp; Bodyguard (बाउंसर)</option>
                  <option value="Security Supervisor">Security Supervisor (सुपरवाइजर)</option>
                  <option value="Housekeeper">Housekeeper (हाउसकीपिंग)</option>
                  <option value="Janitor / Cleaner">Janitorial Cleaner (सफाई कर्मचारी)</option>
                  <option value="Driver">Driver (ड्राइवर)</option>
                  <option value="Building Manager">Building Manager (बिल्डिंग मैनेजर)</option>
                  <option value="Other">Other (अन्य पद)</option>
                </select>
                <div class="invalid-feedback">कृपया पद चुनें (Select role).</div>
              </div>

              <!-- Experience -->
              <div class="col-md-6">
                <label for="mJobExp" class="form-label fw-bold text-navy small mb-1">
                  Experience / अनुभव <span class="text-danger">*</span>
                </label>
                <select class="form-select py-2" id="mJobExp" name="experience" required>
                  <option value="Fresher" selected>Fresher (कोई अनुभव नहीं)</option>
                  <option value="Less than 1 Year">Less than 1 Year (1 साल से कम)</option>
                  <option value="1 to 3 Years">1 to 3 Years (1 से 3 साल)</option>
                  <option value="3+ Years">3+ Years (3 साल से अधिक)</option>
                  <option value="Ex-Servicemen">Ex-Servicemen (पूर्व सैनिक)</option>
                </select>
              </div>

              <!-- Current City -->
              <div class="col-12">
                <label for="mJobCity" class="form-label fw-bold text-navy small mb-1">
                  City / Location / आपका शहर <span class="text-danger">*</span>
                </label>
                <input type="text" class="form-control py-2" id="mJobCity" name="city" placeholder="e.g. Guwahati, Noida, Delhi NCR, Jaipur..." required>
                <div class="invalid-feedback">कृपया अपना शहर लिखें (Enter city).</div>
              </div>

              <!-- Submit Button -->
              <div class="col-12 pt-2">
                <button type="submit" id="mJobSubmitBtn" class="btn-custom btn-custom-gold w-100 py-2 border-0 fw-bold">
                  SUBMIT APPLICATION / आवेदन जमा करें
                </button>
              </div>

            </div>
          </form>

        </div>
      </div>
    </div>
  </div>`;
  }

  window.AbhithLayout = {
    contact: CONTACT,
    render(part) {
      const target = document.currentScript;
      const page = document.body ? document.body.getAttribute('data-page') : '';
      const html = part === 'header' ? header(page) : footer();
      target.insertAdjacentHTML('beforebegin', html);
      if (part === 'header') trackHeaderHeight();
    }
  };

  // Expose the fixed header's real height as --header-h so page banners can
  // start exactly below it at every screen size (no gap, nothing hidden).
  function trackHeaderHeight() {
    const el = document.getElementById('headerWrapper');
    if (!el) return;
    const update = () => document.documentElement.style.setProperty('--header-h', el.offsetHeight + 'px');
    update();
    if ('ResizeObserver' in window) new ResizeObserver(update).observe(el);
    window.addEventListener('load', update);
  }

  // Global helper to open the Job Application modal programmatically or pre-select role
  window.openJobApplyModal = function (roleName) {
    const modalEl = document.getElementById('jobApplyModal');
    if (!modalEl) return;

    if (roleName) {
      const roleSelect = document.getElementById('mJobRole');
      if (roleSelect) {
        for (let i = 0; i < roleSelect.options.length; i++) {
          if (roleSelect.options[i].value === roleName || roleSelect.options[i].text.toLowerCase().includes(roleName.split('–')[0].trim().toLowerCase())) {
            roleSelect.selectedIndex = i;
            break;
          }
        }
      }
    }

    if (window.bootstrap && window.bootstrap.Modal) {
      const inst = window.bootstrap.Modal.getOrCreateInstance(modalEl);
      inst.show();
    } else {
      modalEl.classList.add('show');
      modalEl.style.display = 'block';
      document.body.classList.add('modal-open');
    }
  };

  // Global handler for simple job application form submission
  window.handleHeaderJobSubmit = function (e) {
    e.preventDefault();
    const form = document.getElementById('headerJobApplyForm');
    if (!form) return;

    if (!form.checkValidity()) {
      e.stopPropagation();
      form.classList.add('was-validated');
      return;
    }

    const name = form.elements['name'] ? form.elements['name'].value.trim() : '';
    const phone = form.elements['phone'] ? form.elements['phone'].value.trim() : '';
    const role = form.elements['role'] ? form.elements['role'].value : '';
    const exp = form.elements['experience'] ? form.elements['experience'].value : '';
    const city = form.elements['city'] ? form.elements['city'].value.trim() : '';

    const refId = 'ABH-' + Math.floor(100000 + Math.random() * 900000);

    // Save to localStorage for record keeping
    try {
      const records = JSON.parse(localStorage.getItem('abhith_job_applications') || '[]');
      records.push({
        refId,
        name,
        phone,
        role,
        exp,
        city,
        date: new Date().toISOString()
      });
      localStorage.setItem('abhith_job_applications', JSON.stringify(records));
    } catch (err) {
      console.warn('Storage error:', err);
    }

    // Set Ref ID in modal
    const refEl = document.getElementById('modalJobRefId');
    if (refEl) refEl.textContent = refId;

    // Show Success Alert & Hide Form
    const alertBox = document.getElementById('modalJobAlert');
    if (alertBox) alertBox.classList.remove('d-none');
    form.classList.add('d-none');
    form.reset();
    form.classList.remove('was-validated');
  };

  // Wire fallback reset listener on modal close
  document.addEventListener('DOMContentLoaded', function () {
    const modalEl = document.getElementById('jobApplyModal');
    if (modalEl) {
      modalEl.addEventListener('hidden.bs.modal', function () {
        const alertBox = document.getElementById('modalJobAlert');
        const form = document.getElementById('headerJobApplyForm');
        if (alertBox) alertBox.classList.add('d-none');
        if (form) {
          form.classList.remove('d-none');
          form.classList.remove('was-validated');
        }
      });
    }

    // Fallback click listener for buttons targeting #jobApplyModal
    document.addEventListener('click', function (e) {
      const btn = e.target.closest('[data-bs-target="#jobApplyModal"], #headerApplyBtn');
      if (btn && (!window.bootstrap || !window.bootstrap.Modal)) {
        e.preventDefault();
        window.openJobApplyModal();
      }
    });
  });
})();
