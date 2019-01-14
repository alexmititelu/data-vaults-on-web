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
}

const storageManager = new StorageManager();
Object.freeze(storageManager);

export default storageManager;