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
