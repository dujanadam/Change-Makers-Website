/* ===========================
   CHANGE MAKERS — Main JS
   Navigation, animations, smooth behavior
   =========================== */

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initMenuOverlay();
  initScrollAnimations();
  initFormValidation();
  highlightCurrentPage();
});

/* ===========================
   NAV — scroll state
   =========================== */
function initNav() {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  const update = () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  };
  window.addEventListener('scroll', update, { passive: true });
  update();
}

/* ===========================
   MENU OVERLAY
   =========================== */
function initMenuOverlay() {
  const overlay = document.getElementById('menu-overlay');
  const openBtn  = document.getElementById('menu-open');
  const closeBtn = document.getElementById('menu-close');
  if (!overlay || !openBtn || !closeBtn) return;

  const open = () => {
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  };

  const close = () => {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    openBtn.focus();
  };

  openBtn.addEventListener('click', open);
  closeBtn.addEventListener('click', close);

  /* Close on Escape */
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) close();
  });

  /* Close when a menu link is clicked */
  overlay.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
}

/* ===========================
   FADE-UP SCROLL ANIMATIONS
   =========================== */
function initScrollAnimations() {
  const els = document.querySelectorAll('.fade-up');
  if (!els.length) return;

  const io = new IntersectionObserver(
    entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  els.forEach(el => io.observe(el));
}

/* ===========================
   FORM VALIDATION (apply form)
   =========================== */
function initFormValidation() {
  // Exclude the Google-Forms-linked form — it handles its own submission
  const form = document.querySelector('.application-form:not(#cm-apply-form)');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();

    const requiredFields = form.querySelectorAll('[required]');
    let valid = true;

    requiredFields.forEach(field => {
      const group = field.closest('.form-group');
      const val   = field.value.trim();

      if (!val) {
        valid = false;
        field.style.borderColor = '#E53935';
        if (group) {
          let err = group.querySelector('.form-error');
          if (!err) {
            err = document.createElement('span');
            err.className = 'form-error';
            err.style.cssText = 'color:#E53935;font-size:.8rem;font-weight:700;margin-top:4px;display:block';
            err.textContent = 'This field is required';
            group.appendChild(err);
          }
        }
      } else {
        field.style.borderColor = '';
        group?.querySelector('.form-error')?.remove();
      }
    });

    if (valid) {
      showSuccessMessage(form);
    } else {
      const firstError = form.querySelector('[style*="E53935"]');
      firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });

  /* Clear error on input */
  form.querySelectorAll('[required]').forEach(field => {
    field.addEventListener('input', () => {
      field.style.borderColor = '';
      field.closest('.form-group')?.querySelector('.form-error')?.remove();
    });
  });
}

function showSuccessMessage(form) {
  form.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
  form.style.opacity = '0';
  form.style.transform = 'scale(0.97)';

  setTimeout(() => {
    const success = document.createElement('div');
    success.style.cssText = `
      text-align: center;
      padding: 60px 40px;
      background: #E8F9ED;
      border-radius: 20px;
      border: 2px solid #3DCC52;
      animation: fadeIn 0.5s ease forwards;
    `;
    success.innerHTML = `
      <div style="font-size:4rem;margin-bottom:20px">🌱</div>
      <div style="font-family:'Fredoka One',cursive;font-size:2rem;color:#1A7028;margin-bottom:12px">
        Application Received!
      </div>
      <p style="color:#4B5563;line-height:1.7;max-width:400px;margin:0 auto;font-family:'Nunito',sans-serif;font-size:1rem;font-weight:600">
        Thank you for applying to Change Makers. We'll be in touch within a few days to let you know next steps. Get ready to make a difference.
      </p>
    `;
    form.parentNode.replaceChild(success, form);
  }, 300);
}

/* ===========================
   HIGHLIGHT CURRENT NAV ITEM
   =========================== */
function highlightCurrentPage() {
  const path = window.location.pathname;
  document.querySelectorAll('.menu-overlay nav a').forEach(a => {
    if (a.getAttribute('href') && path.endsWith(a.getAttribute('href'))) {
      a.style.color = 'var(--green)';
    }
  });
}
