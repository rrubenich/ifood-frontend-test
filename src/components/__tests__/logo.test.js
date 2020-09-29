import React from "react";
import { ThemeProvider } from "styled-components";
import { mount } from "enzyme";
import Logo from "../logo";
import MuiTheme from "../../theming/MuiTheme";

const renderComponent = mount(
  <ThemeProvider theme={MuiTheme}>
    <Logo />
  </ThemeProvider>,
);

describe("Test the logo content", () => {
  it("should render a H1 html element", () => {
    expect(renderComponent.find("h1").length).toBe(1);
  });

  it("should render Spotifood name", () => {
    expect(renderComponent.find("h1").length).toBe(1);
    expect(renderComponent.find("h1").html()).toContain("Spotifood");
  });
});
