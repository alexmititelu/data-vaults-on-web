class CryptoUtils {
    constructor() {
        if (!CryptoUtils.instance) {
            CryptoUtils.instance = this;
        }

        return CryptoUtils.instance;
    }

    async sha256(message) {
        var encoder = new TextEncoder();
        var data = encoder.encode(message);
        var digest = await window.crypto.subtle.digest('SHA-256', data);

        return digest;
    }
}

const cryptoUtils = new CryptoUtils();
Object.freeze(cryptoUtils);

export default cryptoUtils;