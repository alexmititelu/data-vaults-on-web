// AES-CBC - generateKey
window.crypto.subtle.generateKey(
    {
        name: "AES-CBC",
        length: 256, //can be  128, 192, or 256
    },
    false, //whether the key is extractable (i.e. can be used in exportKey)
    ["encrypt", "decrypt"] //can be "encrypt", "decrypt", "wrapKey", or "unwrapKey"
)
    .then(function (key) {
        return key;
    })
    .catch(function (err) {
        throw err;
    });

// AES-CBC - encrypt
window.crypto.subtle.encrypt(
    {
        name: "AES-CBC",
        //Don't re-use initialization vectors!
        //Always generate a new iv every time your encrypt!
        iv: window.crypto.getRandomValues(new Uint8Array(16)),
    },
    key, //from generateKey or importKey above
    data //ArrayBuffer of data you want to encrypt
)
    .then(function (encrypted) {
        //returns an ArrayBuffer containing the encrypted data
        console.log(new Uint8Array(encrypted));
    })
    .catch(function (err) {
        console.error(err);
    });

// AES-CBC - decrypt
window.crypto.subtle.decrypt(
    {
        name: "AES-CBC",
        iv: ArrayBuffer(16), //The initialization vector you used to encrypt
    },
    key, //from generateKey or importKey above
    data //ArrayBuffer of the data
)
    .then(function (decrypted) {
        //returns an ArrayBuffer containing the decrypted data
        console.log(new Uint8Array(decrypted));
    })
    .catch(function (err) {
        console.error(err);
    });



    RSA_PUBLIC_KEY = "loremipsum"; // Client's generated RSA Public Key

    form = getFormDataAsObject(); // submitted form data

    aesKey = window.crypto.subtle.generateKey({ // the generated AES KEY
        name: "AES-CBC",
        length: 256,
    },
        false,
        ["encrypt", "decrypt"]
    );

    initializationVector = window.crypto.getRandomValues(new Uint8Array(16)); // generated initialization vector

    encryptedForm = WebCryptoAPI.encrypt({ // form after encryption
        name: "AES-CBC",
        iv: initializationVector
    },
        aesKey,
        form
    );

    // initialization vector after encryption using Public RSA Key
    encryptedInitializationVector = window.crypto.encrypt({ name: "RSA-OAEP" }, RSA_PUBLIC_KEY, initializationVector);

    // initialization vector after encryption using Public RSA Key
    encryptedAESkey = window.crypto.encrypt({ name: "RSA-OAEP" }, RSA_PUBLIC_KEY, aesKey);

    // after the entire encryption process we send the encrypted form to server, the encrypted initialization vector 
    // and the encrypted AES key, the last two used later for decryption
    sendEncryptedFormToServer(encryptedForm, encryptedInitializationVector, encryptedAESkey);


    






