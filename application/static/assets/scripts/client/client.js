class Dave {
    constructor() {
        var firebaseConfig = {
            apiKey: "AIzaSyAHmbjjMt8WdwINBF3lY63DroVJgQ3GBcg",
            authDomain: "data-vaults-on-web.firebaseapp.com",
            databaseURL: "https://data-vaults-on-web.firebaseio.com",
            storageBucket: "data-vaults-on-web.appspot.com"
        };

        firebase.initializeApp(firebaseConfig);
    }

    str2ab(string) {
        var buffer = new ArrayBuffer(string.length);
        var bufferView = new Uint8Array(buffer);

        for (var i = 0; i < string.length; ++i) {
            bufferView[i] = string.charCodeAt(i);
        }

        return buffer;
    }

    ab2str(buffer) {
        return String.fromCharCode(...new Uint8Array(buffer));
    }

    generateAeskey() {
        var algorithm = {
            name: "AES-CBC",
            length: 256
        }

        return window.crypto.subtle.generateKey(algorithm, true, ["encrypt", "decrypt"]);
    }

    encryptFormObjWithAes(aesKey, iv, formObj) {
        var algorithm = {
            name: "AES-CBC",
            iv: iv
        };

        var formObjString = JSON.stringify(formObj);
        var formObjBuffer = this.str2ab(formObjString);
        return window.crypto.subtle.encrypt(algorithm, aesKey, formObjBuffer);
    }

    exportAesKey(aesKey) {
        return window.crypto.subtle.exportKey("raw", aesKey);
    }

    importPublicRsaKey(rsaPublicKeyStringB64) {
        var rsaPublicKeyString = window.atob(rsaPublicKeyStringB64);
        var rsaPublicKeyBuffer = this.str2ab(rsaPublicKeyString);

        return window.crypto.subtle.importKey(
            "spki",
            rsaPublicKeyBuffer, {
                name: "RSA-OAEP",
                hash: {
                    name: "SHA-256"
                }
            },
            true,
            ["encrypt"]
        );
    }

    encryptDataWithRsa(rsaPublicKey, data) {
        var algorithm = {
            name: "RSA-OAEP"
        };

        return window.crypto.subtle.encrypt(algorithm, rsaPublicKey, data);
    }

    insertSecureFormIntoDatabase(secureFormObj) {
        var newSecureFormRef = firebase.database().ref("/users/" + daveConfig.uid + "/forms/" + daveConfig.keyName).push();
        newSecureFormRef.set(secureFormObj);
    }

    secureFormObj(formObj) {
        this.generateAeskey().then(
            function (aesKey) {
                var iv = window.crypto.getRandomValues(new Uint8Array(16));

                this.encryptFormObjWithAes(aesKey, iv, formObj).then(
                    function (encryptedDataBuffer) {

                        this.exportAesKey(aesKey).then(
                            function (aesKeyBuffer) {

                                this.importPublicRsaKey(daveConfig.rsaPublicKeyStringB64).then(
                                    function (rsaPublicKey) {

                                        this.encryptDataWithRsa(rsaPublicKey, aesKeyBuffer).then(
                                            function (encryptedAesKeyBuffer) {

                                                this.encryptDataWithRsa(rsaPublicKey, iv).then(
                                                    function (encryptedIv) {
                                                        var encryptedDataStringB64 = window.btoa(this.ab2str(encryptedDataBuffer));
                                                        var encryptedAesKeyStringB64 = window.btoa(this.ab2str(encryptedAesKeyBuffer));
                                                        var encryptedIvStringB64 = window.btoa(this.ab2str(encryptedIv));

                                                        this.insertSecureFormIntoDatabase({
                                                            encryptedForm: encryptedDataStringB64,
                                                            encryptedAesKey: encryptedAesKeyStringB64,
                                                            encryptedIv: encryptedIvStringB64
                                                        });
                                                    }.bind(this)
                                                );
                                            }.bind(this)
                                        );
                                    }.bind(this)
                                );
                            }.bind(this)
                        );
                    }.bind(this)
                );
            }.bind(this)
        );
    }

    secureForm(formToSecure) {
        var formToSecureObj = {};

        for (var fieldIdx = 0; fieldIdx < formToSecure.elements.length; ++fieldIdx) {
            var input = formToSecure.elements[fieldIdx];

            if (input.type != "submit") {
                formToSecureObj[input.name] = input.value;
            }
        }

        this.secureFormObj(formToSecureObj);
    }

    secureForms() {
        var formsToSecure = document.getElementsByClassName("dave-form");
        for (var formIdx = 0; formIdx < formsToSecure.length; ++formIdx) {
            var formToSecure = formsToSecure[formIdx];
            formToSecure.addEventListener("submit", function (event) {
                event.preventDefault();
                this.secureForm(formToSecure);
            }.bind(this));
        }
    }
}

var dave = new Dave();