import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { logout } from "../redux/authSlice";
import { setCurrentSong } from "../redux/audioPlayer";
import { ClickAwayListener } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(setCurrentSong(null));
    window.location = "/login";
  };

  return (
    <div className="w-[calc(100%_-_28rem)] fixed flex justify-between items-center z-[99] pl-[26rem] pr-0 py-0 left-0 top-0 hidden">
      <div className="flex">
        {/* <div className="cursor-pointer ml-8" onClick={() => Navigate.goBack()}>
          <ArrowBackIosRoundedIcon className="bg-[color:var(--light-black)] text-[color:var(--white)] w-[1.8rem] h-[1.8rem] p-2 rounded-[50%]" />
        </div>
        <div
          className="cursor-pointer ml-8"
          onClick={() => Navigate.goForward()}
        >
          <ArrowForwardIosRoundedIcon />
        </div> */}
      </div>
      <div>
        <div
          style={{ backgroundColor: `${menu ? "#282828" : "#000"}` }}
          className="flex items-center text-[color:var(--white)] cursor-pointer p-2 rounded-[2rem] hover:bg-gray-200"
          onClick={() => setMenu(!menu)}
        >
          <AccountCircleIcon className="w-10 h-10" />
          <p className="text-[1.4rem] font-semibold mx-[0.6rem] my-0">
            {user && user.name}
          </p>
          {menu ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
        </div>
      </div>
      {menu && (
        <ClickAwayListener onClickAway={() => setMenu(false)}>
          <div
            className="w-80 absolute bg-[color:var(--light-black)] z-[100] p-2 rounded-lg right-8 top-[5.4rem]"
            onClick={() => setMenu(false)}
          >
            <Link to="/me">
              <div className="text-[color:var(--white)] flex items-center justify-between cursor-pointer p-4 rounded-[0.2rem] hover:bg-[color:var(--light-white)]">
                <p>Profile</p>
                <PersonIcon />
              </div>
            </Link>
            <div className="text-[color:var(--white)] flex items-center justify-between cursor-pointer p-4 rounded-[0.2rem] hover:bg-[color:var(--light-white)]">
              <p className="text-[1.2rem] font-medium m-0">Settings</p>
              <SettingsIcon className="w-[1.6rem] h-[1.6rem]" />
            </div>
            <div
              className="text-[color:var(--white)] flex items-center justify-between cursor-pointer p-4 rounded-[0.2rem] hover:bg-[color:var(--light-white)]"
              onClick={handleLogout}
            >
              <p className="text-[1.2rem] font-medium m-0">Logout</p>
              <LogoutIcon className="w-[1.6rem] h-[1.6rem]" />
            </div>
          </div>
        </ClickAwayListener>
      )}
    </div>
  );
};

export default Navbar;
