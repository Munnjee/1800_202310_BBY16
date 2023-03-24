var ImageFile;

function listenFileSelect() {
  // listen for file selection
  var fileInput = document.getElementById("fileinput"); // pointer #1
  const image = document.getElementById("file"); // pointer #2

  fileInput.addEventListener('change', function (e) {
    ImageFile = e.target.files[0];
    var blob = URL.createObjectURL(ImageFile);
    image.src = blob; // display this image
  })
}
listenFileSelect();


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
      }).then(doc => {
        alert("Your Gig Post is Successful!");
        console.log("Gig Post Document Added!");
        console.log(doc.id);
        uploadPic(doc.id);
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

//function that pull url from the website
function uploadPic(giglistingDocID) {
  console.log("inside uploadPic " + giglistingDocID);
  var storageRef = storage.ref("images/" + giglistingDocID + ".jpg");

  storageRef.put(ImageFile)
    .then(function () {
      console.log('Uploaded to Cloud Storage.');
      storageRef.getDownloadURL()
        .then(function (url) { // Get URL of the uploaded file
          console.log("Got the download URL.");
          db.collection("giglisting").doc(giglistingDocID).update({
            "image": url // Save the URL into users collection
          })
            .then(function () {
              console.log('Added pic URL to Firestore.');
            })
        })
    })
    .catch((error) => {
      console.log("error uploading to cloud storage");
    })
}






