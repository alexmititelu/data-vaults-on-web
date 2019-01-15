import storageManager from "./../storage/storage-manager.js";
import {
    renderHeader,
    renderFooter,
    deleteAllExceptHeaderAndFooter,
    refreshHeader
} from "../common/common-lib.js"


class KeysPageRenderer {
    constructor() {
        if (!KeysPageRenderer.instance) {
            this.storageManager = storageManager;
            KeysPageRenderer.instance = this;
        }

        return KeysPageRenderer.instance;
    }

    render() {
        deleteAllExceptHeaderAndFooter();
        renderHeader();
        this._renderActualBody();
        renderFooter();
    }

    renderCreateKeyResponse(response) {
        let responseMessageSection = document.querySelector("#actual-body-block > div > div.generator-block__wrapper > div > div.generator__key-creator > div.form__response_message__wrapper");
        responseMessageSection.innerHTML = response["message"];

        if (response["isSuccesfull"] === true) {
            responseMessageSection.style.color = "green";
        } else {
            responseMessageSection.style.color = "red";
        }
    }

    _renderActualBody() {
        let actualBodyBlock = document.getElementById("actual-body-block");

        actualBodyBlock.appendChild(this._createGenerator());
        this._addKeyCreatorResetButtonEventListener();
        this._addKeyCreatorHostsInputEventListener();
    }

    _addKeyCreatorResetButtonEventListener() {
        let resetButton = document.querySelector("#actual-body-block > div > div.generator-block__wrapper > div > div.generator__key-creator > div.form__buttons > input:nth-child(1)");
        resetButton.addEventListener("click", function () {
            let keyCreatorForm = document.querySelector("#actual-body-block > div > div.generator-block__wrapper > div > div.generator__key-creator > form");
            keyCreatorForm.reset();
        })
    }

    _addKeyCreatorHostsInputEventListener() {
        let hostsInput = document.querySelector("#actual-body-block > div > div.generator-block__wrapper > div > div.generator__key-creator > form > label:nth-child(3) > span.form__field__input__wrapper.form__field__input__white-listed-hosts > input");

        hostsInput.addEventListener('keypress', function (e) {
            var key = e.which || e.keyCode;

            if (key === 13) { // 13 is enter
                // code for enter
                let valueFromInput = hostsInput.value
                let hostRepresentation = this._createWhiteListedHost(valueFromInput);
                //TODO: append white list representation
                // this._appendNewWhiteListedHost(hostRepresentation);
                console.log(valueFromInput)
                hostsInput.value = "";
            }
        });
    }
    _appendNewWhiteListedHost(hostRepresentation) {
        let whiteListedHostsWrapper = document.querySelector("#actual-body-block > div > div.generator-block__wrapper > div > div.generator__key-creator > form > label:nth-child(3) > span.form__field__input__wrapper.form__field__input__white-listed-hosts");
        whiteListedHostsWrapper.appendChild(hostRepresentation);
    }
    _createWhiteListedHost(host) {
        let hostField = document.createElement("span");
        hostField.classList.add("form__field__hosts");

        // activeHost = this._checkHostActivity(host);
        activeHost = true;

        if (activeHost === true) {
            hostField.classList.add("host__button--valid");
        } else {
            hostField.classList.add("host__button--invalid");
        }

        let textNode = document.createTextNode(host);
        let removeButton = document.createElement("i");
        removeButton.classList.add("fa", "fa-times", "host__button--remove");

        hostField.appendChild(textNode);
        hostField.appendChild(removeButton);

        return hostField;
    }
    _createGenerator() {
        let generator = document.createElement("div");
        generator.classList.add("generator")

        let generatorCreateKeyButton = this._createGeneratorButton();
        generatorCreateKeyButton.addEventListener("click", function () {
            let generatorCreatorWrapper = document.querySelector("#actual-body-block > div > div.generator-block__wrapper");
            console.log(generatorCreatorWrapper.style.display);
            if (generatorCreatorWrapper.style.display === "block") {
                generatorCreatorWrapper.style.display = "none";
            } else {
                generatorCreatorWrapper.style.display = "block";
            }
        });
        generator.appendChild(generatorCreateKeyButton);
        generator.appendChild(this._createGeneratorMenu());
        return generator;
    }

    _createGeneratorButton() {
        let generatorButtonWrapper = document.createElement("div");
        generatorButtonWrapper.classList.add("generator__button");

        let button = document.createElement("button");
        button.classList.add("button", "button--slider", "button--border-thick", "button--text-upper", "button--size-s");

        let keyIcon = document.createElement("i")
        keyIcon.classList.add("fa", "fa-key");

        let textNode = document.createTextNode("Generate new key");

        button.appendChild(keyIcon);
        button.appendChild(textNode);

        generatorButtonWrapper.appendChild(button);
        return generatorButtonWrapper;
    };

    _createGeneratorMenu() {
        let generatorMenuWrapper = document.createElement("div");
        generatorMenuWrapper.classList.add("generator-block__wrapper");

        let generatorMenu = document.createElement("div");
        generatorMenu.classList.add("generator__wrapper");

        generatorMenu.appendChild(this._createGeneratorKeyCreator());
        generatorMenu.appendChild(this._createGeneratorKeyCreatorInfoList());

        generatorMenuWrapper.appendChild(generatorMenu);
        return generatorMenuWrapper;
    }

    _createGeneratorKeyCreator() {
        let keyCreator = document.createElement("div");
        keyCreator.classList.add("generator__key-creator");

        let form = document.createElement("form");

        form.appendChild(this._createGeneratorKeyCreatorField("Key name", "e.g. ADOBE INTERNSHIP FEEDBACK FORMS"));
        form.appendChild(this._createGeneratorKeyCreatorField("Description", "e.g. This key protects data collected from adobe interns."));
        form.appendChild(this._createGeneratorKeyCreatorField("White listed hosts", "e.g. www.adobe.com"));

        keyCreator.appendChild(form);
        keyCreator.appendChild(this._createGeneratorKeyCreatorOptions());
        keyCreator.appendChild(this._createGeneratorKeyCreatorFormButtons());

        keyCreator.appendChild(this._createKeyCreatorResponseMessage())
        return keyCreator;
    }

    _createGeneratorKeyCreatorField(name, placeholder) {
        let field = document.createElement("label");
        field.classList.add("form__field");

        let fieldName = document.createElement("span");
        fieldName.classList.add("form__field__label");
        fieldName.appendChild(document.createTextNode(name));

        let fieldInputWrapper = document.createElement("span");
        fieldInputWrapper.classList.add("form__field__input__wrapper");

        if (name === "White listed hosts") {
            fieldInputWrapper.classList.add("form__field__input__white-listed-hosts");
        }

        let fieldInput = document.createElement("input");
        fieldInput.classList.add("form__field__input");
        fieldInput.setAttribute("placeholder", placeholder);
        fieldInput.required = true;

        fieldInputWrapper.appendChild(fieldInput);

        field.appendChild(fieldName);
        field.appendChild(fieldInputWrapper)

        return field;
    }

    _checkHostActivity(host) {
        fetch(host).then(response => response.json())
            .then(status => status === 200)
            .catch(error => false)
    }

    _createGeneratorKeyCreatorOptions() {
        let optionsWrapper = document.createElement("div");
        optionsWrapper.classList.add("form__field", "form__field--centered");

        optionsWrapper.appendChild(this._createGeneratorKeyCreatorOption("Save my private key", true));
        optionsWrapper.appendChild(this._createGeneratorKeyCreatorOption("Don't save my private key", false));

        return optionsWrapper;
    }

    _createGeneratorKeyCreatorOption(text, checked) {
        let optionWrapper = document.createElement("label");
        optionWrapper.classList.add("form__field__option");

        let option = document.createElement("input");
        option.classList.add("form__option__input--radio");
        option.setAttribute("type", "radio");
        option.setAttribute("name", "option1");
        option.checked = checked;

        let optionText = document.createTextNode(text);

        optionWrapper.appendChild(option);
        optionWrapper.appendChild(optionText);

        return optionWrapper;
    }

    _createGeneratorKeyCreatorFormButtons() {
        let formButtonsWrapper = document.createElement("div");
        formButtonsWrapper.classList.add("form__buttons");

        let resetButton = this._createGeneratorKeyCreatorFormButton("button", "Reset");
        // resetButton.addEventListener("click", function() {
        //     // this._resetGeneratorKeyCreatorData();
        //     // let keyCreatorForm = document.querySelector("#actual-body-block > div > div.generator-block__wrapper > div > div.generator__key-creator > form");
        //     // keyCreatorForm.reset();
        //     console.log("resest!!");
        //     let input = documet.querySelector("#actual-body-block > div > div.generator-block__wrapper > div > div.generator__key-creator > form > label:nth-child(1) > span.form__field__input__wrapper > input");
        //     input.value = "";
        // });


        formButtonsWrapper.appendChild(resetButton);
        formButtonsWrapper.innerHTML += "&nbsp;";
        let submitButton = this._createGeneratorKeyCreatorFormButton("submit", "Submit");

        submitButton.addEventListener("click", () => {
            let objKey = this._getGeneratorKeyData();

            this.storageManager.storeNewKey(objKey, (response) => {
                if (response["isSuccesfull"] === true) {
                    refreshHeader();
                    this.renderCreateKeyResponse(response);
                } else {
                    //TODO: un loc unde sa afisam erorile, gen un pop up ceva
                    this.renderCreateKeyResponse(response);
                }

            });

        });
        formButtonsWrapper.appendChild(submitButton);
        return formButtonsWrapper;
    }

    _resetGeneratorKeyCreatorData() {
        let keyCreatorForm = document.querySelector("#actual-body-block > div > div.generator-block__wrapper > div > div.generator__key-creator > form");
        keyCreatorForm.reset();
    }

    _getGeneratorKeyData() {
        let keyNameInput = document.querySelector("#actual-body-block > div > div.generator-block__wrapper > div > div.generator__key-creator > form > label:nth-child(1) > span.form__field__input__wrapper > input");
        let keyName = keyNameInput.value

        let descriptionInput = document.querySelector("#actual-body-block > div > div.generator-block__wrapper > div > div.generator__key-creator > form > label:nth-child(2) > span.form__field__input__wrapper > input");
        let description = descriptionInput.value

        // let hostsInput = document.querySelector("#actual-body-block > div > div.generator-block__wrapper > div > div.generator__key-creator > form > label:nth-child(3) > span.form__field__input__wrapper.form__field__input__white-listed-hosts > input")
        let hosts = "";


        let savePrivateKeyCheckbox = document.querySelector("#actual-body-block > div > div.generator-block__wrapper > div > div.generator__key-creator > div.form__field.form__field--centered > label:nth-child(1) > input");
        let savePrivateKey = savePrivateKeyCheckbox.checked

        let keyObj = {
            name: keyName,
            description: description,
            hosts: hosts,
            savePrivateKey: savePrivateKey
        };

        return keyObj;
    }

    _createKeyCreatorResponseMessage() {
        let responseContainer = document.createElement("div");
        responseContainer.classList.add("form__response_message__wrapper");

        let text = document.createElement("span");
        text.innerHTML = "&nbsp;";

        responseContainer.appendChild(text);
        return responseContainer;
    }

    _createGeneratorKeyCreatorFormButton(type, value) {
        let button = document.createElement("input");
        button.classList.add("form__buttons--reset", "button--text-upper");
        button.setAttribute("type", type);
        button.setAttribute("value", value);
        return button;
    }
    _createGeneratorKeyCreatorInfoList() {
        let keyCreatorInfo = document.createElement("div");
        keyCreatorInfo.classList.add("generator__key-info");

        let list = document.createElement("ul");
        list.classList.add("generator__key-info__about");

        list.appendChild(this._createGeneratorKeyCreatorInfoListItem("The key name field represents the unique identifier for the generated key."));
        list.appendChild(this._createGeneratorKeyCreatorInfoListItem("The description field is a piece of information to help you remember things like what this key is used for et. al."));
        list.appendChild(this._createGeneratorKeyCreatorInfoListItem("The white listed hosts field is used for authentication, place here domain names that contain the forms you want to secure."));
        list.appendChild(this._createGeneratorKeyCreatorInfoListItem("You can let us save and manage your private key, so in order to see your data you only need to log in. Otherwise, your private key will be available to you for a limited ammount of time. After that, in order to see your data you will need to provide the private key."));

        keyCreatorInfo.appendChild(list);

        return keyCreatorInfo;
    }

    _createGeneratorKeyCreatorInfoListItem(text) {
        let listItem = document.createElement("li");
        listItem.classList.add("generator__key-info__about__item");

        listItem.appendChild(document.createTextNode(text));

        return listItem;
    }
}

const keysPageRenderer = new KeysPageRenderer();
Object.freeze(keysPageRenderer);

export default keysPageRenderer;