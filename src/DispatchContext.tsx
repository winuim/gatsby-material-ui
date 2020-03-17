import React, { createContext, useContext } from "react";
import { initialThemeState, ThemeState, ThemeAction } from "./themeReducer";

export const stateContext = createContext(initialThemeState);
export const dispatchContext = createContext(
  (() => true) as React.Dispatch<ThemeAction>
);

export const useDispatch = () => {
  return useContext(dispatchContext);
};

export const useGlobalState = <K extends keyof ThemeState>(property: K) => {
  const state = useContext(stateContext);
  return state[property];
};

export function useToggleDarkMode() {
  const dispatch = useDispatch();
  return React.useCallback(() => dispatch({ type: "TOGGLE_DARKMODE" }), [
    dispatch,
  ]);
}
