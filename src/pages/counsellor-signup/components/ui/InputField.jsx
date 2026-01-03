function InputField({
  type = "text",
  placeholder = "",
  // value,
  width = "full",
  // onChange,
  error,
  className = "",
  ...props
}) {
  return (
    <div className={`flex flex-col ${width}`}>
      <input
        type={type}
        placeholder={placeholder}
        // value={value}
        // onChange={onChange}
        aria-invalid={!!error}
        className={`px-[10px] py-[5px] text-xs sm:text-sm sm:px-3 sm:py-2
          border rounded-lg
          focus:ring-2
          placeholder-[rgba(0,0,0,0.54)] truncate
          ${
            error
              ? "border-red-500 focus:ring-red-500"
              : "border-[#8473E8] focus:ring-[#8473E8]"
          }
          ${className}`}
        {...props}
      />

      {/* reserved space = no layout shift */}
      <p className="min-h-[14px] mt-0.5 text-xs  text-red-500 ">
        {error || ""}
      </p>
    </div>
  );
}

export default InputField;
