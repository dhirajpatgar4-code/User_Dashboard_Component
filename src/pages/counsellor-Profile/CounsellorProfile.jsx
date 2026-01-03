import React from 'react';
import CounsellorProfileHeader from './components/CounsellorProfileHeader';
import AboutDoctorCard from './components/AboutTheDoctor';
import Shortbio from './components/Shortbio';
import CounsellorPageMedia from './components/CounsellorPageMedia';
import BackNavigation from '../../assets/BackNavigation.svg';
import counsellorData from '../../data/counsellorProfile';
import CounsellorPricingSection from './components/CounsellorPricingSection';

function CounsellorProfile() {
  return (
    <div className='px-5 sm:px-10 md:px-15 lg:px-18 xl:px-20 mt-5'>
      <button className='mb-3.5 sm:mb-4'>
        <img
          src={BackNavigation}
          alt='backArrow icon'
          className='w-[15px] sm:w-[30px]'
        />
      </button>
      <div className='   flex flex-col  gap-5 sm:gap-13 mb-2'>
        <div className='flex flex-col sm:flex-row gap-3.75 sm:gap-6 md:gap-10 lg:gap-12.5 xl:gap-15 mr-auto w-full'>
          <div className='w-full sm:w-[60%]'>
            <CounsellorProfileHeader profiledata={counsellorData.Profiledata} />
          </div>

          <CounsellorPageMedia />
        </div>
        <div className='flex flex-col sm:flex-row gap-7.5 sm:gap-10 md:gap-12 lg:gap-13.5 xl:gap-15 mr-auto'>
          <div className='flex  flex-col gap-5 sm:gap-7.5 sm:w-[60%]'>
            <Shortbio bioPoints={counsellorData.bioPoints} />
            <CounsellorPricingSection pricing={counsellorData.pricing} />
          </div>
          <div className=' lg:-mt-30 xl:-mt-37  mx-auto sm:mx-0 '>
            <AboutDoctorCard doctorInfo={counsellorData.AboutCardInfo} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CounsellorProfile;
