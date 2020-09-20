import React, { useState } from "react";
import ReplayIcon from "@material-ui/icons/Replay";
import CloseIcon from "@material-ui/icons/Close";
import StarRateIcon from "@material-ui/icons/StarRate";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FlashOnIcon from "@material-ui/icons/FlashOn";
import IconButton from "@material-ui/core/IconButton";
import { useStateValue } from "../StateProvider";
import "./styles/SwipeButtons.scss";

function SwipeButtons() {
  const [{}, dispatch] = useStateValue();
  return (
    <div className="swipeButtons">
      <IconButton
        className="swipeButtons__close"
        onClick={() => dispatch({ type: "CLICK_TO_SWIPE", swipeDir: "left" })}
      >
        <CloseIcon className="swipeButtons__icon" />
      </IconButton>
      <IconButton className="swipeButtons__replay">
        <ReplayIcon className="swipeButtons__icon" />
      </IconButton>
      <IconButton
        className="swipeButtons__favorite"
        onClick={() => dispatch({ type: "CLICK_TO_SWIPE", swipeDir: "right" })}
      >
        <FavoriteIcon className="swipeButtons__icon" />
      </IconButton>
    </div>
  );
}

export default SwipeButtons;
