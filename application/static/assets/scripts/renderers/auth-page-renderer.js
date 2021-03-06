import authenticationManager from "../authentication/authentication-manager.js";
import homePageManager from "../page-managers/home-page-manager.js"
import authPageManager from "../page-managers/auth-page-manager.js"
import {
    deleteAll
} from "../common/common-lib.js"

class AuthPageRenderer {
    constructor() {
        if (!AuthPageRenderer.instance) {
            // this._storageManager = storageManager;
            // this._keysPageRenderer = keysPageRenderer;

            this._authenticationManager = authenticationManager;
            this._homePageManager = homePageManager;
            AuthPageRenderer.instance = this;

        }

        return AuthPageRenderer.instance;
    }

    renderLoginSection() {
        deleteAll();

        let body = document.getElementById("actual-body-block");
        let spinner = document.createElement("div");
        spinner.setAttribute("id", "global-spinner");
        body.appendChild(spinner);

        let signInContainer = document.createElement("div");
        signInContainer.classList.add("sign-in-container");

        signInContainer.append(this._createSignInBannerSection())
        signInContainer.append(this._createSignInFormSection());
        signInContainer.append(this._createBecomeMemberSection());

        body.appendChild(signInContainer);

        this._addSignInEventListeners();
    }

    renderForgotPasswordSection() {
        deleteAll();

        let body = document.getElementById("actual-body-block");
        let spinner = document.createElement("div");
        spinner.setAttribute("id", "global-spinner");
        body.appendChild(spinner);

        let resetPasswordContainer = document.createElement("div");
        resetPasswordContainer.classList.add("sign-in-container");

        resetPasswordContainer.append(this._createSignInBannerSection())
        resetPasswordContainer.append(this._createForgotPasswordFormSection());
        resetPasswordContainer.append(this._backToSignInSection());

        body.appendChild(resetPasswordContainer);
    }

    renderRegisterSection() {
        deleteAll();

        let body = document.getElementById("actual-body-block");
        let spinner = document.createElement("div");
        spinner.setAttribute("id", "global-spinner");
        body.appendChild(spinner);

        let registerContainer = document.createElement("div");
        registerContainer.classList.add("register-container");

        registerContainer.append(this._createRegisterBannerSection());
        registerContainer.append(this._createRegisterFormSection());
        registerContainer.append(this._backToSignInSection());

        body.appendChild(registerContainer);
        this._addCreateAccountEventListeners();

    }

    renderFaceRekognitionSection(actionName) {
        deleteAll();

        let body = document.getElementById("actual-body-block");
        let spinner = document.createElement("div");
        spinner.setAttribute("id", "global-spinner");
        body.appendChild(spinner);

        let faceRekognitionSection = document.createElement("div");
        faceRekognitionSection.classList.add("face-rekognition__container")

        let cameraWrapper = document.createElement("div");
        cameraWrapper.setAttribute("id", "face_reko_camera");
        faceRekognitionSection.appendChild(cameraWrapper);


        let takeSnapshotButton = document.createElement("input");
        takeSnapshotButton.setAttribute("type", "button");
        takeSnapshotButton.setAttribute("value", "Take Snapshot");
        takeSnapshotButton.classList.add("face-rekognition__snapshot-button")

        let snapshotResultedImage = document.createElement("div");
        snapshotResultedImage.setAttribute("id", "snapshot_resulted_image");

        faceRekognitionSection.appendChild(takeSnapshotButton);

        faceRekognitionSection.appendChild(snapshotResultedImage);


        let informationMessage = document.createElement("div");

        let message = document.createElement("span");
        message.appendChild(document.createTextNode("We use a Face Recognition system in order to improve our security level. Just press the button!"));
        message.classList.add("face-reko-info-message");

        let message2 = document.createElement("span");
        message2.appendChild(document.createTextNode("If you are registered, we will just check your identity. "))
        message2.classList.add("face-reko-info-message");

        let message3 = document.createElement("span");
        message3.appendChild(document.createTextNode("If you are creating an account, we will save you this picture as a reference one."));
        message3.classList.add("face-reko-info-message");

        informationMessage.appendChild(message);
        informationMessage.appendChild(message2);
        informationMessage.appendChild(message3);


        faceRekognitionSection.appendChild(informationMessage);

        takeSnapshotButton.addEventListener("click", function () {
            document.getElementById("global-spinner").style.display = "block";
            Webcam.snap(function (data_uri) {
                // display results in page


                document.getElementById('snapshot_resulted_image').innerHTML =
                    '<img src="' + data_uri + '"/>';



                let url = "";
                if (actionName === "signIn") {
                    url = "http://127.0.0.1:5000/face-rekognition-test/" + authenticationManager.getUserEmail();
                } else if (actionName === "createAccount") {
                    url = "http://127.0.0.1:5000/face-rekognition-create-profile/" + authenticationManager.getUserEmail();
                }

                Webcam.upload(data_uri, url, function (code, text) {
                    let response = JSON.parse(text);
                    
                    if (response.code === 200) {
                        // console.log(text);
                        document.getElementById("global-spinner").style.display = "none";
                        if (firebase.auth().currentUser.emailVerified === false) {
                            authPageManager.message = "Please verify your email address before proceeding to log in.";
                            firebase.auth().signOut();
                        } else {
                            homePageManager.renderer.render()
                            authPageManager.message = "";
                        }
                    } else {
                        // console.log(text);
                        // authPageManager.hasUserEmailActivated = firebase.auth().currentUser.emailVerified
                        if (response.code === 401) {
                            authPageManager.message = "Please verify your email address before proceeding to log in.";
                        }
                        if (response.code === 400) {
                            authPageManager.message = "Could not recognize user's face.";
                        }
                        document.getElementById("global-spinner").style.display = "none";
                        firebase.auth().signOut();
                        // console.log("Please verify your email adress");
                    }
                });


                // let block = data_uri.split(";");
                // // Get the content type of the image
                // let contentType = block[0].split(":")[1];// In this case "image/gif"
                // // get the real base64 content of the file
                // let realData = block[1].split(",")[1];// In this case "R0lGODlhPQBEAPeoAJosM...."

                // // Convert it to a blob to upload
                // let blob = this.b64toBlob(realData, contentType,512);

                // let formDataToUpload = new FormData(form);
                // formDataToUpload.append("image", blob);

                // let xmlhttp = new XMLHttpRequest();

                // xmlhttp.open("POST", "127.0.0.1:5555/face-rekognition-test", true);

                // xmlhttp.onload = function(event) {
                //     console.log("uploading");
                // };
                // xmlhttp.send(blob);

            });
        });


        //    <input type=button value="Take Snapshot" onClick="take_snapshot()">

        //    <div id="results" ></div>
        //    function take_snapshot() {

        // take snapshot and get image data
        // Webcam.snap( function(data_uri) {
        //  // display results in page
        //  document.getElementById('results').innerHTML = 
        //  '<img src="'+data_uri+'"/>';
        //  } );
        //    }
        body.appendChild(faceRekognitionSection);

        Webcam.set({
            width: 320,
            height: 240,
            image_format: 'jpeg',
            jpeg_quality: 90
        });
        Webcam.attach('#face_reko_camera');
    }

    b64toBlob(b64Data, contentType, sliceSize) {
        contentType = contentType || '';
        sliceSize = sliceSize || 512;

        var byteCharacters = atob(b64Data);
        var byteArrays = [];

        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);

            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            var byteArray = new Uint8Array(byteNumbers);

            byteArrays.push(byteArray);
        }

        var blob = new Blob(byteArrays, {
            type: contentType
        });
        return blob;
    }

    _addSignInEventListeners() {
        let signInForm = document.querySelector("div > div.sign-in-container__form-section > form");
        signInForm.addEventListener("submit", (event) => {
            event.preventDefault();
            document.getElementById("global-spinner").style.display = "block";
            document.getElementById("actual-body-block").style.opacity = 0.9;
            let username = this._getSignInUsername();
            let password = this._getSignInPassword();

            this._authenticationManager.signIn(username, password, function (response) {
                if (response["isSuccesfull"] === true) {

                    document.getElementById("global-spinner").style.display = "none";
                    authPageRenderer.renderFaceRekognitionSection("signIn");
                    // renderFaceRekognitionSection("signIn");
                } else {
                    document.getElementById("global-spinner").style.display = "none";
                    authPageManager.renderer._renderSignInErrorMessage(response["message"]);
                }

            });

        });
    }

    _getSignInUsername() {
        let usernameInput = document.querySelector("div.sign-in-container__form-section > form > label:nth-child(1) > span.sign-in-container__form-section__form-field__input-wrapper > input");
        return usernameInput.value
    }

    _getSignInPassword() {
        let passwordInput = document.querySelector("div.sign-in-container__form-section > form > label:nth-child(2) > span.sign-in-container__form-section__form-field__input-wrapper > input");
        return passwordInput.value
    }

    _renderSignInErrorMessage(errorMessage) {
        let errorMessageWrapper = document.querySelector("#actual-body-block > div > div.sign-in-container__form-section > form > div.form-field__error-message-wrapper > span");

        while (errorMessageWrapper.firstChild) {
            errorMessageWrapper.removeChild(errorMessageWrapper.firstChild);
        }

        errorMessageWrapper.appendChild(document.createTextNode(errorMessage));
    }

    _renderForgotPasswordMessage(isSuccesfull, errorMessage) {
        let errorMessageWrapper = document.querySelector("div.sign-in-container__form-section > form > div.form-field__error-message-wrapper > span");

        while (errorMessageWrapper.firstChild) {
            errorMessageWrapper.removeChild(errorMessageWrapper.firstChild);
        }

        errorMessageWrapper.appendChild(document.createTextNode(errorMessage));
        let color = "";
        if (isSuccesfull === true) {
            color = "green";
        } else {
            color = "red";
        }
        errorMessageWrapper.style.color = color;
    }



    _renderRegisterErrorMessage(errorMessage) {
        let errorMessageWrapper = document.querySelector("div.register-container__form-section > form > div.form-field__error-message-wrapper > span");

        while (errorMessageWrapper.firstChild) {
            errorMessageWrapper.removeChild(errorMessageWrapper.firstChild);
        }

        errorMessageWrapper.appendChild(document.createTextNode(errorMessage));
    }
    _addCreateAccountEventListeners() {
        let createAccount = document.querySelector("div.register-container__form-section > form");

        createAccount.addEventListener("submit", (event) => {
            event.preventDefault();
            document.getElementById("global-spinner").style.display = "block";
            let email = this._getCreateAccountEmail();
            let password = this._getCreateAccountPassword();

            this._authenticationManager.createAccount(email, password, function (response) {
                document.getElementById("global-spinner").style.display = "none";
                if (response["isSuccesfull"] === true) {
                    homePageManager.renderer.render();
                } else {
                    authPageManager.renderer._renderRegisterErrorMessage(response["message"]);
                }
            });
        });
    }

    _getCreateAccountPassword() {
        let passwordInput = document.querySelector("div.register-container__form-section > form > label:nth-child(2) > span.register-container__form-section__form-field__input-wrapper > input");
        return passwordInput.value;
    }

    _getCreateAccountEmail() {
        let emailInput = document.querySelector("div.register-container__form-section > form > label:nth-child(1) > span.register-container__form-section__form-field__input-wrapper > input");
        return emailInput.value;
    }

    _createSignInBannerSection() {
        let banner_section = document.createElement("div");
        banner_section.classList.add("sign-in-container__banner-section");

        let logo = document.createElement("img");
        logo.classList.add("sign-in-container__banner-section__logo");
        logo.setAttribute('src', '/assets/img/logo.png');
        logo.setAttribute('alt', 'Logo');

        let message = document.createElement("span");
        message.classList.add("sign-in-container__banner-section__title");
        message.innerHTML = "Hi, I'm DAVE";

        banner_section.appendChild(logo);
        banner_section.appendChild(message);
        return banner_section;
    }

    _createRegisterBannerSection() {
        let banner_section = document.createElement("div");
        banner_section.classList.add("register-container__banner-section");

        let logo = document.createElement("img");
        logo.classList.add("register-container__banner-section__logo");
        logo.setAttribute('src', '/assets/img/logo.png');
        logo.setAttribute('alt', 'Logo');

        let message = document.createElement("span");
        message.classList.add("register-container__banner-section__title");
        message.innerHTML = "Hi, I'm DAVE";

        banner_section.appendChild(logo);
        banner_section.appendChild(message);
        return banner_section;
    }

    _createSignInFormField(name, type, placeholder) {
        let field = document.createElement("label");
        field.classList.add("sign-in-container__form-section__form-field");

        let fieldName = document.createElement("span");
        fieldName.classList.add("sign-in-container__form-section__form-field__label");
        fieldName.innerHTML = name;

        let fieldValueWrapper = document.createElement("span");
        fieldValueWrapper.classList.add("sign-in-container__form-section__form-field__input-wrapper");

        let fieldValueInput = document.createElement("input");
        fieldValueInput.classList.add("sign-in-container__form-section__form-field__input");
        fieldValueInput.setAttribute("placeholder", placeholder);
        fieldValueInput.setAttribute("type", type);
        fieldValueInput.required = true;

        fieldValueWrapper.appendChild(fieldValueInput);

        field.appendChild(fieldName);
        field.appendChild(fieldValueWrapper);

        return field;

    }

    _createRegisterFormField(name, type, placeholder, fieldInfoText) {
        let field = document.createElement("label");
        field.classList.add("register-container__form-section__form-field");

        let fieldName = document.createElement("span");
        fieldName.classList.add("register-container__form-section__form-field__label");
        fieldName.innerHTML = name;

        let fieldValueWrapper = document.createElement("span");
        fieldValueWrapper.classList.add("register-container__form-section__form-field__input-wrapper");

        let fieldValueInput = document.createElement("input");
        fieldValueInput.classList.add("register-container__form-section__form-field__input");
        fieldValueInput.setAttribute("placeholder", placeholder);
        fieldValueInput.setAttribute("type", type);
        fieldValueInput.required = true;

        fieldValueWrapper.appendChild(fieldValueInput);

        let fieldInfo = document.createElement("span");
        fieldInfo.classList.add("register-container__form-section__form-field__field-info-text");
        fieldInfo.innerHTML = fieldInfoText;


        field.appendChild(fieldName);
        field.appendChild(fieldValueWrapper);
        field.appendChild(fieldInfo);

        return field;

    }

    _createRegisterAgreement(textToAgree) {

        let agreement = document.createElement("div");
        agreement.classList.add("register-container__form-section__agreement");

        let agreementText = document.createElement("span");
        agreementText.classList.add("register-container__form-section__form-field__agreement-text");
        agreementText.innerHTML = textToAgree

        agreement.appendChild(agreementText)
        return agreement;
    }

    _createSignInButton(buttonText) {
        let signInButton = document.createElement("div");
        signInButton.classList.add("sign-in-container__form-section__sign-in-button");

        let signInButtonInput = document.createElement("input");
        signInButtonInput.setAttribute("type", "submit");
        signInButtonInput.setAttribute("value", buttonText);
        signInButtonInput.classList.add("sign-in-container__form-section__sign-in-button__button");

        signInButton.append(signInButtonInput);

        return signInButton;
    }

    _createRegisterButton(buttonText) {

        let registerButton = document.createElement("div");
        registerButton.classList.add("register-container__form-section__register-button");

        let registerButtonInput = document.createElement("input");
        registerButtonInput.setAttribute("type", "submit");
        registerButtonInput.setAttribute("value", buttonText);
        registerButtonInput.classList.add("register-container__form-section__register-button__button");

        registerButton.append(registerButtonInput);

        return registerButton;
    }

    _createBecomeMemberSection() {


        let becomeMemberSection = document.createElement("div");
        becomeMemberSection.classList.add("sign-in-container__become-a-member-section");

        let becomeMemberSectionTextWrapper = document.createElement("div");
        becomeMemberSectionTextWrapper.classList.add("sign-in-container__become-a-member-section__text-wrapper");

        let becomeMemberSectionText = document.createElement("span");
        becomeMemberSectionText.classList.add("sign-in-container__form-section__become-a-member-section__text");
        becomeMemberSectionText.innerHTML = "New to DAVE?"

        let createAccountLink = document.createElement("a");
        createAccountLink.addEventListener("click", () => {
            this.renderRegisterSection();
        });

        let createAccountMessage = document.createElement("span");
        createAccountMessage.classList.add("sign-in-container__form-section__become-a-member-section__link-text");
        createAccountMessage.innerHTML = "&nbsp;Create an account."

        createAccountLink.appendChild(createAccountMessage);

        becomeMemberSectionText.appendChild(createAccountLink);

        becomeMemberSectionTextWrapper.appendChild(becomeMemberSectionText);

        becomeMemberSection.appendChild(becomeMemberSectionTextWrapper);

        return becomeMemberSection;
    }

    _createSignInFormSection() {
        let formSection = document.createElement("div");
        formSection.classList.add("sign-in-container__form-section");

        let form = document.createElement("form");

        form.append(this._createSignInFormField("Email address", "text", "johndoe@dave.com"));

        form.append(this._createSignInFormField("Password", "password", ""));

        let forgotPasswordField = document.createElement("div");
        forgotPasswordField.classList.add("sign-in-container__form-section__forgot-password");

        let forgotPasswordLink = document.createElement("span");
        // forgotPasswordLink.setAttribute("href") 
        // TODO: de facut o chestie pt forgot password -> cand apesi sa se intample ceva

        let forgotPasswordQuestion = document.createElement("span");
        forgotPasswordQuestion.classList.add("sign-in-container__form-section__form-field__forgot-password-text");
        forgotPasswordQuestion.innerHTML = "Forgot password?"

        forgotPasswordLink.appendChild(forgotPasswordQuestion);

        forgotPasswordLink.addEventListener("click", () => {
            this.renderForgotPasswordSection();
        });


        forgotPasswordField.appendChild(forgotPasswordLink);

        form.appendChild(forgotPasswordField);

        form.appendChild(this._createSignInButton("Sign in"));
        form.appendChild(this._createErrorMessageSection());
        // form.appendChild(this._createSignInButton("Sign in with face recognition"));

        formSection.append(form);

        return formSection;

    }

    _createForgotPasswordFormSection() {
        let formSection = document.createElement("div");
        formSection.classList.add("sign-in-container__form-section");

        let form = document.createElement("form");

        form.append(this._createSignInFormField("Email adress", "text", "john@gmail.com"));

        let resetPasswordButton = this._createSignInButton("Reset password");
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            document.getElementById("global-spinner").style.display = "block";
            let email = this._getForgotPasswordEmail();
            this._authenticationManager.sendPasswordResetEmail(email, function (response) {
                document.getElementById("global-spinner").style.display = "none";
                authPageManager.renderer._renderForgotPasswordMessage(response["isSuccesfull"], response["message"]);
            });
        })

        form.appendChild(resetPasswordButton);
        form.appendChild(this._createErrorMessageSection());
        formSection.append(form);

        return formSection;
    }

    _getForgotPasswordEmail() {
        let inputEmail = document.querySelector("div.sign-in-container__form-section > form > label > span.sign-in-container__form-section__form-field__input-wrapper > input");
        return inputEmail.value;
    }

    _createRegisterFormSection() {
        let formSection = document.createElement("div");
        formSection.classList.add("register-container__form-section");

        let form = document.createElement("form");

        form.append(this._createRegisterFormField("Email adress", "email", "john@doe.com", "We’ll occasionally send updates about your account to this inbox. We’ll never share your email address with anyone."));

        form.append(this._createRegisterFormField("Password", "password", "", "Make sure it's more than 6 characters."));

        form.append(this._createRegisterAgreement("By clicking “Create account” below, you agree to our terms of service and privacy statement. We’ll occasionally send you account related emails."));

        form.appendChild(this._createRegisterButton("Create account"));

        form.appendChild(this._createErrorMessageSection());

        formSection.append(form);

        return formSection;

    }

    _backToSignInSection() {
        //TODO: refactor this according to method name and add back-to-sign-in handler
        let backToSignInSection = document.createElement("div");
        backToSignInSection.classList.add("sign-in-container__become-a-member-section", "sign-in-container__become-a-member-section-pointer");

        let backToSignInSectionTextWrapper = document.createElement("div");
        backToSignInSectionTextWrapper.classList.add("sign-in-container__become-a-member-section__text-wrapper", "sign-in-container__become-a-member-section-pointer");

        let backToSignInSectionText = document.createElement("span");
        backToSignInSectionText.classList.add("sign-in-container__form-section__become-a-member-section__text", "sign-in-container__become-a-member-section-pointer");
        backToSignInSectionText.innerHTML = "Back to Sign In"

        backToSignInSectionTextWrapper.appendChild(backToSignInSectionText);

        backToSignInSection.appendChild(backToSignInSectionTextWrapper);


        backToSignInSection.addEventListener("click", () => {
            this.renderLoginSection();
        });

        return backToSignInSection;
    }

    _createErrorMessageSection() {
        let errorMessageSection = document.createElement("div");
        errorMessageSection.classList.add("form-field__error-message-wrapper");

        let errorMessageTextWrapper = document.createElement("span");
        // errorMessageTextWrapper.classList.add("form-field__error-message-wrapper");
        errorMessageTextWrapper.innerHTML = "&nbsp;";

        errorMessageSection.appendChild(errorMessageTextWrapper);

        return errorMessageSection;
    }


}

const authPageRenderer = new AuthPageRenderer();
Object.freeze(authPageRenderer);

export default authPageRenderer;