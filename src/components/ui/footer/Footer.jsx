import React from 'react';
import Logo from '../../../assets/logo.png';
import { socialLinks } from '../../../data/social';
import { ArrowDown, ChevronDown } from 'lucide-react';

const Footer = () => {
  return (
    <footer className='w-full pb-8 pt-4'>
      <div className='container mx-auto px-6 '>
        {/* MAIN GRAY CARD */}
        <div className='flex flex-col items-center justify-center rounded-2xl bg-gray-100 py-16 text-center'>
          <div className='mb-6'>
            <img src={Logo} alt='logo' className='h-8 w-8' />
          </div>

          {/* Links */}
          <div className='mb-8 flex gap-8 font-medium text-gray-700'>
            <a href='/' className='hover:text-purple-600'>
              Home
            </a>
            <a href='/about' className='hover:text-purple-600'>
              About
            </a>
            <a
              href='/services'
              className='flex items-center justify-center gap-1 hover:text-purple-500'
            >
              Services <ChevronDown size={14} />
            </a>
          </div>

          {/* Social Icons */}
          <div className='flex gap-6'>
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
                  className='md:h-8 md:w-8 h-6 w-6 object-contain'
                />
              </a>
            ))}
          </div>
        </div>

        {/* COPYRIGHT BAR */}
        <div className='mt-4 w-full rounded-xl bg-gray-100 py-3 text-center text-sm text-gray-600'>
          Copyright 2025 @ SafeHarbor
        </div>
      </div>
    </footer>
  );
};

export default Footer;
