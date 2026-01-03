////////////////////////////////////////////////////////
//   THIS FILE FOLLOWS PROJECT STRUCTURE GUIDELINES   //
////////////////////////////////////////////////////////
//  IMPORTANT:
//  - This file serves as the central routing and layout handler.
//  - Do NOT modify, remove, or add routes, components, or logic
//    in this file unless you have been specifically assigned to do so.
//  - All structural changes must follow project conventions and
//    must be reviewed before merging.
//  - Unauthorized edits may break global navigation, imports, or
//    project-wide routing behavior.
//  - Treat this file as a protected core file within the project.
//
////////////////////////////////////////////////////////

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import './App.css';
import AOS from 'aos';
import { useCallback, useEffect } from 'react';
import 'aos/dist/aos.css';

////////////////////////////////////////
//      Components & Page Imports     //
////////////////////////////////////////

import {
  Home,
  AdminLogin,
  Signup,
  ForgotPassword,
  VerifyOTP,
  ResetPasswordOTP,
  ResetPassword,
  Login,
  Services,
  Logout,
} from './pages';
import { DashboardNavBar, Navbar } from './components';
import CounsellorSignup from './pages/counsellor-signup/CounsellorSignup';
import { useAuthStore } from './store/auth-store';
import { ToastContainer } from 'react-toastify';
import { useAuthStore } from './store/auth-store.js';
import CounsellorProfile from './pages/counsellor-Profile/CounsellorProfile.jsx';
import { Footer } from 'react-day-picker';
import axios from 'axios';
import CounsellorsGrid from './pages/Counsellor';

const AppContent = () => {
  const location = useLocation();
  const hideNavbar =
    location.pathname === '/admin/login' ||
    location.pathname === '/signup' ||
    location.pathname === '/counsellor/signup' ||
    location.pathname === '/dashboard';

  const isAuthenticated = useAuthStore((state) => state.authenticated);
  const toggleAuthState = useAuthStore((state) => state.toggleAuthState);
  const setProfilePic = useAuthStore((state) => state.setProfilePic);
  const setFullName = useAuthStore((state) => state.setFullName);
  const setUserEmail = useAuthStore((state) => state.setClientEmail);

  //=== [DEBUG USE-EFFECT LOG] ===//
  useEffect(() => {
    console.log('[AUTH STATE]', isAuthenticated);
    // check if authenticated
    const checkAuth = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/current-user`,
        {
          withCredentials: true,
        },
      );
      const userData = res?.data?.data;
      setFullName(userData?.fullname);
      setUserEmail(userData?.email);
      setProfilePic(userData?.profilePic);
      if (res.status === 200) {
        toggleAuthState(true);
      }
      return res;
    };
    // check google auth
    const checkEmailAuth = async () => {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/info`, {
        withCredentials: true,
      });
      console.log('🚀 ~ checkEmailAuth ~ res:', res);
    };
    if (!isAuthenticated) {
      // Check if user is authenticated with google
      const res = checkAuth();
      if (res.status !== 200) {
        // Check if user is authenticated with email & password
        checkEmailAuth();
      }
    }
  }, []);

  return (
    <div>
      <ToastContainer
        position='top-right'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        toastClassName={'toast-uppercase'}
      />
      {/* {!hideNavbar && <Navbar /> */}
      {/* {isAuthenticated ? <DashboardNavBar /> : !hideNavbar && <Navbar />} */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/admin/login' element={<AdminLogin />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/forgot' element={<ForgotPassword />} />
        <Route path='/verify-otp/:emailId' element={<VerifyOTP />} />
        <Route path='/reset-password/:emailId' element={<ResetPasswordOTP />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/counsellor/signup' element={<CounsellorSignup />} />
        <Route path='/counsellor/profile' element={<CounsellorProfile />} />

        <Route path='/login' element={<Login />} />
        <Route path='/services' element={<Services />} />
        <Route path='/logout' element={<Logout />} />
        <Route path='counsellor' element={<CounsellorsGrid />} />
      </Routes>
      <div>{/* <Footer /> */}</div>
    </div>
  );
};

const App = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
