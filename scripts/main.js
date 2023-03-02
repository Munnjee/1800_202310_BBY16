function insertName() {
  firebase.auth().onAuthStateChanged((user) => {
    // Check if a user is signed in:
    if (user) {
      // Do something for the currently logged-in user here:
      console.log(user.uid); //print the uid in the browser console
      console.log(user.displayName); //print the user name in the browser console
      user_Name = user.displayName;

      //method #1:  insert with html only
      //document.getElementById("name-goes-here").innerText = user_Name;    //using javascript
      //method #2:  insert using jquery
      $("#name-goes-here").text(user_Name); //using jquery
    } else {
      // No user is signed in.
    }
  });
}
insertName(); //run the function

// toggle accordion
var accordion = document.querySelector(".accordion");
accordion.addEventListener("click", function () {
  this.classList.toggle("active");
  var panel = this.nextElementSibling;
  if (panel.style.display === "block") {
    panel.style.display = "none";
  } else {
    panel.style.display = "block";
  }
});

//Pull data from Firestore to display as listings
function displayCardsDynamically(collection) {
  let gigTemplate = document.querySelector("#gigCardTemplate");

  db.collection(collection)
    .get()
    .then((allGigs) => {
      var i = 1; // Allows unique id for each gig post
      allGigs.forEach((doc) => {
        var title = doc.data().jobTitle;
        var compensation = doc.data().compensation;
        var indooroutdoor = doc.data().indooroutdoor;
        var date = doc.data().date;
        var flexDate = doc.data().flexDate;
        var time = doc.data().time;
        var flexTime = doc.data().flexTime;
        let newcard = gigCardTemplate.content.cloneNode(true);

        //update title and text
        newcard.querySelector(".title").innerHTML = title;
        newcard.querySelector(".compensation").innerHTML = compensation.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
        newcard.querySelector(".indooroutdoor").innerHTML = indooroutdoor;
        newcard.querySelector(".date").innerHTML = date;
        newcard.querySelector(".flexDate").innerHTML = flexDate;
        newcard.querySelector(".time").innerHTML = time;
        newcard.querySelector(".flexTime").innerHTML = flexTime;



        document.getElementById(collection + "-go-here").appendChild(newcard);
      });
    });
}
displayCardsDynamically("giglisting");  //input param is the name of the collection
