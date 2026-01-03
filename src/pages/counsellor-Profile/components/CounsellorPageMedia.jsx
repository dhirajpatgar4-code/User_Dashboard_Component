import React from 'react';
import { socialLinks } from '../../../data/social';
import { otherIcons } from '../../../data/otherIcon';

function CounsellorPageMedia() {
  return (
    <div className={`flex sm:flex-col gap-5 sm:gap-10`}>
      <div className='order-2  order-1'>
        <h2 className='hidden sm:block text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold'>
          Social Media
        </h2>
        <div className='flex mt-2.5 gap-3.5 sm:gap-5 border-1 border-[#8473E8] rounded-2xl px-2.5 py-1 sm:border-none sm:rounded-none sm:px-0 sm:py-0'>
          {socialLinks.map((social) => (
            <a
              key={social.id}
              href={social.link}
              target='_blank'
              rel='noreferrer'
              className='hover:opacity-75 transition-opacity'
              aria-label={social.name}
            >
              <img
                src={social.icon}
                alt={social.name}
                className=' sm:h-6 sm:w-6  w-4 object-contain'
              />
            </a>
          ))}
        </div>
      </div>
      <div className='order-1 sm:order-2'>
        <h2 className='hidden sm:block text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold'>
          Session Preference
        </h2>
        <div className='flex mt-2.5 gap-3.75 sm:gap-6 border-1 border-[#8473E8] rounded-2xl px-2.5 py-1.25 sm:border-none sm:rounded-none sm:px-0 sm:py-0'>
          {otherIcons.map((ele) => (
            <a
              key={ele.id}
              href={ele.link}
              target='_blank'
              rel='noreferrer'
              className='hover:opacity-75 transition-opacity'
              aria-label={ele.name}
            >
              <img
                src={ele.icon}
                alt={ele.name}
                className='md:h-6 md:w-6  h-4 w-4 object-contain'
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CounsellorPageMedia;
