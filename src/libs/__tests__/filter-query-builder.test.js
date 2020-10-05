import filterQueryBuilder from "../filter-query-builder";

describe("Test the Filters Query Builder library", () => {
  it("should return an empty string when no one filter is passed", () => {
    expect(filterQueryBuilder(null)).toBe("");
  });

  it("should return an unique filter when a filter with one attribute is passed", () => {
    expect(filterQueryBuilder({ filter: "value" })).toBe("?filter=value");
  });

  it("should return a query with two filters when a two attributes are passed", () => {
    expect(filterQueryBuilder({ filterA: "valueA", filterB: "valueB" })).toBe(
      "?filterA=valueA&filterB=valueB",
    );
  });
});
