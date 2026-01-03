import ArrowRight from '../../../assets/ArrowRight.svg';

const AboutDoctorCard = ({ doctorInfo }) => {
  return (
    <div
      className='
      w-[220px] 
       sm:w-[270px] md:w-[320px] lg:w-[360px] xl:w-[440px]
      max-w-[440px]
          bg-white
          border border-[#8473E8]
          rounded-[20px] sm:rounded-[40px]
          flex flex-col
          items-center
          overflow-hidden
          shadow-[0_2px_10px_0_rgba(0,0,0,0.55),2px_0_10px_0_rgba(0,0,0,0.55)]
        '
    >
      {/* CONTENT */}
      <div className='flex-1  px-5 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-4.25 sm:py-5 md:py-6.5 lg:7.5  xl:py-8.5 flex flex-col gap-2.75 sm:gap-5.5 text-center'>
        <h3
          className='text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold '
          style={{ fontFamily: 'Inter' }}
        >
          About the Doctor
        </h3>

        <div className='flex flex-col gap-3.75 sm:gap-4.5 md:gap-5.5 lg:gap-6.5 xl:gap-7.5 '>
          {doctorInfo.details.map((item, index) => (
            <div key={index} className=''>
              <h4 className='text-[10px] sm:text-xs md:text-sm lg:text-base xl:text-xl font-semibold'>
                {item.heading}
              </h4>
              <p className='text-[8px] sm:text-[10px] md:text-xs lg:text-sm  xl:text-[17px] text-black/70'>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* BUTTON */}
      <button
        className='
            w-full
            h-10 sm:h-12 md:h-14 lg:h-16 xl:h-[74px]
            bg-[#8473E8]
            hover:bg-[#5a4ccf]
            transition-colors
            text-white
            flex items-center justify-center gap-2
            text-[10px] sm:text-xs md:text-sm lg:text-base
            font-bold
          '
      >
        <div>{doctorInfo.buttonText}</div>
        <div className='flex items-center'>
          <img
            src={ArrowRight}
            alt='Arrow Right Icon'
            className='w-3.75 sm:w-4.75 md:w-5.75 lg:6.75 lg:w-7.5'
          />
        </div>
      </button>
    </div>
  );
};

export default AboutDoctorCard;
