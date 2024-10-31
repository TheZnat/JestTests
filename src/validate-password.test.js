import { validatePassword } from "./validate-password";
import { passwordValidationErrors } from "./constant";

describe("validatePassword", () => {
  it("should return {success: true, error: null} for valid password", () => {
    const validPassword = "Mypassword123!";

    expect(validatePassword(validPassword)).toEqual({
      success: true,
      error: null,
    });
  });
  it("should validate a password against 8 minimum characters and return message", () => {
    const validPassword = "MyPs67!";
    const expectedError = {
      success: false,
      error: passwordValidationErrors.length,
    };

    expect(validatePassword(validPassword)).toEqual(expectedError);
  });
  it.each([
    ["mypassword12!", { success: false, error: passwordValidationErrors.case }],
    ["MYPASSWORD12!", { success: false, error: passwordValidationErrors.case }],
  ])(
    "should validate a password against mix case and return message",
    (password, expectedError) => {
      expect(validatePassword(password)).toEqual(expectedError);
    }
  );
  it.each([
    [
      "Mypassword!@",
      { success: false, error: passwordValidationErrors.number },
    ],
    [
      "Mypassword!#a",
      { success: false, error: passwordValidationErrors.number },
    ],
  ])(
    "should validate a password against digits and characters and return message",
    (password, expectedError) => {
        
      expect(validatePassword(password)).toEqual(expectedError);
    }
  );
  it("should validate a password against special characters and return message", () => {
    const validPassword = "Mypassword123";
    const expectedError = {
      success: false,
      error: passwordValidationErrors.special,
    };

    expect(validatePassword(validPassword)).toEqual(expectedError);
  });
});
