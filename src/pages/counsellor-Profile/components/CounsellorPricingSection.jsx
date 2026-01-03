import React from 'react';

function CounsellorPricingSection({ pricing }) {
  return (
    <section className={` inter w-[55%]`}>
      <h3 className='text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-dark mb-2.5 sm:mb-4'>
        Pricing
      </h3>

      <div className='flex flex-col gap-1'>
        {pricing.map((service) => (
          <div
            key={service.id}
            className='flex items-center justify-between text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-medium  text-dark border-b-1'
          >
            <span>{service.name}</span>

            <span>₹{service.price}/-</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CounsellorPricingSection;
