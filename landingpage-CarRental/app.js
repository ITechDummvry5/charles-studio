/* ============================================================
   VGO CAR RENTAL — app.js
   Full functionality: preloader, cursor, fleet, booking,
   modals, search, counter animations, scroll effects
============================================================ */

"use strict";

// ==================== DATA ====================
const cars = [
  {
    id: 1, name: "Toyota Camry", category: "sedan",
    price: 2800, seats: 5, fuel: "Gasoline", transmission: "Automatic",
    color: "#1a1a2e", accentColor: "rgba(255,200,100,0.8)"
  },
  {
    id: 2, name: "Honda CR-V", category: "suv",
    price: 3500, seats: 7, fuel: "Gasoline", transmission: "Automatic",
    color: "#0f1c17", accentColor: "rgba(100,200,160,0.8)"
  },
  {
    id: 3, name: "Mazda MX-5", category: "sports",
    price: 5200, seats: 2, fuel: "Gasoline", transmission: "Manual",
    color: "#1c0a0a", accentColor: "rgba(220,80,80,0.8)"
  },
  {
    id: 4, name: "Hyundai Ioniq 6", category: "electric",
    price: 4800, seats: 5, fuel: "Electric", transmission: "Automatic",
    color: "#061220", accentColor: "rgba(80,160,220,0.8)"
  },
  {
    id: 5, name: "Ford Expedition", category: "suv",
    price: 4200, seats: 8, fuel: "Gasoline", transmission: "Automatic",
    color: "#141414", accentColor: "rgba(200,200,200,0.8)"
  },
  {
    id: 6, name: "BMW 3 Series", category: "sedan",
    price: 6500, seats: 5, fuel: "Gasoline", transmission: "Automatic",
    color: "#10101e", accentColor: "rgba(100,140,220,0.8)"
  },
  {
    id: 7, name: "Porsche 911", category: "sports",
    price: 12000, seats: 2, fuel: "Gasoline", transmission: "Manual",
    color: "#1a0a00", accentColor: "rgba(220,140,60,0.8)"
  },
  {
    id: 8, name: "Tesla Model 3", category: "electric",
    price: 5500, seats: 5, fuel: "Electric", transmission: "Automatic",
    color: "#080d14", accentColor: "rgba(60,180,240,0.8)"
  },
  {
    id: 9, name: "Mercedes-Benz E-Class", category: "sedan",
    price: 8000, seats: 5, fuel: "Gasoline", transmission: "Automatic",
    color: "#0d0d0d", accentColor: "rgba(220,200,150,0.8)"
  }
];

let selectedCar = null;

// ==================== PRELOADER ====================
(function initPreloader() {
  const fill = document.getElementById('preloaderFill');
  const preloader = document.getElementById('preloader');
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 18;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      setTimeout(() => {
        preloader.classList.add('hidden');
        document.body.style.overflow = '';
        animateCounters();
      }, 300);
    }
    fill.style.width = progress + '%';
  }, 80);
  document.body.style.overflow = 'hidden';
})();

// ==================== CURSOR ====================
const cursor = document.getElementById('cursor');
const cursorDot = document.getElementById('cursorDot');
let mouseX = 0, mouseY = 0, curX = 0, curY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX; mouseY = e.clientY;
  cursorDot.style.left = mouseX + 'px';
  cursorDot.style.top = mouseY + 'px';
});

function animateCursor() {
  curX += (mouseX - curX) * 0.12;
  curY += (mouseY - curY) * 0.12;
  cursor.style.left = curX + 'px';
  cursor.style.top = curY + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

// ==================== NAVBAR ====================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  updateActiveNav();
});

function updateActiveNav() {
  const sections = ['home','services','fleet','how','contact'];
  const scrollY = window.scrollY + 120;
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (!link) return;
    const top = el.offsetTop, bottom = top + el.offsetHeight;
    link.classList.toggle('active', scrollY >= top && scrollY < bottom);
  });
}

// ==================== MOBILE MENU ====================
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

function closeMobileMenu() {
  mobileMenu.classList.remove('open');
}

// ==================== COUNTER ANIMATION ====================
function animateCounters() {
  document.querySelectorAll('.stat-num').forEach(el => {
    const target = parseInt(el.dataset.target, 10);
    let current = 0;
    const duration = 1600;
    const step = target / (duration / 16);
    const interval = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = Math.floor(current).toLocaleString();
      if (current >= target) clearInterval(interval);
    }, 16);
  });
}

// ==================== SCROLL REVEAL ====================
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      const delay = entry.target.dataset.delay || 0;
      entry.target.style.transitionDelay = delay + 'ms';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.service-card, .step, .car-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(28px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// Make visible class do the reveal
const style = document.createElement('style');
style.textContent = `.visible { opacity: 1 !important; transform: translateY(0) !important; }`;
document.head.appendChild(style);

// ==================== FLEET ====================
function buildCarSVG(car) {
  return `
    <svg viewBox="0 0 400 180" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="180" fill="${car.color}"/>
      <ellipse cx="200" cy="165" rx="160" ry="10" fill="rgba(0,0,0,0.4)"/>
      <path d="M50 125 L70 90 L120 70 L180 64 L240 64 L300 70 L340 90 L355 125 L355 145 L50 145 Z"
            fill="#111" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
      <path d="M115 72 L140 66 L220 62 L250 66 L265 85 L105 85 Z"
            fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.12)" stroke-width="0.8"/>
      <path d="M268 66 L310 74 L328 88 L268 88 Z"
            fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.1)" stroke-width="0.8"/>
      <line x1="266" y1="62" x2="270" y2="88" stroke="rgba(255,255,255,0.15)" stroke-width="1.5"/>
      <ellipse cx="340" cy="116" rx="14" ry="7" fill="${car.accentColor}"/>
      <ellipse cx="340" cy="116" rx="8" ry="4" fill="rgba(255,240,180,0.7)"/>
      <rect x="52" y="112" width="12" height="5" rx="2" fill="rgba(220,50,50,0.7)"/>
      <circle cx="115" cy="145" r="26" fill="#0a0a0a" stroke="rgba(255,255,255,0.12)" stroke-width="1.5"/>
      <circle cx="115" cy="145" r="17" fill="#111" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
      <circle cx="115" cy="145" r="6" fill="rgba(255,255,255,0.1)"/>
      <line x1="115" y1="128" x2="115" y2="162" stroke="rgba(255,255,255,0.1)" stroke-width="1.5"/>
      <line x1="98" y1="145" x2="132" y2="145" stroke="rgba(255,255,255,0.1)" stroke-width="1.5"/>
      <circle cx="295" cy="145" r="26" fill="#0a0a0a" stroke="rgba(255,255,255,0.12)" stroke-width="1.5"/>
      <circle cx="295" cy="145" r="17" fill="#111" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
      <circle cx="295" cy="145" r="6" fill="rgba(255,255,255,0.1)"/>
      <line x1="295" y1="128" x2="295" y2="162" stroke="rgba(255,255,255,0.1)" stroke-width="1.5"/>
      <line x1="278" y1="145" x2="312" y2="145" stroke="rgba(255,255,255,0.1)" stroke-width="1.5"/>
      <rect x="168" y="108" width="20" height="3" rx="1.5" fill="rgba(255,255,255,0.12)"/>
      <rect x="268" y="108" width="16" height="3" rx="1.5" fill="rgba(255,255,255,0.08)"/>
    </svg>
  `;
}

function renderFleet(filter = 'all') {
  const grid = document.getElementById('fleetGrid');
  grid.innerHTML = '';
  const filtered = filter === 'all' ? cars : cars.filter(c => c.category === filter);
  filtered.forEach((car, i) => {
    const card = document.createElement('div');
    card.className = 'car-card';
    card.dataset.delay = i * 60;
    card.innerHTML = `
      <div class="car-card-img">
        <div class="car-tag">${capitalize(car.category)}</div>
        ${buildCarSVG(car)}
      </div>
      <div class="car-card-body">
        <div class="car-card-header">
          <div class="car-name">${car.name}</div>
          <div class="car-price">
            <span class="amount">₱${car.price.toLocaleString()}</span>
            <span class="period">/ day</span>
          </div>
        </div>
        <div class="car-specs">
          <div class="car-spec"><span class="car-spec-icon">💺</span>${car.seats} Seats</div>
          <div class="car-spec"><span class="car-spec-icon">⛽</span>${car.fuel}</div>
          <div class="car-spec"><span class="car-spec-icon">⚙️</span>${car.transmission}</div>
        </div>
        <button class="book-car-btn" onclick="openBookingModal(${car.id})">Book This Car</button>
      </div>
    `;
    // Re-apply scroll reveal
    card.style.opacity = '0';
    card.style.transform = 'translateY(28px)';
    card.style.transition = `opacity 0.5s ease ${i * 60}ms, transform 0.5s ease ${i * 60}ms`;
    grid.appendChild(card);
    observer.observe(card);
  });
}

function capitalize(str) { return str.charAt(0).toUpperCase() + str.slice(1); }

// Filter buttons
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderFleet(btn.dataset.filter);
  });
});

renderFleet();

// ==================== SEARCH ====================
function scrollToSearch() {
  document.getElementById('searchBar').scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function handleSearch() {
  const location = document.getElementById('locationSelect').value;
  const pickup = document.getElementById('pickupDate').value;
  const ret = document.getElementById('returnDate').value;
  const type = document.getElementById('carType').value;

  if (!location) { showToast('Please choose a location.', 'error'); return; }
  if (!pickup) { showToast('Please select a pick-up date.', 'error'); return; }
  if (!ret) { showToast('Please select a return date.', 'error'); return; }
  if (new Date(ret) <= new Date(pickup)) { showToast('Return date must be after pick-up date.', 'error'); return; }

  // Filter fleet if car type selected
  const section = document.getElementById('fleet');
  section.scrollIntoView({ behavior: 'smooth' });

  if (type) {
    const typeMap = { 'Sedan': 'sedan', 'SUV': 'suv', 'Sports': 'sports', 'Luxury': 'sedan', 'Electric': 'electric', 'Van': 'suv' };
    const mapped = typeMap[type] || 'all';
    document.querySelectorAll('.filter-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.filter === mapped);
    });
    renderFleet(mapped);
  }

  showToast(`🔍 Showing cars for ${location} · ${formatDate(pickup)} → ${formatDate(ret)}`, 'success');
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-PH', { month: 'short', day: 'numeric', year: 'numeric' });
}

// ==================== MODALS ====================
function openModal(id) {
  document.getElementById(id).classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal(id) {
  document.getElementById(id).classList.remove('open');
  document.body.style.overflow = '';
}

function switchModal(from, to) {
  closeModal(from);
  setTimeout(() => openModal(to), 200);
}

// Close modal on overlay click
document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeModal(overlay.id);
  });
});

// Close on Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.open').forEach(m => closeModal(m.id));
  }
});

// ==================== AUTH ====================
function handleLogin() {
  const email = document.getElementById('loginEmail').value.trim();
  const pass = document.getElementById('loginPassword').value;
  if (!email || !validateEmail(email)) { showToast('Enter a valid email address.', 'error'); return; }
  if (!pass || pass.length < 6) { showToast('Password must be at least 6 characters.', 'error'); return; }
  closeModal('loginModal');
  showToast('✅ Logged in successfully! Welcome back.', 'success');
}

function handleSignup() {
  const name = document.getElementById('signupName').value.trim();
  const email = document.getElementById('signupEmail').value.trim();
  const pass = document.getElementById('signupPassword').value;
  if (!name) { showToast('Please enter your full name.', 'error'); return; }
  if (!email || !validateEmail(email)) { showToast('Enter a valid email address.', 'error'); return; }
  if (!pass || pass.length < 6) { showToast('Password must be at least 6 characters.', 'error'); return; }
  closeModal('signupModal');
  showToast(`🎉 Welcome to Vgo, ${name.split(' ')[0]}! Account created.`, 'success');
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ==================== BOOKING ====================
function openBookingModal(carId) {
  selectedCar = cars.find(c => c.id === carId);
  if (!selectedCar) return;
  document.getElementById('bookingCarName').textContent = selectedCar.name;
  document.getElementById('bookingCarPrice').textContent = `₱${selectedCar.price.toLocaleString()} / day`;

  // Pre-fill dates from search if available
  const pickup = document.getElementById('pickupDate').value;
  const ret = document.getElementById('returnDate').value;
  if (pickup) document.getElementById('bookPickup').value = pickup;
  if (ret) document.getElementById('bookReturn').value = ret;

  updateBookingSummary();
  openModal('bookingModal');

  // Live summary updates
  ['bookPickup', 'bookReturn', 'bookLocation', 'bookPayment'].forEach(id => {
    document.getElementById(id).addEventListener('change', updateBookingSummary);
  });
}

function updateBookingSummary() {
  if (!selectedCar) return;
  const pickup = document.getElementById('bookPickup').value;
  const ret = document.getElementById('bookReturn').value;
  const summaryEl = document.getElementById('bookingSummary');

  if (!pickup || !ret) {
    summaryEl.innerHTML = '<em style="color:var(--text-muted)">Select pickup and return dates to see your total.</em>';
    return;
  }

  const days = Math.max(1, Math.round((new Date(ret) - new Date(pickup)) / (1000 * 60 * 60 * 24)));
  const subtotal = days * selectedCar.price;
  const tax = Math.round(subtotal * 0.12);
  const total = subtotal + tax;

  summaryEl.innerHTML = `
    <div style="display:flex;justify-content:space-between;margin-bottom:6px"><span>Vehicle</span><span style="color:var(--text)">${selectedCar.name}</span></div>
    <div style="display:flex;justify-content:space-between;margin-bottom:6px"><span>Duration</span><span style="color:var(--text)">${days} day${days > 1 ? 's' : ''}</span></div>
    <div style="display:flex;justify-content:space-between;margin-bottom:6px"><span>Rate</span><span style="color:var(--text)">₱${selectedCar.price.toLocaleString()}/day</span></div>
    <div style="display:flex;justify-content:space-between;margin-bottom:6px"><span>Subtotal</span><span style="color:var(--text)">₱${subtotal.toLocaleString()}</span></div>
    <div style="display:flex;justify-content:space-between;margin-bottom:6px"><span>Tax (12%)</span><span style="color:var(--text)">₱${tax.toLocaleString()}</span></div>
    <div style="display:flex;justify-content:space-between;border-top:1px solid var(--border);padding-top:10px;margin-top:4px">
      <span style="font-weight:600;color:var(--white)">Total</span>
      <span style="font-family:var(--font-display);font-size:22px;color:var(--accent)">₱${total.toLocaleString()}</span>
    </div>
  `;
}

function confirmBooking() {
  const name = document.getElementById('bookName').value.trim();
  const phone = document.getElementById('bookPhone').value.trim();
  const pickup = document.getElementById('bookPickup').value;
  const ret = document.getElementById('bookReturn').value;

  if (!name) { showToast('Please enter your full name.', 'error'); return; }
  if (!phone) { showToast('Please enter your phone number.', 'error'); return; }
  if (!pickup) { showToast('Please select a pickup date.', 'error'); return; }
  if (!ret) { showToast('Please select a return date.', 'error'); return; }
  if (new Date(ret) <= new Date(pickup)) { showToast('Return date must be after pickup date.', 'error'); return; }

  const bookingRef = 'VGO' + Date.now().toString().slice(-6).toUpperCase();
  closeModal('bookingModal');
  showToast(`✅ Booking confirmed! Ref: ${bookingRef}. ${selectedCar.name} booked for ${name.split(' ')[0]}.`, 'success');
}

// ==================== CONTACT ====================
function handleContact() {
  const name = document.getElementById('contactName').value.trim();
  const email = document.getElementById('contactEmail').value.trim();
  const msg = document.getElementById('contactMsg').value.trim();

  if (!name) { showToast('Please enter your name.', 'error'); return; }
  if (!email || !validateEmail(email)) { showToast('Enter a valid email address.', 'error'); return; }
  if (!msg || msg.length < 10) { showToast('Please write a message (at least 10 characters).', 'error'); return; }

  document.getElementById('contactName').value = '';
  document.getElementById('contactEmail').value = '';
  document.getElementById('contactMsg').value = '';
  showToast(`✅ Message sent! We'll get back to you shortly, ${name.split(' ')[0]}.`, 'success');
}

// ==================== TOAST ====================
let toastTimer;
function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.className = 'toast ' + type + ' show';
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 4000);
}

// ==================== SET MIN DATE ====================
(function setMinDates() {
  const today = new Date().toISOString().split('T')[0];
  ['pickupDate', 'returnDate', 'bookPickup', 'bookReturn'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.min = today;
  });

  document.getElementById('pickupDate').addEventListener('change', function() {
    document.getElementById('returnDate').min = this.value;
  });
  document.getElementById('bookPickup').addEventListener('change', function() {
    document.getElementById('bookReturn').min = this.value;
  });
})();
