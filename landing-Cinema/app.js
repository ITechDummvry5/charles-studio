/* ═══════════════════════════════════════
   DATA
═══════════════════════════════════════ */
const ITEMS = [
  {
    title:   "Ocean Horizon",
    genre:   "Adventure",
    desc:    "A lone sailor crosses the Pacific on a bet — and discovers something far greater than the finish line. Stunning visuals, heart-pounding drama.",
    rating:  "★ 8.4",
    year:    "2024",
    runtime: "2h 18m",
    tags:    ["4K", "Adventure", "Drama"],
    img:     "assets/1.jpg",
    trending: true,
  },
  {
    title:   "Desert Bloom",
    genre:   "Thriller",
    desc:    "In the scorching Sonoran Desert, a geologist uncovers an ancient signal buried beneath the sand — and someone is willing to kill to keep it secret.",
    rating:  "★ 7.9",
    year:    "2023",
    runtime: "1h 54m",
    tags:    ["HD", "Thriller", "Mystery"],
    img:     "assets/2.jpg",
    trending: true,
  },
  {
    title:   "Forest Canopy",
    genre:   "Documentary",
    desc:    "High above the Amazon floor, a team of scientists maps an untouched world — a breathtaking portrait of life at 40 metres.",
    rating:  "★ 9.1",
    year:    "2024",
    runtime: "1h 32m",
    tags:    ["4K HDR", "Documentary", "Nature"],
    img:     "assets/3.jpg",
    trending: false,
  },
  {
    title:   "City at Dusk",
    genre:   "Noir",
    desc:    "A disgraced detective takes one last case — a missing heiress in a city that swallows secrets whole. Critically acclaimed noir at its finest.",
    rating:  "★ 8.7",
    year:    "2023",
    runtime: "2h 05m",
    tags:    ["HD", "Noir", "Crime"],
    img:     "assets/4.jpg",
    trending: true,
  },
  {
    title:   "Coral Sands",
    genre:   "Romance",
    desc:    "Two marine biologists clash over conservation — and slowly fall for each other under the warm glow of the tropics. A modern love story.",
    rating:  "★ 7.6",
    year:    "2024",
    runtime: "1h 48m",
    tags:    ["4K", "Romance", "Drama"],
    img:     "assets/5.jpg",
    trending: false,
  },
  {
    title:   "Alpine Mist",
    genre:   "Survival",
    desc:    "Stranded above 4,000 metres in a whiteout storm, a climber must confront the mountain — and her own past — to survive.",
    rating:  "★ 8.2",
    year:    "2023",
    runtime: "2h 01m",
    tags:    ["4K HDR", "Survival", "Action"],
    img:     "assets/6.jpg",
    trending: true,
  },
  {
    title:   "Neon District",
    genre:   "Sci-Fi",
    desc:    "In 2089 Neo-Shanghai, a data courier uncovers a conspiracy that could rewrite human memory itself. Visually astonishing cyberpunk epic.",
    rating:  "★ 8.9",
    year:    "2024",
    runtime: "2h 22m",
    tags:    ["4K HDR", "Sci-Fi", "Action"],
    img:     "assets/7.jpg",
    trending: true,
  },
  {
    title:   "Savannah Echoes",
    genre:   "Drama",
    desc:    "A wildlife photographer returns to the African savannah to confront his past — and finds unexpected beauty in the echoes of life around him.",
    rating:  "★ 8.0",
    year:    "2023",
    runtime: "1h 45m",
    tags:    ["HD", "Drama", "Nature"],
    img:     "assets/8.jpg",
    trending: false,
  },
  {
    title:   "Lunar Reverie",
    genre:   "Fantasy",
    desc:    "In a world where dreams shape reality, a young dreamweaver embarks on a quest to save her city from eternal night. A visually stunning fantasy adventure.",
    rating:  "★ 8.5",
    year:    "2024",
    runtime: "2h 10m",
    tags:    ["4K", "Fantasy", "Adventure"],
    img:     "assets/9.jpg",
    trending: true,
  },
  {
    title:   "Midnight Carnival",
    genre:   "Horror",
    desc:    "When a traveling carnival rolls into town, a group of teens discovers that the attractions are more than they seem — and the night is darker than they imagined.",
    rating:  "★ 7.8",
    year:    "2023",
    runtime: "1h 50m",
    tags:    ["HD", "Horror", "Thriller"],
    img:     "assets/10.jpg",
    trending: false,
  }
];

/* ═══════════════════════════════════════
   CACHE DOM
═══════════════════════════════════════ */
const bgBackdrop   = document.getElementById('bgBackdrop');
const stage        = document.getElementById('stage');
const reflStage    = document.getElementById('reflectionStage');
const dotsEl       = document.getElementById('dots');
const heroMeta     = document.getElementById('heroMeta');
const heroTitle    = document.getElementById('heroTitle');
const heroDesc     = document.getElementById('heroDesc');
const heroBadges   = document.getElementById('heroBadges');
const heroStats    = document.getElementById('heroStats');
const topnav       = document.getElementById('topnav');
const trendingRow  = document.getElementById('trendingRow');
const topRatedRow  = document.getElementById('topRatedRow');
const modalBackdrop = document.getElementById('modalBackdrop');
const modalClose   = document.getElementById('modalClose');
const modalHero    = document.getElementById('modalHero');
const modalTitle   = document.getElementById('modalTitle');
const modalDesc    = document.getElementById('modalDesc');
const modalMeta    = document.getElementById('modalMeta');
const modalBadges  = document.getElementById('modalBadges');
const genreFilters = document.getElementById('genreFilters');

let current = 0;
const n = ITEMS.length;

const cards  = [];
const refls  = [];
const dotEls = [];

/* ─── Preload ─── */
ITEMS.forEach(item => { const img = new Image(); img.src = item.img; });

/* ═══════════════════════════════════════
   COVERFLOW — BUILD
═══════════════════════════════════════ */
ITEMS.forEach((item, i) => {
  /* card */
  const card = document.createElement('div');
  card.className = 'cf-card';
  card.tabIndex = 0;
  card.setAttribute('role', 'tab');
  card.setAttribute('aria-label', item.title);
  card.innerHTML = `
    <div class="cf-card-bg" style="background-image:url('${item.img}');"></div>
    <div class="cf-card-overlay"></div>
    <span class="cf-card-num">${String(i + 1).padStart(2, '0')}</span>
    <div class="cf-card-content">
      <div class="cf-card-genre">${item.genre}</div>
      <div class="cf-card-name">${item.title}</div>
    </div>`;
  card.addEventListener('click', () => goTo(i));
  card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); goTo(i); } });
  stage.appendChild(card);
  cards.push(card);

  /* reflection */
  const refl = document.createElement('div');
  refl.className = 'cf-reflect';
  refl.innerHTML = `<div style="position:absolute;inset:0;background-image:url('${item.img}');background-size:cover;background-position:center;transform:scaleY(-1);transform-origin:top center;"></div>`;
  reflStage.appendChild(refl);
  refls.push(refl);

  /* dot */
  const dot = document.createElement('button');
  dot.className = 'dot';
  dot.setAttribute('role', 'tab');
  dot.setAttribute('aria-label', `Go to ${item.title}`);
  dot.addEventListener('click', () => goTo(i));
  dotsEl.appendChild(dot);
  dotEls.push(dot);
});

/* ═══════════════════════════════════════
   COVERFLOW — LAYOUT CONSTANTS
═══════════════════════════════════════ */
const SPREAD      = 158;
const SIDE_SPREAD = 78;
const ROT_Y       = 52;
const SCALE_1     = 0.75;
const SCALE_2     = 0.57;

/* ═══════════════════════════════════════
   RENDER
═══════════════════════════════════════ */
function render(skipHero) {
  cards.forEach((card, i) => {
    const off  = i - current;
    const abs  = Math.abs(off);
    const sign = Math.sign(off) || 1;
    const isActive = abs === 0;

    let tx, ry, scale, opacity, zIndex;
    if (abs === 0)      { tx = 0;                               ry = 0;                scale = 1;       opacity = 1;    zIndex = 20; }
    else if (abs === 1) { tx = sign * SPREAD;                   ry = -sign * ROT_Y;    scale = SCALE_1; opacity = 0.7;  zIndex = 10; }
    else if (abs === 2) { tx = sign * (SPREAD + SIDE_SPREAD);   ry = -sign * (ROT_Y + 10); scale = SCALE_2; opacity = 0.35; zIndex = 5; }
    else                { tx = sign * (SPREAD + SIDE_SPREAD + 60); ry = -sign * 65;   scale = 0.44;   opacity = 0;    zIndex = 1; }

    card.style.transform     = `translateX(${tx}px) rotateY(${ry}deg) scale(${scale})`;
    card.style.opacity       = opacity;
    card.style.zIndex        = zIndex;
    card.style.pointerEvents = abs <= 2 ? 'auto' : 'none';
    card.classList.toggle('is-active', isActive);
    card.setAttribute('aria-selected', isActive);

    const refl = refls[i];
    refl.style.transform = `translateX(${tx}px) rotateY(${ry}deg) scale(${scale}) scaleY(-0.24)`;
    refl.style.opacity   = isActive ? 0.28 : abs === 1 ? 0.12 : 0;
    refl.style.zIndex    = zIndex;
  });

  dotEls.forEach((d, i) => d.classList.toggle('active', i === current));
  updateBackdrop();
  if (!skipHero) updateHero();
}

/* ═══════════════════════════════════════
   BACKDROP
═══════════════════════════════════════ */
let backdropImg = '';
function updateBackdrop() {
  const newImg = ITEMS[current].img;
  if (newImg === backdropImg) return;
  backdropImg = newImg;
  bgBackdrop.classList.remove('loaded');
  const tmp = new Image();
  tmp.onload = () => {
    bgBackdrop.style.backgroundImage = `url('${newImg}')`;
    bgBackdrop.classList.add('loaded');
  };
  tmp.src = newImg;
}

/* ═══════════════════════════════════════
   HERO
═══════════════════════════════════════ */
function updateHero() {
  heroMeta.classList.add('fading');
  setTimeout(() => {
    const item = ITEMS[current];
    const ratingNum = parseFloat(item.rating.replace('★', '').trim());

    heroBadges.innerHTML =
      `<span class="badge gold">${item.rating}</span>` +
      item.tags.map((t, idx) => `<span class="badge${idx === 0 ? ' accent' : ''}">${t}</span>`).join('');

    heroTitle.textContent = item.title;
    heroDesc.textContent  = item.desc;
    heroStats.innerHTML   = `
      <span class="rating">${item.rating}</span>
      <span class="dot-sep">·</span>
      <span>${item.year}</span>
      <span class="dot-sep">·</span>
      <span>${item.runtime}</span>
      <span class="dot-sep">·</span>
      <span>${item.genre}</span>`;

    heroMeta.classList.remove('fading');
  }, 250);
}

/* ─── Wire "More Info" button to open modal ─── */
document.querySelector('.btn-info').addEventListener('click', () => openModal(ITEMS[current]));

/* ═══════════════════════════════════════
   NAVIGATION
═══════════════════════════════════════ */
function goTo(index) {
  current = ((index % n) + n) % n;
  render();
}
function prev() { goTo(current - 1); }
function next() { goTo(current + 1); }

document.addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft')  { e.preventDefault(); prev(); }
  if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
  if (e.key === 'Escape')     closeModal();
});

/* Touch — scoped to coverflow only so movie rows can scroll freely */
const cfRoot = document.getElementById('coverflow');
let touchX = null;
cfRoot.addEventListener('touchstart', e => { touchX = e.touches[0].clientX; }, { passive: true });
cfRoot.addEventListener('touchend', e => {
  if (touchX === null) return;
  const dx = e.changedTouches[0].clientX - touchX;
  if (dx < -45) next(); else if (dx > 45) prev();
  touchX = null;
});

/* Drag — scoped to coverflow only so movie rows can scroll freely */
let dragX = null;
cfRoot.addEventListener('mousedown', e => { dragX = e.clientX; });
document.addEventListener('mouseup', e => {
  if (dragX === null) return;
  const dx = e.clientX - dragX;
  if (Math.abs(dx) > 60) dx < 0 ? next() : prev();
  dragX = null;
});

/* Auto-play */
let autoTimer = setInterval(next, 5000);
cfRoot.addEventListener('mouseenter', () => clearInterval(autoTimer));
cfRoot.addEventListener('mouseleave', () => {
  clearInterval(autoTimer);
  autoTimer = setInterval(next, 5000);
});

/* ═══════════════════════════════════════
   STICKY NAVBAR
═══════════════════════════════════════ */
window.addEventListener('scroll', () => {
  topnav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* ═══════════════════════════════════════
   BUILD MOVIE ROWS
═══════════════════════════════════════ */
function buildMovieCard(item, rank) {
  const card = document.createElement('div');
  card.className = 'movie-card';
  card.innerHTML = `
    <div class="mc-thumb">
      <div class="mc-img" style="background-image:url('${item.img}');"></div>
      ${rank ? `<span class="mc-rank">#${rank}</span>` : ''}
      <span class="mc-badge-quality">${item.tags[0]}</span>
      <div class="mc-overlay">
        <div class="mc-play-btn"><i class="ti ti-player-play-filled" aria-hidden="true"></i></div>
      </div>
    </div>
    <div class="mc-title">${item.title}</div>
    <div class="mc-meta">
      <span class="rating">${item.rating}</span>
      <span>·</span>
      <span>${item.year}</span>
      <span>·</span>
      <span class="mc-genre-tag">${item.genre}</span>
    </div>`;
  card.addEventListener('click', () => openModal(item));
  return card;
}

function buildTrendingRow(items) {
  trendingRow.innerHTML = '';
  const trending = items.filter(i => i.trending);
  trending.forEach((item, idx) => {
    trendingRow.appendChild(buildMovieCard(item, idx + 1));
  });
}

function buildTopRatedRow(items) {
  topRatedRow.innerHTML = '';
  const sorted = [...items].sort((a, b) => {
    const ra = parseFloat(a.rating.replace('★', '').trim());
    const rb = parseFloat(b.rating.replace('★', '').trim());
    return rb - ra;
  });
  sorted.slice(0, 8).forEach(item => {
    topRatedRow.appendChild(buildMovieCard(item, null));
  });
}

/* ═══════════════════════════════════════
   GENRE FILTER
═══════════════════════════════════════ */
let activeGenre = 'all';

genreFilters.addEventListener('click', e => {
  const pill = e.target.closest('.genre-pill');
  if (!pill) return;
  activeGenre = pill.dataset.genre;
  document.querySelectorAll('.genre-pill').forEach(p => p.classList.remove('active'));
  pill.classList.add('active');
  applyFilter();
});

function applyFilter() {
  const filtered = activeGenre === 'all'
    ? ITEMS
    : ITEMS.filter(i => i.genre === activeGenre || i.tags.includes(activeGenre));
  buildTrendingRow(filtered.length ? filtered : ITEMS);
  buildTopRatedRow(filtered.length ? filtered : ITEMS);
}

/* ═══════════════════════════════════════
   MODAL
═══════════════════════════════════════ */
function openModal(item) {
  modalHero.style.backgroundImage = `url('${item.img}')`;
  modalTitle.textContent = item.title;
  modalDesc.textContent  = item.desc;
  modalMeta.innerHTML    = `
    <span class="rating">${item.rating}</span>
    <span class="dot-sep">·</span>
    <span>${item.year}</span>
    <span class="dot-sep">·</span>
    <span>${item.runtime}</span>
    <span class="dot-sep">·</span>
    <span>${item.genre}</span>`;
  modalBadges.innerHTML  = item.tags
    .map((t, i) => `<span class="badge${i === 0 ? ' accent' : ''}">${t}</span>`).join('');
  modalBackdrop.classList.add('open');
  modalBackdrop.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modalBackdrop.classList.remove('open');
  modalBackdrop.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeModal);
modalBackdrop.addEventListener('click', e => { if (e.target === modalBackdrop) closeModal(); });

/* ═══════════════════════════════════════
   INIT
═══════════════════════════════════════ */
render(true);

/* Set initial hero without animation */
const first = ITEMS[0];
heroBadges.innerHTML =
  `<span class="badge gold">${first.rating}</span>` +
  first.tags.map((t, i) => `<span class="badge${i === 0 ? ' accent' : ''}">${t}</span>`).join('');
heroTitle.textContent = first.title;
heroDesc.textContent  = first.desc;
heroStats.innerHTML   = `
  <span class="rating">${first.rating}</span>
  <span class="dot-sep">·</span>
  <span>${first.year}</span>
  <span class="dot-sep">·</span>
  <span>${first.runtime}</span>
  <span class="dot-sep">·</span>
  <span>${first.genre}</span>`;

buildTrendingRow(ITEMS);
buildTopRatedRow(ITEMS);