var params = new URL(window.location.href); //get URL of search bar
var ID = params.searchParams.get("docID");

document.querySelector(".delete_post").onclick = () =>
deletePost(ID);

function displayGigDescription(collect) {
 // let params = new URL(window.location.href); //get URL of search bar
 // let ID = params.searchParams.get("docID");
  var GiglistingID = localStorage.getItem("Giglistings"); //get value for key "id"
  console.log(GiglistingID);

  let gigTemplate = document.querySelector("#ApplicantCardsTemplate");
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      var userid = user.uid;

      db.collection("gigapplicants")
        .where("GiglistingDocID", "==", ID)
        .get()
        .then((allGigs) => {
          allapplicants = allGigs;
          console.log(allapplicants);
          allapplicants.forEach((doc) => {
            var applicantname = doc.data().ApplicantName;
            var email = doc.data().Email;
            var experience = doc.data().Experience;
            var questions = doc.data().Questions;
            var compensation = doc.data().Accept;
            var reqComp = doc.data().Myprice;
            var giglistid = doc.data().GiglistingDocID;
            var applicantid = doc.id;
            var userapplicantid = doc.data().userID;
            let newcard = gigTemplate.content.cloneNode(true);

            let CADDollar = new Intl.NumberFormat('en-CA', {
              style: 'currency',
              currency: 'CAD',
            });

            //update title and text
            newcard.querySelector(".card-title").innerHTML = applicantname;
            newcard.querySelector(".email").innerHTML = email;
            newcard.querySelector(".card-text").innerHTML = experience;
            newcard.querySelector(".compensation").innerHTML = compensation;
            if (reqComp !== "") {
              newcard.querySelector(".requested_compensation").innerHTML =
                CADDollar.format(reqComp);
            }
            newcard.querySelector(".questions").innerHTML = questions;

            //  newcard.querySelector('.card-href').onclick = () => deletePost(giglistid);
            newcard.querySelector(".decline").onclick = () =>
              deleteFromMyPosts(applicantid);
            newcard.querySelector(".hire").onclick = () =>
              displayGigActivefield(giglistid, userapplicantid);
            document
              .getElementById("gigapplicants-go-here")
              .appendChild(newcard);

           
          });
        });
    } else {
      console.log("No user is signed in");
    }
  });
}
displayGigDescription();

// delete giglisting document

function deletePost(gigid) {
  var result = confirm("Do you want to delete this post?");
  if (result) {
    //Logic to delete the item
    db.collection("giglisting")
      .doc(gigid)
      .delete()
      .then(() => {
        alert("This Gig has been deleted");
        console.log("Document deleted from Posts collection");
        window.location.href = "mypost.html";
        // deleteFromMyPosts(gigid);
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  }
}

// delete all gig applicants related to posting
function deleteFromMyPosts(applicantid) {
  var result = confirm("Do you want to remove this applicant from your list?");
  if (result) {
    //Logic to delete the item
    db.collection("gigapplicants")
      .doc(applicantid)
      .delete()
      .then(() => {
        console.log("1. Document deleted from Posts collection");
        window.location.href = "gigapplicants.html";
        // deleteFromMyPosts(gigid);
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  }
}

function displayGigActivefield(gigid, userapplicantid) {
  firebase.auth().onAuthStateChanged((user) => {
    var userid = user.uid;
    var result = confirm("Do you want to hire?");
    if (result) {
      db.collection("giglisting").doc(gigid).update({
        hired: userapplicantid,
      });
    } else {
      console.log("No user is signed in");
    }
  });
}

function getGigName(ID) {
  db.collection("giglisting")
    .doc(ID)
    .get()
    .then((thisGig) => {
      var GigName = thisGig.data().jobTitle;
      document.getElementById("gigName").innerHTML = GigName;
        });
}
getGigName(ID);



/*
function populateReviews() {
    let gigCardTemplate = document.getElementById("reviewCardTemplate");
    let gigCardGroup = document.getElementById("reviewCardGroup");
    var GiglistingID = localStorage.getItem("GiglistDocID");
    //var userid = localStorage.getItem("UserDocID");
    // let params = new URL(window.location.href) //get the url from the searbar
   // let hikeID = params.searchParams.get("docID")
  
    // doublecheck: is your collection called "Reviews" or "reviews"?
   
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            //id of user
            var userid = user.uid;
            db.collection("reviews").where( "Ownerid", "==", userid).get()
        .then(allReviews => {
            reviews = allReviews.docs;
            console.log(reviews);
            reviews.forEach(doc => {
                var title = doc.data().title; //gets the name field
                var level = doc.data().level; //gets the unique ID field
                var season = doc.data().season;
                var description = doc.data().description; //gets the length field
                var redoGig = doc.data().redoGig;
                var workWithEmployerAgain = doc.data().workWithEmployerAgain;
                var time = doc.data().timestamp.toDate();
                console.log(time)

                let reviewCard = gigCardTemplate.content.cloneNode(true);
                reviewCard.querySelector('.title').innerHTML = title;     //equiv getElementByClassName
                reviewCard.querySelector('.time').innerHTML = new Date(time).toLocaleString();    //equiv getElementByClassName
                reviewCard.querySelector('.level').innerHTML = `level: ${level}`;
                reviewCard.querySelector('.season').innerHTML = `season: ${season}`;
                reviewCard.querySelector('.workWithEmployerAgain').innerHTML = `workWithEmployerAgain: ${workWithEmployerAgain}`;  //equiv getElementByClassName
                reviewCard.querySelector('.redoGig').innerHTML = `redoGig: ${redoGig}`;  //equiv getElementByClassName
                reviewCard.querySelector('.description').innerHTML = `Description: ${description}`;
                gigCardGroup.appendChild(reviewCard);
            })
        })

    
    } else{  console.log("No user is signed in");
    

    }
});
}
populateReviews();
*/
