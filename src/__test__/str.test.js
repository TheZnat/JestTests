import { toUpperCase, toLowerCase, len } from "../string";

describe("String", () => {
  describe("toUpperCase", () => {
    it.each([
      { input: "hello", expected: "HELLO" },
      { input: "world", expected: "WORLD" },
    ])("should convert $input to $expected", ({ input, expected }) => {
      const ActualResult = toUpperCase(input);
      expect(ActualResult).toBe(expected);
    });
  });
  describe("toLowerCase", () => {
    it.each([
      { input: "fOO", expected: "foo" },
      { input: "AxaxA", expected: "axaxa" },
    ])("should convert $input to $expected", ({ input, expected }) => {
      const ActualResult = toLowerCase(input);
      expect(ActualResult).toBe(expected);
    });
  });
  describe("len", () => {
    it.each([
      { input: "hello", expected: 5 },
      { input: "world", expected: 5 },
      { input: "foo", expected: 3 },
      { input: "bar", expected: 3 },
      { input: "", expected: 0 },
    ])("should convert $input to $expected", ({ input, expected }) => {
      const ActualResult = len(input);
      expect(ActualResult).toBe(expected);
    });
  });
});
