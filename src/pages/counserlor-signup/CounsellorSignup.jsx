import { MoveLeft, Paperclip } from "lucide-react";
import React, { useState } from "react";
import { ButtonCallToAction } from "../../components";
import { FileInput } from "./FileInput";
import FormHeader from "./FormHeader";
import CustomDropdown from "./SelectInput";
import InputField from "./InputField";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function CounsellorSignup() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const nextStep = () => {
    setStep((prev) => Math.min(prev + 1, 5));
  };

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };
  const handleSubmiited = () => {
    setSubmitted(true);
  };
  return (
    <div className="flex   overflow-hidden  h-screen  sm:items-center relative ">
      {/* Desktop Safe Harbour */}
      <div
        className="hidden md:block m-[60px] absolute"
        style={{
          top: "0px",
          left: "5px",

          fontFamily: "Montserrat",
          fontWeight: "700",
          fontSize: "22px",
          lineHeight: "100%",
          color: "#8473E8",
        }}
      >
        Safe Harbour
      </div>
      {!submitted ? (
        <>
          <div className="flex-1 flex flex-col overflow-hidden mt-0">
            {/* Mobile Header */}
            <div className="md:hidden w-full relative">
              <div className="w-full h-[200px] bg-[#8473E8] rounded-b-[500px] flex justify-center items-center">
                <h1 className="text-white text-3xl font-semibold">Welcome</h1>
              </div>
            </div>

            <div>
              {/* LOGO */}
              <div className="w-full flex justify-center md:pt-4 pt-[25px]">
                <img
                  src="/logo.png"
                  alt="logo"
                  className="md:h-12 md:w-12 h-[25px] w-[26px]"
                />
              </div>

              {/* Desktop Welcome */}
              <h1 className="hidden md:block text-center text-[#8473E8] text-3xl font-semibold mt-3">
                Welcome
              </h1>
            </div>

            {/* Form section */}
            <div className="md:px-[80px] xl:px-[158px] px-[41px]">
              <form className="">
                {step === 1 && <StepOne nextStep={nextStep} />}
                {step === 2 && (
                  <StepTwo nextStep={nextStep} prevStep={prevStep} />
                )}
                {step === 3 && (
                  <StepThree nextStep={nextStep} prevStep={prevStep} />
                )}
                {step === 4 && (
                  <StepFour nextStep={nextStep} prevStep={prevStep} />
                )}
                {step === 5 && (
                  <StepFive prevStep={prevStep} nextStep={handleSubmiited} />
                )}
              </form>
              <p className="text-center text-gray-600 text-xs sm:text-sm  mt-2 sm:mt-1  md:mt-3 cursor-default font-light pb-1 leading-[10px] text-black/54">
                <span className="text-[#8473E8] cursor-pointer underline   underline-offset-2">
                  Back
                </span>{" "}
                to Landing Page
              </p>
            </div>
          </div>
          <div className="hidden lg:block max-w-[540px] w-[40vw]  overflow-hidden ">
            <video
              src="/signup-doctor.mp4"
              autoPlay
              loop
              muted
              className="h-full w-full object-cover"
            />
          </div>{" "}
        </>
      ) : (
        <ThankYOu />
      )}
    </div>
  );
}

function StepOne({ nextStep }) {
  const [dob, setDob] = useState();
  const [gender, setGender] = useState("");
  const [language, setLanguage] = useState("");
  const [timezone, setTimezone] = useState("");

  return (
    <>
      <FormHeader nextStep={nextStep} />
      <div className="flex justify-between flex-col h-[180px] sm:h-[250px]">
        <div className="grid grid-cols-2 gap-x-[30.5px] sm:gap-x-[60px] gap-y-[10px] sm:gap-y-[20px]">
          <InputField placeholder="Full Name" />
          <InputField
            type="date"
            placeholder="DOB"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            max={new Date().toISOString().split("T")[0]} // prevent future dates
            className="px-3 py-2 border border-[#8473E8] rounded-lg
             focus:ring-2 focus:ring-[#8473E8]
             text-[12px] text-black/70 cursor-pointer"
          />

          <InputField type="tel" placeholder="Phone" />

          <CustomDropdown
            placeholder="Gender"
            options={["Male", "Female", "Prefer Not To Say"]}
            value={gender}
            onChange={setGender}
          />

          <InputField type="email" placeholder="Email" />

          <CustomDropdown
            placeholder="Language"
            options={["English", "Hindi"]}
            value={language}
            onChange={setLanguage}
          />

          <InputField type="password" placeholder="Password" />

          <CustomDropdown
            placeholder="Time Zone"
            options={["GMT +5:30"]}
            value={timezone}
            onChange={setTimezone}
          />
        </div>
        <p className="text-center  text-xs sm:text-sm mt-2 pb-1 sm:pb-2 cursor-default font-light  leading-[10px] text-black/54">
          Already have an account?{" "}
          <span className="text-[#8473E8] cursor-pointer underline underline-offset-2">
            Login
          </span>
        </p>
      </div>
      <div className="flex flex-col items-center mt-4">
        <ButtonCallToAction content="Continue" handlClick={nextStep} />
      </div>
    </>
  );
}

function StepTwo({ nextStep, prevStep }) {
  return (
    <>
      <FormHeader
        title="Professional Details"
        step={2}
        nextStep={nextStep}
        prevStep={prevStep}
      />
      <div className="flex justify-between flex-col  h-[180px] sm:h-[250px]">
        <div className="grid grid-cols-2 gap-x-[30.5px] sm:gap-x-[60px] gap-y-[10px] sm:gap-y-[20px] ">
          <div className="flex flex-col gap-[20px]">
            <InputField type="text" placeholder="Counselling Type" />

            <InputField type="text" placeholder="Specialties" />

            <InputField type="number" placeholder="Years of Experience" />
          </div>
          <textarea
            type="text"
            placeholder="Bio"
            className=" px-[10px] py-[5px] text-xs sm:text-sm sm:px-3 sm:py-2  border border-[#8473E8] rounded-lg focus:ring-2 focus:ring-[#8473E8] placeholder-[ rgba(0, 0, 0, 0.54)] truncate"
          />
        </div>
      </div>

      <div className="flex flex-col items-center mt-4">
        <ButtonCallToAction content="Continue" handlClick={nextStep} />
      </div>
    </>
  );
}

function StepThree({ nextStep, prevStep }) {
  return (
    <>
      <FormHeader
        title="Availability & Pricing"
        step={3}
        nextStep={nextStep}
        prevStep={prevStep}
      />
      <div className="flex justify-between flex-col h-[180px] sm:h-[250px]">
        <div className="grid  gap-y-[20px]">
          <InputField
            type="text"
            placeholder="Availability"
            className="w-[70%] mx-auto"
          />

          <InputField
            type="number"
            placeholder="Pricing"
            className="w-[70%] mx-auto"
          />
        </div>
      </div>
      <div className="flex flex-col items-center mt-4">
        <ButtonCallToAction content="Continue" handlClick={nextStep} />
      </div>
    </>
  );
}

function StepFour({ nextStep, prevStep }) {
  const [session, setSession] = useState();
  return (
    <>
      <FormHeader
        title="Session Preferences"
        step={4}
        nextStep={nextStep}
        prevStep={prevStep}
      />

      <div className="flex justify-between flex-col  h-[180px] sm:h-[250px]">
        <div className="grid  gap-y-[20px]">
          <CustomDropdown
            placeholder="Session Type"
            options={["Video Session", "Voice Session", "Chat Session"]}
            value={session}
            onChange={setSession}
            width="w-[70%] mx-auto"
          />
        </div>
      </div>
      <div className="flex flex-col items-center mt-4">
        <ButtonCallToAction content="Continue" handlClick={nextStep} />
      </div>
    </>
  );
}

function StepFive({ prevStep, nextStep }) {
  return (
    <>
      <FormHeader title="Documents" step={5} prevStep={prevStep} />

      <div className="flex justify-between flex-col  h-[180px] sm:h-[250px]">
        <div className="grid grid-cols-2 gap-x-[15.5px] sm:gap-x-[60px] gap-y-[15px] sm:gap-y-[30px]">
          <FileInput fileType="JPG/PNG" />
          <FileInput label="Additional Certificates" />
          <FileInput label="Government ID" />
          <FileInput label="Experience Letters" />
          <FileInput label="Qualification Certificates" />
          <FileInput
            label="Professional License/
Registration Certificate"
          />
        </div>
        <p className="text-center  text-xs sm:text-sm mt-2 pb-1 sm:pb-4 cursor-default font-light  leading-[10px] text-black/54">
          By continuing, you agree to our{" "}
          <span className="text-[#8473E8] underline underline-offset-2  cursor-pointer">
            Terms
          </span>{" "}
          &{" "}
          <span className="text-[#8473E8] underline underline-offset-2 cursor-pointer">
            Privacy Policy
          </span>
          .
        </p>
      </div>
      <div className="flex flex-col items-center gap-[28px] gap-2 mt-4">
        <ButtonCallToAction content="Continue" handlClick={nextStep} />
      </div>
    </>
  );
}

function ThankYOu() {
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
          Back
        </span>{" "}
        to Landing Page
      </p>
    </div>
  );
}
