// export class AuthManager {
    
// }

function removeAllBodyChildren() {
    let body = document.getElementsByTagName("body")[0];
    while(body.firstChild){
        body.removeChild(body.firstChild);
    }
}

function createSignInBannerSection() {
    let banner_section = document.createElement("div");
    banner_section.classList.add("sign-in-container__banner-section");

    let logo = document.createElement("img");
    logo.classList.add("sign-in-container__banner-section__logo");
    logo.setAttribute('src','/assets/img/logo.png');
    logo.setAttribute('alt','Logo');

    let message = document.createElement("span");
    message.classList.add("sign-in-container__banner-section__title");
    message.innerHTML = "Hi, I'm DAVE";

    banner_section.appendChild(logo);
    banner_section.appendChild(message);
    return banner_section;
}

function createRegisterBannerSection() {
    let banner_section = document.createElement("div");
    banner_section.classList.add("register-container__banner-section");

    let logo = document.createElement("img");
    logo.classList.add("register-container__banner-section__logo");
    logo.setAttribute('src','/assets/img/logo.png');
    logo.setAttribute('alt','Logo');

    let message = document.createElement("span");
    message.classList.add("register-container__banner-section__title");
    message.innerHTML = "Hi, I'm DAVE";

    banner_section.appendChild(logo);
    banner_section.appendChild(message);
    return banner_section;
}

function createSignInFormField(name,type,placeholder) {
    let field = document.createElement("label");
    field.classList.add("sign-in-container__form-section__form-field");

    let fieldName = document.createElement("span");
    fieldName.classList.add("sign-in-container__form-section__form-field__label");
    fieldName.innerHTML = name;

    let fieldValueWrapper = document.createElement("span");
    fieldValueWrapper.classList.add("sign-in-container__form-section__form-field__input-wrapper");

    let fieldValueInput = document.createElement("input");
    fieldValueInput.classList.add("sign-in-container__form-section__form-field__input");
    fieldValueInput.setAttribute("placeholder",placeholder);
    fieldValueInput.setAttribute("type",type);
    fieldValueInput.required = true;

    fieldValueWrapper.appendChild(fieldValueInput);
    
    field.appendChild(fieldName);
    field.appendChild(fieldValueWrapper);

    return field;

}

function createRegisterFormField(name,type,placeholder,fieldInfoText) {
    let field = document.createElement("label");
    field.classList.add("register-container__form-section__form-field");

    let fieldName = document.createElement("span");
    fieldName.classList.add("register-container__form-section__form-field__label");
    fieldName.innerHTML = name;

    let fieldValueWrapper = document.createElement("span");
    fieldValueWrapper.classList.add("register-container__form-section__form-field__input-wrapper");

    let fieldValueInput = document.createElement("input");
    fieldValueInput.classList.add("register-container__form-section__form-field__input");
    fieldValueInput.setAttribute("placeholder",placeholder);
    fieldValueInput.setAttribute("type",type);
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

function createRegisterAgreement(textToAgree) {

    let agreement = document.createElement("div");
    agreement.classList.add("register-container__form-section__agreement");

    let agreementText = document.createElement("span");
    agreementText.classList.add("register-container__form-section__form-field__agreement-text");
    agreementText.innerHTML = textToAgree

    agreement.appendChild(agreementText)
    return agreement;
}

function createSignInButton(buttonText) {

    let signInButton = document.createElement("div");
    signInButton.classList.add("sign-in-container__form-section__sign-in-button");

    let signInButtonInput = document.createElement("input");
    signInButtonInput.setAttribute("type","submit");
    signInButtonInput.setAttribute("value",buttonText);
    signInButtonInput.classList.add("sign-in-container__form-section__sign-in-button__button");

    signInButton.append(signInButtonInput);

    return signInButton;
}

function createRegisterButton(buttonText) {

    let registerButton = document.createElement("div");
    registerButton.classList.add("register-container__form-section__register-button");

    let registerButtonInput = document.createElement("input");
    registerButtonInput.setAttribute("type","submit");
    registerButtonInput.setAttribute("value",buttonText);
    registerButtonInput.classList.add("register-container__form-section__register-button__button");

    registerButton.append(registerButtonInput);

    return registerButton;
}

function createBecomeMemberSection() {
    

    let becomeMemberSection = document.createElement("div");
    becomeMemberSection.classList.add("sign-in-container__become-a-member-section");

    let becomeMemberSectionTextWrapper = document.createElement("div");
    becomeMemberSectionTextWrapper.classList.add("sign-in-container__become-a-member-section__text-wrapper");

    let becomeMemberSectionText = document.createElement("span");
    becomeMemberSectionText.classList.add("sign-in-container__form-section__become-a-member-section__text");
    becomeMemberSectionText.innerHTML = "New to DAVE?"

    let createAccountLink = document.createElement("a");
    // TODO: event listener pe acest a -> cand apas sa randez pagina de create account
    
    let createAccountMessage = document.createElement("span");
    createAccountMessage.classList.add("sign-in-container__form-section__become-a-member-section__link-text");
    createAccountMessage.innerHTML = "Create an account."

    createAccountLink.appendChild(createAccountMessage);

    becomeMemberSectionText.appendChild(createAccountLink);

    becomeMemberSectionTextWrapper.appendChild(becomeMemberSectionText);

    becomeMemberSection.appendChild(becomeMemberSectionTextWrapper);

    return becomeMemberSection;
}

function createSignInFormSection() {
    let formSection = document.createElement("div");
    formSection.classList.add("sign-in-container__form-section");

    let form = document.createElement("form");

    form.append(createSignInFormField("Username or email adress","text","john@gmail.com"));

    form.append(createSignInFormField("Password","password","********"));

    let forgotPasswordField = document.createElement("div");
    forgotPasswordField.classList.add("sign-in-container__form-section__forgot-password");

    let forgotPasswordLink = document.createElement("a");
    // forgotPasswordLink.setAttribute("href") 
    // TODO: de facut o chestie pt forgot password -> cand apesi sa se intample ceva

    let forgotPasswordQuestion = document.createElement("span");
    forgotPasswordQuestion.classList.add("sign-in-container__form-section__form-field__forgot-password-text");
    forgotPasswordQuestion.innerHTML = "Forgot password?"

    forgotPasswordLink.appendChild(forgotPasswordQuestion);
    forgotPasswordField.appendChild(forgotPasswordLink);

    form.appendChild(forgotPasswordField);

    form.appendChild(createSignInButton("Sign in"));
    form.appendChild(createSignInButton("Sign in with face recognition"));

    formSection.append(form);

    return formSection;

}

function createRegisterFormSection() {
    let formSection = document.createElement("div");
    formSection.classList.add("register-container__form-section");

    let form = document.createElement("form");

    form.append(createRegisterFormField("Username","text","johndoe2","This will be your username. You won't be able to modify it later."));

    form.append(createRegisterFormField("Email adress","email","john@doe.com","We’ll occasionally send updates about your account to this inbox. We’ll never share your email address with anyone."));

    form.append(createRegisterFormField("Password","password","********","Make sure it's more than 15 characters, or at least 7 characters, including a number, and a lowercase letter."));

    form.append(createRegisterAgreement("By clicking “Create account” below, you agree to our terms of service and privacy statement. We’ll occasionally send you account related emails."));

    form.appendChild(createRegisterButton("Create account"));

    formSection.append(form);

    return formSection;

}

function backToSignInSection() {
    //TODO: refactor this according to method name and add back-to-sign-in handler
    let becomeMemberSection = document.createElement("div");
    becomeMemberSection.classList.add("sign-in-container__become-a-member-section");

    let becomeMemberSectionTextWrapper = document.createElement("div");
    becomeMemberSectionTextWrapper.classList.add("sign-in-container__become-a-member-section__text-wrapper");

    let becomeMemberSectionText = document.createElement("span");
    becomeMemberSectionText.classList.add("sign-in-container__form-section__become-a-member-section__text");
    becomeMemberSectionText.innerHTML = "Back to Sign In"

    becomeMemberSectionTextWrapper.appendChild(becomeMemberSectionText);

    becomeMemberSection.appendChild(becomeMemberSectionTextWrapper);

    return becomeMemberSection;
}


function displayLoginSection() {
    removeAllBodyChildren();
    
    let body = document.getElementsByClassName("actual-body")[0];

    let signInContainer = document.createElement("div");
    signInContainer.classList.add("sign-in-container");

    signInContainer.append(createSignInBannerSection())
    signInContainer.append(createSignInFormSection());
    signInContainer.append(createBecomeMemberSection());

    body.appendChild(signInContainer);
}


function displayRegisterSection() {

    removeAllBodyChildren();
    
    let body = document.getElementsByClassName("actual-body")[0];

    let registerContainer = document.createElement("div");
    registerContainer.classList.add("register-container");

    registerContainer.append(createRegisterBannerSection());
    registerContainer.append(createRegisterFormSection());
    registerContainer.append(backToSignInSection());

    body.appendChild(registerContainer);

}

console.log("@@@")
export {displayLoginSection,displayRegisterSection};
