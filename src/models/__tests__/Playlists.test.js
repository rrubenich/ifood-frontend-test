import Playlists from "../Playlists";

describe("Test the Playlists Model", () => {
  const baseObject = {
    message: "Editor's picks",
    items: [
      {
        name: "Today's top hits",
      },
      {
        name: "Dance the night away",
      },
    ],
  };

  it("should set the attributes when a new instance is created", () => {
    expect(new Playlists(baseObject)).toMatchObject(baseObject);
  });

  it("should change an attribute when set method is called", () => {
    expect(
      new Playlists(baseObject).set(
        "message",
        "The Spotify featured playlists",
      ),
    ).toMatchObject({
      ...baseObject,
      message: "The Spotify featured playlists",
    });
  });

  it("should filter the items when filterBy method is called", () => {
    expect(new Playlists(baseObject).filterBy("name", "today")).toMatchObject({
      ...baseObject,
      items: [
        {
          name: "Today's top hits",
        },
      ],
    });
  });
});
