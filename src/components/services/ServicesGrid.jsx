// ServicesGrid.jsx
// Services grid with category tabs and responsive layout

import { useEffect, useState } from 'react';
import ServiceCard from './ServiceCard';
import { servicesData } from '../../data/servicesData';
import { slugService } from '../../services/dashboardService';

const ServicesGrid = () => {
  const [activeCategory, setActiveCategory] = useState('mental-health');
  const [services, setServices] = useState([]);

  const categories = [
    { key: 'mental-health', label: 'Mental Health' },
    { key: 'wellness-therapy', label: 'Wellness & Therapy' },
    { key: 'sexual-health', label: 'Sexual Health' },
    { key: 'womens-health', label: "Women's Health" },
  ];

  // fallback to static data if API fails or returns empty
  const currentServices = services.length > 0
    ? services
    : servicesData[activeCategory] || [];

  useEffect(() => {
    const handleService = async () => {
      try {
        const res = await slugService(activeCategory);
        setServices(res?.data || res || []);
      } catch (error) {
        console.error(error);
        setServices([]);
      }
    };

    handleService();
  }, [activeCategory]);

  return (
    <section className='w-full flex justify-center lg:-mt-36 -mt-24  bg-white py-8 sm:py-12 lg:py-16'>
      <div className='w-full max-w-[1214px] px-4 sm:px-6'>
        {/* Category Tabs */}
        <div className='flex overflow-x-auto lg:overflow-x-visible lg:justify-between mb-8 sm:mb-10 lg:mb-12 scrollbar-hide' style={{ gap: '0px' }}>
          {categories.map((category) => (
            <button
              key={category.key}
              onClick={() => setActiveCategory(category.key)}
              className='
                relative
                text-[9.5px]
                lg:text-lg
                font-medium
                transition-colors
                duration-300
                pb-4
                px-0
                mr-6
                sm:mr-8
                lg:mr-0
                lg:flex-1
                whitespace-nowrap
                flex-shrink-0
                border-b-2
              '
              style={{
                fontFamily: 'Inter, Montserrat, sans-serif',
                color: activeCategory === category.key ? '#8473E8' : '#000000',
                borderBottomColor: activeCategory === category.key ? '#8473E8' : 'transparent',
              }}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div
          className='
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-2
          '
          style={{ gap: '16px' }}
        >
          {currentServices.map((service, index) => (
            <ServiceCard
              key={service._id || index}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>
      </div>
      
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default ServicesGrid;