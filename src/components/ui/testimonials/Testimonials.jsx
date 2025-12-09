import React, { Fragment } from "react";
import TestimonialsCard from "./TestimonialsCard";
const Reviews = [
  {
    description:
      "I never thought online therapy could feel this personal. The therapist listened without judging and helped me break down problems I carried for years. Small exercises they gave me actually worked, and my anxiety started reducing. I feel mentally stronger now, and the best part is that I can reach out anytime I need support.",
    stars: 5,
    name: "Tushar Sharma",
    designation: "CEO, Tushar Groups Pvt. Ltd",
    imageURL: "./Avatar.png",
  },
  {
    description:
      "I never thought online therapy could feel this personal. The therapist listened without judging and helped me break down problems I carried for years. Small exercises they gave me actually worked, and my anxiety started reducing. I feel mentally stronger now, and the best part is that I can reach out anytime I need support.",
    stars: 5,
    name: "Tushar Sharma",
    designation: "CEO, Tushar Groups Pvt. Ltd",
    imageURL: "./Avatar.png",
  },
  {
    description:
      " I never thought online therapy could feel this personal. The therapist listened without judging and helped me break down problems I carried for years. Small exercises they gave me actually worked, and my anxiety started reducing. I feel mentally stronger now, and the best part is that I can reach out anytime I need support.",
    stars: 5,
    name: "Tushar Sharma",
    designation: "CEO, Tushar Groups Pvt. Ltd",
    imageURL: "./Avatar.png",
  },
  {
    description:
      " I never thought online therapy could feel this personal. The therapist listened without judging and  helped me break down problems I carried for years. Small exercises they gave me actually worked, and my anxiety started reducing. I feel mentally stronger now, and the best part is that I can reach out anytime I need support.",
    stars: 5,
    name: "Tushar Sharma",
    designation: "CEO, Tushar Groups Pvt. Ltd",
    imageURL: "./Avatar.png",
  },
  {
    description:
      " I never thought online therapy could feel this personal. The therapist listened without judging and  helped me break down problems I carried for years. Small exercises they gave me actually worked, and my anxiety started reducing. I feel mentally stronger now, and the best part is that I can reach out anytime I need support.",
    stars: 5,
    name: "Tushar Sharma",
    designation: "CEO, Tushar Groups Pvt. Ltd",
    imageURL: "./Avatar.png",
  },
  {
    description:
      " I never thought online therapy could feel this personal. The therapist listened without judging and  helped me break down problems I carried for years. Small exercises they gave me actually worked, and my anxiety started reducing. I feel mentally stronger now, and the best part is that I can reach out anytime I need support.",
    stars: 5,
    name: "Tushar Sharma",
    designation: "CEO, Tushar Groups Pvt. Ltd",
    imageURL: "./Avatar.png",
  },
];

function Testimonials() {
  return (
    <div className="flex flex-col items-center gap-5 sm:gap-[50px] mx-[59px] sm:mx-[115px]">
      {/* Heading */}
      <div className="flex flex-col gap-[5px] sm:gap-2.5">
        <h3 className="text-purple-500 font-[Merriweather] italic font-light text-[16px]  sm:text-[32px] leading-5    sm:leading-10 text-center tracking-[-0.06em]">
          Testimonials
        </h3>
        <h1 className="font-[Inter] font-medium text-[32px] sm:text-[82px] leading-[39px] sm:leading-[99px] text-center tracking-[-0.06em] text-black">
          Voices That Trust Us
        </h1>
      </div>
      {/* Testimonials grid */}
      <div className="grid place-items-center gap-[21px] sm:gap-[35px] grid-cols-[repeat(1,minmax(250px,400px))] md:grid-cols-[repeat(2,minmax(250px,400px))] lg:grid-cols-[repeat(3,minmax(250px,400px))] ">
        {Reviews.map((review, index) => (
          <div
            key={index}
            className={`
        ${index >= 3 ? "hidden md:block" : ""}
        ${index >= 4 ? "hidden lg:block" : ""}
      `}
          >
            <TestimonialsCard review={review} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Testimonials;
