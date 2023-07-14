// function to check if the link is a valid link
function isValidLink(link) {
  // create a URL from the link. If the url protocol is http or https, the link is a valid url and true is returned
  try {
    const url = new URL(link);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch (error) {
    return false;
  }
}

export { isValidLink };
