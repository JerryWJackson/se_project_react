import "./Header.css";
import logo from '../../images/logo.svg';
import avatar from '../../images/my-avatar.png';
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

const Header = ({ onCreateModal }) => {
  return (
    <header className="header">
      <div className="header__app-logo">
        <div className="">
          <img
            className="header__app-logo_image"
            src={logo}
            alt="logo"
          />
        </div>
        <div className="header__app-logo_date">December 2, Austin</div>
      </div>
      <div className="header__avatar">
        <ToggleSwitch />
        <div>
          <button type="button" className="header__avatar_button" onClick={onCreateModal}>
            +Add clothes
          </button>
        </div>
        <div className="header__avatar_name">Jerry W Jackson</div>
        <div>
          <img
            className="header__avatar_image"
            src={avatar}
            alt="avatar"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
