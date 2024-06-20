import "./Header.css";
import logo from "../../images/logo.svg";
import avatar from "../../images/my-avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import React, { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const Header = ({ onCreateModal, onRegister, onLogin, isLoggedIn }) => {
  const currentUser = useContext(CurrentUserContext);
  const formattedDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  console.log("current user is ", currentUser);

  return (
    <header className="header">
      <div className="header__app-logo">
        <div className="">
          <Link to="/">
            <img className="header__app-logo_image" src={logo} alt="logo" />
          </Link>
        </div>
        <div className="header__app-logo_date">{formattedDate}, Austin</div>
      </div>
      <div className="header__avatar">
        <ToggleSwitch />
        <div>
          <button
            type="button"
            className="header__avatar_button"
            onClick={onCreateModal}
          >
            +Add clothes
          </button>
        </div>
        {isLoggedIn ? (
          <>
            <Link to="/profile" className="header__avatar_name">
              {currentUser}
            </Link>
            <div>
              <img className="header__avatar_image" src={avatar} alt="avatar" />
            </div>
          </>
        ) : (
          //register and login buttons
          <div>
            <button type="button" onClick={onRegister}>
              Sign Up
            </button>
            <button type="button" onClick={onLogin}>
              Log In
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
