import dataPageManager from './page-managers/data-page-manager.js'
import homePageManager from './page-managers/home-page-manager.js';

var config = {
    apiKey: "AIzaSyAHmbjjMt8WdwINBF3lY63DroVJgQ3GBcg",
    authDomain: "data-vaults-on-web.firebaseapp.com",
    databaseURL: "https://data-vaults-on-web.firebaseio.com",
    projectId: "data-vaults-on-web",
    storageBucket: "data-vaults-on-web.appspot.com",
    messagingSenderId: "455933671072"
};

firebase.initializeApp(config);

firebase.auth().signInWithEmailAndPassword("codrincojocaru@yahoo.com", "test123").then(function () {
    // homePageManager.renderer.render();
    dataPageManager.renderer.render("AMAZON INTERNSHIP FEEDBACK FORMS");
}).catch(function (error) {
    console.log(error.code);
    console.log(error.message);
});