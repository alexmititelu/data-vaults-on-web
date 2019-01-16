import homePageManager from "./page-managers/home-page-manager.js";
import authPageManager from "./page-managers/auth-page-manager.js"
import cryptoUtils from "./crypto/crypto-utils.js";
import keysPageManager from "./page-managers/keys-page-manager.js";

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
        
        if(user.emailVerified==false) {
            authPageManager.renderer.renderFaceRekognitionSection("createAccount");    
        } else {
            authPageManager.renderer.renderFaceRekognitionSection("signIn");
        }
        
    } else {
        authPageManager.renderer.renderLoginSection();
    }
});