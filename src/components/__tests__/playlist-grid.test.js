import React from "react";
import { shallow } from "enzyme";
import PlaylistGrid from "../playlist-grid";
import PlaylistCard from "../playlist-card";

describe("Test the PlayListGrid component content", () => {
  it("should render one PlaylistCard as a child", () => {
    const component = shallow(
      <PlaylistGrid>
        <PlaylistCard name="a" />
      </PlaylistGrid>,
    );

    expect(component.find(PlaylistCard).length).toBe(1);
  });

  it("should render three PlaylistCards as a children", () => {
    const component = shallow(
      <PlaylistGrid>
        <PlaylistCard name="a" />
        <PlaylistCard name="b" />
        <PlaylistCard name="c" />
      </PlaylistGrid>,
    );

    expect(component.find(PlaylistCard).length).toBe(3);
  });
});
