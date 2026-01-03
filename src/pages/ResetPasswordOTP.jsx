import { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Logo from '../assets/Logo.png';
import RightArrow from '../assets/RightArrow.svg';
import {
  verifyUserOtp,
  sendPasswordResetOtp,
  verifyUserPasswordOtp,
} from '../services/authServiceNew';
import { toast } from 'react-toastify';

const OTP_LENGTH = 4;
const RESEND_COOLDOWN = 60;

export default function ResetPasswordOTP() {
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(''));
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [resendTimer, setResendTimer] = useState(RESEND_COOLDOWN);
  const [canResend, setCanResend] = useState(false);

  const { emailId } = useParams();
  const navigate = useNavigate();
  const inputRefs = useRef([]);

  const email = emailId;

  /* ================= Guard: missing email ================= */
  useEffect(() => {
    // if (!email) {
    //   navigate('/forgot', { replace: true });
    // }
  }, [email, navigate]);

  /* ================= Timer Logic ================= */
  useEffect(() => {
    if (!canResend && resendTimer > 0) {
      const timer = setTimeout(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);

      return () => clearTimeout(timer);
    }

    if (resendTimer === 0) {
      setCanResend(true);
    }
  }, [resendTimer, canResend]);

  /* ================= Input Handlers ================= */
  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;

    setOtp((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });

    setError('');

    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').trim();

    if (!/^\d{4}$/.test(pasted)) return;

    const digits = pasted.split('').slice(0, OTP_LENGTH);
    setOtp(digits);

    inputRefs.current[OTP_LENGTH - 1]?.focus();
  };

  /* ================= Submit ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    const otpString = otp.join('');

    if (otpString.length !== OTP_LENGTH) {
      setError('Please enter the complete verification code');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const res = await verifyUserPasswordOtp(email, otpString);
      console.log('🚀 ~ handleSubmit ~ res:', res);
      if (res.success) {
        toast.success('Account Verified!');
      }
      navigate('/reset-password');
      sessionStorage.setItem('user-email', email);
    } catch (error) {
      toast.error(error?.response?.data?.message);
      resetOtp();
    } finally {
      setSubmitting(false);
    }
  };

  const resetOtp = () => {
    setOtp(Array(OTP_LENGTH).fill(''));
    inputRefs.current[0]?.focus();
  };

  /* ================= Resend ================= */
  const handleResend = async () => {
    if (!canResend) return;

    setCanResend(false);
    setResendTimer(RESEND_COOLDOWN);
    setError('');

    try {
      const res = await sendPasswordResetOtp(email);
      if (res.status === 200) {
        toast.success('New OTP has been sent!');
      }
    } catch (err) {
      toast.error(err?.response?.data?.message);
      setError('Failed to resend code. Try again.');
    }
  };

  /* ================= Mount / Unmount ================= */
  useEffect(() => {
    inputRefs.current[0]?.focus();

    // ====== || Hide Navbar || ====== //

    const navbar = document.getElementById('navbar');
    if (navbar) navbar.style.display = 'none';

    return () => {
      if (navbar) navbar.style.display = '';
    };
  }, []);

  const formatTime = (seconds) => `00:${String(seconds).padStart(2, '0')}`;

  return (
    <div className='relative min-h-screen bg-white flex flex-col items-center overflow-hidden'>
      {/* MOBILE ARC */}
      <div className='lg:hidden w-full bg-[#8E76F2] h-[220px] rounded-b-[200px] flex flex-col justify-center items-center pt-6 px-6'>
        <h1 className='montserrat text-center text-3xl font-semibold text-white'>
          Check your email
        </h1>
        <p className='inter text-center text-sm text-white/90 mt-3'>
          Please enter the four digit verification code we sent to
        </p>
        <p className='inter text-center text-sm font-semibold text-white mt-1'>
          {email}
        </p>
      </div>

      <div className='relative z-10 w-full max-w-[860px] flex flex-col items-center mt-16 lg:mt-40 px-6'>
        <div className='lg:hidden flex justify-center mt-4 mb-6'>
          <img src={Logo} className='h-12 w-12' alt='logo' />
        </div>

        <div className='hidden lg:flex flex-col items-center mb-10'>
          <img src={Logo} alt='Safe Harbour' className='h-14 w-14 mb-4' />
          <h1 className='montserrat text-[56px] font-semibold text-[#8E76F2]'>
            Check your email
          </h1>
          <p className='inter text-lg text-[#8A8A8A] text-center'>
            Please enter the four digit verification code we sent to
          </p>
          <p className='inter text-lg font-semibold text-[#8A8A8A] mt-1'>
            {email}
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className='w-full max-w-[400px] lg:max-w-[500px] space-y-6'
        >
          <div className='flex justify-center gap-4 lg:gap-7'>
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type='text'
                inputMode='numeric'
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={index === 0 ? handlePaste : undefined}
                className='w-14 h-14 lg:w-16 lg:h-16 rounded-xl border border-[#8E76F240]
                bg-[#EDE6FF] text-center text-2xl font-semibold text-[#8E76F2]
                focus:ring-2 focus:ring-[#8E76F2]/20 focus:border-[#8E76F2]'
              />
            ))}
          </div>

          {error && <p className='text-sm text-red-500 text-center'>{error}</p>}

          <div className='flex justify-center'>
            <button
              type='submit'
              disabled={submitting || otp.join('').length !== OTP_LENGTH}
              className='group flex items-center justify-center gap-3 rounded-full
              bg-gradient-to-r from-[#8E76F2] to-[#B28AF9]
              h-12 lg:h-[56px] w-[200px] lg:w-[260px]
              text-white font-medium montserrat
              disabled:opacity-60 shadow-lg'
            >
              Continue
              <span className='grid h-8 w-8 place-items-center rounded-full bg-white text-[#8E76F2]'>
                <img src={RightArrow} className='h-4 w-4' alt='' />
              </span>
            </button>
          </div>

          <div className='flex flex-col items-center gap-2 text-sm inter'>
            <p>
              Didn’t get the code?{' '}
              {canResend ? (
                <button
                  type='button'
                  onClick={handleResend}
                  className='text-[#8E76F2] underline'
                >
                  Resend
                </button>
              ) : (
                <span className='text-[#8E76F2] underline'>
                  Resend in {formatTime(resendTimer)}
                </span>
              )}
            </p>

            <p className='text-[#8A8A8A]'>
              Entered wrong email?{' '}
              <a className='text-[#8E76F2] underline' href='/forgot'>
                Back
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
