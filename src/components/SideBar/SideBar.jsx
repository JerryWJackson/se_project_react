import { PassCurrentUserProvider } from "../../contexts/CurrentUserContext.jsx";
import "./SideBar.css";

function SideBar(onEditUser, onSignOut) {
  return (
    <section className="sideBar">
      <div className="sideBar__container">
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
          onClick={onEditUser}
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
      </div>
    </section>
  );
}

export default SideBar;
