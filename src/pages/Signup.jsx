import { useState, useCallback, useRef, useEffect } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/style.css';
import { toast } from 'react-toastify';
import { z } from 'zod';
import {
  sendEmailVerificationOtp,
  signupUser,
} from '../services/authServiceNew';
import { Link, useNavigate } from 'react-router-dom';
import useTitle from '../hooks/useTitle';
import { useAuthStore } from '../store/auth-store';

/* =======================
   ZOD VALIDATION
======================= */
const SignupValidation = z.object({
  fullname: z
    .string()
    .min(3, 'Full name must be at least 3 characters')
    .max(50),
  email: z.string().email('Invalid email'),
  phone_number: z.string().regex(/^[0-9]{10}$/, 'Phone must be 10 digits'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must include an uppercase letter')
    .regex(/[0-9]/, 'Password must include a number'),
  dob: z
    .date()
    .refine((date) => date < new Date(), 'DOB cannot be in the future'),
  gender: z.enum(['male', 'female', 'other']),
  timezone: z.string().min(2),
  preferred_language: z.string().min(2),
});

/* =======================
   HELPERS
======================= */
const normalizePhone = (value) => {
  let digits = value.replace(/\D/g, '');

  if (digits.startsWith('91') && digits.length > 10) {
    digits = digits.slice(2);
  }

  return digits.slice(0, 10);
};

/* =======================
   ACCESSIBLE CUSTOM DROPDOWN
   (UI IDENTICAL)
======================= */
const CustomDropdown = ({ options, placeholder, value, onChange }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const isPlaceholder = !value;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={ref} className='relative w-full'>
      <div
        role='button'
        tabIndex={0}
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        onKeyDown={(e) => e.key === 'Enter' && setOpen(!open)}
        className='px-3 py-2 border rounded-lg cursor-pointer w-full flex justify-between items-center overflow-hidden'
        style={{
          color: isPlaceholder ? '#8473E8' : 'black',
          fontWeight: isPlaceholder ? 400 : 500,
        }}
      >
        <span className='truncate w-full'>{value || placeholder}</span>
        <span
          className='ml-2 text-[#8473E8] select-none'
          style={{
            fontSize: open ? '24px' : '20px',
            transform: 'translateY(-2px)',
          }}
        >
          {open ? '⌃' : '⌄'}
        </span>
      </div>

      {open && (
        <div
          role='listbox'
          className='absolute mt-2 w-full max-h-[160px] border border-[#8473E8] rounded-[15px] bg-white overflow-auto z-20 shadow-md'
        >
          {options.map((opt) => (
            <div
              key={opt}
              role='option'
              tabIndex={0}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  onChange(opt);
                  setOpen(false);
                }
              }}
              className='px-4 py-3 cursor-pointer hover:bg-[#f0f0ff] truncate'
              style={{ fontWeight: 500 }}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/* =======================
   SIGNUP COMPONENT
======================= */
const Signup = () => {
  const isAuthenticated = useAuthStore((state) => state.authenticated);
  useTitle('Join');
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  });
  const [showCalendar, setShowCalendar] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    fullname: '',
    email: '',
    phone_number: '',
    password: '',
    dob: null,
    gender: '',
    timezone: 'Asia/India',
    preferred_language: '',
  });

  const handleInputData = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }, []);

  const navigate = useNavigate();

  /* =======================
     SUBMIT HANDLER
  ======================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      SignupValidation.parse(form);

      const res = await signupUser(
        form.fullname,
        form.email,
        form.password,
        form.phone_number,
        form.dob.toISOString(),
        form.gender,
        form.timezone,
        form.preferred_language,
      );

      if (!res?.success) {
        throw new Error(res?.msg || 'Signup failed');
      }

      toast.success('Welcome! Your account is ready.');
      await sendEmailVerificationOtp(form.email);
      navigate(`/verify-otp/${form.email}`);
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.issues[0].message);
      } else {
        toast.error(error.response.data.message || 'Something went wrong');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      data-aos='fade-left'
      className='relative min-h-screen bg-white overflow-hidden'
    >
      {/* Desktop Safe Harbour */}
      <div className='hidden md:block absolute top-[60px] left-[60px] text-[#8473E8] text-[22px] font-bold'>
        Safe Harbour
      </div>

      {/* Mobile Header */}
      <div className='md:hidden w-full relative'>
        <div className='w-full h-[200px] bg-[#8473E8] rounded-b-[500px] flex justify-center items-center'>
          <h1 className='text-white text-3xl font-semibold'>Welcome</h1>
        </div>
      </div>

      {/* FORM CONTAINER */}
      <form
        onSubmit={handleSubmit}
        className='absolute top-[200px] left-1/2 md:left-[158px] w-[90%] md:w-[584px] h-[608px]
        bg-[#FFFFFF8A] md:rounded-[10px] rounded-[5px] p-4 md:p-5 transform -translate-x-1/2 md:translate-x-0'
      >
        {/* LOGO */}
        <div className='w-full flex justify-center mt-[25px] md:mt-4'>
          <img
            src='/logo.png'
            alt='logo'
            className='h-[25px] w-[26px] md:h-12 md:w-12'
          />
        </div>

        <h1 className='hidden md:block text-center text-[#8473E8] text-3xl font-semibold mt-3'>
          Welcome
        </h1>

        {/* FORM GRID */}
        <div className='grid grid-cols-2 gap-4 px-1 mt-6'>
          <input
            name='fullname'
            value={form.fullname}
            onChange={handleInputData}
            placeholder='Full Name'
            className='px-3 py-2 border border-[#8473E8] rounded-lg placeholder-[#8473E8]'
          />

          {/* DOB */}
          <div className='relative'>
            <input
              readOnly
              onClick={() => setShowCalendar(!showCalendar)}
              value={form.dob ? form.dob.toLocaleDateString() : ''}
              placeholder='DOB'
              className='px-3 py-2 border border-[#8473E8] rounded-lg placeholder-[#8473E8] w-full cursor-pointer'
            />

            {showCalendar && (
              <div className='absolute z-30 mt-2 bg-white border border-[#8473E8] rounded-lg shadow-lg'>
                <DayPicker
                  mode='single'
                  selected={form.dob}
                  onSelect={(date) => {
                    if (date) {
                      setForm((prev) => ({ ...prev, dob: date }));
                      setShowCalendar(false);
                    }
                  }}
                  className='p-3 text-[#8473E8]'
                />
              </div>
            )}
          </div>

          <input
            type='tel'
            value={form.phone_number}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                phone_number: normalizePhone(e.target.value),
              }))
            }
            placeholder='Phone'
            className='px-3 py-2 border border-[#8473E8] rounded-lg placeholder-[#8473E8]'
          />

          <CustomDropdown
            options={['male', 'female', 'other']}
            placeholder='Gender'
            value={form.gender}
            onChange={(v) => setForm((prev) => ({ ...prev, gender: v }))}
          />

          <input
            type='email'
            name='email'
            value={form.email}
            onChange={handleInputData}
            placeholder='Email'
            className='px-3 py-2 border border-[#8473E8] rounded-lg placeholder-[#8473E8]'
          />

          <CustomDropdown
            options={['English', 'Hindi']}
            placeholder='Language'
            value={form.preferred_language}
            onChange={(v) =>
              setForm((prev) => ({ ...prev, preferred_language: v }))
            }
          />

          <input
            type='password'
            name='password'
            value={form.password}
            onChange={handleInputData}
            placeholder='Password'
            className='px-3 py-2 border border-[#8473E8] rounded-lg placeholder-[#8473E8]'
          />

          <CustomDropdown
            readOnly
            options={[form.timezone]}
            placeholder='Time Zone'
            value={form.timezone}
            onChange={(v) => setForm((prev) => ({ ...prev, timezone: v }))}
          />
        </div>

        {/* BUTTON */}
        <div className='w-full flex justify-center mt-5'>
          <button
            type='submit'
            disabled={loading}
            className='bg-[#8473E8] hover:bg-[#5a3dcf] px-10 py-3 rounded-full flex items-center gap-3 text-white text-lg'
          >
            {loading ? 'Please wait...' : 'Continue'}
          </button>
        </div>
        <p className='text-center text-xs text-[#8A8A8A] mt-5'>
          By continuing, you agree to our{' '}
          <a className='underline hover:text-[#8E76F2]'>Terms</a> and{' '}
          <a className='underline hover:text-[#8E76F2]'>Privacy Policy</a>
        </p>
        <p className='text-center text-xs text-[#8A8A8A] mt-3'>
          Already have an account?{' '}
          <Link to='/login' className='underline hover:text-[#8E76F2]'>
            Login
          </Link>
        </p>
      </form>

      {/* Desktop Video */}
      <div className='hidden md:block fixed top-0 right-0 w-[540px] h-screen'>
        <video
          src='/signup.mp4'
          autoPlay
          loop
          muted
          className='w-full h-full object-cover'
        />
      </div>
    </div>
  );
};

export default Signup;
