import homePageManager from "./page-managers/home-page-manager.js";
import authPageManager from "./page-managers/auth-page-manager.js"

var config = {
    apiKey: "AIzaSyAHmbjjMt8WdwINBF3lY63DroVJgQ3GBcg",
    authDomain: "data-vaults-on-web.firebaseapp.com",
    databaseURL: "https://data-vaults-on-web.firebaseio.com",
    projectId: "data-vaults-on-web",
    storageBucket: "data-vaults-on-web.appspot.com",
    messagingSenderId: "455933671072"
};

firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        homePageManager.renderer.render();
    } else {
        authPageManager.renderer.renderLoginSection();
    }
});