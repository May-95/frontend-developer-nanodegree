import { isText } from "../client/js/isText";

// test to check if isText returns expected values. Returns true if input does not start with http, https, www or has .com/.co.uk at the start.
describe("Testing the text validation functionality.", () => {
  test("Hello world - should be valid text", () => {
    expect(isText("Hello world")).toBe(true);
  });

  test("Hello.com is not a valid text ", () => {
      expect(isText("Hello.com")).toBe(false);
    });
});