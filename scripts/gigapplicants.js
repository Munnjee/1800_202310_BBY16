function displayGigDescription(collect) {
    let params = new URL( window.location.href ); //get URL of search bar
    let ID = params.searchParams.get( "docID" ); //get value for key "id"
    console.log( ID );



    
    let gigTemplate = document.querySelector("#ApplicantCardsTemplate");
  


    db.collection(collect).doc(ID).collection("gigapplicants")
      .get()
      .then((allGigs) => {
        var i = 1; // Allows unique id for each gig post
        allGigs.forEach((doc) => {
          var applicantname = doc.data().ApplicantName;
          let newcard = gigTemplate.content.cloneNode(true);
  
  
          //update title and text
          newcard.querySelector(".card-title").innerHTML = applicantname;
          

  
          document.getElementById("gigapplicants-go-here").appendChild(newcard);
        });
      });
  
}
  displayGigDescription("giglisting"); 