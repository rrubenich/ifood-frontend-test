import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core";
import MuiTheme from "./theming/MuiTheme";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <MuiThemeProvider theme={MuiTheme}>
      <StyledThemeProvider theme={MuiTheme}>Spotifood</StyledThemeProvider>
    </MuiThemeProvider>
  </React.StrictMode>,
  document.getElementById("root"),
);
