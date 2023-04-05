function populateUserInfo() {
  firebase.auth().onAuthStateChanged((user) => {
    // Check if user is signed in:
    if (user) {
      //go to the correct user document by referencing to the user uid
      currentUser = db.collection("users").doc(user.uid);
      //get the document for current user.
      currentUser.get().then((userDoc) => {
        //get the data fields of the user
        var email = userDoc.data().email;
        var userName = userDoc.data().name;
        var displayName = userDoc.data().displayName;

        //if the data fields are not empty, then write them in to the form.
        if (email != null) {
          document.getElementById("emailInput").value = email;
        }
        if (userName != null) {
          document.getElementById("nameInput").value = userName;
        }
        if (displayName != null) {
          document.getElementById("displayNameInput").value = displayName;
        }
      });
    } else {
      // No user is signed in.
      console.log("No user is signed in");
      alert("Please Sign-in to view your Profile.");
    }
  });
}
//call the function to run it
populateUserInfo();

var GiglistingDocid = localStorage.getItem("gigListingID");
var owneriD = localStorage.getItem("ownerids");
function displayGigDescription(collect) {
  let params = new URL(window.location.href); //get URL of search bar
  let ID = params.searchParams.get("docID"); //get value for key "id"

  console.log(ID);

  //Saves Data to Firestore for Application Posts

  // Get references to the form
  const applicationForm = document.querySelector("#application1");

  // Form submission
  applicationForm.addEventListener("submit", (event) => {
    event.preventDefault();

    //creates a collection under an giglisting document called gigapplicants,

    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        var userid = user.uid;
        db.collection("gigapplicants")
          .add({
            Email: applicationForm.emailInput.value,
            ApplicantName: applicationForm.nameInput.value,
            DiplayName: applicationForm.displayNameInput.value,
            postTime: firebase.firestore.FieldValue.serverTimestamp(),
            Experience: applicationForm.experience.value,
            AgreeorDisagree: applicationForm.applicationq1.value,
            Accept: applicationForm.applicationq3.checked
              ? applicationForm.applicationq3.value
              : "My Requested Compensation:",
            Myprice: applicationForm.applicationq3.checked
              ? ""
              : applicationForm.monetaryvalue.value,
            Questions: applicationForm.applicationq4.value,
            ownerid: owneriD,
            GiglistingDocID: GiglistingDocid,
            userID: userid,
          })
          .then((doc) => {
            alert("Your Gig Application is Successful!");
            console.log("Gig applicant collection Added!");
            window.location.href = "main.html";
          });
      } else {
        // No User Signed In
        alert("Please Sign-in to Post a Gig");
        console.log("Error, No user signed in");
      }
    });
  });
}
displayGigDescription("giglisting");
