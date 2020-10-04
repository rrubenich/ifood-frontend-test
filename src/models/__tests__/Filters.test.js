import Filters from "../Filters";

describe("Test the Filters Model", () => {
  const baseObject = {
    locale: "pt_BR",
    country: "BR",
    timestamp: null,
    limit: 10,
    offset: 10,
  };

  it("should set the attributes when a new instance is created", () => {
    expect(new Filters(baseObject)).toMatchObject(baseObject);
  });

  it("should change an attribute when set method is called", () => {
    expect(new Filters(baseObject).set("country", "US")).toMatchObject({
      ...baseObject,
      country: "US",
    });
  });
});
