import { DoctorUI } from '../components';
import { Footer, Navbar } from '../components';
import HeroSection from '../components/HeroSection';
import Testimonials from '../components/ui/testimonials/Testimonials';

const Home = () => {
  return (
    <div className='flex flex-col min-h-screen'>
      <main className='grow'>
        <div className='mt-20 md:mt-30'>
          <HeroSection />
        </div>
        <DoctorUI />
      </main>
    </div>
  );
};

export default Home;
