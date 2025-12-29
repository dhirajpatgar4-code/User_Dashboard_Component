import React from "react";

const Shortbio = () => {
  return (
    <div className="bg-white w-[744px] h-[208px] ml-[53px] mt-[20px]">

      {/* Heading */}
      <h2 className="text-[28px] font-bold text-black mb-4">
        Short Bio
      </h2>

      {/* Bio Content */}
      <div className="text-black text-[20px] font-medium leading-[100%] space-y-4">

        {/* Point 1 */}
        <div className="flex items-start gap-3">
          <span>•</span>
          <p>
            Dr. Raghav Sinha is a trusted mental health expert known for his warm
            communication and evidence-based therapy methods.
          </p>
        </div>

        {/* Point 2 */}
        <div className="flex items-start gap-3">
          <span>•</span>
          <p>
            He specializes in treating anxiety, depression, stress-related
            issues, trauma recovery, OCD, ADHD, and relationship challenges.
          </p>
        </div>

        {/* Point 3 */}
        <div className="flex items-start gap-3">
          <span>•</span>
          <p>
            His sessions focus on helping patients gain clarity, emotional
            stability, and long-term mental resilience.
          </p>
        </div>

      </div>
    </div>
  );
};

export default Shortbio;
