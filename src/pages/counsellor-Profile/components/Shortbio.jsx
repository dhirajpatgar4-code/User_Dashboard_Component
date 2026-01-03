import React from 'react';

const Shortbio = ({ bioPoints }) => {
  return (
    <div className='bg-white w-full  '>
      {/* Heading */}
      <h2 className='text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-black mb-1.25 sm:mb-2.5'>
        Short Bio
      </h2>

      {/* Bio Content */}
      <div className='text-black text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-medium leading-[100%] space-y-1 sm:space-y-4'>
        {bioPoints.map((point, index) => (
          <div key={index} className='flex items-start gap-1 sm:gap-3'>
            <span>•</span>
            <p>{point}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shortbio;
