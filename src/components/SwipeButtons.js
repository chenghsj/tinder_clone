import React, { useState, useRef, useEffect } from "react";
import ReplayIcon from "@material-ui/icons/Replay";
import CloseIcon from "@material-ui/icons/Close";
import StarRateIcon from "@material-ui/icons/StarRate";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FlashOnIcon from "@material-ui/icons/FlashOn";
import IconButton from "@material-ui/core/IconButton";
import { useStateValue } from "../StateProvider";
import Hammer from "react-hammerjs";
import axios from "../axios";
import "./styles/SwipeButtons.scss";

function SwipeButtons() {
  const [{ people, gone }, dispatch] = useStateValue();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // const [length, setLength] = useState(people.length);
  // const peopleRefs = useRef([]);

  useEffect(() => {
    let ignore = false;
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const req = await axios.get("/tinder/cards");
        if (!ignore) {
          dispatch({ type: "SET_PEOPLE", people: req.data });
        }
      } catch (err) {
        setError(err);
      }
      if (error) console.log(error);
      setLoading(false);
    };
    fetchData();
    // peopleRefs.current = new Array(people.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => ({
      ignore: true,
    });
  }, []);

  // const initCards = () => {
  //   let allCards = document.querySelectorAll(".tinderCards__animatedOutside");
  //   let newCards = document.querySelectorAll(
  //     ".tinderCards__animatedOutside:not(.removed)"
  //   );
  //   newCards.forEach((card, index) => {
  //     card.style.zIndex = allCards.length - length;
  //   });
  // };

  // const handleOnPan = (e, i) => {
  //   peopleRefs.current[i].domElement.classList.add("moving");
  //   if (e.deltaX === 0) return;
  //   if (e.center.x === 0 && e.center.y === 0) return;

  //   let xMulti = e.deltaX * 0.04;
  //   let yMulti = e.deltaY / 20;
  //   let rotate = xMulti / yMulti;

  //   e.target.style.transform = `translate(${e.deltaX}px, ${e.deltaY}px) rotate(${rotate}deg)`;
  //   // console.log(xMulti, yMulti);
  // };

  // const handleOnPanEnd = (e, i) => {
  //   peopleRefs.current[i].domElement.classList.remove("moving");
  //   let moveOutWidth = document.body.clientWidth / 2;
  //   console.log(e.deltaX, e.velocityX);
  //   let keep = Math.abs(e.deltaX) < 10 || Math.abs(e.velocityX) < 0.3;

  //   e.target.classList.toggle("removed", !keep);

  //   if (keep) {
  //     e.target.style.transform = "";
  //   } else {
  //     let endX = Math.max(Math.abs(e.velocityX) * moveOutWidth, moveOutWidth);
  //     let toX = e.deltaX > 0 ? endX : -endX;
  //     let endY = Math.abs(e.velocityY) * moveOutWidth;
  //     let toY = e.deltaY > 0 ? endY : -endY;
  //     let xMulti = e.deltaX * 0.03;
  //     let yMulti = e.deltaY / 80;
  //     let rotate = xMulti * yMulti;

  //     e.target.style.transform = `translate(${toX}px, ${
  //       toY + e.deltaY
  //     }px) rotate(${rotate}deg)`;
  //     initCards();
  //   }
  // };

  // const handleButtonClick = (dir) => {
  //   let cards = document.querySelectorAll(
  //     ".tinderCards__animatedOutside:not(.removed)"
  //   );
  //   let moveOutWidth = document.body.clientWidth * 1.5;
  //   if (!cards.length) return false;
  //   let card = cards[0];
  //   if (dir === "right") {
  //     card.style.transform = `translate(${moveOutWidth}px, -100px) rotate(-30deg)`;
  //   } else if (dir === "left") {
  //     card.style.transform = `translate(${-moveOutWidth}px, -100px) rotate(30deg)`;
  //   }
  //   initCards();
  // };
  // console.log(peopleRefs.current);

  return (
    <>
      {/* {people.map((person, i) => {
        return (
          <Hammer
            ref={(el) => (peopleRefs.current[i] = el)}
            key={people[i]._id}
            onPan={(e) => handleOnPan(e, i)}
            onPanEnd={(e) => handleOnPanEnd(e, i)}
          >
            <div key={i} className="tinderCards__animatedOutside">
              <div
                className="tinderCards__card"
                style={{
                  backgroundImage: `url("${people[i].imgUrl}")`,
                }}
              >
                <h4>{people[i].name}</h4>
              </div>
            </div>
          </Hammer>
        );
      })} */}
      <div className="swipeButtons">
        <IconButton
          // onClick={(e) => {
          //   e.preventDefault();
          //   handleButtonClick("left");
          // }}
          className="swipeButtons__close"
        >
          <CloseIcon className="swipeButtons__icon" />
        </IconButton>
        <IconButton className="swipeButtons__replay">
          <ReplayIcon className="swipeButtons__icon" />
        </IconButton>
        <IconButton
          className="swipeButtons__favorite"
          // onClick={(e) => {
          //   e.preventDefault();
          //   handleButtonClick("right");
          // }}
        >
          <FavoriteIcon className="swipeButtons__icon" />
        </IconButton>
      </div>
    </>
  );
}

export default SwipeButtons;
