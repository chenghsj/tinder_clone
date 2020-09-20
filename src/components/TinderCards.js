import React, { useState, useEffect, useRef } from "react";
import { useSprings, animated, interpolate } from "react-spring";
import { useDrag } from "react-use-gesture";
import { useStateValue } from "../StateProvider";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "../axios";
import "./styles/TinderCards.scss";

const to = (i) => ({
  x: 0,
  y: 0,
  scale: 1,
  rot: 0,
  delay: i * 100,
});
const from = (i) => ({ scale: 1.5 });
const trans = (r, s) =>
  `perspective(1500px) rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`;

function TinderCards() {
  const [{ people, swipeDir }, dispatch] = useStateValue();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [gone] = useState(() => new Set());
  const [props, set] = useSprings(5, (i) => ({
    ...to(i),
    from: from(i),
  }));

  useEffect(() => {
    let ignore = false;
    const fetchData = async () => {
      try {
        setLoading(true);
        setError({});
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => ({
      ignore: true,
    });
  }, []);

  const bind = useDrag(
    //check https://codesandbox.io/embed/j0y0vpz59
    ({ args: [index], down, delta: [xDelta], direction: [xDir], velocity }) => {
      const trigger = velocity > 0.1; // If you flick hard enough it should trigger the card to fly out
      const dir = xDir < 0 ? -1 : 1; // Direction should either point left or right
      if (!down && trigger) gone.add(index); // If button/finger's up and trigger velocity is reached, we flag the card ready to fly out
      set((i) => {
        if (index !== i) return; // We're only interested in changing spring-data for the current spring
        const isGone = gone.has(index);
        const x = isGone ? (200 + window.innerWidth) * dir : down ? xDelta : 0; // When a card is gone it flies out left or right, otherwise goes back to zero
        const rot = xDelta / 100 + (isGone ? dir * 10 * velocity : 0); // How much the card tilts, flicking it harder makes it rotate faster
        const scale = down ? 1.05 : 1; // Active cards lift up a bit
        return {
          x,
          rot,
          scale,
          delay: undefined,
          config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 },
        };
      });
      if (!down && gone.size === people.length)
        setTimeout(() => gone.clear() || set((i) => to(i)), 600);
    }
  );

  return !loading ? (
    props.map(({ x, y, rot, scale }, i) => {
      if (people[i]?.imgUrl) {
        return (
          <animated.div
            key={i}
            className="tinderCards__animatedOutside"
            style={{
              transform: interpolate(
                [x, y],
                (x, y) => `translate3d(${x}px,${y}px,0)`
              ),
            }}
          >
            {/* This is the card itself, we're binding our gesture to it (and inject its index so we know which is which) */}
            <animated.div
              {...bind(i)}
              className="tinderCards__card"
              style={{
                transform: interpolate([rot, scale], trans),
                backgroundImage: `url("${people[i].imgUrl}")`,
              }}
            >
              <h4>{people[i].name}</h4>
            </animated.div>
          </animated.div>
        );
      }
    })
  ) : (
    <CircularProgress className="tinderCards__loading" />
  );

  // return (
  //   <div className="tinderCards__animatedOutside">
  //     {people.map((person, i) => (
  //       <div
  //         style={{ backgroundImage: `url("${person.imgUrl}")` }}
  //         className="tinderCards__card"
  //       />
  //     ))}
  //   </div>
  // );
}

export default TinderCards;
