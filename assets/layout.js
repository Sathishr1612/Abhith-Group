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

        <button class="navbar-toggler border-0 shadow-none" type="button" data-bs-toggle="collapse"
          data-bs-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false"
          aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

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
                        ${megaItem('facility-management-support.html', 'bi-tools', 'Facility Management')}
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
              <a class="nav-link-custom nav-link" href="index.html#presence">Geographical Presence</a>
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

          <div class="d-flex align-items-center gap-3 ms-lg-3 mt-3 mt-lg-0">
            <a href="contact.html#enquiry" class="btn-custom btn-custom-gold w-100 w-lg-auto">
              REQUEST A QUOTE
              ${arrowSvg}
            </a>
          </div>
        </div>

      </div>
    </nav>
  </header>`;
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
          <a href="privacy-policy.html" class="text-white-50 text-decoration-none">Privacy Policy</a>
          <span class="text-white-50">|</span>
          <a href="terms-of-use.html" class="text-white-50 text-decoration-none">Terms of Use</a>
          <div class="back-to-top-btn" id="backToTopBtn" title="Back to Top" role="button" tabindex="0" aria-label="Back to top">
            <i class="bi bi-arrow-up"></i>
          </div>
        </div>
      </div>

    </div>
  </footer>`;
  }

  window.AbhithLayout = {
    contact: CONTACT,
    render(part) {
      const target = document.currentScript;
      const page = document.body ? document.body.getAttribute('data-page') : '';
      const html = part === 'header' ? header(page) : footer();
      target.insertAdjacentHTML('beforebegin', html);
    }
  };
})();
