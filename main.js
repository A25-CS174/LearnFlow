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

    const page = routes[url] ? routes[url] : routes["404"];

    this._content.innerHTML = page.render();

    if (page.afterRender) {
      page.afterRender();
    }
  }
}

export default App;

// Initialize app when module is loaded in the browser
import { navbar } from "./src/components/navbar.js";

const contentEl = document.getElementById("content");
const navbarEl = document.getElementById("navbar");

if (navbarEl) {
  navbarEl.innerHTML = navbar;
}

if (contentEl) {
  // instantiate so constructor hooks load/hashchange and renders page
  new App({ content: contentEl });
} else {
  // If `#content` is missing, log to console to help debugging
  console.warn("App content element (#content) not found in DOM.");
}
