import avatar from "../../images/my-avatar.png";
import "./SideBar.css";

function SideBar() {
  return (
    <section className="sideBar">
      <div className="sideBar__container">
          <img className="sideBar__avatar_image" src={avatar} alt="avatar" />
          <p className="sideBar__username">Jerry W Jackson
        </p>
      </div>
    </section>
  );
}

export default SideBar;
