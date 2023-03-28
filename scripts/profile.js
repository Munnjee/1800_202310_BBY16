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
        var userAboutMe = userDoc.data().aboutme;
        var userBirthDate = userDoc.data().birthdate;
        let picUrl = userDoc.data().profilePic; 

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
        if (userAboutMe != null) {
          document.getElementById("aboutMeInput").value = userAboutMe;
        }
        if (userBirthDate != null) {
          document.getElementById("birthDateInput").value = userBirthDate;
        }
        if (picUrl != null) {
          console.log(picUrl);
          // use this line if "mypicdiv" is a "div"
          //$("#mypicdiv").append("<img src='" + picUrl + "'>")
          $("#mypic-goes-here").attr("src", picUrl);
        } else console.log("picURL is null");
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

const editButton = document.getElementById("edit-button");
editButton.addEventListener("click", function editUserInfo() {
  //Enable the form fields
  document.getElementById("personalInfoFields").disabled = false;
});

var ImageFile; //global variable to store the File Object reference

function chooseFileListener() {
  const fileInput = document.getElementById("mypic-input"); // pointer #1
  const image = document.getElementById("mypic-goes-here"); // pointer #2

  //attach listener to input file
  //when this file changes, do something
  fileInput.addEventListener("change", function (e) {
    //the change event returns a file "e.target.files[0]"
    ImageFile = e.target.files[0];
    var blob = URL.createObjectURL(ImageFile);

    //change the DOM img element source to point to this file
    image.src = blob; //assign the "src" property of the "img" tag
  });
}
chooseFileListener();

function saveUserInfo() {
  firebase.auth().onAuthStateChanged(function (user) {
    var storageRef = storage.ref("images/" + user.uid + ".jpg");

    //Asynch call to put File Object (global variable ImageFile) onto Cloud
    storageRef.put(ImageFile).then(function () {
      console.log("Uploaded to Cloud Storage.");

      //Asynch call to get URL from Cloud
      storageRef.getDownloadURL().then(function (url) {
        // Get "url" of the uploaded file
        console.log("Got the download URL.");
        //get values from the from
        userName = document.getElementById("nameInput").value;
        displayName = document.getElementById("displayNameInput").value;
        userAboutMe = document.getElementById("aboutMeInput").value;
        userBirthDate = document.getElementById("birthDateInput").value;
        //Asynch call to save the form fields into Firestore.
        db.collection("users")
          .doc(user.uid)
          .update({
            name: userName,
            displayName: displayName,
            aboutme: userAboutMe,
            birthdate: userBirthDate,
            profilePic: url, // Save the URL into users collection
          })
          .then(function () {
            console.log("Added Profile Pic URL to Firestore.");
            console.log("Saved use profile info");
            alert("Your Profile has been updated!");
          });
        document.getElementById("personalInfoFields").disabled = true;
      });
    });
  });
}
