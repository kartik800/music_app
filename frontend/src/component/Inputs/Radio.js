import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

const RadioInput = ({
  name,
  handleInputState,
  label,
  options,
  required,
  ...rest
}) => {
  const handleChange = ({ currentTarget: input }) => {
    handleInputState(input.name, input.value);
  };

  return (
    <div className=" relative flex flex-col w-full">
      <p className="font-medium text-[1.4rem] mx-0 my-2;">{label}</p>
      <RadioGroup {...rest} row name={name} onChange={handleChange}>
        {options.map((option, index) => (
          <FormControlLabel
            key={index}
            value={option}
            control={
              <Radio
                disableRipple
                style={{ color: "#15883e", transform: "scale(1.2)" }}
                required={required}
              />
            }
            label={option}
            className="text-[1.4rem] font-normal capitalize"
          />
        ))}
      </RadioGroup>
    </div>
  );
};

export default RadioInput;
