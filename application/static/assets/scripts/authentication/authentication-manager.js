import homePageManager from "../page-managers/home-page-manager.js"

class AuthenticationManager {
    constructor() {
        if (!AuthenticationManager.instance) {
            this._homePageManager = homePageManager;
            AuthenticationManager.instance = this;
        }

        return AuthenticationManager.instance;

    }

    isUserAuthenticated() {
        var currentUser = firebase.auth().currentUser;

        if (currentUser) {
            return true;
        } else {
            return false;
        }
    }

    async signIn(username, password, callback) {
        firebase.auth().signInWithEmailAndPassword(username, password)
            .then(function (firebaseUser) {
                if (firebaseUser.user.emailVerified === false) {
                    firebaseUser.user.sendEmailVerification();
                }

                let response = {};
                response["isSuccesfull"] = true;
                response["message"] = "ok";

                callback(response);
            })
            .catch(function (error) {
                console.log(error);

                let response = {}
                response["isSuccesfull"] = false;
                response["message"] = error.message;

                callback(response);
            });
    }

    createAccount(username, email, password, callback) {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(function (firebaseUser) {
            if (firebaseUser.user.emailVerified === false) {
                firebaseUser.user.sendEmailVerification();
            }

            var response = {};
            response["isSuccesfull"] = true;
            response["message"] = "ok";

            callback(response);
        }).catch(function (error) {
            var response = {};

            response["isSuccesfull"] = false;
            response["message"] = error.message;

            callback(response);
        });

        return response;
    }

    getUserEmail() {
        return firebase.auth().currentUser.email;
    }

    signOut() {
        firebase.auth().signOut()
            .then(function () {
                console.log("succesfully signed out");
            })
            .catch(function (error) {
                console.log("error at signing out");
            });
    }

    startFaceRekognitionProcess() {
        console.log("Starting reko process");
    }

    _sendEmailVerificationLink() {
        firebase.auth().currentUser.sendEmailVerification().then(function () {
            console.log("Email succesfully sent");
        }).catch(function (error) {
            console.log("error occured at email sending");
        })
    }

}

const authenticationManager = new AuthenticationManager();
Object.freeze(authenticationManager);

export default authenticationManager;