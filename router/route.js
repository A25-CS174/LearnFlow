import LandingPage from "../src/pages/landing/landing.js";
import LoginPage from "../src/pages/login/login.js";
import RegisterPage from "../src/pages/register/register.js";
import DashboardPage from "../src/pages/dashboard/dashboard.js";

const routes = {
  "/": new LandingPage(),
  login: new LoginPage(),
  register: new RegisterPage(),
  dashboard: new DashboardPage(),
  "404": NotFound,
};

export default routes;
