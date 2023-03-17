var GiglistingDocid = localStorage.getItem("Giglisting"); 

function getHikeName(id) {
    db.collection("giglisting")
      .doc(id)
      .get()
      .then((thisGig) => {
        var GigName = thisGig.data().jobTitle;
        document.getElementById("gigName").innerHTML = GigName;
          });
}

getHikeName(GiglistingDocid);

function writeReview() {
    console.log("inside write review")
    let Title = document.getElementById("title").value;
    let Level = document.getElementById("level").value;
    let Season = document.getElementById("season").value;
    let Description = document.getElementById("description").value;
    let RedoGig = document.querySelector('input[name="redoGig"]:checked').value;
    let WorkWithEmployerAgain = document.querySelector('input[name="workWithEmployerAgain"]:checked').value;
    console.log(Title, Level, Season, Description, RedoGig, WorkWithEmployerAgain);

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var currentUser = db.collection("users").doc(user.uid)
            var userID = user.uid;
            //get the document for current user.
            currentUser.get()
                .then(userDoc => {
                    var userEmail = userDoc.data().email;
                    db.collection("reviews").add({
                        GiglistDocID: GiglistingDocid,
                        userID: userID,
                        title: Title,
                        level: Level,
                        season: Season,
                        description: Description,
                        redoGig: RedoGig,
                        workWithEmployerAgain: WorkWithEmployerAgain,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp()
                    }).then(() => {
                        window.location.href = "thanks.html"; //new line added
                    })
                })
        } else {
            console.log("No user is signed in");
            window.location.href = 'reviewform.html';
        }
    });
}










