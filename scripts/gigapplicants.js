var params = new URL(window.location.href); //get URL of search bar
var ID = params.searchParams.get("docID");

function displayGigDescription(collect) {
  var GiglistingID = localStorage.getItem("Giglistings"); //get value for key "id"
  console.log(GiglistingID);

  let gigTemplate = document.querySelector("#ApplicantCardsTemplate");
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      var userid = user.uid;
      localStorage.setItem('reviewerID', user.uid);

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
            var applicantionid = doc.id;
            var userapplicantid = doc.data().userID;
            let newcard = gigTemplate.content.cloneNode(true);

            let CADDollar = new Intl.NumberFormat("en-CA", {
              style: "currency",
              currency: "CAD",
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

            newcard.querySelector(".decline").onclick = () =>
              deleteFromMyPosts(applicantionid);
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
document.querySelector(".delete_post").onclick = () => deletePost(ID);

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
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  }
}

// delete applicant related to posting
function deleteFromMyPosts(applicantid) {
  var result = confirm("Do you want to remove this applicant?");
  if (result) {
    //Logic to delete the item
    db.collection("gigapplicants")
      .doc(applicantid)
      .delete()
      .then(() => {
        console.log("Application has been deleted");
        window.location.href = "gigapplicants.html";
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  }
}

// Hiring an applicant
function displayGigActivefield(gigid, userapplicantid) {
  firebase.auth().onAuthStateChanged((user) => {
    var userid = user.uid;
    var result = confirm("Do you want to hire this applicant?");
    if (result) {
      db.collection("giglisting")
        .doc(gigid)
        .update({
          hired: userapplicantid,
        })
        .then(() => {
          alert("Applicant hired successfully!");
          window.location.href = "mypost.html";
        });
    } else {
      console.log("No user is signed in");
    }
  });
}

// Display gig name on page
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


//event handler for write review buttton
function saveGigDocumentIDAndRedirect() {
  let params = new URL(window.location.href) //get the url from the search bar
  let ID = params.searchParams.get("docID");
  localStorage.setItem('gigListingID', ID);
  window.location.href = 'reviewform2.html';
}