var GiglistingDocid = localStorage.getItem("Giglistings"); 
var owneriD = localStorage.getItem("ownerids");
function displayGigDescription(collect) {
  let params = new URL( window.location.href ); //get URL of search bar
  let ID = params.searchParams.get( "docID" ); //get value for key "id"
  
  console.log( ID );


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
  db.collection("gigapplicants").add({
  ApplicantName: applicationForm.applicantname.value,
  Experience: applicationForm.experience.value,
  AgreeorDisagree: applicationForm.applicationq1.value,
  Accept: applicationForm.applicationq3.value,
  Myprice: applicationForm.monetaryvalue.value,
  Questions: applicationForm.applicationq4.value,
  ownerid: owneriD,
  GiglistingDocID: GiglistingDocid,
  userID: userid

}).then(doc=> {
  alert("Your Gig Application is Successful!");
  console.log("Gig applicant collection Added!");
  
 
});
//Clears the form
applicationForm.reset();
} else {
// No User Signed In
alert("Please Sign-in to Post a Gig")
console.log("Error, No user signed in")
}
});
});
}
displayGigDescription("giglisting");




