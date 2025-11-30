import LandingPage from "../src/pages/landing/landing.js";
import LoginPage from "../src/pages/login/login.js";
import RegisterPage from "../src/pages/register/register.js";

const routes = {
  "/": new LandingPage(), // halaman utama
  login: new LoginPage(), // #/login → "login"
  register: new RegisterPage(), // #/register → "register"
};

export default routes;
