import avatar from "../../images/my-avatar.png";
import React, { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./SideBar.css";

function SideBar(onEditUser, onSignOut) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <section className="sideBar">
      <div className="sideBar__container">
        <img className="sideBar__avatar_image" src={avatar} alt="avatar" />
        <p className="sideBar__username">{currentUser}</p>
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
