
function displayGigDescription() {
    let params = new URL( window.location.href ); //get URL of search bar
    let ID = params.searchParams.get( "docID" ); //get value for key "id"
    console.log( ID );

    // doublecheck: is your collection called "Reviews" or "reviews"?
    db.collection( "giglisting" )
        .doc( ID )
        .get()
        .then( doc => {
            //grab the data from giglisitng
            thisGig = doc.data();
            thisTitle = doc.data().jobTitle;
            thisDate = doc.data().date;
            thisFlexDate = doc.data().flexDate; 
            thisTime = doc.data().time;         
            thisFlexTime = doc.data().flexTime; 
            thisIndoorOutdoor= doc.data().indoorOutdoor; 
            thisLocation = doc.data().location;
            thisCompensation = doc.data().compensation;
            thisDescription = doc.data().description;
            let CADDollar = new Intl.NumberFormat('en-CA', {
                style: 'currency',
                currency: 'CAD',
              });

            
            // populate the giglisting data to gigDescription.html 
            document.getElementById("gigTitle").innerHTML = thisTitle;
            document.getElementById("gigDate").innerHTML = thisDate;
            document.getElementById("gigFlexDate").innerHTML = thisFlexDate;
            document.getElementById("gigTime").innerHTML = thisTime;
            document.getElementById("gigFlexTime").innerHTML = thisFlexTime;
            document.getElementById("gigIndoorOutdoor").innerHTML = thisIndoorOutdoor;
            document.getElementById("gigLocation").innerHTML = thisLocation;
            document.getElementById("gigCompensation").innerHTML = CADDollar.format(thisCompensation);;
            document.getElementById("descriptionGig").innerHTML = thisDescription;
            



            // let imgEvent = document.querySelector( ".hike-img" );
            // imgEvent.src = "../images/" + hikeCode + ".jpg";
        } );
}

displayGigDescription();
   
