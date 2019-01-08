function handleSignUp() {
    console.log("SignUp handler..")
    firebase.auth().createUserWithEmailAndPassword("mititelu.alex@yahoo.com", "password").catch(function (error) {
        // Handle Errors here.
        console.log("Response:");
        console.log(error)

        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("Errors:")
        console.log(errorCode);
        console.log(errorMessage);
        // ...
    });
}

function handleSignIn() {
    console.log("Sign in");
    firebase.auth().signInWithEmailAndPassword("mititelu.alex@yahoo.com", "password").catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
}
function initApp() {
    document.getElementById('quickstart-sign-up').addEventListener('click', handleSignUp, false);
    document.getElementById('quickstart-sign-in').addEventListener('click', handleSignIn, false);
}
window.onload = function() {
    initApp();
}