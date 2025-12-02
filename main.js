import routes from "./router/route.js";

class App {
  constructor({ content }) {
    this._content = content;

    window.addEventListener("hashchange", () => {
      this._renderPage();
    });

    window.addEventListener("load", () => {
      this._renderPage();
    });
  }

  async _renderPage() {
    let url = window.location.hash.slice(1).replace("/", "").toLowerCase();
    if (url === "") url = "/";

    const page = routes[url] ? routes[url] : routes["/"];

    // Jika pakai file HTML (dashboard)
    if (page.getHtml) {
      const html = await page.getHtml();
      this._content.innerHTML = html;
    }

    // Jika pakai string HTML (landing, login, register)
    else if (page.render) {
      this._content.innerHTML = page.render();
    }

    // Jalankan script halaman
    if (page.load) {
      page.load();
    } else if (page.afterRender) {
      page.afterRender();
    }
  }
}

export default App;

import { navbar } from "./src/components/navbar.js";

const contentEl = document.getElementById("content");
const navbarEl = document.getElementById("navbar");

if (navbarEl) {
  navbarEl.innerHTML = navbar;
}

if (contentEl) {
  new App({ content: contentEl });
} else {
  console.warn("App content element (#content) not found in DOM.");
}
