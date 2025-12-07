import { useEffect, useRef, useState } from "react";
import Logo from "../assets/Logo.png";
import Menu from "../assets/Menu.svg";
import { ButtonCallToAction } from "./index";
import { ChevronDown } from "lucide-react";
import { Dropdown } from "./index";
import navbarItems from "../data/navbar";

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

    document.addEventListener("mousedown", handleClickOutsideEvent);

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideEvent);
    };
  }, [areaRef]);

  return (
    <>
      <div>
        <nav className="m-4">
          <div className="flex justify-between">
            <img src={Logo} className="w-6 h-6" />
            <h1 className="text-sm mt-1 mx-3 text-purple-500 logo-typography montserrat sm:text-[16px] sm:text-purple-500">
              Safe Harbour
            </h1>
            <div className="list-items relative hidden sm:block mx-auto sm:text-xl sm:border sm:border-purple-500 sm:font-normal sm:rounded-[50px] sm:p-2 sm:place-content-center hover:cursor-pointer">
              <ul className="sm:flex font-normal text-purple-500">
                <li className="mx-[30px]">Home</li>
                <li className="mx-[30px]">About</li>
                <li onClick={() => setDisplay(!display)} className="mx-[30px] flex">
                  Services
                  <button
                    onClick={() => setDisplay(!display)}
                    className="place-content-center ml-1 hover:cursor-pointer"
                  >
                    <ChevronDown size={16} />
                  </button>
                </li>
              </ul>
            </div>
            <div className="cta-button hidden sm:flex">
              <ButtonCallToAction content="Get Started" />
            </div>
            {/* HAMBURGER MENU */}
            <button onClick={() => setMobileDisplay(!mobileDisplay)}>
              <img
                src={Menu}
                alt="menu-icon"
                className="ml-auto w-[25px] h-[25px] sm:hidden"
              />
            </button>
          </div>
        </nav>
      </div>
      {mobileDisplay && (
        <>
          <div ref={areaRef} data-aos="fade-down" className="mobile-menu-wrapper">
            <div className="bg-purple-500 w-full h-[200px] place-content-center rounded-b-full absolute -top-20">
              <div className="items">
                <ul className="flex justify-center montserrat font-normal">
                  <li className="text-white mx-5">Home</li>
                  <li className="text-white mx-5">About</li>
                  <li className="text-white mx-5">Services</li>
                </ul>
              </div>
            </div>
          </div>
        </>
      )}
      {display && (
        <>
          <div ref={areaRef} className="dropdown absolute left-1/2">
            <Dropdown links={navbarItems} />
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;
