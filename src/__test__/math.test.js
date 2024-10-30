import { multiply, divide, sum } from "../math.js";
/// AAA - arrange, act, assert

describe("math", () => {
  describe.only("multiply", () => {
    it.each([
      { inputA: 6, inputB: 3, expected: 18 },
      { inputA: 2, inputB: 3, expected: 6 },
      { inputA: 1, inputB: 28, expected: 28 },
      { inputA: 0, inputB: 12, expected: 0 },
    ])(
      "should $inputA multiply $inputB equal $expect",
      ({ inputA, inputB, expected }) => {
        const ActualResult = multiply(inputA, inputB);
        expect(ActualResult).toBe(expected);
      }
    );
  });

  describe("divide", () => {
    it("should divide two numbers", () => {
      const expectedResult = 2;
      const ActualResult = divide(6, 3);
      expect(ActualResult).toBe(expectedResult);
    });

    it("should return infinity when dividing by zero", () => {
      const expectedResult = Infinity;
      const ActualResult = divide(6, 0);
      expect(ActualResult).toBe(expectedResult);
    });
  });

  describe("sum", () => {
    it("should sum two numbers", () => {
      const expectedResult = 6;
      const ActualResult = sum(2, 4);
      expect(ActualResult).toBe(expectedResult);
    });
  });
});
