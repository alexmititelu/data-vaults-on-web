class StorageManager {
    constructor() {
        if (!StorageManager.instance) {
            StorageManager.instance = this;
        }

        return StorageManager.instance;
    }

    getKeysShort(callback) {
        var data = [{
                keyName: "ACAR FORMS",
                isPrivate: false
            },
            {
                keyName: "FII PROFESSORS EVALUATION FORMS",
                isPrivate: true
            },
            {
                keyName: "EESTEC FEEDBACK FORMS",
                isPrivate: false
            },
            {
                keyName: "GESTION FORMS",
                isPrivate: true
            },
            {
                keyName: "AMAZON INTERNSHIP FEEDBACK FORMS",
                isPrivate: false
            },
            {
                keyName: "ADOBE INTERNSHIP FEEDBACK FORMS",
                isPrivate: false
            },
            {
                keyName: "FII 2ND YEAR OPTIONAL COURSES FORMS",
                isPrivate: true
            },
            {
                keyName: "FII 3RD YEAR OPTIONAL COURSES FORMS",
                isPrivate: true
            }
        ];

        callback(data);
    }
}

const storageManager = new StorageManager();
Object.freeze(storageManager);

export default storageManager;