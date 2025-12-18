import React from 'react';

const AboutUs = () => {
  return (
    <section className='w-full flex justify-center bg-white py-16'>
      <div className='w-full max-w-[1214px] px-4'>
        {/* ABOUT */}
        <h2
          className='text-[#8473E8] font-light italic text-[24px] sm:text-[28px] lg:text-[32px] text-center mb-5'
          style={{ fontFamily: 'Merriweather' }}
        >
          About
        </h2>

        {/* ABOUT CONTENT */}
        <div
          className='
            font-medium 
            leading-[100%] 
            text-center 
            mt-5
            text-[26px]
            sm:text-[36px]
            lg:text-[50px]
          '
          style={{ fontFamily: 'Inter' }}
        >
          {/* LINE 1 */}
          <div>
            <span>Our team of highly </span>
            <span className='text-[#8473E8]'>experienced doctors</span>
          </div>

          {/* LINE 2 */}
          <div>
            <span className='text-[#EE82EE]'>
              and specialists are dedicated
            </span>
            <span> to offering the best</span>
          </div>

          {/* LINE 3 */}
          <div>
            <span className='text-[#4BDCFD]'>medical care</span>
            <span> tailored to your unique</span>
          </div>

          {/* LINE 4 */}
          <div>
            <span className='text-[#FABE2B]'>needs</span>
          </div>
        </div>

        {/* TAGLINE */}
        <div className='mt-6 sm:mt-8 flex justify-end pr-4 sm:pr-12 lg:pr-24'>
          <p
            className='
      text-black
      font-medium
      leading-[100%]
      text-left sm:text-right
      text-[12px]
      sm:text-[16px]
      lg:text-[20px]
      w-[340px]
      lg:w-[439px]
    '
            style={{ fontFamily: 'Montserrat' }}
          >
            —— Enjoy the Ease Experience With Us
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
