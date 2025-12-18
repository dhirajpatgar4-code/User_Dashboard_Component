import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

export default function FormHeader({
  title = "Personal Details",
  step = 1,
  prevStep,
  nextStep,
}) {
  return (
    <div className="text-center mb-[17.5px] sm:mb-[20px] ">
      <h3 className="italic font-[Merriweather] font-light text-[15px] sm:text-[20px]  sm:leading-[25px] text-center tracking-[-0.06em] ">
        {title}
      </h3>
      <h3 className="flex items-center justify-center text-[15px] sm:text-[20px]">
        {/* Left */}
        {step > 1 && (
          <button
            type="button"
            onClick={prevStep}
            className="p-1 hover:opacity-80 cursor-pointer"
            aria-label="Previous step"
          >
            <ChevronLeft className="w-4.5 h-4.5" />
          </button>
        )}

        {/* Center */}
        <span className="leading-[25px] tracking-[-0.06em] cursor-default">
          {step}/5
        </span>

        {/* Right */}
        {step < 5 && (
          <button
            type="button"
            onClick={nextStep}
            className="p-1 hover:opacity-80 cursor-pointer"
            aria-label="Next step"
          >
            <ChevronRight className="w-4.5 h-4.5" />
          </button>
        )}
      </h3>
    </div>
  );
}
