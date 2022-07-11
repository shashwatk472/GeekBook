import React, { createContext, useContext, useReducer } from "react";
export const store = createContext(null);
function StateProvider({ initialState, reducer, children }) {
  return (
    <store.Provider value={useReducer(reducer, initialState)}>
      {children}
    </store.Provider>
  );
}

export default StateProvider;
export const useStateValue = () => useContext(store);
