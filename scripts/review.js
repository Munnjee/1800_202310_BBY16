
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

function populateReviews() {
    let hikeCardTemplate = document.getElementById("reviewCardTemplate");
    let hikeCardGroup = document.getElementById("reviewCardGroup");
    var GiglistingID = localStorage.getItem("Giglisting");
   // let params = new URL(window.location.href) //get the url from the searbar
   // let hikeID = params.searchParams.get("docID")
    
    // doublecheck: is your collection called "Reviews" or "reviews"?
    db.collection("reviews").where( "GiglistDocID", "==", GiglistingID).get()
        .then(allReviews => {
            reviews=allReviews.docs;
            console.log(reviews);
            reviews.forEach(doc => {
                var title = doc.data().title; //gets the name field
                var level = doc.data().level; //gets the unique ID field
                var season = doc.data().season;
                var description = doc.data().description; //gets the length field
                var flooded = doc.data().flooded;
                var scrambled = doc.data().scrambled;
                var time = doc.data().timestamp.toDate();
                console.log(time)

                let reviewCard = hikeCardTemplate.content.cloneNode(true);
                reviewCard.querySelector('.title').innerHTML = title;     //equiv getElementByClassName
                reviewCard.querySelector('.time').innerHTML = new Date(time).toLocaleString();    //equiv getElementByClassName
                reviewCard.querySelector('.level').innerHTML = `level: ${level}`;
                reviewCard.querySelector('.season').innerHTML = `season: ${season}`;
                reviewCard.querySelector('.scrambled').innerHTML = `scrambled: ${scrambled}`;  //equiv getElementByClassName
                reviewCard.querySelector('.flooded').innerHTML = `flooded: ${flooded}`;  //equiv getElementByClassName
                reviewCard.querySelector('.description').innerHTML = `Description: ${description}`;
                hikeCardGroup.appendChild(reviewCard);
            })
        })
}
populateReviews();

