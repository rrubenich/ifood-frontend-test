import React from "react";
import { shallow } from "enzyme";
import TextField from "@material-ui/core/TextField";
import Search from "../search";

const genericMockFunction = jest.fn();

describe("Test the Search Box content", () => {
  it("should render a text input", () => {
    const component = shallow(
      <Search onChange={genericMockFunction} onClear={genericMockFunction} />,
    );

    expect(component.find(TextField).length).toBe(1);
  });

  it("should call onChange when the value is changed", () => {
    const onChange = jest.fn();
    const component = shallow(
      <Search onChange={onChange} onClear={genericMockFunction} />,
    );
    const value = "test";

    component.find(TextField).simulate("change", value);

    expect(onChange).toBeCalledWith(value);
  });
});
