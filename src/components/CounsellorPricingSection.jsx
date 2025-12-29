import React from 'react';

const PRICING_SERVICES = [
  {
    id: 'mental-health',
    name: 'Mental Health',
    price: 1199,
    currency: '₹',
  },
  {
    id: 'wellness-therapy',
    name: 'Wellness & Therapy',
    price: 1299,
    currency: '₹',
  },
];

function CounsellorPricingSection() {
  return (
    <section className='mt-4 inter'>
      <h3 className='text-2xl font-bold text-dark mb-2'>Pricing</h3>

      <div className='flex flex-col gap-1'>
        {PRICING_SERVICES.map((service) => (
          <div
            key={service.id}
            className='flex items-center justify-between text-xl font-medium  text-dark divide-y'
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
