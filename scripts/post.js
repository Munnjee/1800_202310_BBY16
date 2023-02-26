// Get references to the form and gig list
const form = document.getElementById("gig-form");
const jobList = document.getElementById("gig-list");

// Form submission
form.addEventListener("submit", function (event) {
  event.preventDefault();

  // Get form data
  const jobTitle = form["gig-title"].value;
  const description = form["description"].value;
  const compensation = form["compensation"].value;
  const location = form["location"].value;
  const indooroutdoor = form["indooroutdoor"].value
  const date = form["date"].value;
  const flexDate = form["flexibleDate"].value;
  const time = form["time"].value;
  const flexTime = form["flexibleTime"].value;
  const file = form["file"].files[0]; 

  // Create new gig posting element
  const newGig = document.createElement("li");
  const jobTitleElem = document.createElement("h3");
  const descriptionElem = document.createElement("p");
  const compensationElem = document.createElement("p");
  const locationElem = document.createElement("p");
  const indooroutdoorElem = document.createElement("p");
  const dateElem = document.createElement("p");
  const flexDateElem = document.createElement("p");
  const timeElem = document.createElement("p");
  const flexTimeElem = document.createElement("p");
  //Ask Cary now to include attachments for JS
  const applyLink = document.createElement("a");

  jobTitleElem.innerText = jobTitle;
  descriptionElem.innerText = description;
  compensationElem.innerText = compensation;
  locationElem.innerText = location;
  indooroutdoorElem.innterText = indooroutdoor;
  dateElem.innerText = date;
  flexDateElem.innerText = flexDate;
  timeElem.innerText = time;
  flexTimeElem.innerText = flexTime;
  //Ask Cary now to include attachments for JS
  applyLink.href = "#";
  applyLink.innerText = "Pick-Up Gig";

  newGig.appendChild(jobTitleElem);
  newGig.appendChild(descriptionElem);
  newGig.appendChild(compensationElem);
  newGig.appendChild(locationElem);
  newGig.appendChild(indooroutdoorElem);
  newGig.appendChild(dateElem);
  newGig.appendChild(flexDateElem);
  newGig.appendChild(timeElem);
  newGig.appendChild(flexTimeElem);
  //Ask Cary now to include attachments for JS
  newGig.appendChild(applyLink);

  jobList.appendChild(newGig);

  // Clear the form
  form.reset();
});
