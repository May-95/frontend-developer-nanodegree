// OpenWeather API credentials
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "&appid=d64032529506ec25a2033e2ebdb70c1c&units=imperial";

// add an eventListener to the generate button
document.getElementById("generate").addEventListener("click", generateEntry);

// function to generate an entry and add it to the UI
function generateEntry(e) {
    // prevent default form behaviour
  e.preventDefault();
  // get zip code provided by user from the form 
  const zipCode = document.getElementById("zip").value;
//   get feelings value from the form
  const feelings = document.getElementById("feelings").value;

  // call getWeather function using the baseURL, thee zip code data from user and our API key
  getWeather(baseURL, zipCode, apiKey)
    // then the data from the getWeather function is added to the POST request along with the user's feelings from the form
    .then(function (data) {
      postData("/add", { data: data, feelings: feelings });
    })
    // after the postData function has finished, the UI is updated with the data in projectData object
    .then(updateUI);
}

// retrieves weather data from OpenWeather API using the zip code provided by user
const getWeather = async (baseURL, zipCode, apiKey) => {
  const res = await fetch(baseURL + zipCode + apiKey);
  try {
    // if a response if received from the API, it is turned into json and the data is returned.
    const data = await res.json();
    return data;
  } catch (error) {
    // if the fetch was unsuccessful, an error message is logged explaining that the details could not be retrieved and what the error was
    console.log("Unable to get the weather details from OpenWeather. The error is: ", error);
  }
};

// posts the data
const postData = async (url = "", data = {}) => {
  console.log("before response", data);
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  console.log(response)
  try {
    const postNewData = await response.json();
    return postNewData;
  } catch (error) {
    console.log("Could not complete post request. The error is: ", error);
  }
};

// updates the UI with the data received from the server
const updateUI = async () => {
    // request data from the server
  const request = await fetch("/all");
  try {
    // if there is successful response, the data is turned into json
    const allData = await request.json();

    // if the feelings textarea is not empty, the entries section of the html becomes visible and the text is added to heading. Form is also reset.
    if (document.getElementById("feelings").value) {
      document.getElementById("entries").style.display = "block";
      document.getElementById("entry-title").innerHTML = "Latest Entry:";
      document.getElementById("form").reset();
    } else {
        // if there is nothing in the feeling textarea, the entries section stays hidden since there is nothing to display to the user
      document.getElementById("entries").style.display = "none";
    }

    // saves the icon id from projectData and sets the url for that icon
    const iconID = allData.icon;
    const icon = `https://openweathermap.org/img/wn/${iconID}@2x.png`;
    // the innerHTMl is set for each piece of data from projectData so the UI is updated with the latest entry
    document.getElementById("location").innerHTML = allData.location;
    document.getElementById(
      "icon"
    ).innerHTML = `<img src=${icon} height="50px" width="50px">`;
    document.getElementById("temp").innerHTML = `${allData.temp}<sup>o</sup>F`;
    document.getElementById("description").innerHTML = allData.description;
    document.getElementById("date").innerHTML = allData.date;
    document.getElementById("content").innerHTML = allData.response;
  } catch (error) {
    console.log("Cannot update the UI, the error is: ", error);
  }
};
