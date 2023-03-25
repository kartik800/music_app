import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../redux/userSlice/apiCalls";
import Joi from "joi";
import Textfield from "../components/Inputs/Textfield";
import Select from "../components/Inputs/Select";
import Radio from "../components/Inputs/Radio";
import Button from "../components/Button";

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

const Profile = () => {
  const [data, setData] = useState({
    name: "",
    month: "",
    year: "",
    date: "",
    gender: "",
  });
  const [errors, setErrors] = useState({});
  const { user, updateUserProgress } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const handleInputState = (name, value) => {
    setData((data) => ({ ...data, [name]: value }));
  };

  const handleErrorState = (name, value) => {
    value === ""
      ? delete errors[name]
      : setErrors(() => ({ ...errors, [name]: value }));
  };

  const schema = {
    name: Joi.string().min(5).max(10).required().label("Name"),
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { data, id: user._id };
    const res = await updateUser(payload, dispatch);
    res && Navigate("/home");
  };

  useEffect(() => {
    if (user) {
      const dk = {
        name: user.name,
        month: user.month,
        year: user.year,
        date: user.date,
        gender: user.gender,
      };
      setData(dk);
    }
  }, [user]);

  return (
    <div>
      <h1 className="text-5xl font-semibold ml-12">Profile</h1>
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
          <Button
            label="Update"
            type="submit"
            isFetching={updateUserProgress}
          />
        </div>
      </form>
    </div>
  );
};

export default Profile;
