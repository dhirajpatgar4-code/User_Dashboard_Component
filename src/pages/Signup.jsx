import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CustomDropdown = ({ options, placeholder }) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState('');

  const isPlaceholder = selected === '';

  return (
    <div className='relative w-full'>
      {/* Input-style dropdown */}
      <div
        onClick={() => setOpen(!open)}
        className='
          px-3 py-2 border rounded-lg cursor-pointer w-full flex justify-between items-center overflow-hidden
          focus:ring-2 focus:ring-[#8473E8]
        '
        style={{
          color: isPlaceholder ? '#8473E8' : 'black', // placeholder purple, selected black
          fontWeight: isPlaceholder ? 400 : 500, // placeholder REGULAR, selected MEDIUM
        }}
      >
        <span className='truncate w-full'>{selected || placeholder}</span>

        {/* Arrow */}
        <span
          className='ml-2 text-[#8473E8] select-none'
          style={{
            fontSize: open ? '24px' : '20px', // open pe thoda wider
            transform: 'translateY(-2px)', // arrow thoda upar
            fontWeight: 400,
          }}
        >
          {open ? '⌃' : '⌄'}
        </span>
      </div>

      {/* Dropdown Options */}
      {open && (
        <div className='absolute mt-2 w-full max-h-[160px] border border-[#8473E8] rounded-[15px] bg-white overflow-auto z-20 shadow-md'>
          {options.map((opt, idx) => (
            <div
              key={idx}
              onClick={() => {
                setSelected(opt);
                setOpen(false);
              }}
              className='px-4 py-3 cursor-pointer hover:bg-[#f0f0ff] truncate'
              style={{
                color: 'black',
                fontWeight: 500,
              }}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Signup = () => {
  const [dob, setDob] = useState(null); // DOB state

  return (
    <div className='relative min-h-screen bg-white overflow-hidden'>
      {/* Desktop Safe Harbour */}
      <div
        className='hidden md:block'
        style={{
          position: 'absolute',
          top: '60px',
          left: '60px',
          width: '152px',
          height: '27px',
          fontFamily: 'Montserrat',
          fontWeight: '700',
          fontSize: '22px',
          lineHeight: '100%',
          color: '#8473E8',
        }}
      >
        Safe Harbour
      </div>

      {/* Mobile Header */}
      <div className='md:hidden w-full relative'>
        <div className='w-full h-[200px] bg-[#8473E8] rounded-b-[500px] flex justify-center items-center'>
          <h1 className='text-white text-3xl font-semibold'>Welcome</h1>
        </div>
      </div>

      {/* FORM CONTAINER */}
      <div
        className='absolute top-[200px] left-1/2 md:left-[158px] w-[90%] md:w-[584px] h-[608px] 
                   md:bg-[#FFFFFF8A] bg-[#FFFFFF8A]  
                   md:rounded-[10px] rounded-[5px] p-4 md:p-5 transform -translate-x-1/2 md:translate-x-0'
      >
        {/* LOGO */}
        <div className='w-full flex justify-center md:mt-4 mt-[25px]'>
          <img
            src='/logo.png'
            alt='logo'
            className='md:h-12 md:w-12 h-[25px] w-[26px]'
          />
        </div>

        {/* Desktop Welcome */}
        <h1 className='hidden md:block text-center text-[#8473E8] text-3xl font-semibold mt-3'>
          Welcome
        </h1>

        {/* FORM GRID */}
        <div className='grid grid-cols-2 gap-4 px-1 mt-6'>
          <input
            type='text'
            placeholder='Full Name'
            className='px-3 py-2 border border-[#8473E8] rounded-lg focus:ring-2 focus:ring-[#8473E8] placeholder-[#8473E8] truncate'
          />

          {/* DATE PICKER FIELD */}
          <div className='relative w-full z-10'>
            <DatePicker
              selected={dob}
              onChange={(date) => setDob(date)}
              placeholderText='DOB'
              className='px-3 py-2 border border-[#8473E8] rounded-lg focus:ring-2 focus:ring-[#8473E8] text-[#8473E8] w-full'
              calendarClassName='bg-white border border-[#8473E8] rounded-lg'
              dayClassName={() => 'text-[#8473E8]'}
              headerClassName='bg-[#8473E8] text-white font-semibold'
              popperClassName='shadow-lg'
              popperPlacement='bottom-start'
              portalId='root-portal'
              withPortal
            />
          </div>

          <input
            type='tel'
            placeholder='Phone'
            className='px-3 py-2 border border-[#8473E8] rounded-lg focus:ring-2 focus:ring-[#8473E8] placeholder-[#8473E8] truncate'
          />

          <CustomDropdown
            options={['Male', 'Female', 'Prefer Not To Say']}
            placeholder='Gender'
          />

          <input
            type='email'
            placeholder='Email'
            className='px-3 py-2 border border-[#8473E8] rounded-lg focus:ring-2 focus:ring-[#8473E8] placeholder-[#8473E8] truncate'
          />

          <CustomDropdown
            options={['English', 'Hindi']}
            placeholder='Language'
          />

          <input
            type='password'
            placeholder='Password'
            className='px-3 py-2 border border-[#8473E8] rounded-lg focus:ring-2 focus:ring-[#8473E8] placeholder-[#8473E8] truncate'
          />

          <CustomDropdown options={['GMT +5:30']} placeholder='Time Zone' />
        </div>

        {/* MOBILE BUTTON */}
        <div className='w-full flex justify-center mt-5 md:hidden'>
          <button className='bg-[#8473E8] hover:bg-[#5a3dcf] px-10 py-3 rounded-full flex items-center gap-3 text-white text-lg transition-colors duration-200'>
            Continue
            <span className='bg-white rounded-full p-2 flex items-center justify-center'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={2}
                stroke='#8473E8'
                className='w-5 h-5'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M17 8l4 4m0 0l-4 4m4-4H3'
                />
              </svg>
            </span>
          </button>
        </div>

        {/* TERMS */}
        <div className='mt-4'>
          <p className='text-center text-gray-600 text-xs px-4'>
            By continuing, you agree to our{' '}
            <span className='text-[#8473E8]'>Terms</span> &{' '}
            <span className='text-[#8473E8]'>Privacy Policy</span>.
          </p>

          <p className='text-center text-gray-600 text-sm mt-1 pb-4'>
            Already have an account?{' '}
            <span className='text-[#8473E8] cursor-pointer'>Login</span>
          </p>
        </div>

        {/* DESKTOP BUTTON */}
        <div className='hidden md:flex w-full justify-center mt-4'>
          <button className='bg-[#8473E8] hover:bg-[#5a3dcf] px-10 py-3 rounded-full flex items-center gap-3 text-white text-lg transition-colors duration-200'>
            Continue
            <span className='bg-white rounded-full p-2 flex items-center justify-center'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={2}
                stroke='#8473E8'
                className='w-5 h-5'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M17 8l4 4m0 0l-4 4m4-4H3'
                />
              </svg>
            </span>
          </button>
        </div>
      </div>

      {/* Desktop Video */}
      <div className='hidden md:block fixed top-0 right-0 w-[540px] h-screen overflow-hidden z-10'>
        <video
          src='/signup.mp4'
          autoPlay
          loop
          muted
          className='w-[540px] h-full object-cover'
        />
      </div>
    </div>
  );
};

export default Signup;
