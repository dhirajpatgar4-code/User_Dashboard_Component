import { Footer, Navbar } from "../components";
import HeroSection from "../components/HeroSection";
import Testimonials from "../components/ui/testimonials/Testimonials";

const Home = () => {
	return (
		<div className="flex flex-col min-h-screen">
			<Navbar />
			<main className="grow">
				<HeroSection/>
			</main>
			<Footer />
		</div>
		
	);
};

export default Home;
