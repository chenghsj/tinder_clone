export const initialState = {
  people: [],
  gone: new Set(),
  swipeDir: "",
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "SET_PEOPLE":
      return { ...state, people: action.people };
    case "CLICK_TO_SWIPE":
      console.log(action.swipeDir);
      return { ...state, swipeDir: action.swipeDir };
  }
};
