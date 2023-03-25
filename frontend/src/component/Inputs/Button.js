import { CircularProgress } from "@mui/material";

const Button = ({ label, isFetching, ...rest }) => {
  return (
    <button
      {...rest}
      className="min-w-[10rem] text-[color:var(--black)] h-[2.2rem] text-[1.6rem] font-bold cursor-pointer transition-all duration-[0.1s] px-8 py-2 rounded-[5rem] border-[none] scale-100 outline-none hover:scale-105 focus:outline-black-100"
    >
      {isFetching ? (
        <CircularProgress size={25} style={{ color: "black" }} />
      ) : (
        `${label}`
      )}
    </button>
  );
};

export default Button;
