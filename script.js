// ==========================================
// MOBILE NAVIGATION
// ==========================================

const menuButton = document.querySelector('#menuButton');
const navLinks = document.querySelector('#navLinks');
const themeButton = document.querySelector('#themeButton');

menuButton?.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');

  menuButton.setAttribute('aria-expanded', String(open));
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks?.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});


// ==========================================
// DARK / LIGHT THEME
// ==========================================

// Remember the user's preferred theme
if (localStorage.getItem('portfolioTheme') === 'light') {
  document.body.classList.add('light-theme');
}

themeButton?.addEventListener('click', () => {
  document.body.classList.toggle('light-theme');

  const theme = document.body.classList.contains('light-theme')
    ? 'light'
    : 'dark';

  localStorage.setItem('portfolioTheme', theme);
});


// ==========================================
// VERTICAL SCROLL PROGRESS BAR
// ==========================================

// Create the progress bar automatically
const progressTrack = document.createElement('div');

progressTrack.className = 'scroll-progress-track';

progressTrack.setAttribute('role', 'progressbar');
progressTrack.setAttribute('aria-label', 'Page scroll progress');
progressTrack.setAttribute('aria-valuemin', '0');
progressTrack.setAttribute('aria-valuemax', '100');

// Create the filling portion
const progressFill = document.createElement('div');

progressFill.className = 'scroll-progress-fill';

progressTrack.appendChild(progressFill);

document.body.appendChild(progressTrack);


// ==========================================
// CALCULATE SCROLL PROGRESS
// ==========================================

let scrollUpdatePending = false;

function updateScrollProgress() {
  const maxScroll = Math.max(
    0,
    document.documentElement.scrollHeight - window.innerHeight
  );

  const percent = maxScroll
    ? Math.min(
        100,
        Math.max(0, (window.scrollY / maxScroll) * 100)
      )
    : 100;

  // Fill the bar according to scroll position
  progressFill.style.transform = `scaleY(${percent / 100})`;

  // Update accessibility information
  progressTrack.setAttribute(
    'aria-valuenow',
    String(Math.round(percent))
  );

  scrollUpdatePending = false;
}


// ==========================================
// HANDLE SCROLLING AND WINDOW RESIZING
// ==========================================

function requestScrollProgressUpdate() {
  if (scrollUpdatePending) return;

  scrollUpdatePending = true;

  requestAnimationFrame(updateScrollProgress);
}

// Update when scrolling
window.addEventListener(
  'scroll',
  requestScrollProgressUpdate,
  { passive: true }
);

// Update when resizing or changing browser zoom
window.addEventListener(
  'resize',
  requestScrollProgressUpdate
);

// Update when the page finishes loading
window.addEventListener(
  'load',
  requestScrollProgressUpdate
);

// Set initial progress
requestScrollProgressUpdate();