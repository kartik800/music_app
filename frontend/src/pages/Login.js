import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/authSlice/apiCalls";
import Textfield from "../component/Inputs/Textfield";
import CheckboxInput from "../component/Inputs/Checkbox";
import Button from "../component/Button";
import { Link } from "react-router-dom";
import Joi from "joi";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const { isFetching } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleInputState = (name, value) => {
    setData({ ...data, [name]: value });
  };

  const handleErrorState = (name, value) => {
    value === ""
      ? delete errors[name]
      : setErrors({ ...errors, [name]: value });
  };

  const schema = {
    email: Joi.string().email({ tlds: false }).required().label("Email"),
    password: Joi.string().required().label("Password"),
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(errors).length === 0) {
      login(data, dispatch);
    } else {
      console.log("please fill out properly");
    }
  };
  return (
    <div className="flex flex-col w-full items-center pb-2">
      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="w-full mx-0 my-2">
          <Textfield
            label="Enter your email"
            placeholder="Enter your email"
            name="email"
            handleInputState={handleInputState}
            schema={schema.email}
            handleErrorState={handleErrorState}
            value={data.email}
            error={errors.email}
            required={true}
          />
        </div>
        <div className="w-full mx-0 my-2">
          <Textfield
            label="Password"
            placeholder="Password"
            name="password"
            handleInputState={handleInputState}
            schema={schema.password}
            handleErrorState={handleErrorState}
            value={data.password}
            error={errors.password}
            type="password"
            required={true}
          />
        </div>
        <p className="text-[color:var(--dark-green)] underline text-[1rem] font-normal cursor-pointer mx-0 my-1">
          Forgot your password?
        </p>
        <div className="flex w-full items-center justify-between border-b-[color:var(--light-gray)] px-0 py-6 border-b-[0.1rem] border-solid">
          <CheckboxInput label="Remember me" />
          <Button
            type="submit"
            label="LOG IN"
            isFetching={isFetching}
            style={{ color: "white", background: "#0000FF", width: "20rem" }}
          />
        </div>
      </form>
      <h1 className="text-center text-[1.2rem] mt-5 mb-4">
        Don't have an account?
      </h1>
      <Link to="/signup">
        <button className="w-full h-10 border-[color:var(--gray)] flex items-center justify-center text-[1.5rem] font-semibold tracking-[2px] uppercase text-[color:var(--light-gray)] cursor-pointer transition-all duration-[ease] delay-[0.5s] mx-0 my-2 rounded-[50rem] border-2 border-solid outline-none bg-transparent">
          sign up
        </button>
      </Link>
    </div>
  );
};

export default Login;
