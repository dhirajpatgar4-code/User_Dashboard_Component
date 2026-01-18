////////////////////////////////////////////////////////
//   THIS FILE FOLLOWS PROJECT STRUCTURE GUIDELINES   //
////////////////////////////////////////////////////////

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './App.css';

import { ToastContainer } from 'react-toastify';

// ===================== Pages ===================== //
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
  RazorpayTemporary,
} from './pages';

import CounsellorSignup from './pages/counsellor-signup/CounsellorSignup';
import CounsellorProfile from './pages/counsellor-Profile/CounsellorProfile.jsx';
import CounsellorsGrid from './pages/Counsellor';

import Spinner from './components/ui/Spinner.jsx';
import UpdateProfilePage from './pages/UpdateProfilePage.jsx';

// =================== Components =================== //
import { CaptureToken, DashboardNavBar, Navbar } from './components';

// =================== Store =================== //
import { useAuthStore } from './store/auth-store';
import ProtectedRoute from './utils/ProtectedRoute.jsx';
import UserDashboard from './pages/User-Dashboard/UserDashboard.jsx';

const AppContent = () => {
  const location = useLocation();

  const hideNavbar =
    location.pathname === '/admin/login' ||
    location.pathname === '/signup' ||
    location.pathname === '/counsellor/signup' ||
    location.pathname === '/dashboard';

  const {
    authenticated: isAuthenticated,
    secureToken: token,
    toggleAuthState,
    setProfilePic,
    setFullName,
    setClientEmail,
    setClientPhone,
    setDob,
    setGender,
    setLanguage,
    setTimeZone,
  } = useAuthStore();

  // ================= AUTH CHECK ================= //
  useEffect(() => {
    if (!token) {
      toggleAuthState(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/user/info`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const user = res.data?.data;

        setFullName(user?.fullname || '');
        setClientEmail(user?.email || '');
        setClientPhone(user?.phone_number || '');
        setDob(user?.dob || null);
        setGender(user?.gender || '');
        setLanguage(user?.preferred_language || '');
        setTimeZone(user?.timezone || '');
        setProfilePic(user?.profilePic || '');

        toggleAuthState(true);
      } catch (error) {
        console.error('Auth check failed:', error);
        toggleAuthState(false);
      }
    };

    fetchUser();
  }, [token]);

  // ================================================= //

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

      {/* {isAuthenticated ? <DashboardNavBar /> : !hideNavbar && <Navbar />} */}

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/admin/login' element={<AdminLogin />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/forgot' element={<ForgotPassword />} />
        <Route path='/verify-otp/:emailId' element={<VerifyOTP />} />
        <Route path='/reset-password/:emailId' element={<ResetPasswordOTP />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/login' element={<Login />} />
        <Route path='/counsellor/signup' element={<CounsellorSignup />} />
        <Route path='/user/dashboard' element={<UserDashboard />} />

        <Route element={<ProtectedRoute />}>
          <Route path='/services' element={<Services />} />
          <Route path='/logout' element={<Logout />} />
          <Route
            path='/counsellor/profile/:email'
            element={<CounsellorProfile />}
          />
          <Route path='/counsellor' element={<CounsellorsGrid />} />
          <Route path='/razorpay-temporary' element={<RazorpayTemporary />} />
          <Route path='/updateprofile' element={<UpdateProfilePage />} />
        </Route>
        <Route path='/verify-token' element={<CaptureToken />} />
      </Routes>
    </div>
  );
};

// ================= ROOT APP ================= //
const App = () => {
  useEffect(() => {
    AOS.init({ once: true });
  }, []);

  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
