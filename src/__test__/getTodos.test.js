import axios from "axios";
import { getTodos } from "../getTodos";

const axiosSpy = jest.spyOn(axios, "get");
const errorSpy = jest.spyOn(console, "error");

describe("getTodos", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return an empty array in case of error and print error to console", async () => {
    const errorMessage = "Network error";
    // axiosSpy.mockImplementationOnce(() => Promise.reject(errorMessage));
    axiosSpy.mockRejectedValueOnce(() => Promise.reject(errorMessage));
    const result = await getTodos();

    expect(errorSpy).toHaveBeenCalledWith(errorMessage);
    expect(result).toEqual([]);
  });

  it("should return 200 todos using axios.get", async () => {
    const result = await getTodos();
    expect(axiosSpy).toHaveBeenCalledWith(
      "https://jsonplaceholder.typicode.com/todo"
    );
    expect(result).toHaveLength(200);
  });
});
