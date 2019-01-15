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
}

const cryptoUtils = new CryptoUtils();
Object.freeze(cryptoUtils);

export default cryptoUtils;