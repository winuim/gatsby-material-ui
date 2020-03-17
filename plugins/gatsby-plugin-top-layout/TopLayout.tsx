import React, { useReducer } from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import initialTheme from "../../src/theme";
import { initialThemeState, themeReducer } from "../../src/themeReducer";
import { stateContext, dispatchContext } from "../../src/DispatchContext";

type Props = {
  children: PropTypes.ReactNodeLike;
};

export default function TopLayout(props: Props): JSX.Element {
  const [state, dispatch] = useReducer(themeReducer, initialThemeState);
  const { darkMode } = state;
  const theme = React.useMemo(() => {
    return createMuiTheme({
      ...initialTheme,
      palette: {
        primary: initialTheme.palette.primary,
        secondary: initialTheme.palette.secondary,
        type: darkMode ? "dark" : "light",
      },
    });
  }, [darkMode]);

  return (
    <React.Fragment>
      <Helmet>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Roboto:400,500,700&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <dispatchContext.Provider value={dispatch}>
          <stateContext.Provider value={state}>
            {props.children}
          </stateContext.Provider>
        </dispatchContext.Provider>
      </ThemeProvider>
    </React.Fragment>
  );
}

TopLayout.propTypes = {
  children: PropTypes.node,
};
