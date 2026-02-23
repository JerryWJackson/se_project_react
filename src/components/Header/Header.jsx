import "./Header.css";
import logo from "../../images/logo.svg";
import avatar_nouser from "../../images/avatar_nouser.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.jsx";
import { ModalContext } from "../../contexts/ModalContext";
import PropTypes from "prop-types";

const Header = ({ isLoggedIn }) => {
  const { handleOpenModal } = useContext(ModalContext);
  const onCreateModal = () => handleOpenModal("addItem");
  const onRegister = () => handleOpenModal("register");
  const onLogin = () => handleOpenModal("login");

  const currentUser = useContext(CurrentUserContext);
  const formattedDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

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
        {isLoggedIn ? (
          <>
            <button
              type="button"
              className="header__add-Item_button"
              onClick={onCreateModal}
            >
              +Add clothes
            </button>
            <Link to="/profile" className="header__avatar_name">
              {currentUser?.name}
            </Link>
            <div className="header__avatar_image">
              {currentUser?.avatar ? (
                <img
                  className="header__avatar_image"
                  src={currentUser.avatar}
                  alt="avatar"
                />
              ) : (
                <div className="header__avatar_placeholder">
                  {currentUser?.name?.[0]?.toUpperCase() ?? "?"}
                </div>
              )}
            </div>
          </>
        ) : (
          //register and login buttons
          <>
            <button
              name="register"
              className="header__button"
              type="button"
              onClick={onRegister}
            >
              Sign Up
            </button>
            <button
              name="login"
              className="header__button"
              type="button"
              onClick={onLogin}
            >
              Log In
            </button>
            <div className="header__avatar_image">
              <img
                className="header__avatar_image"
                src={avatar_nouser}
                alt="avatar for no user"
              />
            </div>
          </>
        )}
      </div>
    </header>
  );
};

Header.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

export default Header;
