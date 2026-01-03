import { Link } from "react-router-dom";

export function ThankYOu() {
  return (
    <div className="text-center w-[100vw] flex flex-col items-center justify-center gap-1">
      {/* LOGO */}
      <div className="w-full flex justify-center md:pt-4 pt-[25px]">
        <img
          src="/logo.png"
          alt="logo"
          className="md:h-12 md:w-12 h-[25px] w-[26px]"
        />
      </div>
      <div
        className="md:hidden block mt-2 "
        style={{
          fontFamily: "Montserrat",
          fontWeight: "700",
          fontSize: "16px",
          lineHeight: "100%",
          color: "#8473E8",
        }}
      >
        Safe Harbour
      </div>

      {/* Desktop Welcome */}
      <h1 className="text-center text-black text-[28px] sm:text-[52px] font-semibold  px-[10px] py-[20px] sm:py-[10px] sm:mt-3 sm:mb-[30px]">
        Thanks for joining us!
      </h1>

      <div className="text-[14px] sm:text-[26px] w-[75vw] sm:w-[55vw] mx-auto mb-[50px] sm:mb-[100px]">
        We’ve received your information — our team will reach out to you as soon
        as possible.
      </div>
      <p className="text-center text-gray-600 text-xs sm:text-sm  mt-2 sm:mt-1  cursor-default font-light  leading-[10px] text-black/54">
        <span className="text-[#8473E8] cursor-pointer underline underline-offset-2">
          <Link to={"/"}>Back</Link>
        </span>{" "}
        to Landing Page
      </p>
    </div>
  );
}
