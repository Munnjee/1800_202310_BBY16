//Saves Data to Firestore for Gig Posts

// Get references to the form
const postForm = document.querySelector("#gig-form");

// Form submission
postForm.addEventListener("submit", (event) => {
  event.preventDefault();

  // Create a new document in Firestore
  db.collection("giglisting").add({
    jobTitle: postForm.gig_title.value,
    description: postForm.description.value,
    compensation: postForm.compensation.value,
    location: postForm.location.value,
    indooroutdoor: postForm.indooroutdoor.value,
    date: postForm.date.value,
    flexDate: postForm.flexibleDate.value,
    time: postForm.time.value,
    flexTime: postForm.flexibleTime.value,
    file: postForm.file.value,
  });

  //Clears the form
  postForm.reset();
});
