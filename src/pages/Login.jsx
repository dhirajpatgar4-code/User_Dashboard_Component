import { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import RightArrow from '../assets/RightArrow.svg';
import LoginHero from '../assets/login 1.png';
import Logo from '../assets/Logo.png';
import { userLogin } from '../services/authServiceNew';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth-store';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Login() {
  const [formValues, setFormValues] = useState({ email: '', password: '' });
  const [touched, setTouched] = useState({ email: false, password: false });
  const [submitting, setSubmitting] = useState(false);
  const isAuthenticated = useAuthStore((state) => state.authenticated);
  const toggleAuthState = useAuthStore((state) => state.toggleAuthState);

  // =========================
  // Frontend validation
  // Mirrors backend Zod schema:
  // email: z.email()
  // Password: z.string()
  // =========================

  const emailError = useMemo(() => {
    if (!formValues.email) return 'Email is required';
    if (!emailRegex.test(formValues.email)) return 'Enter a valid email';
    return '';
  }, [formValues.email]);

  const passwordError = useMemo(() => {
    if (!formValues.password) return 'Password is required';
    return '';
  }, [formValues.password]);

  const isFormValid = !emailError && !passwordError;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ email: true, password: true });

    if (!isFormValid || submitting) return;

    setSubmitting(true);
    const loadingToast = toast.loading('Signing you in...');

    try {
      const res = await userLogin(formValues.email.trim(), formValues.password);
      console.log('🚀 ~ handleSubmit ~ res:', res);

      toast.dismiss(loadingToast);

      if (res?.message === 'Login successful') {
        toast.success('Login successful');
        toggleAuthState(true);
        navigate('/');
        window.scrollTo(0, 0);
      }
    } catch (error) {
      toast.dismiss(loadingToast);

      const status = error?.response?.status;
      const message =
        error?.response?.data?.message ||
        error?.message ||
        'Something went wrong. Please try again.';

      if (status === 401) {
        toast.error('Invalid email or password');
      } else if (status === 400) {
        toast.error(message);
      } else if (status >= 500) {
        toast.error('Server error. Please try again later.');
      } else if (status === 404) {
        toast.error('Account not found! Please check email.');
      } else {
        toast.error(message);
      }
    } finally {
      setSubmitting(false);
    }
  };

  // ====== || Hide Navbar || ====== //
  useEffect(() => {
    const navbar = document.getElementById('navbar');
    if (navbar) navbar.style.display = 'none';

    return () => {
      if (navbar) navbar.style.display = '';
    };
  }, []);

  return (
    <div className='relative min-h-screen bg-white flex flex-col lg:flex-row overflow-hidden'>
      {/* MOBILE PURPLE ARC */}
      <div className='lg:hidden w-full bg-[#8E76F2] h-[220px] rounded-b-[200px] flex flex-col justify-center items-center'>
        <h1 className='montserrat text-center text-3xl font-semibold text-white px-6'>
          Welcome
        </h1>
      </div>

      <div className='relative z-10 w-full lg:w-1/2 px-6 sm:px-10 lg:px-16 pt-6 lg:pt-6 pb-12 lg:pb-6 flex flex-col'>
        {/* DESKTOP BRAND */}
        <div className='hidden lg:flex items-center gap-2 text-base font-semibold text-[#8E76F2] mb-8'>
          <span className='montserrat'>Safe Harbour</span>
        </div>

        {/* CENTER CONTENT */}
        <div className='flex flex-1 items-center justify-center w-full lg:ml-[27%]'>
          <div className='w-full max-w-[563px] flex flex-col items-center'>
            {/* MOBILE ICON */}
            <div className='lg:hidden flex justify-center mt-10 mb-6'>
              <img src={Logo} alt='brand icon' className='h-12 w-12' />
            </div>

            {/* DESKTOP TITLE */}
            <div className='hidden lg:flex flex-col items-center gap-3 mb-6'>
              <img src={Logo} alt='brand icon' className='h-10 w-10' />
              <h1 className='montserrat text-[52px] font-semibold text-[#8E76F2]'>
                Welcome
              </h1>
            </div>

            {/* FORM */}
            <form
              className='w-full max-w-[400px] lg:max-w-[500px] space-y-6'
              onSubmit={handleSubmit}
              noValidate
            >
              {/* EMAIL */}
              <div>
                <input
                  id='email'
                  name='email'
                  type='email'
                  placeholder='Email'
                  value={formValues.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete='email'
                  className={`w-full h-12 lg:h-[56px] rounded-lg border px-5 text-base outline-none transition-colors
                    ${
                      touched.email && emailError
                        ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                        : 'border-[#8E76F240] focus:ring-2 focus:ring-[#8E76F2]/20'
                    } text-[#2E2E2E] bg-white placeholder-[#B9A8F6]`}
                />
                {touched.email && emailError && (
                  <p className='text-sm text-red-500 mt-2'>{emailError}</p>
                )}
              </div>

              {/* PASSWORD */}
              <div>
                <input
                  id='password'
                  name='password'
                  type='password'
                  placeholder='Password'
                  value={formValues.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete='current-password'
                  className={`w-full h-12 lg:h-[56px] rounded-lg border px-5 text-base outline-none transition-colors
                    ${
                      touched.password && passwordError
                        ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                        : 'border-[#8E76F240] focus:ring-2 focus:ring-[#8E76F2]/20'
                    } text-[#2E2E2E] bg-white placeholder-[#B9A8F6]`}
                />

                <div className='flex justify-between mt-2'>
                  {touched.password && passwordError && (
                    <p className='text-sm text-red-500'>{passwordError}</p>
                  )}
                  <a
                    className='text-sm text-[#8A8A8A] hover:text-[#8E76F2]'
                    href='/forgot'
                  >
                    Forgot Password?
                  </a>
                </div>
              </div>

              {/* BUTTON */}
              <div className='flex justify-center'>
                <button
                  type='submit'
                  disabled={!isFormValid || submitting}
                  className='group flex items-center justify-center gap-3 rounded-full
                  bg-gradient-to-r from-[#8E76F2] to-[#B28AF9] h-12 lg:h-[56px] w-[200px] lg:w-[260px]
                  text-white font-medium text-base montserrat
                  hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed
                  transition-opacity shadow-lg'
                >
                  {submitting ? 'Please wait...' : 'Continue'}
                  <span className='grid h-8 w-8 place-items-center rounded-full bg-white text-[#8E76F2]'>
                    <img src={RightArrow} alt='' className='h-4 w-4' />
                  </span>
                </button>
              </div>

              {/* TERMS */}
              <p className='text-center text-xs text-[#8A8A8A] mt-4'>
                By continuing, you agree to our{' '}
                <a className='underline hover:text-[#8E76F2]'>Terms</a> and{' '}
                <a className='underline hover:text-[#8E76F2]'>Privacy Policy</a>
              </p>

              <p className='text-center text-xs text-[#8A8A8A] mt-1'>
                Don’t have an account?{' '}
                <Link to='/signup' className='underline hover:text-[#8E76F2]'>
                  Signup
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* RIGHT IMAGE */}
      <div className='hidden lg:flex justify-end items-center w-1/2 h-screen bg-white overflow-hidden'>
        <img
          src={LoginHero}
          alt='Medical professional assisting'
          className='max-h-full max-w-full object-contain'
        />
      </div>
    </div>
  );
}
