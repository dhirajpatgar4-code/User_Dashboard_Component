import React, { useState } from 'react';
import { Menu, X, Search, ChevronDown } from 'lucide-react';

function DashboardNavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Counsellors');
  const [opensearch, setIsopensearch] = useState(false);

  return (
    <>
      {/* Single Navbar for both Desktop and Mobile */}
      <nav className='bg-white/90 shadow-sm sticky top-0 z-40'>
        <div className='w-full mx-auto px-2 sm:px-4 lg:px-8'>
          <div className='flex items-center justify-between h-16 sm:h-20'>
            {/* Logo */}
            <div className='flex ml-14 items-center gap-2 sm:gap-3'>
              <div className='w-8 h-8 sm:w-12 sm:h-12 sm:-ml-14 sm:mr-4 rounded-xl flex items-center justify-center'>
                <img
                  className='w-6 h-6 sm:size-10'
                  src='public\logo.png'
                  alt='error'
                />
              </div>
              <span className='text-[#8473E8] font-semibold sm:-ml-4 text-base sm:text-xl hidden sm:block'>
                Safe Harbour
              </span>
            </div>

            {/* Desktop Navigation - Hidden on Mobile */}
            <div className='hidden md:flex items-center border-2 border-[#8473E8] rounded-full bg-white relative'>
              {/* Sliding Background */}
              <div
                className='absolute bg-[#8473E8]  rounded-full transition-all duration-300 ease-in-out'
                style={{
                  left:
                    activeTab === 'Dashboard'
                      ? '8px'
                      : activeTab === 'Chats'
                        ? 'calc(25% + 4px)'
                        : activeTab === 'Counsellors'
                          ? 'calc(50% + 2px)'
                          : 'calc(75%)',
                  width: 'calc(25% - 8px)',
                  height: 'calc(100% - 8px)',
                  top: '4px',
                }}
              />

              <button
                onClick={() => setActiveTab('Dashboard')}
                className={`px-6 lg:px-8 py-3 font-medium rounded-full transition-all duration-300 relative z-10 ${
                  activeTab === 'Dashboard'
                    ? 'text-white'
                    : 'text-gray-700 hover:text-purple-600'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setActiveTab('Chats')}
                className={`px-6 lg:px-8 py-3 font-medium rounded-full transition-all duration-300 relative z-10 ${
                  activeTab === 'Chats'
                    ? 'text-white'
                    : 'text-gray-700 hover:text-purple-600'
                }`}
              >
                Chats
              </button>
              <button
                onClick={() => setActiveTab('Counsellors')}
                className={`px-6 lg:px-8 py-3 font-medium rounded-full transition-all duration-300 relative z-10 ${
                  activeTab === 'Counsellors'
                    ? 'text-white'
                    : 'text-gray-700 hover:text-purple-600'
                }`}
              >
                Counsellors
              </button>
              <button
                onClick={() => setActiveTab('Services')}
                className={`px-6 lg:px-8 py-3 font-medium rounded-full transition-all duration-300 relative z-10 ${
                  activeTab === 'Services'
                    ? 'text-white'
                    : 'text-gray-700 hover:text-purple-600'
                }`}
              >
                Services
              </button>
            </div>

            {/* Search Bar - Hidden on Mobile */}
            <div className='hidden lg:flex items-center bg-gray-50 border border-[#8473E8] rounded-full px-4 xl:px-5 py-2.5 xl:py-3 w-72 xl:w-96'>
              <Search className='w-5 h-5 text-[#8473E8]' />
              <input
                type='text'
                placeholder='Search'
                className='ml-3 bg-transparent outline-none w-full text-[#8473E8] placeholder-[#8473E8]'
              />
            </div>

            {/* Mobile Elements - Only visible on Mobile */}
            <div className='flex md:hidden items-center gap-1.5 sm:gap-2'>
              {/* Mobile Search Bar - Shows when opensearch is true */}
              {opensearch ? (
                <div className='flex items-center bg-gray-50 border border-[#8473E8] rounded-full px-3 py-1.5 sm:py-2 mr-2'>
                  <Search className='w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#8473E8]' />
                  <input
                    type='text'
                    placeholder='Search'
                    className='ml-2 bg-transparent outline-none w-32 sm:w-40 text-sm text-[#8473E8] placeholder-[#8473E8]'
                    autoFocus
                  />
                  <button
                    onClick={() => setIsopensearch(false)}
                    className='ml-1'
                  >
                    <X className='w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-600' />
                  </button>
                </div>
              ) : (
                <>
                  {/* Counsellors Pill */}
                  <div className='border-2 mr-3 border-purple-300 rounded-full px-2 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm'>
                    <span className='text-gray-800 font-medium whitespace-nowrap'>
                      {activeTab}
                    </span>
                  </div>

                  {/* Search Icon */}
                  <button
                    onClick={() => setIsopensearch(!opensearch)}
                    className='p-1 mr-3 sm:p-1.5 border-2 border-purple-300 rounded-full hover:bg-gray-50'
                  >
                    <Search className='w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-700' />
                  </button>

                  {/* Menu Icon */}
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className='p-1 sm:p-1.5 border-2 border-purple-300 rounded-full hover:bg-gray-50'
                  >
                    <Menu className='w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-700' />
                  </button>

                  {/* User Avatar */}
                  <div className='relative mr-3 flex items-center ml-1 sm:ml-2'>
                    <div className='w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full overflow-hidden border-2 border-white shadow-md'>
                      <img
                        src='https://api.dicebear.com/7.x/avataaars/svg?seed=user'
                        alt='User'
                        className='w-full h-full'
                      />
                    </div>
                    <ChevronDown className='w-2.5 h-2.5 sm:w-3 sm:h-3 text-gray-600 ml-0.5' />
                  </div>
                </>
              )}
            </div>

            {/* Desktop User Avatar - Hidden on Mobile */}
            <div className='hidden md:flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity'>
              <div className='w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full overflow-hidden border-2 border-white shadow-md'>
                <img
                  src='https://api.dicebear.com/7.x/avataaars/svg?seed=user'
                  alt='User'
                  className='w-full h-full'
                />
              </div>
              <ChevronDown className='w-4 h-4 lg:w-5 lg:h-5 text-gray-600' />
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Overlay Menu with Circle Design */}
      {isMenuOpen && (
        <>
          {/* Overlay Background - Click to close */}
          <div
            className='fixed inset-0 z-40 backdrop-blur-md bg-black/20 md:hidden'
            onClick={() => setIsMenuOpen(false)}
          />

          {/* Purple Circle Overlay */}
          <div
            className='fixed top-0 left-0 w-full bg-[#8473E8] rounded-b-full z-50 md:hidden'
            style={{ height: '200px' }}
          >
            {/* Menu Items in Grid Layout */}
            <div className='grid grid-cols-2 gap-x-14 gap-y-5  px-24 py-8 max-w-md mx-auto'>
              <button
                onClick={() => {
                  setActiveTab('Dashboard');
                  setIsMenuOpen(false);
                }}
                className={`text-white text-lg sm:text-xl hover:opacity-80 text-left ${
                  activeTab === 'Dashboard'
                    ? 'font-bold border-b-4 border-white pb-1'
                    : 'font-normal'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => {
                  setActiveTab('Chats');
                  setIsMenuOpen(false);
                }}
                className={`text-white text-lg sm:text-xl hover:opacity-80 text-left ${
                  activeTab === 'Chats'
                    ? 'font-bold border-b-4 border-white pb-1'
                    : 'font-normal'
                }`}
              >
                Chat
              </button>
              <button
                onClick={() => {
                  setActiveTab('Counsellors');
                  setIsMenuOpen(false);
                }}
                className={`text-white text-lg sm:text-xl text-left ${
                  activeTab === 'Counsellors'
                    ? 'font-bold border-b-4 border-white pb-1'
                    : 'font-normal'
                }`}
              >
                Counsellors
              </button>
              <button
                onClick={() => {
                  setActiveTab('Services');
                  setIsMenuOpen(false);
                }}
                className={`text-white text-lg sm:text-xl hover:opacity-80 text-left ${
                  activeTab === 'Services'
                    ? 'font-bold border-b-4 border-white pb-1'
                    : 'font-normal'
                }`}
              >
                Services
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default DashboardNavBar;
