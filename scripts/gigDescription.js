//--------------------------------------
// map global variables
//---------------------------------------
var map;            //for the map to be displayed
var AddressString;  //for what was read from firestore
var LocationArea;   //for new circle object
var radius = 500;   //500 meters, you can change this to your liking

function displayGigDescription(collect) {
    let params = new URL(window.location.href); //get URL of search bar
    let ID = params.searchParams.get("docID"); //get value for key "id"
    console.log(ID);


    db.collection(collect)
        .doc(ID)
        .get()
        .then(doc => {
            //grab the data from giglisitng
            thisGig = doc.data();
            thisTitle = doc.data().jobTitle;
            thisDate = doc.data().date;
            thisFlexDate = doc.data().flexDate;
            thisTime = doc.data().time;
            thisFlexTime = doc.data().flexTime;
            thisIndoorOutdoor = doc.data().indoorOutdoor;
            thisLocation = doc.data().location;
            thisCompensation = doc.data().compensation;
            thisDescription = doc.data().description;
            thisFile = doc.data().file;
            thisowner = doc.data().owner;
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
            document.getElementById("gigCompensation").innerHTML = CADDollar.format(thisCompensation);
            document.getElementById("descriptionGig").innerHTML = thisDescription;
            //  document.getElementById("images-goes-here").innerHTML = thisFile;
            // const imgTag = document.getElementById('images-goes-here');
            // imgTag.src = thisFile;
            document.getElementById('link').href = "application.html?docID=" + doc.id;

            // let imgEvent = document.querySelector( ".hike-img" );
            // imgEvent.src = "../images/" + hikeCode + ".jpg";
        });
}
displayGigDescription("giglisting");


//event handler for write review buttton
function saveGigDocumentIDAndRedirect() {
    let params = new URL(window.location.href) //get the url from the search bar
    let ID = params.searchParams.get("docID");
    localStorage.setItem('Giglisting', ID);
    localStorage.setItem('ownerid', thisowner);
    window.location.href = 'reviewform.html';
}

function saveGigDocumentandOwnerAndRedirect() {
    let params = new URL(window.location.href) //get the url from the search bar
    let ID = params.searchParams.get("docID");
    localStorage.setItem('Giglistings', ID);
    localStorage.setItem('ownerids', thisowner);
    window.location.href = 'application.html';


}

// read location data from fire store
function readPost(){
    db.collection("giglisting").doc("K3vCxjxQKsek8S9AL9fF")
    .get()
    .then(function(doc){
        // do whatever else you want with the data...
        console.log(doc.data());  
        //show address on a map
        AddressString = doc.data().location;
        console.log(AddressString);
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    })
}
readPost();


 //-----------------------------------------
    // handle success case of getCurrentPosition
    //-----------------------------------------
    function onSuccess(position) { //callback function
        const {
          latitude,
          longitude
        } = position.coords;
  
        //print helpful messages about current location
        //to help us debug, you can comment out these 2 lines later
        message.classList.add('success');
        message.textContent = `Your location: (${latitude},${longitude})`;
  
        //set map to be around current location
        //set a marker at the current location
        map = L.map('map').setView([latitude, longitude], 13);
        marker = L.marker([latitude, longitude]).addTo(map);

        
       //Show a circle to represent the approximate location
        geocodeAddressString();
      }

      function geocodeAddressString() {
        LocationArea = new L.circle();
        var myAPIKey = "b06ded4f2fbf4b89afaa391038fa5826";  //use your own here

        if (LocationArea) {
            map.removeLayer(LocationArea);
        }

        const geocodingUrl =
            `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(AddressString)}&apiKey=${myAPIKey}`;

        // call Geocoding API - https://www.geoapify.com/geocoding-api
        fetch(geocodingUrl).then(result => result.json())
            .then(featureCollection => {
                if (featureCollection.features.length === 0) {
                    document.getElementById("status").textContent = "The AddressString is not found";
                    return;
                }

                const foundAddressString = featureCollection.features[0];
                LocationArea = new L.circle(new L.LatLng(foundAddressString.properties.lat, foundAddressString.properties.lon), {
                    fillColor: '#f03',
                    radius: radius,
                });
                map.addLayer(LocationArea);

                //marker = L.marker(new L.LatLng(foundAddressString.properties.lat, foundAddressString.properties.lon)).addTo(map);
                map.panTo(new L.LatLng(foundAddressString.properties.lat, foundAddressString.properties.lon));
            });
    }

            // handle error case
            function onError() {
                message.classList.add('error');
                message.textContent = `Failed to get your location! Using default BCIT address.`;
                AddressString = "3700 Willingdon Avenue, Burnaby, BC, Canada";
                geocodeAddressString();
            }