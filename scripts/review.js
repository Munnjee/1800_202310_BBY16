
function populateReviews() {
    let gigCardTemplate = document.getElementById("reviewCardTemplate");
    let gigCardGroup = document.getElementById("reviewCardGroup");
    var GiglistingID = localStorage.getItem("Giglisting");
   // let params = new URL(window.location.href) //get the url from the searbar
   // let hikeID = params.searchParams.get("docID")
    
    // doublecheck: is your collection called "Reviews" or "reviews"?
    db.collection("reviews").where( "GiglistDocID", "==", GiglistingID).get()
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
}
populateReviews();

