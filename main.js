// Import navbar component
import { navbar } from './src/components/navbar.js';
import './src/style.css';

// Simple SPA Router
class Router {
  constructor(routes) {
    this.routes = routes;
    this.currentRoute = null;
    this.init();
  }

  init() {
    // Render navbar
    const navbarEl = document.getElementById('navbar');
    if (navbarEl) navbarEl.innerHTML = navbar;

    // Load navbar CSS
    const navbarLink = document.createElement('link');
    navbarLink.rel = 'stylesheet';
    navbarLink.href = '/src/components/navbar.css';
    document.head.appendChild(navbarLink);

    // Routing events
    window.addEventListener('popstate', () => {
      this.handleRoute();
      this.setActiveLink();   // <-- DITAMBAHKAN
    });

    window.addEventListener('load', () => {
      this.handleRoute();
      this.setActiveLink();   // <-- DITAMBAHKAN
    });

    // Link interception
    document.addEventListener('click', (e) => {
      if (e.target.matches('[data-link]')) {
        e.preventDefault();
        this.navigate(e.target.getAttribute('href'));
      }
    });
  }

  navigate(path) {
    history.pushState({}, '', path);
    this.handleRoute();
    this.setActiveLink();   // <-- DITAMBAHKAN
  }

  handleRoute() {
    const path = window.location.pathname;

    // Match route, including nested routes
    const route =
      this.routes.find(r => r.path === path) ||
      this.routes.find(r => r.path === '/');

    if (route) this.render(route);

    this.setActiveLink();   // <-- DITAMBAHKAN
  }

  render(route) {
    const content = document.getElementById('content');
    if (!content) return;

    // Insert HTML template
    content.innerHTML = route.template;

    // Load script if exists
    if (route.script) route.script();
  }

  // ===============================
  // ACTIVE NAVBAR (DITAMBAHKAN)
  // ===============================
  setActiveLink() {
    const path = window.location.pathname;
    const links = document.querySelectorAll('a[data-link]');

    links.forEach(link => {
      const href = link.getAttribute('href');
      if (href === path) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
}

// -----------------------------
// ROUTES
// -----------------------------
const routes = [

  // HOME PAGE
  {
    path: '/',
    template: `
      <section class="hero">
        <div class="hero-text">
          <h1>Bangun Karirmu Sebagai</h1>
          <h1>Developer Profesional</h1>
          <p>Mulai belajar terarah dengan learning path</p>
          <button class="cta">Belajar Sekarang</button>
        </div>
        <div class="hero-image">
          <img src="/public/image/homepage-hero.png" alt="Hero" />
        </div>
      </section>

      <section class="features">
        <div class="feature-head">
          <h1>Kenapa Dicoding Academy Berbeda</h1>
          <p>Saatnya bijak memilih sumber belajar.</p>
          <p>Dicoding Academy memiliki reviewer profesional.</p>
        </div>

        <div class="feature-main">
          <div class="features-text">
            <div class="feature-box">
              <p>Kurikulum standar industri global</p>
              <p>Belajar fleksibel</p>
              <p>Code review profesional</p>
              <p>Alumni di berbagai perusahaan</p>
            </div>
          </div>

          <div class="features-image">
            <img src="/public/image/feature-1-landing-page.png" alt="Feature" />
          </div>
        </div>
      </section>
    `,
    script: () => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = '/src/pages/landing/style.css';
      document.head.appendChild(link);
      console.log("Landing page loaded");
    }
  },

  // DASHBOARD PROGRESS
  {
    path: '/dashboard/progress',
    template: `
      <section class="progress-page">
        <h1>Progress Belajar</h1>
        <p>Halaman ini menampilkan perkembangan belajar Anda.</p>

        <div id="progress-container"></div>
      </section>
    `,
    script: () => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = '/src/pages/dashboard/progress/style.css';
      document.head.appendChild(link);

      console.log("Progress dashboard loaded");

      import('/src/pages/dashboard/progress/script.js')
        .then(() => console.log("Progress script loaded"))
        .catch(() => console.warn("script.js tidak ditemukan"));
    }
  },

  // LOGIN
  {
    path: '/login',
    template: `
      <div class="login-container">
        <div class="image-placeholder">
          <img src="/public/image/homepage-hero.png" alt="Login Illustration" />
        </div>

        <div class="form-section">
          <h1 class="title">Selamat Datang di Dcoding</h1>
          <h2 class="subtitle">Permudah alur belajar dan produktivitasmu</h2>

          <form id="login-form">
            <input type="email" placeholder="Email" required />

            <div class="password-wrapper">
              <input type="password" id="password" placeholder="Password" required />
              <span id="togglePassword" class="toggle-icon">🙈</span>
            </div>

            <a href="#" class="forgot-password">Lupa Password ?</a>
            <button type="submit" class="btn-login">Login</button>
          </form>

          <div class="divider-container">
            <div class="divider"></div>
            <div class="divider"></div>
          </div>

          <p class="register-text">
            Belum Punya Akun ? <a href="#" data-link href="/register">Daftar Sekarang</a>
          </p>
        </div>
      </div>
    `,
    script: () => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = '/src/pages/login/style.css';
      document.head.appendChild(link);

      document.getElementById('login-form').addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Login berhasil!');
      });

      const togglePassword = document.getElementById('togglePassword');
      const passwordInput = document.getElementById('password');

      togglePassword.addEventListener('click', () => {
        const hidden = passwordInput.type === 'password';
        passwordInput.type = hidden ? 'text' : 'password';
        togglePassword.textContent = hidden ? '👁️' : '🙈';
      });
    }
  },

  // REGISTER
  {
    path: '/register',
    template: `
      <div class="register-container">
        <div class="image-placeholder">
          <img src="/public/image/homepage-hero.png" alt="Register Illustration" />
        </div>

        <div class="form-section">
          <h2>Daftar Sekarang</h2>

          <form id="register-form">
            <input type="text" placeholder="Nama" required />
            <input type="email" placeholder="Email" required />
            <input type="password" placeholder="Password" required />
            <input type="text" placeholder="Asal Kota" required />

            <div class="terms">
              <input type="checkbox" id="agree" required />
              <label for="agree">
                <strong>Saya setuju dengan Syarat dan Kebijakan Privasi.</strong>
              </label>
            </div>

            <button type="submit" class="btn-login">Register</button>
          </form>
        </div>
      </div>
    `,
    script: () => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = '/src/pages/register/style.css';
      document.head.appendChild(link);

      document.getElementById('register-form').addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Registrasi berhasil!');
      });
    }
  }

];

// Initialize router
new Router(routes);
