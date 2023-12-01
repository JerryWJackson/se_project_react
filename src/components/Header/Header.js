import "./Header.css";

const Header = () => {
  console.log("Header");

  return (
    <header className="header">
      <div className="header__app-logo">
        <div className="">
          <img
            className="header__app-logo_image"
            src={require("../images/logo.svg").default}
            alt="logo"
          />
        </div>
        <div className="header__app-logo_date">December 2, Austin</div>
      </div>
      <div className="header__avatar">
        <div>
          <button type="button" className="header__avatar_button">
            Add clothes
          </button>
        </div>
        <div className="header__avatar_name">Jerry W Jackson</div>
        <div>
          <img
            className="header__avatar_image"
            src={require("../images/my-avatar.png").default}
            alt="avatar"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
