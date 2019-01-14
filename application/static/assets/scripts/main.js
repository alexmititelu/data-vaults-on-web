import homePageManager from "./page-managers/home-page-manager.js"
import authPageManager from "./page-managers/auth-page-manager.js"
import authenticationManager from "./page-managers/authentication-manager.js"
var config = {
    apiKey: "AIzaSyAHmbjjMt8WdwINBF3lY63DroVJgQ3GBcg",
    authDomain: "data-vaults-on-web.firebaseapp.com",
    databaseURL: "https://data-vaults-on-web.firebaseio.com",
    projectId: "data-vaults-on-web",
    storageBucket: "data-vaults-on-web.appspot.com",
    messagingSenderId: "455933671072"
};

firebase.initializeApp(config);
<<<<<<< HEAD

firebase.auth().signInWithEmailAndPassword("codrincojocaru@yahoo.com", "test123").then(function () {
    console.log("Successfully signed in with email and password!");

    homePageManager.renderer.render();
}).catch(function (error) {
    console.log(error.code);
    console.log(error.message);
});
=======
// homePageManager.renderer.render();

// authPageManager.renderer.renderLoginSection();
authPageManager.authenticationManager.startFaceRekognitionProcess();
authPageManager.renderer.renderFaceRekognitionSection("signIn");
// authPageManager.renderer.renderRegisterSection();

>>>>>>> d72447a87b343bdab6ef4aefbb780c4a7d8d944a
