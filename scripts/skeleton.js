//---------------------------------------------------
// This function loads the parts of your skeleton
// (navbar, footer, and other things) into html doc.
//---------------------------------------------------
function loadSkeleton() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User Signed In
      console.log($("#navbarPlaceholder").load("./text/nav.html"));
    } else {
      console.log($("#navbarPlaceholder").load("./text/navNull.html"));
    }
  });
}
loadSkeleton(); //invoke the function

//------------------------------------------------
// Call this function when the "logout" button is clicked
//-------------------------------------------------
function logout() {
  firebase.auth().signOut().then(() => {
      // Sign-out successful.
      console.log("logging out user");
    }).catch((error) => {
      // An error happened.
    });
}


