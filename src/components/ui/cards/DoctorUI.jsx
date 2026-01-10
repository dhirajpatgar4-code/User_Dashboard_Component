import { useState, useEffect } from 'react';
import doctorImage from '../../../assets/doctor.png'; 
import ButtonCallToAction from '../button/ButtonCallToAction';
import { socialLinks } from '../../../data/social';
import { getRandomCounsellors } from '../../../data/doctor'; 

const DoctorUI = () => {
  const [doctorList, setDoctorList] = useState([]); 
  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [aosAnimation, setAosAnimation] = useState('fade-up');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getRandomCounsellors();
        if (response.success && response.data) {
          const formattedDoctors = response.data
            .filter(item => item.fullname) // Remove empty {} objects
            .map(item => ({
              _id: item._id,
              doctorName: item.fullname,      // Map 'fullname' to 'doctorName'
              speciality: item.specialties,   // Map 'specialties' to 'speciality'
              // Use API image, fallback to local import if missing
              image: item.documents?.profile_picture || doctorImage 
            }));
          setDoctorList(formattedDoctors);
        }
      } catch (error) {
        console.error("Failed to fetch doctors", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const resize = () => setIsMobile(window.innerWidth < 768);
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  // 3. Change: specific logic to use doctorList.length instead of static doctors.length
  const prev = () => {
    setAosAnimation('fade-right');
    setIndex((i) => (i === 0 ? doctorList.length - 1 : i - 1));
  };
  const next = () => {
    setAosAnimation('fade-left');
    setIndex((i) => (i === doctorList.length - 1 ? 0 : i + 1));
  };

  // 4. Change: Slicing from doctorList
  // Check if doctorList has data, otherwise render nothing or a loader
  if (doctorList.length === 0) return <div>Loading...</div>;

  const visibleDoctors = isMobile ? [doctorList[index]] : doctorList.slice(0, 3);

  return (
    <div className='grid place-items-center'>
      <h1 className='text-purple-500 merriweather italic text-[16px] md:text-[32px]'>
        Team
      </h1>

      <p className='md:text-[82px] text-[32px] text-center font-medium tracking-[-1.92px]'>
        Our Support Team, <br /> Ready for You
      </p>

      <div className='mt-6 flex items-center'>
        {/* LEFT ARROW – MOBILE ONLY */}
        {isMobile && (
          <div className='mr-[33px]'>
            <button onClick={prev}>
              <svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
                <path
                  d='M12 16L8 12M8 12L12 8M8 12H16M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z'
                  stroke='#8473E8'
                  strokeWidth='1.5'
                />
              </svg>
            </button>
          </div>
        )}

        {/* CARDS */}
        <div className='flex gap-8'>
          {visibleDoctors.map((doc, idx) => (
            <div
              data-aos={aosAnimation}
              // Use unique ID from DB, fallback to index
              key={doc._id || idx} 
              className='relative w-[201px] h-[251px] md:w-[402px] md:h-[502px]'
            >
              {/* 5. Change: Use dynamic image source */}
              <img
                src={doc.image} 
                alt='doctor'
                className='absolute inset-0 w-full h-full object-cover rounded-3xl'
                onError={(e) => { e.target.src = doctorImage; }} // Safety fallback if URL fails
              />

              {/* GLASS CARD */}
              <div
                className='absolute bottom-6 left-1/2 -translate-x-1/2
                           w-[140px] h-[95px] md:w-[239px] md:h-[149px]
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
                           w-[140px] h-[95px] md:w-[239px] md:h-[149px]'
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
                              w-[140px] h-[95px] md:w-[239px] md:h-[149px]
                              p-3 flex flex-col justify-between text-white'
              >
                <div className='md:mt-4'>
                  <p className='text-[13px] md:text-[26px] text-white font-semibold leading-normal'>
                    {doc.doctorName}
                  </p>
                  <p className='text-[10px] md:text-[14px] text-white/54 font-semibold leading-normal'>
                    {doc.speciality}
                  </p>
                </div>

                <div className='flex gap-2'>
                  {socialLinks.map((social) => (
                    <a
                      key={social.id}
                      href={social.link}
                      target="_blank"                
                      rel="noopener noreferrer"
                      className='h-6 w-6 rounded-full ml-2 flex items-center justify-center'
                    >
                      <img
                        src={social.icon}
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
                  bottom-24 md:bottom-[140px]
                  md:right-[90px]
                  w-[21px] h-[21px]
                  lg:w-[42px] lg:h-[42px]
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
          ))}
        </div>

        {/* RIGHT ARROW – MOBILE ONLY */}
        {isMobile && (
          <div className='ml-[33px]'>
            <button onClick={next}>
              <svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
                <path
                  d='M12 16L16 12M16 12L12 8M16 12H8M12 22C6.5 22 2 17.5 2 12C2 6.5 6.5 2 12 2C17.5 2 22 6.5 22 12C22 17.5 17.5 22 12 22Z'
                  stroke='#8473E8'
                  strokeWidth='1.5'
                />
              </svg>
            </button>
          </div>
        )}
      </div>

      <div className='mt-6'>
        <ButtonCallToAction content='View all' />
      </div>
    </div>
  );
};

export default DoctorUI;