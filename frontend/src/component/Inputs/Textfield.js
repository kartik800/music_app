import Joi from "joi";
import ClearIcon from "@mui/icons-material/Clear";

const Textfield = ({
  label,
  error,
  handleInputState,
  handleErrorState,
  schema,
  ...rest
}) => {
  const validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const inputSchema = Joi.object({ [name]: schema });
    const { error } = inputSchema.validate(obj);
    return error ? error.details[0].message : "";
  };

  const handleChange = ({ currentTarget: input }) => {
    if (schema) {
      const errorMessage = validateProperty(input);
      if (handleErrorState) handleErrorState(input.name, errorMessage);
    }
    handleInputState(input.name, input.value);
  };
  return (
    <div className="w-full flex flex-col pb-5;">
      <p className="text-[1rem] mx-2 my-0 text-gray-600">{label}</p>
      <input
        {...rest}
        onChange={handleChange}
        className={
          error
            ? `h-10 text-[1.6rem] font-normal border-[color:var(--black)] px-4 py-0 rounded-lg border-[0.1rem] border-solid hover:outline-black border-[red] outline-red-400`
            : `h-10 text-[1.6rem] font-normal border-[color:var(--black)] px-4 py-0 rounded-lg border-[0.1rem] border-solid hover:outline-black`
        }
      />
      {error && (
        <p className="text-[red] font-normal flex items-center mx-0 my-[0.2rem]">
          <ClearIcon /> {error}
        </p>
      )}
    </div>
  );
};

export default Textfield;
