import {
  basketWithNoQuantity,
  filteredBasketWithQuantityOnly,
} from "../__mocks__/basket.mock";
import { filterArray } from "../filterArray";

const cd = jest.fn(); // функция подставляеться вместо callback
const lagSpy = jest.spyOn(console, "log");

describe("filterArray", () => {
  afterEach(() => {
    // хук Jest который будет срабатывать после каждого it (теста) чтобы функция была изолирована
    jest.clearAllMocks(); // очистка моков (функции cd)
  });

  it.todo("should not invoke callback when array is empty");
  it("should not invoke callback when array is empty", () => {
    filterArray([], cd);
    expect(cd).not.toHaveBeenCalled();
    expect(lagSpy).not.toHaveBeenCalled();
  });

  it.todo(
    "should invoke provided function as many time as the length of an array"
  );
  it("should invoke provided function as many time as the length of an array", () => {
    const array = [1, 2, 3];
    filterArray(array, cd);
    expect(cd).toHaveBeenCalledTimes(array.length);
  });

  it.todo("should filter an array using provided predicate");
  it("should filter an array using provided predicate", () => {
    const hasQuantity = (item) => item.qty > 0;

    const result = filterArray(basketWithNoQuantity, hasQuantity);
    expect(result).toEqual(filteredBasketWithQuantityOnly);
    expect(lagSpy).toHaveBeenCalledTimes(basketWithNoQuantity.length);
  });
});
