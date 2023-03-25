const Select = ({ label, options, handleInputState, placeholder, ...rest }) => {
  const handleChange = ({ currentTarget: input }) => {
    handleInputState(input.name, input.value);
  };

  return (
    <div className="relative flex flex-col w-full">
      <p className="font-sm text-[1rem] mx-0 my-0">{label}</p>
      <select
        onChange={handleChange}
        {...rest}
        className="h-10 text-[1rem] font-normal border-[color:var(--black)] px-4 py-0 rounded-lg border-[0.1rem] border-solid"
      >
        <option style={{ display: "none" }} value="">
          {placeholder}
        </option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
