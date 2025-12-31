// ServicesGrid.jsx
// Services grid with category tabs and responsive layout

import { useState } from 'react';
import ServiceCard from './ServiceCard';
import { servicesData } from '../../data/servicesData';

const ServicesGrid = () => {
  const [activeCategory, setActiveCategory] = useState('mentalHealth');

  const categories = [
    { key: 'mentalHealth', label: 'Mental Health' },
    { key: 'wellnessAndTherapy', label: 'Wellness & Therapy' },
    { key: 'sexualHealth', label: 'Sexual Health' },
    { key: 'womensHealth', label: "Women's Health" },
  ];

  const currentServices = servicesData[activeCategory] || [];

  return (
    <section className='w-full flex justify-center bg-white py-8 sm:py-12 lg:py-16'>
      <div className='w-full max-w-[1214px] px-4'>
        {/* Category Tabs */}
        <div className='flex flex-wrap lg:flex-nowrap lg:justify-between gap-4 sm:gap-6 mb-8 sm:mb-10 lg:mb-12 border-b border-gray-200 pb-4'>
          {categories.map((category) => (
            <button
              key={category.key}
              onClick={() => setActiveCategory(category.key)}
              className='
                relative
                text-base
                sm:text-lg
                font-medium
                transition-colors
                duration-300
                pb-2
                lg:flex-1
              '
              style={{
                fontFamily: 'Inter, Montserrat, sans-serif',
                color: activeCategory === category.key ? '#8473E8' : '#000000',
              }}
            >
              {category.label}
              {activeCategory === category.key && (
                <span
                  className='
                    absolute
                    bottom-0
                    left-0
                    h-0.5
                    bg-[#8473E8]
                    transition-all
                    duration-300
                  '
                  style={{ width: '100%' }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div
          className='
            grid
            grid-cols-1
            md:grid-cols-2
            lg:grid-cols-3
          '
          style={{ gap: '24px' }}
        >
          {currentServices.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;

