import React from "react";

function Stars({ count = 5 }) {
  return (
    <div className="flex" aria-label={`${count} star rating`}>
      {[...Array(count)].map((_, index) => {
        return (
          <img
            src="./star.svg"
            alt="star"
            key={index}
            className={`h-[5.79px] w-[6.04px] sm:h-[9.66px] sm:w-2.5
    ${index < count ? "opacity-100" : "opacity-30"}`}
          />
        );
      })}
    </div>
  );
}

export default Stars;
