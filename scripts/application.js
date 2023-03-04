//Saves Data to Firestore for Application Posts

// Get references to the form
const applicationForm = document.querySelector("#application1");

// Form submission
applicationForm.addEventListener("submit", (event) => {
  event.preventDefault();


 //creates a collection under an giglisting document called gigapplicants,
 /*  Next step is to make it so that it can be selected to be under a specific listing 
     without manually adding the .d(3MCQH3U8VK0Mz8Krpqbh)
     We could have a doc id in the url of the linked html page then use id = params.searchParams.get(docID)
     something similar to step (4,5) in demo9 
*/
 
     /* Errors(problems encountered)
    1. Previous html in application.html needed reworking(e.g. the input elements were not properly implemented)
    2. I was missing a ".js" behind firebase_BBY16  <script src="./scripts/firebaseAPI_BBY16.js"></script>  
    
 */
  db.collection("giglisting").doc("3MCQH3U8VK0Mz8Krpqbh").collection("gigapplicants").add({
  Experience: applicationForm.experience.value,
  AgreeorDisagree: applicationForm.applicationq1.value,
  Accept: applicationForm.applicationq3.value,
  Myprice: applicationForm.monetaryvalue.value,
  Questions: applicationForm.applicationq4.value,
  });

  //Clears the form
  applicationForm.reset();
});

/*
//Saves Data to Firestore for Application Posts

// Get references to the form
const applicationForm = document.querySelector("#application1");

// Form submission
applicationForm.addEventListener("submit", (event) => {
  event.preventDefault();

  // Create a new collection in giglisting in a document in Firestore
 // Next step, make it so that gigapplicants collection can be added to any specific document
  db.collection("giglisting").doc("w5mmwMYZed4XSLPcEu44").collection("gigapplicants").add({
  
  Experience: applicationForm.experience.value,
  AgreeorDisagree: applicationForm.applicationq1.value,
  Accept: applicationForm.applicationq3.value,
  Myprice: applicationForm.monetaryvalue.value,
  Questions: applicationForm.applicationq4.value,

  });

  //Clears the form
  applicationForm.reset();
});



*/