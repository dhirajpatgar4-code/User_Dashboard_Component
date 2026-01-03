import { toast } from 'react-toastify';
import { asyncHandler } from '../utils/async-handler';
import api from './apiClient';
import { useAuthStore } from '../store/auth-store';

export const signupUser = asyncHandler(
  async (fullname, email, password, phone, dob, gender, timezone, language) => {
    const res = await api.post('/api/user/signup', {
      fullname,
      email,
      phone_number: phone,
      Password: password,
      dob, // ISO string
      gender,
      timezone,
      preferred_language: language,
    });

    return res.data;
  },
);

export const checkAuth = asyncHandler(async () => {
  const res = await api.get('/api/current-user');
  console.log('🚀 ~ res:', res.data);
  return res.data;
});

export const logout = asyncHandler(async () => {
  const res = await api.post('/logout');
  if (res.status === 200) {
    window.location.href = '/';
    localStorage.clear();
  }
  return res.data;
});

export const verifyUserOtp = asyncHandler(async (email, otp) => {
  const res = await api.post('/api/user/verify-otp', {
    email,
    otp,
  });
  return res.data;
});

export const verifyUserPasswordOtp = asyncHandler(async (email, otp) => {
  const res = await api.post('/api/user/verify-password-otp', {
    email,
    otp,
  });
  return res.data;
});

export const userLogin = asyncHandler(async (email, password) => {
  console.log(email, password);
  const res = await api.post('/api/user/login', {
    email,
    Password: password, // backend expects capital P
  });
  return res.data;
});

export const adminLogin = asyncHandler(async ({ email, password }) => {
  const res = await api.post('/api/admin/login', {
    email,
    Password: password,
  });
  return res.data;
});

export const sendEmailVerificationOtp = asyncHandler(async (email) => {
  const res = await api.post(`/api/user/otp-for-password/${email}`);
  return res;
});

export const sendPasswordResetOtp = asyncHandler(async (email) => {
  const res = await api.post(`/api/user/password-reset-otp`, {
    Email: email,
  });
  return res;
});

export const resetPassword = asyncHandler(async (pass, confPass, email) => {
  console.log({
    pass,
    confPass,
    email,
  });
  const res = await api.post('/api/user/reset-password', {
    Email: email,
    newPassword: confPass,
  });
  console.log('🚀 ~ res:', res);
  return res;
});