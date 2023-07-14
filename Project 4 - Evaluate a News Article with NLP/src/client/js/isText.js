function isText(data) {
  // if the data does not start with www, http, https or has .com or .co.uk at the beginning then the data is defined as text
  if (
    !(
      data.startsWith("https") ||
      data.startsWith("http") ||
      data.startsWith("www") ||
      /[a-z]+((?:\.com)|(?:\.co\.uk))/gi.test(data)
    )
  ) {
    return true;
    // data is a url if it starts with www/http/https or has .com or .co.uk
  } else {
    return false;
  }
}

export { isText };
