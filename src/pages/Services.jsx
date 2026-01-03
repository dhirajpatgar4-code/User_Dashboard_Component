// Services.jsx
// Services page component

import ServicesGrid from '../components/services/ServicesGrid';

const Services = () => {
  return (
    <div className='flex flex-col min-h-screen'>
      <main className='grow mt-20 md:mt-30'>
        <ServicesGrid />
      </main>
    </div>
  );
};

export default Services;

