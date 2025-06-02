import React from 'react';
import { toast } from 'react-toastify';
import { BASE_URL } from '../api/api';

const API_BASE = `${BASE_URL}/users`;


//login
export async function login(username, password, role) {
  if (role.toLowerCase() === 'admin') {
    if (username === 'admin' && password === 'admin') {
      const adminUser = { username, role: 'admin' };
      saveUser(adminUser);
      return { success: true, role: 'Admin' };
    } else {
      return { success: false, message: 'Invalid admin credentials' };
    }
  }

  try {
    const res = await fetch(`${API_BASE}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: username, password })
    });

    const data = await res.json();
    if (res.ok && data.token) {
      saveToken(data.token);
      saveUser({ username, role: 'User' });
      return { success: true, role: 'User' };
    } else {
      return { success: false, message: data.message || 'Login failed' };
    }
  } catch (err) {
    return { success: false, message: err.message };
  }
}






// SIGNUP
export async function signup(userId, password, email) {
  
  try {
    const res = await fetch(`${API_BASE}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, password, email }) 
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message);

    
    
  } catch (err) {
    toast.error('Signup failed: ' + err.message);
  }
}

// CHECK LOGIN STATUS
export function checkLoginStatus() {
  const user = getLoggedInUser();
  const loginBtn = document.getElementById('loginLink');

  if (!loginBtn) return;

  if (user) {
    loginBtn.textContent = 'Logout';
    loginBtn.href = '#';
    loginBtn.addEventListener('click', (e) => {
      e.preventDefault();
      logout();
    });
  } else {
    loginBtn.textContent = 'Login';
    loginBtn.href = './login.html';
  }
}


// TOKEN + SESSION UTILITIES
export function getToken() {
  return localStorage.getItem("token");
}

export function saveToken(token) {
  localStorage.setItem("token", token);
}

export function saveUser(user) {
  localStorage.setItem("user", JSON.stringify(user));
}

export function getLoggedInUser() {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}


export function isLoggedIn() {
  return !!getToken();
}
