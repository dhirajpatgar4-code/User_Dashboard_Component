function InputField({
  type = "text",
  placeholder = "",
  value,
  onChange,
  className = "",
  ...props
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={` px-[10px] py-[5px] text-xs sm:text-sm sm:px-3 sm:py-2   border border-[#8473E8] rounded-lg 
        focus:ring-2 focus:ring-[#8473E8] 
        placeholder-[rgba(0,0,0,0.54)] truncate
        ${className}`}
      {...props}
    />
  );
}

export default InputField;
