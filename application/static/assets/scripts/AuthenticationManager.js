import homePageManager from "./HomePageManager.js"
class AuthenticationManager {
    constructor() {
        if (!AuthenticationManager.instance) {
            this._homePageManager = homePageManager;
            AuthenticationManager.instance = this;
        }
        
        return AuthenticationManager.instance;
        
    }

    async signIn(username,password) {
        console.log("Sign in");
        let response = {};
        response["isSuccesfull"] = true;
        response["message"] = "ok";

        firebase.auth().signInWithEmailAndPassword(username, password)
        .then(function(firebaseUser) {
            if(firebaseUser.user.emailVerified === false) {
                firebaseUser.user.sendEmailVerification();
            }
            console.log("succesfully signed in");
            let response = {};
        response["isSuccesfull"] = true;
        response["message"] = "ok";
        })
        .catch(function(error) {
            // Handle Errors here.
            console.log(error);
            let response = {}
            response["isSuccesfull"] = false;
            response["message"] = error.message;
          });
        
    }

    createAccount(username,email,password) {
        let response = {};
        let createAccountError = null;
        firebase.auth().createUserWithEmailAndPassword(email, password).then(function(firebaseUser){
            // console.log(firebaseUser);
            if(firebaseUser.user.emailVerified === false) {
                firebaseUser.user.sendEmailVerification();
            }
            response["isSuccesfull"] = true;
            response["message"] = "ok";
        }).catch(function (error) {
            // Handle Errors here.
            response["isSuccesfull"] = false;
            response["message"] = error.message;
        });

        return response;
    }

    getUserEmail() {
        return firebase.auth().currentUser.email;
    }

    signOut() {
        firebase.auth().signOut()
        .then(function() {
            console.log("succesfully signed out");
        })
        .catch(function(error) {
            console.log("error at signing out");
        });
    }

    startFaceRekognitionProcess() {
        console.log("Starting reko process");
    }

    _sendEmailVerificationLink() {
            firebase.auth().currentUser.sendEmailVerification().then(function(){
                console.log("Email succesfully sent");
            }).catch(function(error){
                console.log("error occured at email sending");
            })
    }

}

const authenticationManager = new AuthenticationManager();
Object.freeze(authenticationManager);

export default authenticationManager;