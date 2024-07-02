import "./Header.css";
import logo from "../../images/logo.svg";
import avatar_nouser from "../../images/avatar_nouser.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import { PassCurrentUserProvider } from "../../contexts/CurrentUserContext.jsx";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import LoginModal from "../LoginModal/LoginModal.jsx";

/**
 * modals ostensibly used in the header
 *
      <RegisterModal
        isOpen={activeModal === "register"}
        onClose={handleCloseModal}
      />
      <LoginModal isOpen={activeModal === "login"} onClose={handleCloseModal} />
 */
const Header = ({
  onCreateModal,
  onRegister,
  onLogin,
  isLoggedIn,
  onSignOut,
}) => {
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
              className="header__avatar_button"
              onClick={onCreateModal}
            >
              +Add clothes
            </button>
            <Link to="/profile" className="header__avatar_name">
              {PassCurrentUserProvider?.currentUser?.name}
            </Link>
            <div className="header__avatar_image">
              <img
                className="header__avatar_image"
                src={PassCurrentUserProvider?.currentUser?.avatar}
                alt="avatar"
                onClick={onSignOut}
              />
            </div>
          </>
        ) : (
          //register and login buttons
          <>
            <button
              className="header__button"
              type="button"
              onClick={onRegister}
            >
              Sign Up
            </button>
            <button className="header__button" type="button" onClick={onLogin}>
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

export default Header;
