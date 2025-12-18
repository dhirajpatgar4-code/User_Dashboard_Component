import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/Logo.png';
import RightArrow from '../../assets/RightArrow.svg';
import { forgotPassword } from '../../services/authService';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [touched, setTouched] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (touched) {
      setError(emailRegex.test(value) ? '' : 'Please enter a valid email');
    }
  };

  const handleBlur = () => {
    setTouched(true);
    if (!email || !emailRegex.test(email)) {
      setError('Please enter a valid email');
    } else {
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched(true);

    if (!email || !emailRegex.test(email)) {
      setError('Please enter a valid email');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const result = await forgotPassword(email);

      if (result.success) {
        const maskedEmail = email.replace(
          /(.{2})(.*)(@.*)/,
          (_, start, middle, end) =>
            start + '*'.repeat(Math.min(middle.length, 10)) + end,
        );

        sessionStorage.setItem('resetEmail', email);
        sessionStorage.setItem('maskedEmail', maskedEmail);

        navigate('/verify-otp');
      } else {
        setError(result.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className='relative min-h-screen bg-white flex flex-col items-center overflow-hidden'>
      {/* 🔵 FIXED MOBILE ARC AT TOP */}
      <div className='lg:hidden w-full bg-[#8E76F2] h-[220px] rounded-b-[200px] flex flex-col justify-center items-center pt-6 px-6'>
        <h1 className='montserrat text-center text-3xl font-semibold text-white leading-tight'>
          Forgot Your Password?
        </h1>
        <p className='inter text-center text-sm text-white/90 leading-relaxed mt-3 px-4'>
          A code will be sent to your email to help reset password
        </p>
      </div>

      {/* DESKTOP BRAND (TOP LEFT) */}
      <div className='hidden lg:flex items-center gap-2 text-base font-semibold text-[#8E76F2] absolute top-6 left-6'>
        <span className='montserrat'>Safe Harbour</span>
      </div>

      {/* MAIN CONTENT */}
      <div className='relative z-10 w-full max-w-[860px] flex flex-col items-center mt-16 lg:mt-40 px-6'>
        {/* MOBILE ICON BELOW ARC */}
        <div className='lg:hidden flex justify-center mt-4 mb-6'>
          <img src={Logo} alt='Safe Harbour logo' className='h-12 w-12' />
        </div>

        {/* DESKTOP HEADER WITH LOGO */}
        <div className='hidden lg:flex flex-col items-center mb-10'>
          <img src={Logo} alt='Safe Harbour logo' className='h-14 w-14 mb-4' />

          <h1 className='montserrat text-[56px] font-semibold text-[#8E76F2] mb-4'>
            Forgot Your Password?
          </h1>

          <p className='inter text-lg text-[#8A8A8A] text-center max-w-md leading-relaxed'>
            A code will be sent to your email to help reset password
          </p>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className='w-full max-w-[400px] lg:max-w-[500px] space-y-6'
          noValidate
        >
          {/* EMAIL INPUT */}
          <div>
            <input
              id='email'
              type='email'
              value={email}
              onChange={handleEmailChange}
              onBlur={handleBlur}
              placeholder='Email'
              aria-label='Email address'
              aria-required='true'
              aria-invalid={touched && !!error}
              aria-describedby={error ? 'email-error' : undefined}
              className={`w-full h-12 lg:h-[56px] rounded-lg border px-5 text-base
                outline-none transition-colors
                ${
                  error
                    ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                    : 'border-[#8E76F240] focus:ring-2 focus:ring-[#8E76F2]/20'
                }
                text-[#2E2E2E] bg-white placeholder-[#B9A8F6]`}
            />
            {touched && error && (
              <p
                id='email-error'
                role='alert'
                className='text-sm text-red-500 mt-2 inter'
              >
                {error}
              </p>
            )}
          </div>

          {/* CONTINUE BUTTON */}
          <div className='flex justify-center'>
            <button
              type='submit'
              disabled={submitting || !email || !!error}
              aria-disabled={submitting || !email || !!error}
              className='group flex items-center justify-center gap-3 rounded-full
                bg-gradient-to-r from-[#8E76F2] to-[#B28AF9]
                h-12 lg:h-[56px] w-[200px] lg:w-[260px]
                text-white font-medium text-base montserrat
                hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed
                transition-opacity shadow-lg'
            >
              Continue
              <span className='grid h-8 w-8 place-items-center rounded-full bg-white text-[#8E76F2]'>
                <img src={RightArrow} alt='' className='h-4 w-4' />
              </span>
            </button>
          </div>

          {/* BACK TO LOGIN */}
          <div className='flex justify-center'>
            <a
              href='/admin/login'
              className='text-sm text-[#8A8A8A] hover:text-[#8E76F2] underline inter transition-colors'
            >
              Back to Login
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
