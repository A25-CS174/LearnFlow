import '../../style.css';

document.querySelector('#app').innerHTML = `
  <div class="flex bg-white rounded-xl shadow-xl p-10 gap-14 items-center max-w-[1000px] w-[90%]">

    <!-- IMAGE -->
    <div class="w-[420px] h-[420px] bg-gray-300 flex items-center justify-center rounded-lg shadow-md overflow-hidden">
      <img src="../../public/image/homepage-hero.png" alt="Login Illustration" class="w-full h-full object-cover rounded-lg" />
    </div>

    <!-- FORM SECTION -->
    <div class="w-[400px] flex flex-col text-center">

      <h1 class="font-bold text-[28px] text-gray-800 mb-1">Selamat Datang di Dcoding</h1>
      <h2 class="font-normal text-[16px] text-gray-600 mb-8">Permudah alur belajar dan tingkatkan produktivitas latihanmu</h2>

      <form id="login-form" class="flex flex-col gap-5">

        <input type="email" placeholder="Email" required
          class="px-4 py-3 border border-gray-300 rounded-lg text-[15px] focus:outline-none focus:ring-2 focus:ring-blue-400">

        <div class="relative flex items-center">
          <input type="password" id="password" placeholder="Password" required
            class="w-full px-4 py-3 border border-gray-300 rounded-lg text-[15px] focus:outline-none focus:ring-2 focus:ring-blue-400 pr-12">

          <span id="togglePassword"
            class="absolute right-4 text-[18px] text-gray-500 cursor-pointer select-none">🙈</span>
        </div>

        <a href="#" class="text-blue-600 text-[14px] self-end -mt-2 hover:underline">Lupa Password ?</a>

        <button type="submit"
          class="bg-[#0c204c] hover:bg-[#0a1738] text-white rounded-lg py-3 text-[17px] font-semibold mt-3 transition-all">
          Login
        </button>
      </form>

      <!-- Divider -->
      <div class="flex justify-center items-center gap-5 mt-8 mb-3">
        <div class="h-[1px] w-12 bg-gray-300"></div>
        <div class="h-[1px] w-12 bg-gray-300"></div>
      </div>

      <p class="text-[14px] text-gray-600">
        Belum Punya Akun ?
        <a href="#" class="text-red-500 font-semibold hover:underline">Daftar Sekarang</a>
      </p>
    </div>
  </div>
`;

document.getElementById('login-form').addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Login berhasil!');
});

const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');

togglePassword.addEventListener('click', () => {
  const isHidden = passwordInput.type === 'password';
  passwordInput.type = isHidden ? 'text' : 'password';
  togglePassword.textContent = isHidden ? '👁️' : '🙈';
});
