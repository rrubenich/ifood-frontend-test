import React from "react";
import { ThemeProvider } from "styled-components";
import { mount } from "enzyme";
import Header from "../header";
import Logo from "../logo";
import MuiTheme from "../../theming/MuiTheme";
import Toolbar from "@material-ui/core/Toolbar";

describe("Test the header content", () => {
  it("should render a Toolbar Material UI component", () => {
    const component = mount(<Header />);

    expect(component.find(Toolbar).length).toBe(1);
  });

  it("should render an Logo component as child", () => {
    const component = mount(
      <Header
        logo={
          <ThemeProvider theme={MuiTheme}>
            <Logo />
          </ThemeProvider>
        }
      />,
    );

    expect(component.find(Logo).length).toBe(1);
  });
});
