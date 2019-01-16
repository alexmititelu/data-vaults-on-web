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

        actualBodyBlock.appendChild(this._createKeySearchContainer());
        actualBodyBlock.appendChild(this._createJSCodeModal());

        storageManager.getGeysInfo().then((keys) => {
            actualBodyBlock.appendChild(this._createKeysLibrary(keys));
            console.log(keys);
            
        });
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

    _createKeySearchContainer() {
        //TODO: poate sugestii pt search? cand scrii un nume sa te trimita cu o ancora la cheia aia?
        let keysBorder = document.createElement("div");
        keysBorder.classList.add("keys-separator","info-text--big");

        let keyIcon = document.createElement("i");
        keyIcon.classList.add("fa","fa-key");

        let lockIcon = document.createElement("i");
        lockIcon.classList.add("fa","fa-lock");

        let searchContainer = document.createElement("div");
        searchContainer.classList.add("search-container");

        let searchInput = document.createElement("input");
        searchInput.classList.add("search-container__search-bar");
        searchInput.setAttribute("type","text");
        searchInput.setAttribute("name","search");
        searchInput.setAttribute("placeholder","Search by key name");

        searchContainer.appendChild(searchInput);

        keysBorder.appendChild(keyIcon);
        keysBorder.innerHTML += "&nbsp;";
        keysBorder.appendChild(document.createTextNode("MY KEYS"));
        keysBorder.innerHTML += "&nbsp;";
        
        keysBorder.appendChild(lockIcon);

        keysBorder.appendChild(searchContainer);
        
        return keysBorder;
    }

    _createKeysLibrary(keysArray) {
        let keysLibrary = document.createElement("div");
        keysLibrary.classList.add("keys-library");

        keysArray.forEach(element => {
            keysLibrary.appendChild(this._createKeySection(element));
        });
        
        return keysLibrary;
    }

    _createKeySection(keyData) {
        let keySection = document.createElement("div");
        keySection.classList.add("keys-library__key-wrapper");

        keySection.appendChild(this._createKeyInfoSection(keyData));
        keySection.appendChild(this._createKeyStatsSection(keyData.keyName));
        return keySection;
    }

    _createKeyInfoSection(keyData) {
        let keyInfoSection = document.createElement("div");
        keyInfoSection.classList.add("keys-library__key-data-wrapper");

        let keyInfoWrapper = document.createElement("div");
        keyInfoWrapper.classList.add("keys-library__key-info-container");

        keyInfoSection.appendChild(keyInfoWrapper);
        // de appenduit elementele DOM din keyData
        // TODO: pt fiecare valoare din keyData apelez _createKeyInfoSectionItem

        keyInfoSection.appendChild(this._createKeyInfoSectionItem("Key Name",keyData.keyName,null,null,0));
        keyInfoSection.appendChild(this._createKeyInfoSectionItem("Description",keyData.description,null,null,1));
        keyInfoSection.appendChild(this._createKeyInfoSectionItem("Hosts Info",keyData.whiteListedHosts,"Here are all the white listed hosts (data can be encrypted only from these hosts)",null,2));
        keyInfoSection.appendChild(this._createKeyInfoSectionItem("RSA public key",keyData.publicKey,"This is the public RSA key used for encryption.",null,3));
        keyInfoSection.appendChild(this._createKeyInfoSectionItem("RSA private key",keyData.privateKey,"This is the private RSA key used for encryption.",null,4));
        
        let buttonsSection = document.createElement("div");
        buttonsSection.classList.add("keys-library__key-info-container__buttons");

        let getJsCodeButton = this._createKeyInfoGetJSButoon();
        let seeDataButton = this._createKeyInfoSeeDataButton();

        getJsCodeButton.addEventListener("click",function(event){
            document.getElementById("js-code-modal-id").style.display = "block";
            document.getElementById("js-code-modal-id__text-value").innerHTML = this._getContentForModal(keyData);
        });

        buttonsSection.appendChild(getJsCodeButton);
        buttonsSection.appendChild(seeDataButton);

        keyInfoSection.appendChild(buttonsSection);


        return keyInfoSection;
    }

    _getContentForModal(keyData) {
        let content = `<script src=\"http://127.0.0.1:5000/assets/scripts/client/client.js\"></script>` +
                       `<script> ` +
                       `var daveConfig = { ` +
                       `    keyName: \"${keyData.keyName}\"` +
                       `    rsaPublicKeyStringB64: \" ${keyData.publicKey}\"` +
                       `    uid: \"${firebase.auth().currentuser.uid}\"` + 
                       `};` +
                       `dave.secureForms();` +
                       `</script`;

        return content;
    }
    _createKeyStatsSection(keyName) {
        //TODO: date reale?
        return this._createUnavailableKeyStatsSection();
    }

    _createUnavailableKeyStatsSection() {
        let barchartWrapper = document.createElement("div");
        barchartWrapper.classList.add("keys-library__key-barchart-container");

        barchartWrapper.appendChild(this._createBarChartSingleColumn(1,"Fri"));
        barchartWrapper.appendChild(this._createBarChartSingleColumn(2,"Sat"));
        barchartWrapper.appendChild(this._createBarChartSingleColumn(3,"Sun"));
        barchartWrapper.appendChild(this._createBarChartSingleColumn(4,"Mon"));
        barchartWrapper.appendChild(this._createBarChartSingleColumn(5,"Tue"));
        barchartWrapper.appendChild(this._createBarChartSingleColumn(6,"Wed"));
        barchartWrapper.appendChild(this._createBarChartSingleColumn(7,"Thu"));

        let unavailableBars = document.createElement("div");
        unavailableBars.classList.add("keys-library__key-barchart-container__data-not-available-bars");

        let dataNotAvailable = document.createElement("div");
        dataNotAvailable.classList.add("keys-library__key-barchart-container__data-not-available-message");
        dataNotAvailable.appendChild(document.createTextNode("data not available"));

        let submitsPerDay = document.createElement("div");
        submitsPerDay.classList.add("keys-library__key-barchart-container__legend");
        submitsPerDay.appendChild(document.createTextNode("Submits / day"));
        
        barchartWrapper.appendChild(unavailableBars);
        barchartWrapper.appendChild(dataNotAvailable);
        barchartWrapper.appendChild(submitsPerDay);

        return barchartWrapper;
    }

    _createBarChartSingleColumn(number,day) {
        let bar = document.createElement("div");
        bar.classList.add("keys-library__key-barchart-container__bar-label-"+number);
        bar.appendChild(document.createTextNode(day));
        return bar;
    }

    _createKeyInfoSectionItem(itemName,value,additionalInfo,hostsInfo,index) {
        // switch(index) {
            // case 0:
            if(index===0) {
                let item = document.createElement("label");
                item.classList.add("keys-library__key-info-container__item");

                let itemValue = document.createElement("span");
                itemValue.classList.add("keys-library__key-info-container__item__value");
                itemValue.appendChild(document.createTextNode(value));

                let itemAdditionalInfo = document.createElement("span");
                itemAdditionalInfo.classList.add("keys_library__key-info-container__item__additional__option__about__tooltiptext-value","info-text--small");
                itemAdditionalInfo.appendChild(document.createTextNode(additionalInfo));
                
                itemValue.appendChild(itemAdditionalInfo);
                item.appendChild(itemValue)


                item.appendChild(this._createKeyInfoSectionDash());

                return item;
            }
            // case 1:
            if(index===1) {
                let item = document.createElement("label");
                item.classList.add("keys-library__key-info-container__item");

                let itemValue = document.createElement("span");
                itemValue.classList.add("keys-library__key-info-container__item__value", "info-text--small");
                itemValue.appendChild(document.createTextNode(value));

                let additionalInfo = document.createElement("span");
                additionalInfo.classList.add("keys_library__key-info-container__item__additional__option__about__tooltiptext-value", "info-text--small");
                additionalInfo.appendChild(document.createTextNode(additionalInfo));

                let editIcon = document.createElement("i");
                editIcon.classList.add("fa","fa-edit","keys-library__key-info-container__item__additional-option", "keys-library__key-info-container__item__additional-option__edit");
                
                itemValue.appendChild(additionalInfo);
                itemValue.appendChild(editIcon);

                item.appendChild(itemValue);

                item.appendChild(this._createKeyInfoSectionDash());
                
                return item;
            }
            // case 2:
            if(index===2) {
                let item = document.createElement("label");
                item.classList.add("keys-library__key-info-container__item");

                let itemValue = document.createElement("span");
                itemValue.classList.add("keys-library__key-info-container__item__value", "info-text--small");
            
                let hostsContainer = document.createElement("span");
                hostsContainer.classList.add("keys-library__key-info-container__item__values-container");
                if( value !=null) {
                    value.forEach(element => {
                    let host = document.createElement("span");
                    host.classList.add("keys-library__key-info-container__item__value--host");

                    let availability = this._checkHostActivity(element["link"]);
                    if(availability === true) {
                        host.classList.add("host__button--valid");
                    } else {
                        host.classList.add("host__button--invalid");
                    }

                    host.appendChild(document.createTextNode(element["link"]));

                    let deleteButton = document.createElement("i");
                    deleteButton.classList.add("fa","fa-times", "host__button--remove");

                    host.appendChild(deleteButton);
                    hostsContainer.appendChild(host);
                });
                }   
                itemValue.appendChild(hostsContainer);

                item.appendChild(itemValue);

                let additionalInfoIcon = document.createElement("i");
                additionalInfoIcon.classList.add("fa", "fa-question-circle","keys-library__key-info-container__item__additional-option", "keys-library__key-info-container__item__additional-option__about");

                let additionalInfoTooltip = document.createElement("span");
                additionalInfoTooltip.classList.add("keys_library__key-info-container__item__additional__option__about__tooltiptext-value", "info-text--small");
                additionalInfoTooltip.appendChild(document.createTextNode(additionalInfo));

                additionalInfoIcon.appendChild(additionalInfoTooltip);

                let addButton = document.createElement("i");
                addButton.classList.add("fa","fa-plus-circle", "keys-library__key-info-container__item__additional-option", "keys-library__key-info-container__item__additional-option__add");
                
                item.appendChild(additionalInfoIcon);
                item.append(addButton);
                item.appendChild(this._createKeyInfoSectionDash());
                
                return item;
            }
            if(index===3 || index===4) {
            // case 3:
                return this._createKeyInfoSectionItemRSA(itemName,value,additionalInfo);
            // case 4:
                // return _createKeyInfoSectionItemRSA(itemName,value,additionalInfo);
            }
            // default:
                return "";
        // }
    }

    _createJSCodeModal() {
        let modal = document.createElement("div");
        modal.setAttribute("id", "js-code-modal");
        modal.classList.add("keys-library__key-info-container__js-code-modal");
        modal.setAttribute("id","js-code-modal-id");

        let modalContent = document.createElement("div");
        modalContent.classList.add("keys-library__key-info-container__js-code-modal__content");

        let modalCloseButton = document.createElement("span");
        modalCloseButton.setAttribute("id", "js-code-modal__close-button");
        modalCloseButton.classList.add("keys-library__key-info-container__js-code-modal__close-button");

        modalCloseButton.addEventListener("click",function(event) {
            document.getElementById("js-code-modal-id").style.display = "none";
        })

        modalCloseButton.innerHTML += "&times;";

        modalContent.appendChild(modalCloseButton);

        let modalContentText = document.createElement("pre");
        modalContentText.classList.add("keys-library__key-info-container__js-code-modal__content--code-value");
        modalContentText.setAttribute("id","js-code-modal-id__text-value");

        modalContentText.appendChild(document.createTextNode("Text for JS Modal"));

        modalContent.appendChild(modalContentText);

        let clipboardButton = document.createElement("i");
        clipboardButton.classList.add("fa", "fa-clipboard", "keys-library__key-info-container__item__additional-option", "keys-library__key-info-container__item__additional-option__copy-to-clipboard", "keys-library__key-info-container__js-code-modal__copy-to-clipboard-button");

        clipboardButton.addEventListener("click",function(event){
            let value = document.getElementById("js-code-modal-id__text-value").innerHTML;
            navigator.clipboard.writeText(value).then(function() {
                console.log('Async: Copying to clipboard was successful!');
              }, function(err) {
                console.error('Async: Could not copy text: ', err);
              });
        })

        let clipboardText = document.createElement("span");
        clipboardText.classList.add("keys-library__key-info-container__item__additional-option__copy-to-clipboard", "keys-library__key-info-container__item__additional-option__copy-to-clipboard__tooltiptext-value");
        clipboardText.appendChild(document.createTextNode("Copy to clipboard"));

        clipboardButton.appendChild(clipboardText);

        modalContent.appendChild(clipboardButton);

        modal.appendChild(modalContent);

        return modal;
    }

    _checkHostActivity(host) {
        // fetch(host).then(response => response.json())
        // .then(status => status===200)
        // .catch(error => false)
        return true;
        //TODO: how to do this????
    }

    _createKeyInfoSectionItemRSA(itemName,value,additionalInfo) {
        let item = document.createElement("label");
        item.classList.add("keys-library__key-info-container__item");

        let itemValue = document.createElement("span");
        itemValue.classList.add("keys-library__key-info-container__item__value", "info-text--small");

        itemValue.appendChild(document.createTextNode(itemName));

        let viewKeyValueIcon = document.createElement("i");
        viewKeyValueIcon.classList.add("fa", "fa-sort-down", "keys-library__key-info-container__item__additional-option", "keys-library__key-info-container__item__additional-option-show-key");
        if(value!=""){  
            itemValue.appendChild(viewKeyValueIcon);
        } else {
            itemValue.innerHTML += "&nbsp;";
            itemValue.appendChild(document.createTextNode("(key is not saved)"));
        }

        let additionalInfoIcon = document.createElement("i");
        additionalInfoIcon.classList.add("fa", "fa-question-circle", "keys-library__key-info-container__item__additional-option", "keys-library__key-info-container__item__additional-option__about");

        let additionalInfoValue = document.createElement("span");
        additionalInfoValue.classList.add("keys_library__key-info-container__item__additional__option__about__tooltiptext-value", "info-text--small");
        additionalInfoValue.appendChild(document.createTextNode(additionalInfo));

        additionalInfoIcon.appendChild(additionalInfoValue);
        
        itemValue.appendChild(additionalInfoIcon);

        let editButtonIcon = document.createElement("i");
        editButtonIcon.classList.add("fa", "fa-edit", "keys-library__key-info-container__item__additional-option", "keys-library__key-info-container__item__additional-option__edit");

        itemValue.appendChild(editButtonIcon);

        let copyToClipboardButtonIcon = document.createElement("i");
        copyToClipboardButtonIcon.classList.add("fa", "fa-clipboard", "keys-library__key-info-container__item__additional-option", "keys-library__key-info-container__item__additional-option__copy-to-clipboard");

        if(value==="") {
            copyToClipboardButtonIcon.style.cursor = "not-allowed";
            copyToClipboardButtonIcon.style.disabled = true;
        } else {
            copyToClipboardButtonIcon.addEventListener("click",function(event){
                navigator.clipboard.writeText(value).then(function() {
                    console.log('Async: Copying to clipboard was successful!');
                  }, function(err) {
                    console.error('Async: Could not copy text: ', err);
                  });
            })
        }

        let copyToClipboardTooltip = document.createElement("span");
        copyToClipboardTooltip.classList.add("keys-library__key-info-container__item__additional-option__copy-to-clipboard", "keys-library__key-info-container__item__additional-option__copy-to-clipboard__tooltiptext-value");
        copyToClipboardTooltip.appendChild(document.createTextNode("Copy to clipboard"));
        
        copyToClipboardButtonIcon.appendChild(copyToClipboardTooltip);

        itemValue.appendChild(copyToClipboardButtonIcon);

        let keyValue = document.createElement("span");
        keyValue.classList.add("keys-library__key-info-container__item__value--key", "info-text--small");
        keyValue.appendChild(document.createTextNode(value));
        
        itemValue.appendChild(keyValue);
        
        item.appendChild(itemValue);
        
        item.appendChild(this._createKeyInfoSectionDash());

        return item;
    }

    _createKeyInfoGetJSButoon() {
        let getJsCodeInput = document.createElement("input");
        getJsCodeInput.classList.add("keys-library__key-info-container__buttons__button", "button--text-upper", "button--large-width");
        getJsCodeInput.setAttribute("value","Get JS code");
        getJsCodeInput.setAttribute("type","button");

        return getJsCodeInput;
    }

    _createKeyInfoSeeDataButton() {
        let seeDataButton = document.createElement("input");
        seeDataButton.classList.add("keys-library__key-info-container__buttons__button", "button--text-upper");
        seeDataButton.setAttribute("value","See data");
        seeDataButton.setAttribute("type","button");

        return seeDataButton;
    }
  

    _createKeyInfoSectionDash() {
        let dash = document.createElement("span");
        dash.classList.add("keys-library__key-info-container__item__wrapper");

        return dash;
    }
}

const keysPageRenderer = new KeysPageRenderer();
Object.freeze(keysPageRenderer);

export default keysPageRenderer;