import "./SideBar.css";
import { PassCurrentUserProvider } from "../../contexts/CurrentUserContext.jsx";

const SideBar = ({ handleUpdateUser, onSignOut, isLoggedIn }) => {
  return (
    <section className="sideBar">
      <div className="sideBar__container">
        {isLoggedIn && (
          <>
            <img
              className="sideBar__avatar_image"
              src={PassCurrentUserProvider.currentUser.avatar}
              alt="avatar"
            />
            <p className="sideBar__username">
              {PassCurrentUserProvider.currentUser.name}
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

export default SideBar;
