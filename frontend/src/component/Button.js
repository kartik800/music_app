import { CircularProgress } from "@mui/material";

const Button = ({ label, isFetching, ...rest }) => {
  return (
    <button
      {...rest}
      className="min-w-[10rem] text-[color:var(--black)] h-[3.2rem] text-[1.6rem] font-bold cursor-pointer transition-all duration-[0.1s] px-2 py-2 rounded-[5rem] border-[none] scale-100 hover:scale-105"
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
