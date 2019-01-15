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

    newRsaPair() {
        window.crypto.subtle.generateKey(
            {
              name: "RSA-OAEP",
              // Consider using a 4096-bit key for systems that require long-term security
              modulusLength: 4096,
              publicExponent: new Uint8Array([1, 0, 1]),
              hash: "SHA-256",
            },
            true,
            ["encrypt", "decrypt"]
          ).then((keyPair) => {
              console.log(keyPair);
            // const exportButton = document.querySelector(".spki");
            
            cryptoUtils.exportCryptoKey(keyPair.publicKey,function(publicKeyAsString){
                cryptoUtils.exportCryptoKey(keyPair.privateKey,function(privateKeyAsString){
                    console.log(publicKeyAsString);
                    console.log(privateKeyAsString);
                })
            });
            
            
          
          });
    }

        exportCryptoKey(key,callback) {
            const publicKeyExported =  window.crypto.subtle.exportKey(
            "spki",
            key
            );
            const publicKeyExportedAsString = this.ab2str(publicKeyExported);
            const publicKeyExportedAsBase64 = window.btoa(publicKeyExportedAsString);
            // const publicKeyExported = `-----BEGIN PUBLIC KEY-----\n${publicKeyExportedAsBase64}\n-----END PUBLIC KEY-----`;


            callback(publicKeyExportedAsBase64);
      }
      
       ab2str(buf) {
        return String.fromCharCode.apply(null, new Uint8Array(buf));
      }
}

const cryptoUtils = new CryptoUtils();
Object.freeze(cryptoUtils);

export default cryptoUtils;