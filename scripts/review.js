var gigDocID = localStorage.getItem("gigDocID");    //visible to all functions on this page

function getGigName(id) {
    db.collection("giglisting")
      .doc(id)
      .get()
      .then((thisGig) => {
        var GigName = thisGig.data().jobTitle;
        document.getElementById("gigName").innerHTML = GigName;
          });
}

getGigName(gigDocID);