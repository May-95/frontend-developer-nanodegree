// Global Variables
const forward_button = document.getElementById("forward");
const back_button = document.getElementById("back");
const sections = document.querySelectorAll(".section");
const nav_list = document.getElementById("navbar__list");
const reviewText = document.getElementById("review-text");
const reviewAuthor = document.getElementById("review-author");
let review = 0;

/* -- reviews functionality -- 
add the reviews onto the page
allow users to go back and forwards between the reviews 
*/

// contains reviews data for the reviews section of the page
const reviewsData = [
  {
    id: 1,
    text: "LandscapeX has transformed our garden and we are so pleased with the result. The team was professional and efficient and the end result looks amazing! We highly recommend them.",
    author: "Anna, London, UK",
  },
  {
    id: 2,
    text: "I was very pleased with the work that LandscapeX did in my garden. They had an eye for detail and worked quickly, doing a great job.",
    author: "Matt, London, UK",
  },
  {
    id: 3,
    text: "Excellent work by LandscapeX! They did a great job transforming our garden into exactly what we wanted. Highly recommend!",
    author: "Richard, London, UK",
  },
];

// add reviews to reviews section
const addReview = () => {
  reviewText.innerText = reviewsData[review].text;
  reviewAuthor.innerText = reviewsData[review].author;
};

// go to the next review and add it in
const next = () => {
  review >= reviewsData.length - 1 ? (review = 0) : (review += 1);
  addReview();
};

// go back to the last review and add it in
const back = () => {
  review <= 0 ? (review = reviewsData.length - 1) : (review -= 1);
  addReview();
};

/* -- navbar functionality --
create the navbar from the title of each of the sections
 */

// function gets all the sections on the page and adds it to an array and returns the array with the title of the section
const getSections = () => {
  let sections_list = [];
  // loops through the nodelist of sections and pushes the innerText of the
  // firstElementChild of each array in the nodelist which is the title of the section
  for (const arr of sections) {
    sections_list.push(arr.firstElementChild.innerText);
  }
  return sections_list;
};

// creates the navbar items and appends it to the navbar list. Takes in the results from getSections()
const createNavItems = (sections_list) => {
  let count = 0;
  // for each item in the section_list, a new li is created with the innerHTML containing an anchor
  // tag with the section title as the text and a classname is added. The new li is then appended to the navbar list.
  for (const item of sections_list) {
    count += 1;
    const li = document.createElement("li");
    li.innerHTML = `<a href="#section${count}" class="links">${item}</a>`;
    li.className = `navbar__item section${count}`;
    li.dataset.nav = count;
    nav_list.append(li);
  }
};

// function creates the navbar by using the getSections and createNavItems function
const createNavbar = () => {
  const sections_list = getSections();
  createNavItems(sections_list);
};

// calling functions to build the navbar and the reviews section of the page
createNavbar();
addReview();

/* EventListeners
add addEventListener to the forward and back button, to the window to check for scrolling, and anchor tags for smooth scrolling
*/

// addEventListeners to the review buttons
forward_button.addEventListener("click", next);
back_button.addEventListener("click", back);

// addEventListeners to the window to check for scrolling and add active class to the current section in view
window.addEventListener("scroll", () => {
  let currentSection = "";
  let currentActiveSection = "";
  // check which section is the currrent section. Loop through the sections and check if that section is in view and save it in currentSection if it is
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    section.classList.remove("active");
    if (scrollY >= sectionTop - sectionHeight / 3) {
      currentSection = section.getAttribute("id");
    }
  });
  // add an active class to the current section
  currentActiveSection = document.getElementById(currentSection);
  currentActiveSection.classList.add("active");

  // loop through nav items, remove the class active if it has it and add the class active if the nav item's classlist includes the currentSection's id
  const navItem = document.querySelectorAll(".navbar__item");
  navItem.forEach((li) => {
    li.classList.remove("active");
    if (li.classList.contains(currentSection)) {
      li.classList.add("active");
    }
  });
});

// add eventListener to the anchor tags, when clicked which prevents the default behviour and it scrolls into view smoothly.
const anchors = document.querySelectorAll('a[href^="#"]');
anchors.forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector(anchor.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});
