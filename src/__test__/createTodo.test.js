import { createTodo, createTodoOnServer } from "../createTodo";
import { mockTodo } from "../__mocks__/todos.mock";

const mockedV4 = jest.fn(() => "abcd");

jest.mock("uuid", () => ({
  // ...jest.requireActual("uuid"),
  v4: () => mockedV4(),
}));

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve(mockTodo),
  })
);

describe("createTodo", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should return todo object with provided title, completed and id", () => {
    const title = "test title";
    const result = createTodo(title);
    const expectedResult = {
      title,
      completed: false,
      id: "abcd",
    };

    expect(mockedV4).toHaveBeenCalledTimes(1);
    expect(result).toEqual(expectedResult);
  });

  it("should create todo on server", async () => {
    const result = await createTodoOnServer("my todo");

    expect(result).toEqual(mockTodo);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it("should throw an error if fetch response in not ok", async () => {
    fetch.mockRejectedValueOnce("Network error");

    await expect(createTodoOnServer("my todo")).rejects.toMatch(
      "Network error"
    );
  });

  it("should throw an error from fn when response is not ok", async () => {
    fetch.mockResolvedValueOnce({ ok: false });
    const fnToThrow = () => createTodoOnServer("my todo");

    expect(fnToThrow()).rejects.toThrow("Failed to create todo");
  });

  it("should throw an error when no valid title", () => {
    const fnToThrow = () => createTodo("");

    expect(fnToThrow).toThrow('Title is required');
  });
});
