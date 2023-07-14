import { postData } from "../client/js/handleForm";

describe("Testing the functionality of postData function.", () => {
  test("test that form data has been sent to server", () => {
    return postData("http://localhost:8081/analyse", {
      input: "hello",
      type: "txt",
    }).then((data) => {
      expect(data).toMatchObject({ input: "hello", type: "txt" });
    });
  });
});
