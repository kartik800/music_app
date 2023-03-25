import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const CheckboxInput = ({ label, ...rest }) => {
  return (
    <FormControlLabel
      className="items-baseline"
      control={
        <Checkbox
          {...rest}
          style={{ color: "#15883e" }}
          className="pt-2 p-0 scale-[1.6]"
        />
      }
      label={label}
    />
  );
};

export default CheckboxInput;
