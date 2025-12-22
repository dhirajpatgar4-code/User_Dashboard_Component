import { useEffect, useRef, useState } from 'react';
import Logo from '../assets/Logo.png';
import Menu from '../assets/Menu.svg';
import { ButtonCallToAction, Dropdown } from './index';
import { ChevronDown } from 'lucide-react';
import navbarItems from '../data/navbar';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [display, setDisplay] = useState(false);
  const [mobileDisplay, setMobileDisplay] = useState(false);
  const areaRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (areaRef.current && !areaRef.current.contains(event.target)) {
        setMobileDisplay(false);
        setDisplay(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function toggleMobileMenu() {
    setMobileDisplay((prev) => !prev);
  }

  return (
    <>
      {/* 🔹 Blur Overlay */}
      {mobileDisplay && (
        <div
          className='fixed inset-0 z-40 backdrop-blur-md bg-black/20'
          onClick={() => setMobileDisplay(false)}
        />
      )}

      <nav
        data-aos='fade-down'
        className='lg:m-4 mt-4 p-2 fixed top-0 left-0 w-full bg-transparent z-50'
      >
        <div className='flex justify-between items-center'>
          <img
            src={Logo}
            className={`w-6 h-6 ${mobileDisplay ? 'opacity-0' : ''}`}
            alt='logo'
          />

          <h1 className='text-sm mt-1 mx-3 text-purple-500 logo-typography montserrat sm:text-[16px]'>
            Safe Harbour
          </h1>

          {/* Desktop Menu */}
          <div className='list-items bg-white/90 relative hidden sm:block mx-auto sm:text-xl sm:border sm:border-purple-500 sm:rounded-[50px] sm:p-2 hover:cursor-pointer'>
            <ul className='sm:flex text-black'>
              <Link to='/'>
                <li className='mx-[30px] hover:text-purple-900'>Home</li>
              </Link>
              <Link to='/about-us'>
                <li className='mx-[30px] hover:text-purple-900'>About</li>
              </Link>
              <li
                onClick={() => setDisplay((prev) => !prev)}
                className='mx-[30px] hover:text-purple-900 flex items-center gap-1 cursor-pointer'
              >
                Services
                <ChevronDown size={16} />
              </li>
            </ul>
          </div>

          <div className='cta-button mr-10 hidden sm:flex'>
            <ButtonCallToAction content='Get Started' />
          </div>

          {/* Mobile Menu Button */}
          <button onClick={toggleMobileMenu}>
            <img
              src={Menu}
              alt='menu-icon'
              className={`w-[25px] h-[25px] sm:hidden ${
                mobileDisplay ? 'opacity-0' : ''
              }`}
            />
          </button>
        </div>
      </nav>

      {/* 🔹 Mobile Menu */}
      {mobileDisplay && (
        <div
          data-aos='fade-down'
          ref={areaRef}
          className='fixed top-0 left-0 w-full z-50'
        >
          <div className='bg-purple-500 w-full h-[200px] rounded-b-full flex justify-center items-center'>
            <ul className='flex montserrat font-normal'>
              <Link to='/'>
                <li className='text-white mx-5'>Home</li>
              </Link>
              <Link to='/about-us'>
                <li className='text-white mx-5'>About</li>
              </Link>
              <li className='text-white mx-5'>Services</li>
            </ul>
          </div>
        </div>
      )}

      {/* 🔹 Desktop Dropdown */}
      {display && (
        <div ref={areaRef} className='absolute left-1/2 top-20 z-50'>
          <Dropdown links={navbarItems} />
        </div>
      )}
    </>
  );
};

export default Navbar;
