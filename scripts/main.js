function displayDescriptionsDynamically(collection) {
  let gigTemplate = document.querySelector("#gigCardTemplate");

  db.collection(collection)
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

        let CADDollar = new Intl.NumberFormat('en-CA', {
          style: 'currency',
          currency: 'CAD',
        });

        //update title and text
        newcard.querySelector(".title").innerHTML = title;
        newcard.querySelector(".compensation").innerHTML = CADDollar.format(compensation);
        newcard.querySelector(".indooroutdoor").innerHTML = indooroutdoor;
        newcard.querySelector(".date").innerHTML = date;
        newcard.querySelector(".flexDate").innerHTML = flexDate;
        newcard.querySelector(".time").innerHTML = time;
        newcard.querySelector(".flexTime").innerHTML = flexTime;
        newcard.querySelector('a').href = "gigDescription.html?docID="+docID;
        
        var img = newcard.querySelector("#images-goes-here");
        if(picUrl !== undefined) {
          img.setAttribute("src", picUrl);
        }
        
        document.getElementById(collection + "-go-here").appendChild(newcard);
      });
    });
}
displayDescriptionsDynamically("giglisting");  //input param is the name of the collection