import React from 'react';
import Stars from './Stars';

function TestimonialsCard({ review }) {
  const { name, designation, imageURL, stars, description } = review;

  return (
    <div
      className='flex flex-col items-start
        py-[12.6px] px-[21px]
        sm:px-[35px] sm:py-[21px]
        gap-[8.4px] sm:gap-3.5
        box-border
        border-black
        rounded-[16.8px] sm:rounded-[28px]
        border-[0.42px] sm:border-[0.7px]
        shadow-[0_0_8px_#8473E8]'
    >
      {/* Review text */}
      <p
        className='font-[Inter] font-medium text-[9.24px] sm:text-[15.4px]
        leading-[11px] sm:leading-[19px]
        tracking-[-0.06em] text-black'
      >
        {description}
      </p>

      {/* Rating */}
      <Stars count={stars} />

      {/* Author info */}
      <div className='flex gap-[8.4px] items-start'>
        <img
          src={imageURL}
          alt='avatar'
          className='rounded-full h-4 w-4 sm:h-7 sm:w-7'
        />

        <div>
          <div
            className='font-[Inter] font-semibold text-[6.72px] sm:text-[11.2px]
            leading-[140%] text-[#757575]'
          >
            {name}
          </div>

          <div
            className='font-[Inter] font-normal text-[6.72px] sm:text-[11.2px]
            leading-[140%] text-[#B3B3B3]'
          >
            {designation}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestimonialsCard;
