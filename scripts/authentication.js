// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());

var uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function (authResult, redirectUrl) {
      var user = authResult.user;
      if (authResult.additionalUserInfo.isNewUser) {
        db.collection("users")
          .doc(user.uid)
          .set({
            name: user.displayName,
            email: user.email,
          })
          .then(function () {
            console.log("New user added to firestore");
            window.location.assign("./html/main.html");
          })
          .catch(function (error) {
            console.log("Error adding new user: " + error);
          });
      } else {
        return true;
      }
      return false;
    },
    uiShown: function () {
      document.getElementById("loader").style.display = "none";
    },
  },
  signInFlow: "popup",
  signInSuccessUrl: "./html/main.html",
  signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
  tosUrl: "./html/legal.html",
  privacyPolicyUrl: "./html/legal.html",
};

ui.start("#firebaseui-auth-container", uiConfig);
