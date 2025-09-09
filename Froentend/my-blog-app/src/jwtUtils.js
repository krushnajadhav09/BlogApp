export function parseJwt(token) {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    console.error("Invalid token:", e);
    return null;
  }
}

export function getTokenExpiry(token) {
  const decoded = parseJwt(token);
  if (!decoded?.exp) return null;

  return new Date(decoded.exp * 1000); // Convert to JavaScript Date
}
