import React, { useContext, useReducer, createContext } from "react";

export const StateContext = createContext();

export function StateProvider({ children, reducer, initialState }) {
  return (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </StateContext.Provider>
  );
}

export const useStateValue = () => useContext(StateContext);
