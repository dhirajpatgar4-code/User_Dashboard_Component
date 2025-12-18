const AboutDoctorCard = () => {
  return (
    <div className='w-full flex justify-center py-10'>
      <div
        className='
          w-[220px] h-[226px]
          sm:w-[440px] sm:h-[452px]
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
        <div className='flex-1 px-3 sm:px-10 py-4 sm:py-8 text-center'>
          <h3
            className='text-[14px] sm:text-[28px] font-bold mb-2 sm:mb-6'
            style={{ fontFamily: 'Inter' }}
          >
            About the Doctor
          </h3>

          <div className='space-y-2 sm:space-y-4'>
            <div>
              <h4 className='text-[10px] sm:text-[18px] font-semibold'>
                12+ years of experience
              </h4>
              <p className='text-[9px] sm:text-[16px] text-black/70'>
                Specialised in CBT, DBT, trauma-focused therapy, and behavioural
                interventions.
              </p>
            </div>

            <div>
              <h4 className='text-[10px] sm:text-[18px] font-semibold'>
                90% Recommendation
              </h4>
              <p className='text-[9px] sm:text-[16px] text-black/70'>
                Highly trusted for his empathetic approach and effective
                recovery outcomes.
              </p>
            </div>

            <div>
              <h4 className='text-[10px] sm:text-[18px] font-semibold'>
                Online Consultation Ability
              </h4>
              <p className='text-[9px] sm:text-[16px] text-black/70'>
                Sessions via video, chat, or audio for convenience and privacy.
              </p>
            </div>
          </div>
        </div>

        {/* BUTTON */}
        <button
          className='
            w-full
            h-[40px] sm:h-[74px]
            bg-[#8473E8]
            hover:bg-[#5a4ccf]
            transition-colors
            text-white
            flex items-center justify-center gap-2
            text-[10px] sm:text-[16px]
            font-bold
          '
        >
          Book an Appointment
          {/* SVG arrow */}
          <svg
            width='45'
            height='15'
            viewBox='0 0 18 10'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className='text-white'
          >
            {/* line */}
            <path
              d='M0 5H14'
              stroke='currentColor'
              strokeWidth='1'
              strokeLinecap='round'
            />

            {/* arrow head */}
            <path
              d='M10 1L14 5L10 9'
              stroke='currentColor'
              strokeWidth='1'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default AboutDoctorCard;
