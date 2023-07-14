import { isValidLink } from "./isValidLink.js";
import { isText } from "./isText.js";

const onSubmit = (e) => {
  // prevent default form behaviour
  e.preventDefault();
console.log("hello")
  // hide previous results if there was any
  document.getElementById("result-section").style.display = "none";

  // save input value from the form
  const formValue = document.getElementById("text-url").value;

  // return is a boolean. Checks if formValue is a valid text using isText function. A valid text does not start with www, http, https or have .com/.co.uk at the end of the beginning word
  const isItText = isText(formValue);

  // return is a boolean. If formValue is not a valid text, then we check if formValue is a valid URL using isValidLink function
  const isALink = isItText ? false : isValidLink(formValue);

  // an appropriate error message is displayed if formValue is not a valid URL or is empty
  if ((!isALink && !isItText) || formValue == "") {
    const error = document.getElementById("error");
    error.style.display = "block";
    error.classList.add("error-msg");
    const errorMsg =
      formValue == ""
        ? "Cannot analyse an empty field. Enter a URL or text to be analysed."
        : "Incorrect URL formatting. URLs must start with http:// or https://";
    error.innerHTML = `<i class="fa-regular fa-xmark"></i> ${errorMsg}`;
  }

  // after validation, data is sent to server with the formValue and its input type
  if (isItText || isALink) {
    const txt_url = isItText ? "txt" : "url";
    postData("http://localhost:8081/analyse", {
      input: formValue,
      type: txt_url,
    })
      // // update the UI with the results from the API
      .then(function (data) {
        updateUI(data);
      });
  }
};

// function to send data to server, returns the data object containing the relevant data from the API call
const postData = async (url, data) => {
  // send form data to server.
  try {
    const response = await fetch(url, {
      method: "POST",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const postNewData = await response.json();
    return postNewData;
  } catch (error) {
    console.error("Unable to send form data to server. Error message:", error);
  }
};

// updates the UI with the data from the API
const updateUI = function (data) {
  try {
    // the results section is only displayed if the data is received from the API. The form input field and any previous error messages are reset
    if (data.status == "OK") {
      document.getElementById("result-section").style.display = "block";
      document.getElementById("error").style.display = "none";
      document.getElementById("form").reset();
    } else {
      return;
    }

    // for each entry in the data object, the data is inserted into the analysis result section
    for (const key in data) {
      let value = data[key].toLowerCase();
      if (value == "url") {
        document.getElementById("type").innerHTML = "URL:";
      } else if (value == "txt") {
        document.getElementById("type").innerHTML = "Text:";
      } else if (key == "polarity") {
        switch (value) {
          case "p+":
            value = "strong positive";
            break;
          case "p":
            value = "positive";
            break;
          case "neu":
            value = "neutral";
            break;
          case "n":
            value = "negative";
            break;
          case "n+":
            value = "strong negative";
            break;
          case "none":
            value = "without polarity";
            break;
          default:
            break;
        }
        document.getElementById(`${key}`).innerHTML = value;
      } else if (document.getElementById(`${key}`) != null) {
        document.getElementById(`${key}`).innerHTML = value;
      }
    }
  } catch (error) {
    console.error("Error with updating UI. Error message: ", error);
  }
};

export { onSubmit, postData, updateUI };
