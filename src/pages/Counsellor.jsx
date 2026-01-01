import { useState, useEffect } from 'react';
import { counsellorService } from '../services/dashboardService.js';

const socialLinks = [
  { id: 1, icon: 'https://cdn-icons-png.flaticon.com/512/174/174848.png', link: '#' },
  { id: 2, icon: 'https://cdn-icons-png.flaticon.com/512/2111/2111463.png', link: '#' },
  { id: 3, icon: 'https://cdn-icons-png.flaticon.com/512/300/300221.png', link: '#' },
  { id: 4, icon: 'https://cdn-icons-png.flaticon.com/512/5968/5968830.png', link: '#' },
];

const CounsellorCard = ({ counsellor }) => {
  return (
    <div className='relative w-[201px] h-[251px] md:w-[280px] md:h-[350px] lg:w-[300px] lg:h-[375px]'>
      <img
        src={counsellor.documents?.profile_picture || 'https://via.placeholder.com/400x500'}
        alt={counsellor.fullname}
        className='absolute inset-0 w-full h-full object-cover rounded-3xl'
      />

      {/* GLASS CARD */}
      <div
        className='absolute bottom-6 left-1/2 -translate-x-1/2
                   w-[140px] h-[95px] md:w-[190px] md:h-[125px] lg:w-[205px] lg:h-[135px]
                   backdrop-blur-md bg-white/10'
        style={{
          WebkitMaskImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 75'%3E%3Cpath fill='white' d='M15 0.25H80.3125C85.3176 0.25 89.375 4.30742 89.375 9.3125C89.375 14.5937 93.6563 18.875 98.9375 18.875H104.562C112.674 18.875 119.25 25.4508 119.25 33.5625V59.5C119.25 67.6462 112.646 74.25 104.5 74.25H15C6.8538 74.25 0.250002 67.6462 0.25 59.5V15C0.25 6.8538 6.8538 0.250001 15 0.25Z'/%3E%3C/svg%3E\")",
          WebkitMaskSize: '100% 100%',
        }}
      />

      {/* STROKE */}
      <svg
        className='absolute bottom-6 left-1/2 -translate-x-1/2
                   w-[140px] h-[95px] md:w-[190px] md:h-[125px] lg:w-[205px] lg:h-[135px]'
        viewBox='0 0 120 75'
        fill='none'
      >
        <path
          d='M15 0.25H80.3125C85.3176 0.25 89.375 4.30742 89.375 9.3125C89.375 14.5937 93.6563 18.875 98.9375 18.875H104.562C112.674 18.875 119.25 25.4508 119.25 33.5625V59.5C119.25 67.6462 112.646 74.25 104.5 74.25H15C6.8538 74.25 0.250002 67.6462 0.25 59.5V15C0.25 6.8538 6.8538 0.250001 15 0.25Z'
          stroke='white'
          strokeWidth='0.5'
        />
      </svg>

      {/* CONTENT */}
      <div
        className='absolute bottom-6 left-1/2 -translate-x-1/2
                   w-[140px] h-[95px] md:w-[190px] md:h-[125px] lg:w-[205px] lg:h-[135px]
                   p-3 flex flex-col justify-between text-white'
      >
        <div className='md:mt-4'>
          <p className='text-[13px] md:text-[18px] lg:text-[20px] text-white font-semibold leading-normal'>
            {counsellor.fullname}
          </p>
          <p className='text-[10px] md:text-[12px] lg:text-[13px] text-white/54 font-semibold leading-normal'>
            {counsellor.counselling_type}
          </p>
        </div>

        <div className='flex gap-2'>
          {socialLinks.map((social) => (
            <a
              key={social.id}
              href={social.link}
              className='h-6 w-6 rounded-full ml-2 flex items-center justify-center'
            >
              <img
                src={social.icon}
                alt='social'
                className='md:h-6 md:w-6 h-3 w-3'
              />
            </a>
          ))}
        </div>
      </div>

      {/* BUBBLE */}
      <button
        className='
          absolute
          right-10
          bottom-24 md:bottom-[100px] lg:bottom-[130px]
          md:right-[70px] lg:right-[55px]
          w-[21px] h-[21px]
          lg:w-[36px] lg:h-[36px]
          rounded-full
          border border-white/40
          backdrop-blur-md
          flex items-center justify-center
          text-white
        '
      >
        <svg width='16' height='16' viewBox='0 0 24 24' fill='none'>
          <path
            d='M7 17L17 7M17 7H9M17 7V15'
            stroke='white'
            strokeWidth='1.5'
          />
        </svg>
      </button>
    </div>
  );
};

const CounsellorsGrid = () => {
  const [activeCategory, setActiveCategory] = useState('mental-health');
  const [counsellors, setCounsellors] = useState([]);

  const categories = [
    { key: 'mental-health', label: 'Mental Health' },
    { key: 'wellness-therapy', label: 'Wellness & Therapy' },
    { key: 'sexual-health', label: 'Sexual Health' },
    { key: 'womens-health', label: "Women's Health" },
  ];

  useEffect(() => {
    const handleCounsellor = async () => {
      try {
        const res = await counsellorService(activeCategory);
        setCounsellors(res?.counsellors || res?.data || res || []);
      } catch (error) {
        console.error(error);
        setCounsellors([]);
      }
    };

    handleCounsellor();
  }, [activeCategory]);

  return (
    <section className='w-full flex justify-center lg:-mt-7 bg-white py-8 sm:py-12 lg:py-16'>
      <div className='w-full max-w-[1400px] px-4 sm:px-6 lg:px-8'>
        {/* Category Tabs */}
        <div className='flex overflow-x-auto lg:overflow-x-visible lg:justify-between mb-8 sm:mb-10 lg:mb-12 border-b border-gray-200 scrollbar-hide'>
          {categories.map((category) => (
            <button
              key={category.key}
              onClick={() => setActiveCategory(category.key)}
              className='
                relative
                text-[9.5px]
                sm:text-sm
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
              '
              style={{
                fontFamily: 'Inter, Montserrat, sans-serif',
                color: activeCategory === category.key ? '#8473E8' : '#000000',
              }}
            >
              {category.label}
              {activeCategory === category.key && (
                <span
                  className='absolute bottom-0 left-0 h-0.5 bg-[#8473E8] transition-all duration-300'
                  style={{ width: '100%' }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Counsellors Grid */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 lg:gap-8 justify-items-center'>
          {counsellors.map((counsellor, index) => (
            <CounsellorCard
              key={counsellor._id || index}
              counsellor={counsellor}
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

export default CounsellorsGrid;