class CryptoUtils {
    constructor() {
        if (!CryptoUtils.instance) {
            CryptoUtils.instance = this;
        }

        return CryptoUtils.instance;
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

    sha256(message, callback) {
        var encoder = new TextEncoder();
        var data = encoder.encode(message);

        window.crypto.subtle.digest('SHA-256', data).then(function (digest) {
            callback(digest);
        });
    }

    newRsaPair(callback) {
        window.crypto.subtle.generateKey({
                name: "RSA-OAEP",
                modulusLength: 4096,
                publicExponent: new Uint8Array([1, 0, 1]),
                hash: "SHA-256",
            },
            true,
            ["encrypt", "decrypt"]
        ).then(function (keyPair) {
            cryptoUtils.exportCryptoPublicKey(keyPair.publicKey, function (publicKeyBase64) {
                cryptoUtils.exportCryptoPrivateKey(keyPair.privateKey, function (privateKeyBase64) {
                    callback(publicKeyBase64, privateKeyBase64);
                });
            });
        });
    }

    exportCryptoPublicKey(key, callback) {
        window.crypto.subtle.exportKey("spki", key).then(function (exportedKey) {
            var keyExportedAsString = String.fromCharCode.apply(null, new Uint8Array(exportedKey));
            var keyExportedAsBase64 = window.btoa(keyExportedAsString);

            callback(keyExportedAsBase64);
        });
    }

    exportCryptoPrivateKey(key, callback) {
        window.crypto.subtle.exportKey("pkcs8", key).then(function (exportedKey) {
            var keyExportedAsString = String.fromCharCode.apply(null, new Uint8Array(exportedKey));
            var keyExportedAsBase64 = window.btoa(keyExportedAsString);

            callback(keyExportedAsBase64);
        });
    }

    importPrivateRsaKey(rsaPrivateKeyStringB64) {
        var rsaPrivateKeyString = window.atob(rsaPrivateKeyStringB64);
        var rsaPrivateKeyBuffer = this.str2ab(rsaPrivateKeyString);

        return window.crypto.subtle.importKey(
            "pkcs8",
            rsaPrivateKeyBuffer, {
                name: "RSA-OAEP",
                hash: {
                    name: "SHA-256"
                }
            },
            true,
            ["decrypt"]
        );
    }

    decryptBase64StringWithRsa(base64String, rsaPrivateKey) {
        var string = window.atob(base64String);
        var buffer = this.str2ab(string);

        var algorithm = {
            name: "RSA-OAEP"
        };

        return window.crypto.subtle.decrypt(algorithm, rsaPrivateKey, buffer);
    }

    importAesKey(aesKeyBuffer) {
        var algorithm = {
            name: "AES-CBC"
        };

        return window.crypto.subtle.importKey("raw", aesKeyBuffer, algorithm, true, ["decrypt"]);
    }

    decryptBase64StringWithAes(aesKey, iv, base64String) {
        var string = window.atob(base64String);
        var buffer = this.str2ab(string);

        var algorithm = {
            name: "AES-CBC",
            iv: iv
        };

        return window.crypto.subtle.decrypt(algorithm, aesKey, buffer);
    }

    decryptForm(encryptedFormObj, rsaPrivateKeyStringB64) {
        return new Promise(function (resolve, reject) {
            this.importPrivateRsaKey(rsaPrivateKeyStringB64).then(function (rsaPrivateKey) {
                this.decryptBase64StringWithRsa(encryptedFormObj.encryptedAesKey, rsaPrivateKey).then(function (aesKeyBuffer) {
                    this.decryptBase64StringWithRsa(encryptedFormObj.encryptedIv, rsaPrivateKey).then(function (iv) {
                        this.importAesKey(aesKeyBuffer).then(function (aesKey) {
                            this.decryptBase64StringWithAes(aesKey, iv, encryptedFormObj.encryptedForm).then(function (decryptedFormStringBuffer) {
                                var decryptedFormString = this.ab2str(decryptedFormStringBuffer);
                                var decryptedFormObj = JSON.parse(decryptedFormString);

                                resolve(decryptedFormObj);
                            }.bind(this))
                        }.bind(this))
                    }.bind(this))
                }.bind(this))
            }.bind(this))
        }.bind(this));
    }
}

const cryptoUtils = new CryptoUtils();
Object.freeze(cryptoUtils);

export default cryptoUtils;