import { Paperclip } from "lucide-react";
import React from "react";

export function FileInput({
  label = "Profile Picture",
  fileType = "PDF/JPG/PNG",
}) {
  return (
    <div className="relative inline-block w-full">
      <label className="relative block border border-[#8473E8] rounded-lg px-[10px] py-[5px] text-xs sm:text-sm sm:px-3 sm:py-2  cursor-pointer focus-within:ring-2 focus-within:ring-[#8473E8]">
        <input
          type="file"
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
        <div className="flex items-center">
          <span className="text-[rgba(0,0,0,0.54)] truncate">{label}</span>
          <Paperclip className="ml-auto text-[rgba(0,0,0,0.57)] w-3 sm:w-3.5" />
        </div>
      </label>
      <p className="absolute right-0 -bottom-3.5 sm:-bottom-5  text-[10px] sm:text-xs font-semibold ">
        *{fileType}
      </p>
    </div>
  );
}

// px-[10px] py-[5px] text-xs sm:text-sm sm:px-3 sm:py-2
