import { isValidLink } from "../client/js/isValidLink";


// test to check if isValidLink returns expected values. Links are considered valid if they begin with http or https
describe("Testing the link validation functionality. True if it starts with http or https.", () => {
  test("https://google.com should be a valid url", () => {
    expect(isValidLink("https://google.com")).toBe(true);
  });

  test("www.google.com is not a valid url", () => {
      expect(isValidLink("www.google.com")).toBe(false);
    });
});
