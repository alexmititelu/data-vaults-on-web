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
                    privateKey: privateRsaKeyBase64
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
            } else {
                cryptoUtils.sha256(privateRsaKeyBase64, function (digest) {
                    var digestString = String.fromCharCode.apply(null, new Uint8Array(digest));
                    var digestStringBase64 = window.btoa(digestString);

                    console.log(privateRsaKeyBase64);

                    firebase.database().ref('/users/' + uid + '/keys/' + keyName).set({
                        description: keyDescription,
                        whiteListedSites: keyHosts,
                        publicKey: publicRsaKeyBase64,
                        privateKeyHash: digestStringBase64
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
}

const storageManager = new StorageManager();
Object.freeze(storageManager);

export default storageManager;