import React from "react";
import PersonIcon from "@material-ui/icons/Person";
import IconButton from "@material-ui/core/IconButton";
import ForumIcon from "@material-ui/icons/Forum";
import "./styles/Header.scss";

function Header() {
  return (
    <div className="header">
      <IconButton className="header__iconButton">
        <PersonIcon className="header__icon" />
      </IconButton>
      <IconButton className="header__iconButton">
        <img className="header__icon" src="tinder.svg" alt="tinder logo" />
      </IconButton>
      <IconButton className="header__iconButton">
        <ForumIcon className="header__icon" />
      </IconButton>
      {/* <img
        src="https://source.unsplash.com/random/500*500/?selfie"
        alt="selfie"
      /> */}
    </div>
  );
}

export default Header;
