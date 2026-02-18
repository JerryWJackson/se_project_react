import "./SideBar.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.jsx";
import PropTypes from "prop-types";

const SideBar = ({ handleUpdateUser, onSignOut, isLoggedIn }) => {
  const currentUser = useContext(CurrentUserContext);
  return (
    <section className="sideBar">
      <div className="sideBar__container">
        {isLoggedIn && (
          <>
            <img
              className="sideBar__avatar_image"
              src={currentUser.avatar}
              alt="avatar"
            />
            <p className="sideBar__username">
              {currentUser.name}
            </p>
            <button
              className="sideBar__button sideBar__button_edit-profile"
              type="button"
              onClick={handleUpdateUser}
            >
              Change profile data
            </button>
            <button
              className="sideBar__button sideBar__button-logout"
              type="button"
              onClick={onSignOut}
            >
              Log out
            </button>
          </>
        )}
      </div>
    </section>
  );
};

SideBar.propTypes = {
  handleUpdateUser: PropTypes.func.isRequired,
  onSignOut: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

export default SideBar;
