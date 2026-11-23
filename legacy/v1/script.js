/**
 * IronWorks Gym — Interactive Demo
 * SPManchester Private Limited · https://www.spmanchester.com
 * MIT License · Copyright © 2026 SPManchester Private Limited
 *
 * Architecture (as built):
 *   - Timetable: CLASSES array → renderTT() with composable day + category filters
 *   - Form handling: data-demo attribute → named handler functions
 *   - Confirmation: showResult() + refCode() helpers
 *   - Mobile nav: toggle with aria-expanded
 *   - Zero external dependencies; no network requests beyond the three page files
 */

'use strict';

/* ═══════════════════════════════════════════════════════════════
   1. DATA
═══════════════════════════════════════════════════════════════ */

/**
 * CLASSES — the single source of truth for the weekly timetable.
 * Each row: [Day, Time, Class Name, Coach, Category]
 * To update the timetable, edit this array only — the UI rebuilds automatically.
 * @type {Array<[string, string, string, string, string]>}
 */
const CLASSES = [
  // Monday
  ['Mon', '06:30', 'Strength Foundations',       'Coach Dee',   'Strength'],
  ['Mon', '12:15', 'Lunch Express HIIT',          'Coach Marco', 'HIIT'],
  ['Mon', '18:00', 'Olympic Lifting',             'Coach Dee',   'Strength'],
  // Tuesday
  ['Tue', '07:00', 'Engine Room Conditioning',    'Coach Marco', 'Conditioning'],
  ['Tue', '17:45', 'Yoga for Lifters',            'Coach Ana',   'Mobility'],
  ['Tue', '19:00', 'Boxing Fundamentals',         'Coach Jay',   'Combat'],
  // Wednesday
  ['Wed', '06:30', 'Strength Foundations',       'Coach Dee',   'Strength'],
  ['Wed', '12:15', 'Lunch Express HIIT',          'Coach Marco', 'HIIT'],
  ['Wed', '18:30', 'Sprint Intervals',            'Coach Ana',   'Conditioning'],
  // Thursday
  ['Thu', '07:00', 'Olympic Lifting',             'Coach Dee',   'Strength'],
  ['Thu', '17:45', 'Mobility & Core',             'Coach Ana',   'Mobility'],
  ['Thu', '19:00', 'Boxing Fundamentals',         'Coach Jay',   'Combat'],
  // Friday
  ['Fri', '06:30', 'Engine Room Conditioning',    'Coach Marco', 'Conditioning'],
  ['Fri', '17:30', 'Friday Fight Club (sparring)','Coach Jay',   'Combat'],
  // Saturday
  ['Sat', '09:00', 'Weekend Warrior WOD',         'All coaches', 'Conditioning'],
  ['Sat', '10:30', 'Yoga for Lifters',            'Coach Ana',   'Mobility'],
  // Sunday
  ['Sun', '10:00', 'Long Slow Strength',          'Coach Dee',   'Strength'],
  ['Sun', '11:30', 'Open Mat Mobility',           'Coach Ana',   'Mobility'],
];

/** Filter state — mutated by chip buttons */
let activeDay = 'All';
let activeCat = 'All';

const DAYS       = ['All', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const CATEGORIES = ['All', 'Strength', 'HIIT', 'Conditioning', 'Mobility', 'Combat'];

/** CSS class names for category badges */
const CAT_BADGE_CLASS = {
  Strength:     'cat-badge--strength',
  HIIT:         'cat-badge--hiit',
  Conditioning: 'cat-badge--conditioning',
  Mobility:     'cat-badge--mobility',
  Combat:       'cat-badge--combat',
};

/* ═══════════════════════════════════════════════════════════════
   2. UTILITY HELPERS
═══════════════════════════════════════════════════════════════ */

/**
 * Inject HTML into a result panel and scroll it into view.
 * @param {string} elementId - ID of the result container
 * @param {string} html      - HTML string to inject
 */
function showResult(elementId, html) {
  const el = document.getElementById(elementId);
  if (!el) return;
  el.innerHTML = html;
  el.classList.add('show');
  el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/**
 * Generate a demo reference code (e.g. IW-A3FKP).
 * @param {string} prefix - Prefix for the reference (e.g. 'IW')
 * @returns {string}
 */
function refCode(prefix) {
  const chars = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `${prefix}-${chars}`;
}

/**
 * Escape HTML special characters to prevent XSS in user-reflected values.
 * @param {string} str
 * @returns {string}
 */
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/* ═══════════════════════════════════════════════════════════════
   3. TIMETABLE
═══════════════════════════════════════════════════════════════ */

/**
 * Build a row of filter chip buttons and attach click handlers.
 * @param {string}   containerId  - ID of the chip container element
 * @param {string[]} items        - Array of filter values
 * @param {Function} onSelect     - Called with the selected value
 */
function buildChips(containerId, items, onSelect) {
  const container = document.getElementById(containerId);
  if (!container) return;

  items.forEach((value, index) => {
    const btn = document.createElement('button');
    btn.className = `chip${index === 0 ? ' active' : ''}`;
    btn.textContent = value;
    btn.setAttribute('type', 'button');
    btn.setAttribute('aria-pressed', index === 0 ? 'true' : 'false');

    btn.addEventListener('click', () => {
      // Update aria-pressed and active class across all chips in this group
      container.querySelectorAll('.chip').forEach(c => {
        c.classList.remove('active');
        c.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');

      onSelect(value);
      renderTimetable();
    });

    container.appendChild(btn);
  });
}

/**
 * Render the timetable rows matching the current day + category filters.
 * Updates both the tbody and the count label.
 */
function renderTimetable() {
  const rows = CLASSES.filter(c =>
    (activeDay === 'All' || c[0] === activeDay) &&
    (activeCat === 'All' || c[4] === activeCat)
  );

  const tbody  = document.getElementById('tt-body');
  const countEl = document.getElementById('tt-count');

  if (!tbody) return;

  if (rows.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="5" style="text-align:center; color:var(--muted); font-style:italic;">
          No classes match — try another filter combination.
        </td>
      </tr>`;
  } else {
    tbody.innerHTML = rows.map(c => {
      const badgeClass = CAT_BADGE_CLASS[c[4]] || '';
      return `
        <tr>
          <td><strong>${escapeHtml(c[0])}</strong></td>
          <td>${escapeHtml(c[1])}</td>
          <td><strong>${escapeHtml(c[2])}</strong></td>
          <td>${escapeHtml(c[3])}</td>
          <td><span class="cat-badge ${badgeClass}">${escapeHtml(c[4])}</span></td>
        </tr>`;
    }).join('');
  }

  if (countEl) {
    const noun = rows.length === 1 ? 'class' : 'classes';
    countEl.textContent = `${rows.length} ${noun} shown`;
  }
}

/* ═══════════════════════════════════════════════════════════════
   4. FORM HANDLING
═══════════════════════════════════════════════════════════════ */

/**
 * Delegate form submissions to the named handler on window.
 * Forms use `data-demo="handlerName"` to declare their handler.
 */
document.querySelectorAll('form[data-demo]').forEach(form => {
  form.addEventListener('submit', event => {
    event.preventDefault();
    const handlerName = form.dataset.demo;
    const handler = window[handlerName];
    if (typeof handler === 'function') {
      handler(new FormData(form), form);
    } else {
      console.warn(`[IronWorks] No demo handler found for: "${handlerName}"`);
    }
  });
});

/**
 * Gym membership joining flow.
 * Echoes the user's selections with a generated member reference.
 * Demo only — no data is transmitted, stored, or charged.
 * @param {FormData} fd   - Submitted form data
 * @param {HTMLFormElement} form
 */
window.joinGym = function (fd, form) {
  const name  = escapeHtml(fd.get('name')  || '');
  const email = escapeHtml(fd.get('email') || '');
  const plan  = escapeHtml(fd.get('plan')  || '');
  const start = escapeHtml(fd.get('start') || '');

  if (!name || !email || !plan || !start) {
    showResult('gym-result', `
      <strong>⚠️ Please complete all required fields before submitting.</strong>
    `);
    return;
  }

  const ref = refCode('IW');

  showResult('gym-result', `
    <strong>✅ Membership started — demo confirmation</strong><br>
    Welcome to IronWorks, <strong>${name}</strong>!<br>
    <strong>Plan:</strong> ${plan}<br>
    <strong>Start date:</strong> ${start}<br>
    <strong>Member reference:</strong> <code>${ref}</code><br>
    <br>
    <em>In a live build, your access QR code would be emailed to ${email}
    and your Direct Debit collected automatically.
    <strong>Demo only — no payment taken, no data stored.</strong></em>
  `);

  // Reset form after successful demo confirmation
  form.reset();
};

/* ═══════════════════════════════════════════════════════════════
   5. MOBILE NAVIGATION
═══════════════════════════════════════════════════════════════ */

(function initMobileNav() {
  const toggle  = document.querySelector('.nav-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  if (!toggle || !mobileNav) return;

  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!isOpen));
    mobileNav.hidden = isOpen;
  });

  // Close mobile nav when a link is tapped
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      toggle.setAttribute('aria-expanded', 'false');
      mobileNav.hidden = true;
    });
  });
}());

/* ═══════════════════════════════════════════════════════════════
   6. INITIALISE
═══════════════════════════════════════════════════════════════ */

// Set default start date to today (improves UX on the join form)
(function setDefaultStartDate() {
  const startInput = document.getElementById('join-start');
  if (startInput) {
    startInput.valueAsDate = new Date();
  }
}());

// Build filter chips
buildChips('day-chips', DAYS,       v => { activeDay = v; });
buildChips('cat-chips', CATEGORIES, v => { activeCat = v; });

// Initial render
renderTimetable();
