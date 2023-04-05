function loadSkeleton() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User Signed In
      console.log($("#navbarPlaceholder").load("../text/nav.html"));
      console.log($("#filterPlaceholder").load("../text/filter.html"));
    } else {
      console.log($("#navbarPlaceholder").load("./text/navNull.html"));
    }
  });
}
loadSkeleton(); //invoke the function

function logout() {
  firebase
    .auth()
    .signOut()
    .then(() => {
      // Sign-out successful.
      console.log("logging out user");
    })
    .catch((error) => {
      // An error happened.
    });
}
