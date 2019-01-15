    class StorageManager {
    constructor() {
        if (!StorageManager.instance) {
            StorageManager.instance = this;
        }

        return StorageManager.instance;
    }

    getKeysShort(callback) {
        var data = [];
        var uid = firebase.auth().currentUser.uid;

        firebase.database().ref('/users/' + uid + '/keys').once('value').then(function (snapshot) {
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

    storeNewKey(keyProperties,callback) {
        let keyName = keyProperties.name;
        let keyDescription = keyProperties.description;
        let keyHosts = keyProperties.hosts
        let savePrivateKey = keyProperties.savePrivateKey

        let uid = firebase.auth().currentUser.uid;

        firebase.database().ref('/users/' + uid + '/keys/'+keyName).set({
            description: keyDescription,
            whiteListedSites: keyHosts
        });

        let response = {};
        response["isSuccesfull"] = true;
        response["message"] = "Key succesfully created";
        callback(response);
    }
}

const storageManager = new StorageManager();
Object.freeze(storageManager);

export default storageManager;