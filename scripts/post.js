//Saves Data to Firestore for Gig Posts

// Get references to the form
const postForm = document.querySelector("#gig-form");

// Form submission
postForm.addEventListener("submit", (event) => {
  event.preventDefault();

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User Signed In
      // Create a new document in Firestore
      const compensationValue = parseFloat(postForm.compensation.value.replace(/\$/g, ''));
      db.collection("giglisting").add({
        owner: user.uid,
        postTime: firebase.firestore.FieldValue.serverTimestamp(),
        jobTitle: postForm.gig_title.value,
        description: postForm.description.value,
        compensation: compensationValue,
        location: postForm.location.value,
        indooroutdoor: postForm.indooroutdoor.value,
        date: postForm.date.value,
        flexDate: postForm.flexibleDate.value,
        time: postForm.time.value,
        flexTime: postForm.flexibleTime.value,
        file: postForm.file.value,
      }).then(doc=> {
        alert("Your Gig Post is Successful!");
        console.log("Gig Post Document Added!");
        console.log(doc.id);
      });
      //Clears the form
      postForm.reset();
    } else {
      // No User Signed In
      alert("Please Sign-in to Post a Gig")
      console.log("Error, No user signed in")
    }
  });
});