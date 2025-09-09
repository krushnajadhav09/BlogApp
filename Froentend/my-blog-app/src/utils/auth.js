// utils/auth.js
import { jwtDecode } from 'jwt-decode'; // ✅ Correct way

export  function setupAutoLogout() {
  const token = localStorage.getItem('access_token');
  if (!token) return;

  try {
    const decoded = jwtDecode(token);
    const exp = decoded.exp * 1000; // convert to ms
    const now = Date.now();
    const timeout = exp - now;

    if (timeout <= 0) {
      logoutUser(); // token already expired
    } else {
      setTimeout(() => {
        logoutUser();
      }, timeout);
    }
  } catch (e) {
    console.error("Failed to decode token:", e);
    logoutUser(); // fallback
  }
}

function logoutUser() {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  window.location.href = '/login';
}
