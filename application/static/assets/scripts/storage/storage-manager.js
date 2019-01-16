import cryptoUtils from "../crypto/crypto-utils.js"
import {
    ab2str
} from "../common/common-lib.js"

class StorageManager {
    constructor() {
        if (!StorageManager.instance) {
            StorageManager.instance = this;
        }

        return StorageManager.instance;
    }

    getKeysShort(callback) {
        var uid = firebase.auth().currentUser.uid;

        firebase.database().ref('/users/' + uid + '/keys').once('value').then(function (snapshot) {
            var data = [];
            var keys = snapshot.val();

            for (var keyName in keys) {
                if (keys[keyName].privateKey) {
                    data.push({
                        keyName: keyName,
                        isPrivate: false
                    })
                } else {
                    data.push({
                        keyName: keyName,
                        isPrivate: true
                    });
                }
            }

            callback(data);
        });
    }

    getGeysInfo() {
        var uid = firebase.auth().currentUser.uid;

        return firebase.database().ref('/users/' + uid + '/keys').once('value').then(function (snapshot) {
            var data = [];
            var keys = snapshot.val();

            for (var keyName in keys) {

                let currentPrivateKey = "";

                if(keys[keyName].savePrivateKey) {
                    currentPrivateKey = keys[keyName].privateKey
                }

                data.push({
                    keyName: keyName,
                    description: keys[keyName].description,
                    publicKey : keys[keyName].publicKey,
                    savePrivateKey: keys[keyName].savePrivateKey,
                    privateKey: currentPrivateKey,
                    whiteListedSites : keys[keyName].whiteListedSites
                });
            }
            return data;
            // callback(data);
        });
    }

    storeNewKey(keyProperties, callback) {
        let keyName = keyProperties.name;
        let keyDescription = keyProperties.description;
        let keyHosts = keyProperties.hosts;
        let savePrivateKey = keyProperties.savePrivateKey;

        let uid = firebase.auth().currentUser.uid;

        cryptoUtils.newRsaPair(function (publicRsaKeyBase64, privateRsaKeyBase64) {
            if (savePrivateKey) {
                firebase.database().ref("/users/" + uid + "/keys/" + keyName).set({
                    description: keyDescription,
                    whiteListedSites: keyHosts,
                    publicKey: publicRsaKeyBase64,
                    privateKey: privateRsaKeyBase64,
                    savePrivateKey:true
                }).then(function () {
                    var response = {};
                    response["isSuccesfull"] = true;
                    response["message"] = "Key succesfully created";

                    callback(response);
                }).catch(function (error) {
                    var response = {};
                    response["isSuccesfull"] = false;
                    if(error.message.startsWith("PERMISSION_DENIED")) {
                        console.log(error);
                        response["message"] = "You are not allowed. Make sure your email is activated. If the problem persists, contact the developers";
                    } else {
                        response["message"] = error.message;
                    }

                    callback(response);
                });
            } else {
                cryptoUtils.sha256(privateRsaKeyBase64, function (digest) {
                    var digestString = String.fromCharCode.apply(null, new Uint8Array(digest));
                    var digestStringBase64 = window.btoa(digestString);

                    console.log(privateRsaKeyBase64);

                    firebase.database().ref('/users/' + uid + '/keys/' + keyName).set({
                        description: keyDescription,
                        whiteListedSites: keyHosts,
                        publicKey: publicRsaKeyBase64,
                        privateKeyHash: digestStringBase64,
                        savePrivateKey:false
                    }).then(function () {
                        var response = {};
                        response["isSuccesfull"] = true;
                        response["message"] = "Key succesfully created";

                        callback(response);
                    }).catch(function (error) {
                        var response = {};
                        response["isSuccesfull"] = false;
                        response["message"] = error.message;

                        callback(response);
                    });
                });
            }
        });
    }

    isValidPrivateRsaKey(keyName, privateRsaKey, callback) {
        var uid = firebase.auth().currentUser.uid;

        firebase.database().ref("/users/" + uid + "/keys/" + keyName).once('value').then(function (snapshot) {
            cryptoUtils.sha256(privateRsaKey, function (privateRsaKeyLocalHash) {
                var privateRsaKeyLocalHashString = String.fromCharCode.apply(null, new Uint8Array(privateRsaKeyLocalHash));
                var privateRsaKeyLocalHashStringBase64 = window.btoa(privateRsaKeyLocalHashString);
                var key = snapshot.val();

                if (key && key.privateKeyHash === privateRsaKeyLocalHashStringBase64) {
                    var response = {
                        isValid: true,
                        message: "success"
                    };
                } else {
                    var response = {
                        isValid: false,
                        message: "Could not use the provided RSA key for decryption!"
                    }
                }

                callback(response);
            });
        });
    }

    getFormsForKey(keyName, lastKey) {
        return new Promise(function (resolve, reject) {
            if (lastKey == null) {
                firebase.database().ref("/users/" + firebase.auth().currentUser.uid + "/forms/" + keyName)
                    .orderByKey()
                    .limitToFirst(10)
                    .once("value")
                    .then(function (snapshot) {
                        resolve(snapshot.val());
                    });
            } else {
                firebase.database().ref("/users/" + firebase.auth().currentUser.uid + "/forms/" + keyName)
                    .orderByKey()
                    .limitToFirst(10)
                    .startAt(lastKey)
                    .once("value")
                    .then(function (snapshot) {
                        resolve(snapshot.val());
                    });
            }
        });
    }

    getRsaPrivateKey(keyName, privateRsaKeyBase64) {
        return new Promise(function (resolve, reject) {
            if (privateRsaKeyBase64 != null) {
                resolve(privateRsaKeyBase64);
            } else {
                firebase.database().ref("/users/" + firebase.auth().currentUser.uid + "/keys/" + keyName + "/privateKey").once("value").then(function (snapshot) {
                    resolve(snapshot.val());
                });
            }
        });
    }
}

const storageManager = new StorageManager();
Object.freeze(storageManager);

export default storageManager;