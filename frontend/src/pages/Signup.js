import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Button from "../component/Inputs/Button";
import Textfield from "../component/Inputs/Textfield";
import Select from "../component/Inputs/Select";
import Radio from "../component/Inputs/Radio";
import { Link, useNavigate } from "react-router-dom";
import Joi from "joi";
import passwordComplexity from "joi-password-complexity";

const months = [
  { name: "January", value: "01" },
  { name: "February", value: "02" },
  { name: "March", value: "03" },
  { name: "Apirl", value: "04" },
  { name: "May", value: "05" },
  { name: "June", value: "06" },
  { name: "July", value: "07" },
  { name: "Augest", value: "08" },
  { name: "September", value: "09" },
  { name: "October", value: "10" },
  { name: "November", value: "11" },
  { name: "December", value: "12" },
];

const genders = ["male", "female", "non-binary"];

const Signup = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    month: "",
    year: "",
    date: "",
    gender: "",
  });

  const [isFetching, setIsFetching] = useState(false);

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleInputState = (name, value) => {
    setData((data) => ({ ...data, [name]: value }));
  };
  const handleErrorState = (name, value) => {
    value === ""
      ? delete errors[name]
      : setErrors(() => ({ ...errors, [name]: value }));
  };

  const schema = {
    email: Joi.string().email({ tlds: false }).required().label("Email"),
    password: passwordComplexity().required().label("Password"),
    name: Joi.string().min(5).max(10).required().label("Name"),
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(errors).length === 0) {
      try {
        setIsFetching(true);
        const url = process.env.REACT_APP_API_URL + "/users";
        await axios.post(url, data);
        setIsFetching(false);
        toast.success("Account created successfully");
        navigate("/login");
      } catch (error) {
        setIsFetching(false);
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status < 500
        ) {
          toast.error(error.response.data);
        } else {
          console.log(error);
          toast.error("Something went wrong!");
        }
      }
    } else {
      console.log("please fill out properly");
    }
  };
  return (
    <>
      <div className="flex w-full flex-col items-center absolute top-0 left-0 px-[4rem] py-0">
        <div className="w-[14rem] mb-[1rem]">
          <img src="" alt="" />
        </div>
        {/* <h1 text-5xl font-bold mb-12>
          Signup For free to start listening
        </h1>
        <Button
          label="Sign up with facebook"
          style={{ background: "#1877f2", color: "white" }}
        ></Button>
        <p className="text-xl">Or</p> */}
        <form onSubmit={handleSubmit} className="flex flex-col">
          <h2 className="text-[1.8rem] leading-[2.6rem] text-center mt-0">
            Signup With your email
          </h2>
          <div className="w-[45rem] mx-0 my-2">
            <Textfield
              label="What's your email"
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
          <div className="w-[45rem] mx-0 my-2">
            <Textfield
              label="Create a password"
              placeholder="Create a password"
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
          <div className="w-[45rem] mx-0 my-2">
            <Textfield
              label="What should we call you?"
              placeholder="Enter a profile name"
              name="name"
              handleInputState={handleInputState}
              schema={schema.name}
              handleErrorState={handleErrorState}
              value={data.name}
              error={errors.name}
              required={true}
            />
          </div>
          <div className="flex flex-col w-[45rem] mx-0 my-2">
            <p className="font-medium text-[1.4rem] mx-0 my-2">
              What's your date of birth?
            </p>
            <div className="flex items-center justify-between w-full">
              <div className=" w-[20%]">
                <Select
                  name="month"
                  handleInputState={handleInputState}
                  label="Month"
                  placeholder="Months"
                  options={months}
                  value={data.month}
                  required={true}
                />
              </div>
              <div className=" w-1/5">
                <Textfield
                  label="Date"
                  placeholder="DD"
                  name="date"
                  value={data.date}
                  handleInputState={handleInputState}
                  required={true}
                />
              </div>
              <div className="w-[20%]">
                <Textfield
                  label="Year"
                  placeholder="YYYY"
                  name="year"
                  value={data.year}
                  handleInputState={handleInputState}
                  required={true}
                />
              </div>
            </div>
          </div>

          <div className="w-[45rem] mx-0 my-2">
            <Radio
              label="What's your gender?"
              name="gender"
              handleInputState={handleInputState}
              options={genders}
              required={true}
            />
          </div>
          <div className="flex items-center justify-center w-[45rem] mt-2 mb-0 mx-0">
            <Button label="Sign Up" type="submit" isFetching={isFetching} />
          </div>
          <p
            className="w-[45rem] text-[1rem] leading-[1.8rem] font-sm text-center mx-0 my-[0.8rem]"
            style={{ fontSize: "1.6rem" }}
          >
            Have an account? <Link to="/login"> Log in.</Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Signup;
