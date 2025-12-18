import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";

export default function CustomDropdown({
  options = [],
  value,
  onChange,
  placeholder = "Select option",
  disabled = false,
  width = "w-full",
}) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  const isPlaceholder = !value;

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className={`relative ${width}`}>
      {/* Trigger */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((prev) => !prev)}
        className={`w-full px-2.5 py-[5px] text-xs sm:text-sm sm:px-3 sm:py-2 border rounded-lg flex items-center justify-between
          ${
            disabled
              ? "bg-gray-100 cursor-not-allowed"
              : "bg-white cursor-pointer"
          }
          border-[#8473E8] focus:ring-2 focus:ring-[#8473E8]
        `}
      >
        <span
          className={`truncate ${
            isPlaceholder
              ? "text-[rgba(0, 0, 0, 0.54)] opacity-70"
              : "text-black font-medium"
          }`}
        >
          {value || placeholder}
        </span>

        <ChevronDown
          size={18}
          className={`text-[#8473E8] transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Options */}
      {open && !disabled && (
        <div className="absolute z-20 mt-2 w-full p-2 max-h-[180px] overflow-auto rounded-3xl border border-[#8473E8] bg-white shadow-lg">
          {options.map((opt, index) => {
            const isSelected = opt === value;
            return (
              <div
                key={index}
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                }}
                className={`px-4 py-1.5 cursor-pointer hover:bg-[#f0f0ff] hover:rounded-2xl text-black text-[16x] font-medium truncate flex justify-between items-center                 ${
                  isSelected
                    ? "bg-[#8473E8] text-white rounded-2xl"
                    : "text-black hover:bg-[#f0f0ff]"
                }`}
              >
                <span>{opt}</span>

                {isSelected && (
                  <Check
                    className="h-4 w-4 text-[#8473E8]  bg-white rounded-full p-1"
                    strokeWidth={5}
                  />
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
