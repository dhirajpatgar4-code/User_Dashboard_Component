import CheckIcon from '../../../assets/check.svg';
import starIcon from '../../../assets/star.svg';
import languageIcon from '../../../assets/languageIcon.svg';
import peopleIcon from '../../../assets/peopleIcon.svg';

import DoctorImage from '../../../assets/doctor.png';

const CounsellorProfileHeader = ({ profiledata }) => {
  const {
    profileImage = DoctorImage,
    name = 'Dr. Raghav Sinha',
    isVerified = 'true',
    specialization = 'Mental Health and Wellness & Therapy Specialist',
    languages = ['Hindi', 'English'],
    clientsHelped = 48000,
    rating = 4.8,
    reviewsCount = 1500,
    acceptingNewClients = true,
  } = profiledata;

  const languagesText = languages.join(', ');

  // Format rating display
  const ratingDisplay = `${rating}/5 (${reviewsCount}+ reviews)`;

  // Format clients helped with comma separator
  const clientsDisplay = `${clientsHelped.toLocaleString()} Clients Helped`;

  return (
    <div className={` flex  gap-3 sm:gap-6 items-start flex-start  `}>
      {/* LEFT SECTION - Profile Image */}
      <div className=' w-34 sm:w-40 md:50 lg:w-62 '>
        <img
          // src={profileImage}
          src={profileImage}
          alt={name}
          className='
            rounded-3xl
            sm:rounded-4xl
            object-cover
          '
        />
      </div>

      {/* RIGHT SECTION - Content */}
      <div className='flex-1 w-full lg:w-auto  text-left  flex flex-col gap-1.25 sm:gap-2 md:gap-3 lg:gap-4 xl:gap-5 justify-start'>
        {/* Verification Badge - Only show if verified, positioned above name */}

        <div className='flex flex-col gap-1.25 items-start  '>
          {isVerified && (
            <div
              className='
              inline-flex
              items-center
              justify-center
              gap-1.5
              bg-[#EDE6FF]
              border
              border-[#8473E8]
              rounded-xl
              px-2
              py-0.5
              w-fit
            '
            >
              <img
                src={CheckIcon}
                alt='checkIcon'
                className='w-2 sm:w-3 md:w-4'
              />
              <span
                className='
                text-[#8473E8]
                text-[6px]
                sm:text-[8px]
                md:text-[10px]
                lg:text-[12px]
                xl:text-sm
                font-semibold
                whitespace-nowrap
              '
                style={{ fontFamily: 'Inter, Montserrat, sans-serif' }}
              >
                Verified by Safe Harbour
              </span>
            </div>
          )}
          {/* Name */}
          <h1
            className='
          text-base
          sm:text-lg
          md:text-xl
          
          lg:text-2xl
          xl:text-3xl
          font-extrabold
          text-black
          '
            style={{ fontFamily: 'Inter, Montserrat, sans-serif' }}
          >
            {name}
          </h1>

          {/* Specialization */}
          <p
            className='
          text-[9px]
          sm:text-[12px]
          md:text-[14px]
          lg:text-[16px]
          xl:text-lg
          text-gray-600
          
          
          '
            style={{ fontFamily: 'Inter, Montserrat, sans-serif' }}
          >
            {specialization}
          </p>
        </div>

        {/* Stats Row - Vertical Alignment */}
        <div
          className='
            flex
            flex-col
            gap-1
            sm:gap-2.25
            
            items-start
        
            justify-start
          '
        >
          {/* Languages */}
          {languages.length > 0 && (
            <div className='flex items-center gap-2 text-gray-600'>
              <img
                src={languageIcon}
                alt='languageIcon'
                className='w-2 sm:w-3 md:w-4'
              />
              <span
                className='
                  text-[8px]
                  sm:text-[10px]
                  md:text-[12px]
                  lg:text-[14px]
                  xl:text-base
                '
                style={{ fontFamily: 'Inter, Montserrat, sans-serif' }}
              >
                {languagesText}
              </span>
            </div>
          )}

          {/* Clients Helped */}
          <div className='flex items-center gap-2 text-gray-600'>
            <img
              src={peopleIcon}
              alt='peopleIcon'
              className='w-2 sm:w-3 md:w-4'
            />

            <span
              className='
               text-[8px]
                  sm:text-[10px]
                  md:text-[12px]
                  lg:text-[14px]
                  xl:text-base
              '
              style={{ fontFamily: 'Inter, Montserrat, sans-serif' }}
            >
              {clientsDisplay}
            </span>
          </div>

          {/* Rating */}
          <div className='flex items-center gap-2 text-gray-600'>
            <img src={starIcon} alt='StarIcon' className='w-2 sm:w-3 md:w-4' />
            <span
              className='
               text-[8px]
                  sm:text-[10px]
                  md:text-[12px]
                  lg:text-[14px]
                  xl:text-base
              '
              style={{ fontFamily: 'Inter, Montserrat, sans-serif' }}
            >
              {ratingDisplay}
            </span>
          </div>
        </div>

        {/* New Clients Accepted Badge */}
        {acceptingNewClients && (
          <div className='flex justify-start  '>
            <button
              className='
                inline-flex
                items-center
                justify-center
                px-1 sm:px-2
                py-1 sm:py-1.75
                border-1
                border-[#1877F2]
                rounded-xl
                bg-[#1877F233]
]
]
                hover:bg-blue-50
                transition-colors
              '
            >
              <span
                className='
                  text-[8px]
                  sm:text-[10px]
                  md:text-[12px]
                  lg:text-[14px]
                  xl:text-base
                '
                style={{ fontFamily: 'Inter, Montserrat, sans-serif' }}
              >
                New Clients Accepted
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CounsellorProfileHeader;
