export const initialThemeState = {
  darkMode: false,
};

export type ThemeState = typeof initialThemeState;

export interface ThemeAction {
  type: "TOGGLE_DARKMODE";
}

export const themeReducer = (
  state: ThemeState = initialThemeState,
  action: ThemeAction
) => {
  switch (action.type) {
    case "TOGGLE_DARKMODE":
      return {
        ...state,
        darkMode: !state.darkMode,
      };
    default:
      return state;
  }
};
