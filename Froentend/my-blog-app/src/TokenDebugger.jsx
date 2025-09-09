import React, { useEffect } from 'react';
import { parseJwt, getTokenExpiry } from '../jwtUtils'; // Adjust path if needed

const TokenDebugger = () => {
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      console.log("No token found.");
      return;
    }

    const decoded = parseJwt(token);
    console.log("Token payload:", decoded);

    const expiryDate = getTokenExpiry(token);
    if (expiryDate) {
      console.log("Token expires at:", expiryDate.toLocaleString());
    } else {
      console.log("Token has no expiry.");
    }
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h3>Check console for token info</h3>
    </div>
  );
};

export default TokenDebugger;
