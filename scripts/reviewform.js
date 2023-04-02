var gigListingID = localStorage.getItem("gigListingID");    //visible to all functions on this page

// Function to display Gig name on top of review page
function getGigName(id){
    db.collection("giglisting")
    .doc(id)
    .get()
    .then((thisGig) => {
        var gigName = thisGig.data().jobTitle;
        document.getElementById("gigName").innerHTML = gigName;
    })
};
getGigName(gigListingID);

var reviewerID = localStorage.getItem("reviewerID")

function writeReview() {
    let Level = document.getElementById("level").value;
    let Description = document.getElementById("description").value;
    let RedoGig = document.querySelector('input[name="redoGig"]:checked').value;
    let WorkWithEmployerAgain = document.querySelector('input[name="workWithEmployerAgain"]:checked').value;
    let Compensation = document.getElementById("comp_fair").value;
    firebase.auth().onAuthStateChanged(user => {
        if(user) {
            var currentUser = db.collection("users").doc(user.uid);
            var userID = user.uid;
            currentUser.get()
            .then(userDoc => {
                var reviewerName = userDoc.data().displayName;
                var gigListingRef = db.collection("giglisting").doc(gigListingID);
                gigListingRef.get()
                .then(gigListingDoc => {
                    var targetUserID = gigListingDoc.data().owner;
                    var gigTitle = gigListingDoc.data().jobTitle;
                    db.collection("reviews").add({
                        gigListingID: gigListingID,
                        gigTitle: gigTitle,
                        targetUserID: targetUserID,
                        reviewerID: userID,
                        reviewerName: reviewerName,
                        level: Level,
                        compensation: Compensation,
                        description: Description,
                        redoGig: RedoGig,
                        workWithEmployerAgain: WorkWithEmployerAgain,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp()
                    }).then(() => {
                        alert("Your review has been submitted!")
                        window.location.href = "thanks.html";
                    });
                });
            });
        } else {
            console.log("Please login to review!");
            window.location.href = "login.html";
        }
    });
}

function writeReview2() {
    let Level = document.getElementById("level").value;
    let Description = document.getElementById("description").value;
    let RedoGig = document.querySelector('input[name="redoGig"]:checked').value;
    let WorkWithEmployerAgain = document.querySelector('input[name="workWithEmployerAgain"]:checked').value;
    let Compensation = document.getElementById("comp_fair").value;
    firebase.auth().onAuthStateChanged(user => {
        if(user) {
            var currentUser = db.collection("users").doc(user.uid);
            var userID = user.uid;
            currentUser.get()
            .then(userDoc => {
                var reviewerName = userDoc.data().displayName;
                var gigListingRef = db.collection("giglisting").doc(gigListingID);
                gigListingRef.get()
                .then(gigListingDoc => {
                    var targetUserID = gigListingDoc.data().hired;
                    var gigTitle = gigListingDoc.data().jobTitle;
                    db.collection("reviews").add({
                        gigListingID: gigListingID,
                        gigTitle: gigTitle,
                        targetUserID: targetUserID,
                        reviewerID: userID,
                        reviewerName: reviewerName,
                        level: Level,
                        compensation: Compensation,
                        description: Description,
                        redoGig: RedoGig,
                        workWithEmployerAgain: WorkWithEmployerAgain,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp()
                    }).then(() => {
                        alert("Your review has been submitted!")
                        window.location.href = "thanks.html";
                    });
                });
            });
        } else {
            console.log("Please login to review!");
            window.location.href = "login.html";
        }
    });
}