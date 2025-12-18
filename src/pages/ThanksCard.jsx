import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const ThanksCard = () => {
  return (
    <div className='w-full min-h-screen flex flex-col items-center justify-center relative bg-white font-inter px-4'>
      {/* Safe Harbour - Desktop Top Left */}
      <h1
        className='
        hidden md:block
        absolute top-6 left-6 
        text-[#8473E8] 
        font-medium 
        tracking-wide
        text-xl 
        md:text-2xl
      '
      >
        Safe Harbour
      </h1>

      {/* Center Content */}
      <div className='flex flex-col items-center text-center w-full max-w-[850px] px-2'>
        {/* Logo */}
        <img
          src={logo}
          alt='Logo'
          className='
            w-[45px] h-[43px] 
            mb-2 
            md:mb-8
          '
        />

        {/* Safe Harbour - Mobile Center */}
        <h1
          className='
          md:hidden
          text-[#8473E8]
          font-medium
          text-xl
          mb-4
        '
        >
          Safe Harbour
        </h1>

        {/* Title */}
        <h2
          className='
          text-black 
          font-medium 
          leading-[100%]
          mb-4
          text-[28px] 
          md:text-[40px]
        '
        >
          Thanks for joining us!
        </h2>

        {/* Subtitle */}
        <p
          className='
            text-black
            font-normal
            leading-[120%]
            text-center
            mb-10

            text-[16px]
            md:text-[26px]

            w-full
            max-w-[728px]
          '
        >
          We’ve received your information — our team will reach out to you as
          soon as possible.
        </p>

        {/* Back to Landing Page */}
        <Link
          to='/'
          className='
            underline 
            text-[14px] 
            md:text-[16px]
            font-light 
            leading-[100%] 
            text-[#0000008A]
            mt-4
          '
        >
          Back to Landing Page
        </Link>
      </div>
    </div>
  );
};

export default ThanksCard;
