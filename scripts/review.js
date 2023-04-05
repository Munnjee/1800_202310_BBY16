// Function to populate Reviews about the logged in user.
function populateReviews() {
  let gigCardTemplate = document.getElementById("reviewCardTemplate");
  let gigCardGroup = document.getElementById("reviewCardGroup1");

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      var userid = user.uid;
      db.collection("reviews")
        .where("targetUserID", "==", userid)
        .orderBy("timestamp", "desc")
        .get()
        .then((allReviews) => {
          reviews = allReviews.docs;
          reviews.forEach((doc) => {
            var title = doc.data().gigTitle;
            var level = doc.data().level;
            var description = doc.data().description;
            var compensation = doc.data().compensation;
            var redoGig = doc.data().redoGig;
            var workWithEmployerAgain = doc.data().workWithEmployerAgain;
            var time = doc.data().timestamp.toDate();
            var reviewerName = doc.data().reviewerName;

            let reviewCard = gigCardTemplate.content.cloneNode(true);
            reviewCard.querySelector(".title").innerHTML = title;
            reviewCard.querySelector(".level").innerHTML = level;
            reviewCard.querySelector(".description").innerHTML = description;
            reviewCard.querySelector(".compensation").innerHTML = compensation;
            reviewCard.querySelector(".redoGig").innerHTML = redoGig;
            reviewCard.querySelector(".workWithEmployerAgain").innerHTML =
              workWithEmployerAgain;
            reviewCard.querySelector(".time").innerHTML = new Date(
              time
            ).toLocaleString();
            reviewCard.querySelector(".reviewerName").innerHTML = reviewerName;
            gigCardGroup.appendChild(reviewCard);
          });
        });
    } else {
      console.log("No user is signed in");
    }
  });
}
populateReviews();

// Function to populate Reviews written by the logged in user.
function populateReviews2() {
  let gigCardTemplate = document.getElementById("reviewCardTemplate");
  let gigCardGroup2 = document.getElementById("reviewCardGroup2");

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      var userid = user.uid;
      db.collection("reviews")
        .where("reviewerID", "==", userid)
        .orderBy("timestamp", "desc")
        .get()
        .then((allReviews) => {
          reviews = allReviews.docs;
          reviews.forEach((doc) => {
            var title = doc.data().gigTitle;
            var level = doc.data().level;
            var description = doc.data().description;
            var compensation = doc.data().compensation;
            var redoGig = doc.data().redoGig;
            var workWithEmployerAgain = doc.data().workWithEmployerAgain;
            var time = doc.data().timestamp.toDate();
            var reviewerName = doc.data().reviewerName;

            let reviewCard = gigCardTemplate.content.cloneNode(true);
            reviewCard.querySelector(".title").innerHTML = title;
            reviewCard.querySelector(".level").innerHTML = level;
            reviewCard.querySelector(".description").innerHTML = description;
            reviewCard.querySelector(".compensation").innerHTML = compensation;
            reviewCard.querySelector(".redoGig").innerHTML = redoGig;
            reviewCard.querySelector(".workWithEmployerAgain").innerHTML =
              workWithEmployerAgain;
            reviewCard.querySelector(".time").innerHTML = new Date(
              time
            ).toLocaleString();
            reviewCard.querySelector(".reviewerName").innerHTML = reviewerName;
            gigCardGroup2.appendChild(reviewCard);
          });
        });
    } else {
      console.log("No user is signed in");
    }
  });
}
populateReviews2();
