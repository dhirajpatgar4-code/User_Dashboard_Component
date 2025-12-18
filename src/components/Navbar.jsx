import { useEffect, useRef, useState } from 'react';
import Logo from '../assets/Logo.png';
import Menu from '../assets/Menu.svg';
import { ButtonCallToAction } from './index';
import { ChevronDown } from 'lucide-react';
import { Dropdown } from './index';
import navbarItems from '../data/navbar';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [display, setDisplay] = useState(false);
  const [mobileDisplay, setMobileDisplay] = useState(false);
  const areaRef = useRef(null);

  useEffect(() => {
    function handleClickOutsideEvent(event) {
      if (areaRef.current && !areaRef.current.contains(event.target)) {
        setMobileDisplay(false);
        setDisplay(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutsideEvent);

    return () => {
      document.removeEventListener('mousedown', handleClickOutsideEvent);
    };
  }, [areaRef]);

  return (
    <>
      <div className='mt-20'>
        <nav className='lg:m-4 mt-4 p-2 fixed top-0 left-0 w-full bg-transparent z-50 '>
          <div className='flex justify-between'>
            <img
              src={Logo}
              className={`w-6 h-6 ${mobileDisplay === true ? 'opacity-0' : ''}`}
            />
            <h1 className='text-sm mt-1 mx-3 text-purple-500 logo-typography montserrat sm:text-[16px] sm:text-purple-500'>
              Safe Harbour
            </h1>
            <div className='list-items bg-white/90 relative hidden sm:block mx-auto sm:text-xl sm:border sm:border-purple-500 sm:font-normal sm:rounded-[50px] sm:p-2 sm:place-content-center hover:cursor-pointer'>
              <ul className='sm:flex font-normal  text-black'>
                <Link to='/'>
                  <li
                    className='
                  mx-[30px] hover:text-purple-900 relative
                  after:absolute after:left-0 after:bottom-[39px] after:h-[3px] after:w-0 after:bg-purple-500 after:transition-all after:duration-300 after:shadow-[0_0_10px_#a855f7]
                  before:absolute before:left-0 before:top-[39px] before:h-[3px] before:w-0 before:bg-purple-500 before:transition-all before:duration-300
                  before:shadow-[0_0_10px_#a855f7]
                  hover:after:w-full hover:before:w-full
                  '
                  >
                    Home
                  </li>
                </Link>
                <Link to='/about-us'>
                  <li
                    className='mx-[30px] hover:text-purple-900 relative
                  after:absolute after:left-0 after:bottom-[39px] after:h-[3px] after:w-0 after:bg-purple-500 after:transition-all after:duration-300
                  after:shadow-[0_0_10px_#a855f7]
                  before:absolute before:left-0 before:top-[39px] before:h-[3px] before:w-0 before:bg-purple-500 before:transition-all before:duration-300
                  before:shadow-[0_0_10px_#a855f7]
                  hover:after:w-full hover:before:w-full'
                  >
                    About
                  </li>
                </Link>
                <li
                  onClick={() => setDisplay(!display)}
                  className='mx-[30px] hover:text-purple-900 relative
    after:absolute after:left-0 after:bottom-[39px] after:h-[3px] after:w-0 after:bg-purple-500 after:transition-all after:duration-300
    after:shadow-[0_0_10px_#a855f7]
    before:absolute before:left-0 before:top-[39px] before:h-[3px] before:w-0 before:bg-purple-500 before:transition-all before:duration-300
    before:shadow-[0_0_10px_#a855f7]
    hover:after:w-full hover:before:w-full'
                >
                  Services
                  <button
                    onClick={() => setDisplay(!display)}
                    className='place-content-center ml-1 hover:cursor-pointer'
                  >
                    <ChevronDown size={16} />
                  </button>
                </li>
              </ul>
            </div>
            <div className='cta-button mr-10 hidden sm:flex'>
              <ButtonCallToAction content='Get Started' />
            </div>
            <button onClick={() => setMobileDisplay(!mobileDisplay)}>
              <img
                src={Menu}
                alt='menu-icon'
                className={`ml-auto w-[25px] h-[25px] sm:hidden ${
                  mobileDisplay === true ? 'opacity-0' : ''
                }`}
              />
            </button>
          </div>
        </nav>

        {mobileDisplay && (
          <div
            ref={areaRef}
            data-aos='fade-down'
            className='mobile-menu-wrapper z-50'
          >
            <div className='bg-purple-500 w-full h-[200px] place-content-center rounded-b-full absolute -top-20'>
              <div className='items'>
                <ul className='flex justify-center montserrat font-normal'>
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
          </div>
        )}

        {display && (
          <div ref={areaRef} className='dropdown absolute left-1/2'>
            <Dropdown links={navbarItems} />
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
