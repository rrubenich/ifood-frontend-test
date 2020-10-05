import React from "react";
import { mount } from "enzyme";
import PlaylistCard from "../playlist-card";

describe("Test the PlayListCard component content", () => {
  it("should render a H2 html element to render the playlist name", () => {
    const component = mount(<PlaylistCard name="Spotifood" />);

    expect(component.find("h2").length).toBe(1);
  });

  it("should render Spotifood name", () => {
    const component = mount(<PlaylistCard name="Spotifood" />);

    expect(component.find("h2").length).toBe(1);
    expect(component.find("h2").html()).toContain("Spotifood");
  });
});
