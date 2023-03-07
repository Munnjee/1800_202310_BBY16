function populateUserInfo() {
  firebase.auth().onAuthStateChanged(user => {
      // Check if user is signed in:
      if (user) {

          //go to the correct user document by referencing to the user uid
          currentUser = db.collection("users").doc(user.uid)
          //get the document for current user.
          currentUser.get()
              .then(userDoc => {
                  //get the data fields of the user
                  var userName = userDoc.data().name;
                  var userAboutMe = userDoc.data().aboutme;
                  var userBirthDate = userDoc.data().birthdate;

                  //if the data fields are not empty, then write them in to the form.
                  if (userName != null) {
                      document.getElementById("nameInput").value = userName;
                  }
                  if (userAboutMe != null) {
                      document.getElementById("aboutMeInput").value = userAboutMe;
                  }
                  if (userBirthDate != null) {
                      document.getElementById("birthDateInput").value = userBirthDate;
                  }

              })
      } else {
          // No user is signed in.
          console.log ("No user is signed in");
          alert("Please Sign-in to view your Profile.");

      }
  });
}
//call the function to run it 
populateUserInfo();

const editButton = document.getElementById("edit-button");
editButton.addEventListener("click", function editUserInfo() {
  //Enable the form fields
  document.getElementById("personalInfoFields").disabled = false;
});

function saveUserInfo() {
  //get user entered values
  userName = document.getElementById("nameInput").value; //get the value of the field with id="nameInput"
  userAboutMe = document.getElementById("aboutMeInput").value; //get the value of the field with id="schoolInput"
  userBirthDate = document.getElementById("birthDateInput").value; //get the value of the field with id="cityInput"
  //update user's document in Firestore
  currentUser
    .update({
      name: userName,
      aboutme: userAboutMe,
      birthdate: userBirthDate,
    })
    .then(() => {
      console.log("Document successfully updated!");
      alert("Your Profile has been updated!");
    });
      //disable edit
  document.getElementById("personalInfoFields").disabled = true;
}
