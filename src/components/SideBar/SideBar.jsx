import "./SideBar.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.jsx";
import PropTypes from "prop-types";

const SideBar = ({ handleUpdateUser, onSignOut, isLoggedIn }) => {
  const currentUser = useContext(CurrentUserContext);
  return (
    <section className="sidebar">
      {isLoggedIn && currentUser && (
        <>
          <div className="sidebar__user-info">
            <img
              className="sidebar__avatar"
              src={currentUser.avatar}
              alt="avatar"
            />
            <p className="sidebar__username">{currentUser.name}</p>
          </div>
          <button
            className="sidebar__button"
            type="button"
            onClick={handleUpdateUser}
          >
            Change profile data
          </button>
          <button className="sidebar__button" type="button" onClick={onSignOut}>
            Log out
          </button>
        </>
      )}
    </section>
  );
};

SideBar.propTypes = {
  handleUpdateUser: PropTypes.func.isRequired,
  onSignOut: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

export default SideBar;
