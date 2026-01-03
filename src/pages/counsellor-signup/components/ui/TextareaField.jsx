export function TextareaField({ error, className = "", ...props }) {
  return (
    <div className="flex flex-col w-full h-full">
      <textarea
        className={`px-[10px] py-[5px] text-xs sm:text-sm sm:px-3 sm:py-2 h-full
          border rounded-lg
          focus:ring-2
          placeholder-[rgba(0,0,0,0.54)]
          truncate
          ${
            error
              ? "border-red-500 focus:ring-red-500"
              : "border-[#8473E8] focus:ring-[#8473E8]"
          }
          ${className}`}
        aria-invalid={!!error}
        {...props}
      />
      {/* Reserve space to prevent layout shift */}
      <p className="min-h-[14px] mt-1 text-xs text-red-500">{error || ""}</p>
    </div>
  );
}
