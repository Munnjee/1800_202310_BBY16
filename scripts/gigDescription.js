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
      thisIndoorOutdoor = doc.data().indooroutdoor;
      //thisLocation = doc.data().location;
      thisCompensation = doc.data().compensation;
      thisDescription = doc.data().description;
      thisowner = doc.data().owner;
      let picUrl = doc.data().image;
      AddressString = doc.data().location;
      console.log(AddressString);
     
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
      //document.getElementById("gigLocation").innerHTML = thisLocation;
      document.getElementById("gigCompensation").innerHTML = CADDollar.format(thisCompensation);
      document.getElementById("descriptionGig").innerHTML = thisDescription;
      $("#images-goes-here").attr("src", picUrl);

    });
}
displayGigDescription("giglisting");


//event handler for write review buttton
function saveGigDocumentIDAndRedirect() {
  let params = new URL(window.location.href) //get the url from the search bar
  let ID = params.searchParams.get("docID");
  localStorage.setItem('gigListingID', ID);
  localStorage.setItem('reviewerID', thisowner);
  window.location.href = 'reviewform.html';
}

//event handler for apply buttton
function saveGigDocumentandOwnerAndRedirect() {
  let params = new URL(window.location.href) //get the url from the search bar
  let ID = params.searchParams.get("docID");
  localStorage.setItem('gigListingID', ID);
  localStorage.setItem('applicantID', thisowner);
  window.location.href = 'application.html';
}

//--------------------------------------
// map global variables
//---------------------------------------
var map;            //for the map to be displayed
var AddressString;  //for what was read from firestore
var LocationArea;   //for new circle object
var radius = 500;   //500 meters, you can change this to your liking
navigator.geolocation.getCurrentPosition(onSuccess, onError);

//-----------------------------------------
// handle success case of getCurrentPosition
//-----------------------------------------
function onSuccess(position) { //callback function
  const {
    latitude,
    longitude
  } = position.coords;
  console.log("inside on success");
  console.log(longitude);
  console.log(latitude);

  //print helpful messages about current location
  //to help us debug, you can comment out these 2 lines later
   message.classList.add('success');
  // message.textContent = `Your location: (${latitude},${longitude})`;

  //set map to be around current location
  //set a marker at the current location
  map = L.map('map').setView([latitude, longitude], 13);
  marker = L.marker([latitude, longitude]).addTo(map);

  //Show a circle to represent the approximate location
  //geocodeAddressString();
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

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