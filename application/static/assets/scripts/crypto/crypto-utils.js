class CryptoUtils {
    constructor() {
        if (!CryptoUtils.instance) {
            CryptoUtils.instance = this;
        }

        return CryptoUtils.instance;
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
                // Consider using a 4096-bit key for systems that require long-term security
                modulusLength: 4096,
                publicExponent: new Uint8Array([1, 0, 1]),
                hash: "SHA-256",
            },
            true,
            ["encrypt", "decrypt"]
        ).then((keyPair) => {
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
}

const cryptoUtils = new CryptoUtils();
Object.freeze(cryptoUtils);

export default cryptoUtils;