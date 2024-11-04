import { createUser } from "../createUser";

describe("CreateUser", () => {
  it("should create a user with first name and last name only", () => {
    const user = createUser({ firstName: "John", lastName: "Doe" });
    expect(user).toMatchSnapshot();
  });

  it("should create a user with first name, last name and phone", () => {
    const user = createUser({
      firstName: "Anton",
      lastName: "Doe",
      phone: "1234567890",
    });
    expect(user).toMatchSnapshot();
  });

  it("should create a user with first name, last name and email", () => {
    const user = createUser({
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
    });
    expect(user).toMatchSnapshot(); // Переместите это внутрь блока it
  });
});
