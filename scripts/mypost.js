function displayDescriptionsDynamically(collection) {
  let gigTemplate = document.querySelector("#gigCardTemplate");
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      //id of user
      var userid = user.uid;
      db.collection(collection)
        .where("owner", "==", userid)
        .orderBy("postTime", "desc")
        .get()
        .then((allGigs) => {
          allGigs.forEach((doc) => {
            var title = doc.data().jobTitle;
            var compensation = doc.data().compensation;
            var indooroutdoor = doc.data().indooroutdoor;
            var date = doc.data().date;
            var flexDate = doc.data().flexDate;
            var time = doc.data().time;
            var flexTime = doc.data().flexTime;
            var picUrl = doc.data().image;
            var docID = doc.id;
            let newcard = gigCardTemplate.content.cloneNode(true);

            let CADDollar = new Intl.NumberFormat("en-CA", {
              style: "currency",
              currency: "CAD",
            });

            //update title and text
            newcard.querySelector(".title").innerHTML = title;
            newcard.querySelector(".compensation").innerHTML =
              CADDollar.format(compensation);
            newcard.querySelector(".indooroutdoor").innerHTML = indooroutdoor;
            newcard.querySelector(".date").innerHTML = date;
            newcard.querySelector(".flexDate").innerHTML = flexDate;
            newcard.querySelector(".time").innerHTML = time;
            newcard.querySelector(".flexTime").innerHTML = flexTime;
            newcard.querySelector("a").href =
              "gigapplicants.html?docID=" + docID;

            var img = newcard.querySelector("#images-goes-here");
            if (picUrl !== undefined) {
              img.setAttribute("src", picUrl);
            }

            document
              .getElementById(collection + "-go-here")
              .appendChild(newcard);
          });
        });
    } else {
      console.log("No user is signed in");
    }
  });
}
displayDescriptionsDynamically("giglisting"); //input param is the name of the collection
