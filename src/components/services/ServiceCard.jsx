// ServiceCard.jsx
// Reusable service card component

const ServiceCard = ({ title, description }) => {
  return (
    <div
      className='
        border
        border-[#8473E8]
        rounded-[16px]
        bg-[#FBFBFF]
        cursor-pointer
        transition-all
        duration-300
        lg:hover:shadow-lg
        lg:hover:-translate-y-1
      '
      style={{ padding: '24px' }}
    >
      <h3
        className='
          text-black
          font-semibold
          text-[15px]
          lg:text-base
          mb-3
        '
        style={{ fontFamily: 'Inter, Montserrat, sans-serif' }}
      >
        {title}
      </h3>
      <p
        className='
          text-[#6B6B6B]
          text-[13px]
          sm:text-[14px]
          leading-relaxed
        '
        style={{ lineHeight: '1.5' }}
      >
        {description}
      </p>
    </div>
  );
};

export default ServiceCard;

