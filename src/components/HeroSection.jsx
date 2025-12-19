// HeroSection.jsx
import ButtonCallToAction from "./ui/button/ButtonCallToAction";
import HeroBg from "../assets/Rectangle 14.png";
import HeroIllustration from "../assets/Hero_Illustration.png";
import CallingUI from "../assets/Calling.png";

export default function HeroSection() {
  return (
    <section className="w-full flex justify-center bg-white pb-16">
      <div className="w-full max-w-[1520px] px-4">
        <div
          className="
            relative
            w-full
            lg:h-[744px]
            flex
            flex-col
            lg:flex-row
            overflow-hidden
            rounded-[24px]
          "
        >

          {/* LEFT SECTION */}
          <div
            className="
              relative
              w-full
              lg:w-[calc(1520px-24px-700px)]
              lg:h-[744px]
              bg-[#F4F4F4]
              flex
              flex-col
              justify-center
              items-center
              px-6
              lg:px-0
              py-20
              lg:py-0
              rounded-r-[24px]
              rounded-l-[24px]
            "
          >
            {/* CENTERED CONTENT */}
            <div className="w-full max-w-[560px] mx-auto flex flex-col items-center lg:items-start">

              <h1 className="montserrat text-[36px] sm:text-[44px] lg:text-[56px] leading-tight lg:leading-[72px] font-semibold text-black text-center lg:text-left">
                Medical Services
              </h1>

              <h2 className="merriweather italic text-[36px] sm:text-[44px] lg:text-[56px] leading-tight lg:leading-[72px] text-[#8E76F2] text-center lg:text-left">
                Personalized
              </h2>

              <h1 className="montserrat text-[36px] sm:text-[44px] lg:text-[56px] leading-tight lg:leading-[72px] font-semibold text-black text-center lg:text-left">
                for Better Health
              </h1>

              {/* CTA BUTTONS */}
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mt-8 lg:mt-10">
                <ButtonCallToAction content="Get Started" />

                {/* EXPLORE BUTTON */}
                <button
                  className="
                    inline-flex
                    items-center
                    justify-center
                    whitespace-nowrap
                    px-5.5 sm:px-13.5
                    py-2.5
                    rounded-[25px] sm:rounded-[50px]
                    border
                    border-[#8473E8]
                    text-[#8473E8]
                    text-sm sm:text-xl
                    font-semibold
                    hover:bg-[#8473E8]
                    hover:text-white
                    transition
                  "
                >
                  Explore Services
                </button>
              </div>
            </div>
          </div>

          {/* GAP */}
          <div className="hidden lg:block w-[24px] h-full bg-white relative z-10" />

          {/* CALLING UI — BETWEEN LEFT & RIGHT */}
          <img
            src={CallingUI}
            alt="Calling UI"
            className="
              hidden
              lg:block
              absolute
              bottom-[60px]
              left-[calc(100%-700px-12px)]
              -translate-x-1/2
              z-30
              pointer-events-none
            "
          />

          {/* RIGHT SECTION */}
          <div
            className="
              hidden
              lg:block
              relative
              w-[700px]
              h-[744px]
              overflow-hidden
              border
              border-white
              rounded-r-[24px]
              rounded-l-[24px]
            "
          >
            <img
              src={HeroBg}
              alt="Hero background"
              className="w-full h-full object-cover"
            />

            <img
              src={HeroIllustration}
              alt="Doctor illustration"
              className="
                absolute
                top-[90px]
                left-[25px]
                w-[510.34px]
                h-[654px]
                object-contain
                z-10
              "
            />
          </div>
        </div>
      </div>
    </section>
  );
}
