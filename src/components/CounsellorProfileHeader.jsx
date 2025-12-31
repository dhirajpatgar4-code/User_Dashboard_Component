// CounsellorProfileHeader.jsx
// Reusable header component for counsellor profile pages

import { Globe, Users, Star, Check } from 'lucide-react';

const CounsellorProfileHeader = ({
  profileImage,
  name,
  isVerified = false,
  specialization,
  languages = [],
  clientsHelped = 0,
  rating = 0,
  reviewsCount = 0,
  acceptingNewClients = false,
}) => {
  // Format languages array to string
  const languagesText = languages.join(', ');

  // Format rating display
  const ratingDisplay = `${rating}/5 (${reviewsCount}+ reviews)`;

  // Format clients helped with comma separator
  const clientsDisplay = `${clientsHelped.toLocaleString()} Clients Helped`;

  return (
    <div className='w-full flex flex-col lg:flex-row gap-6 lg:gap-8 items-center lg:items-start pl-4 sm:pl-6 lg:pl-12 xl:pl-16'>
      {/* LEFT SECTION - Profile Image */}
      <div className='flex-shrink-0'>
        <img
          src={profileImage}
          alt={name}
          className='
            w-32
            h-32
            sm:w-40
            sm:h-40
            lg:w-56
            lg:h-56
            rounded-2xl
            object-cover
            bg-gray-100
          '
        />
      </div>

      {/* RIGHT SECTION - Content */}
      <div className='flex-1 w-full lg:w-auto text-center lg:text-left lg:pl-4'>
        {/* Verification Badge - Only show if verified, positioned above name */}
        {isVerified && (
          <div
            className='
              inline-flex
              items-center
              gap-1.5
              bg-[#EDE6FF]
              border
              border-[#8473E8]
              rounded-lg
              px-3
              py-1.5
              mb-3
            '
          >
            <Check className='w-4 h-4 text-[#8473E8]' />
            <span
              className='
                text-[#8473E8]
                text-xs
                sm:text-sm
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
            text-2xl
            sm:text-3xl
            lg:text-4xl
            font-bold
            text-black
            mb-2
          '
          style={{ fontFamily: 'Inter, Montserrat, sans-serif' }}
        >
          {name}
        </h1>

        {/* Specialization */}
        <p
          className='
            text-base
            sm:text-lg
            lg:text-xl
            text-gray-600
            mb-4
            sm:mb-6
          '
          style={{ fontFamily: 'Inter, Montserrat, sans-serif' }}
        >
          {specialization}
        </p>

        {/* Stats Row - Vertical Alignment */}
        <div
          className='
            flex
            flex-col
            gap-3
            mb-4
            sm:mb-6
            items-center
            lg:items-start
            justify-center
            lg:justify-start
          '
        >
          {/* Languages */}
          {languages.length > 0 && (
            <div className='flex items-center gap-2 text-gray-600'>
              <Globe className='w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0' />
              <span
                className='
                  text-sm
                  sm:text-base
                '
                style={{ fontFamily: 'Inter, Montserrat, sans-serif' }}
              >
                {languagesText}
              </span>
            </div>
          )}

          {/* Clients Helped */}
          <div className='flex items-center gap-2 text-gray-600'>
            <Users className='w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0' />
            <span
              className='
                text-sm
                sm:text-base
              '
              style={{ fontFamily: 'Inter, Montserrat, sans-serif' }}
            >
              {clientsDisplay}
            </span>
          </div>

          {/* Rating */}
          <div className='flex items-center gap-2 text-gray-600'>
            <Star className='w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 fill-yellow-400 text-yellow-400' />
            <span
              className='
                text-sm
                sm:text-base
              '
              style={{ fontFamily: 'Inter, Montserrat, sans-serif' }}
            >
              {ratingDisplay}
            </span>
          </div>
        </div>

        {/* New Clients Accepted Badge */}
        {acceptingNewClients && (
          <div className='flex justify-center lg:justify-start mt-4'>
            <button
              className='
                inline-flex
                items-center
                justify-center
                px-5
                py-2.5
                sm:px-6
                sm:py-3
                border-2
                border-blue-400
                rounded-lg
                bg-transparent
                hover:bg-blue-50
                transition-colors
              '
            >
              <span
                className='
                  text-blue-600
                  text-sm
                  sm:text-base
                  font-semibold
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

