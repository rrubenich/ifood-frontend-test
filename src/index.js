import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core";
import MuiTheme from "./theming/MuiTheme";
import Home from "./pages/home";
import "./i18n/i18n";
import "./index.css";

ReactDOM.render(
  <MuiThemeProvider theme={MuiTheme}>
    <StyledThemeProvider theme={MuiTheme}>
      <Suspense fallback="loading">
        <Home />
      </Suspense>
    </StyledThemeProvider>
  </MuiThemeProvider>,
  document.getElementById("root"),
);
