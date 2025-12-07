import RightArrow from "../../../assets/RightArrow.svg";
import { Dropdown } from "../../index";
import { useState } from "react";

const ButtonCallToAction = ({ content = "Get Started" ,textStyling="text-xl" ,horizontalMargin="mx-[30px]" }) => {
  return (
    <div className="place-content-center">
      <button className={`bg-purple-500 sm:inline-flex text-white sm:py-2.5 sm:rounded-[50px] sm:px-7.5 ${textStyling} hover:cursor-pointer hover:bg-purple-600`}>
        <span className={`${horizontalMargin} font-semibold`}>{content}</span>
        <div className="sm:rounded-full sm:w-[35px] sm:h-[34px] bg-white place-content-center">
          <img className="mx-auto" src={RightArrow} alt="right-arrow-icon" />
        </div>
      </button>
    </div>
  );
};

export default ButtonCallToAction;
