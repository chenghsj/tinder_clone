import React from "react";
import ReplayIcon from "@material-ui/icons/Replay";
import CloseIcon from "@material-ui/icons/Close";
import StarRateIcon from "@material-ui/icons/StarRate";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FlashOnIcon from "@material-ui/icons/FlashOn";
import IconButton from "@material-ui/core/IconButton";
import "./styles/SwipeButtons.scss";

function SwipeButtons() {
  return (
    <div className="swipeButtons">
      <IconButton className="swipeButtons__replay">
        <ReplayIcon className="swipeButtons__icon" />
      </IconButton>
      <IconButton className="swipeButtons__close">
        <CloseIcon className="swipeButtons__icon" />
      </IconButton>
      <IconButton className="swipeButtons__star">
        <StarRateIcon className="swipeButtons__icon" />
      </IconButton>
      <IconButton className="swipeButtons__favorite">
        <FavoriteIcon className="swipeButtons__icon" />
      </IconButton>
      <IconButton className="swipeButtons__flash">
        <FlashOnIcon className="swipeButtons__icon" />
      </IconButton>
    </div>
  );
}

export default SwipeButtons;
