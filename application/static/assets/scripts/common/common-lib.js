import storageManager from "../storage/storage-manager.js"
import textContent from "./text-content.js"
import homePageManager from "../page-managers/home-page-manager.js"
import dataPageManager from "../page-managers/data-page-manager.js";

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function profileButtonPressedHandler() {
    alert("PROFILE PRESSED");
}

function logOutButtonPressedHandler() {
    firebase.auth().signOut();
}

function homeButtonPressedHandler() {
    var serviceDescriptionGrid = document.getElementsByClassName("service-description-grid")[0];
    var behavior = "smooth";

    if (!serviceDescriptionGrid) {
        homePageManager.renderer.render();
        behavior = "instant";
    }

    serviceDescriptionGrid = document.getElementsByClassName("service-description-grid")[0];
    serviceDescriptionGrid.scrollIntoView({
        behavior: behavior,
        block: "start"
    })
}

function faqButtonPressedHandler() {
    var faqGrid = document.getElementsByClassName("faq-grid")[0];
    var behavior = "smooth";

    if (!faqGrid) {
        homePageManager.renderer.render();
        behavior = "instant";
    }

    faqGrid = document.getElementsByClassName("faq-grid")[0];
    faqGrid.scrollIntoView({
        behavior: behavior,
        block: "start"
    });
}

function contactButtonPressedHandler() {
    var contactSection = document.getElementsByClassName("contact")[0];
    var behaviour = "smooth";

    if (!contactSection) {
        homePageManager.renderer.render();
        behaviour = "instant";
    }

    contactSection = document.getElementsByClassName("contact")[0];
    contactSection.scrollIntoView({
        behavior: behaviour,
        block: "start"
    });
}

function privateKeyButtonPressed() {
    alert("PRIVATE KEY " + this.id.substr(0, this.id.length - 10) + " PRESSED!");
}

function publicKeyButtonPressed(keyName) {
    dataPageManager.renderer.render(this.id.substr(0, this.id.length - 10));
}

function populateDataDropdownMenu(data) {
    var rightItemsDataDiv = document.getElementsByClassName("header__main-nav__ul__right-items__li__drop-down-button-content")[0];

    for (var idx = 0; idx < data.length; ++idx) {
        var a = document.createElement("a");
        a.id = data[idx].keyName + "-header-id";

        if (data[idx].isPrivate) {
            var aPrivateClass = "header__main-nav__ul__right-items__li__drop-down-button-content__link--not-saved-key-item";
            var iPrivateClass = "fa-lock";

            a.addEventListener("click", privateKeyButtonPressed);
        } else {
            var aPrivateClass = "header__main-nav__ul__right-items__li__drop-down-button-content__link--saved-key-item";
            var iPrivateClass = "fa-lock-open";

            a.addEventListener("click", publicKeyButtonPressed);
        }

        a.classList.add("header__main-nav__ul__right-items__li__drop-down-button-content__link", aPrivateClass);
        a.append(document.createTextNode(data[idx].keyName));

        rightItemsDataDiv.append(a);

        var i = document.createElement("i");
        i.classList.add("header__main-nav__ul__right-items__li__drop-down-button-content__link__icon", "fas", iPrivateClass);

        a.append(i);
    }
}

function renderHeader() {
    var headers = document.getElementsByTagName("header");

    if (headers.length == 0) {
        // header
        var header = document.createElement("header");
        header.classList.add("header");

        document.body.prepend(header);

        // header > nav 
        var nav = document.createElement("nav");
        nav.classList.add("header__main-nav");

        header.append(nav);

        // header > nav > div (left-items)
        var leftItemsDiv = document.createElement("div");
        leftItemsDiv.classList.add("header__main-nav__ul__left-items");

        nav.append(leftItemsDiv);

        // header > nav > div (left-items) > ul
        var leftItemsUl = document.createElement("ul");
        leftItemsUl.classList.add("header__main-nav__ul");
        leftItemsUl.addEventListener("click", homeButtonPressedHandler);

        leftItemsDiv.append(leftItemsUl);

        // header > nav > div (left-items) > ul > li (logo)
        var leftItemsLogoLi = document.createElement("li");
        leftItemsLogoLi.classList.add("header__main-nav__ul__left-items__li");

        leftItemsUl.append(leftItemsLogoLi);

        // header > nav > div (left-items) > ul > li (logo) > icon
        var leftItemsLogoIcon = document.createElement("i");
        leftItemsLogoIcon.classList.add("header__main-nav__ul__left-items__li__link", "header__main-nav__ul__left-items__li__link--logo", "fa", "fa-unlock-alt", "fa-2x");

        leftItemsLogoLi.append(leftItemsLogoIcon);

        // header > nav > div (left-items) > ul > li (logo) > text
        var leftItemsLogoText = document.createElement("p");
        leftItemsLogoText.classList.add("header__main-nav__ul__left-items__li__text");
        leftItemsLogoText.append(document.createTextNode(" DAVE "));

        leftItemsLogoLi.append(leftItemsLogoText);

        // header > nav > div (burger-icon)
        var burgerIconDiv = document.createElement("div");
        burgerIconDiv.classList.add("header__main-nav__ul__li__burger-icon");

        nav.append(burgerIconDiv);

        // header > nav > div (burger-icon) > i
        var burgerIconI = document.createElement("i");
        burgerIconI.classList.add("fas", "fa-bars", "fa-2x");

        burgerIconDiv.append(burgerIconI);

        // header > nav > div (right-items)
        var rightItemsDiv = document.createElement("div");
        rightItemsDiv.classList.add("header__main-nav__ul__right-items");

        nav.append(rightItemsDiv);

        // header > nav > div (right-items) > ul
        var rightItemsUl = document.createElement("ul");
        rightItemsUl.classList.add("header__main-nav__ul", "header__main-nav__ul--right");

        rightItemsDiv.append(rightItemsUl);

        // header > nav > div (right-items) > ul > li (HOME)
        var rightItemsHomeLi = document.createElement("li");
        rightItemsHomeLi.classList.add("header__main-nav__ul__right-items__li", "header__main-nav__ul__right-items__li--active");
        rightItemsHomeLi.addEventListener("click", homeButtonPressedHandler);

        rightItemsUl.append(rightItemsHomeLi);

        // header > nav > div (right-items) > ul > li (HOME) > a
        var rightItemsHomeA = document.createElement("a");
        rightItemsHomeA.classList.add("header__main-nav__ul__right-items__li__link", "header__main-nav__ul__right-items__li__link--active");
        rightItemsHomeA.append(document.createTextNode("HOME"));

        rightItemsHomeLi.append(rightItemsHomeA);

        // header > nav > div (right-items) > ul > li (DATA)
        var rightItemsDataLi = document.createElement("li");
        rightItemsDataLi.classList.add("header__main-nav__ul__right-items__li", "header__main-nav__ul__right-items__li--contains-dropdown");

        rightItemsUl.append(rightItemsDataLi);

        // header > nav > div (right-items) > ul > li (DATA) > button
        var rightItemsDataButton = document.createElement("button");
        rightItemsDataButton.classList.add("header__main-nav__ul__right-items__li__drop-down-button");
        rightItemsDataButton.append(document.createTextNode("DATA "));

        rightItemsDataLi.append(rightItemsDataButton);

        // header > nav > div (right-items) > ul > li (DATA) > button > i
        var rightItemsDataButtonI = document.createElement("i");
        rightItemsDataButtonI.classList.add("fas", "fa-caret-down");

        rightItemsDataButton.append(rightItemsDataButtonI);

        // header > nav > div (right-items) > ul > li (DATA) > div (dropdown-content)
        var rightItemsDataDiv = document.createElement("div");
        rightItemsDataDiv.classList.add("header__main-nav__ul__right-items__li__drop-down-button-content");

        rightItemsDataLi.append(rightItemsDataDiv);

        // header > nav > div (right-items) > ul > li (DATA) > div (dropdown-content) > a (keys)
        storageManager.getKeysShort(populateDataDropdownMenu);

        // header > nav > div (right-items) > ul > li (KEYS)
        var rightItemsKeysLi = document.createElement("li");
        rightItemsKeysLi.classList.add("header__main-nav__ul__right-items__li");

        rightItemsUl.append(rightItemsKeysLi);

        // header > nav > div (right-items) > ul > li (KEYS) > a
        var rightItemsKeysA = document.createElement("a");
        rightItemsKeysA.classList.add("header__main-nav__ul__right-items__li__link");
        rightItemsKeysA.href = "#";
        rightItemsKeysA.append(document.createTextNode("KEYS"));

        rightItemsKeysLi.append(rightItemsKeysA);

        // header > nav > div (right-items) > ul > li (FAQ)
        var rightItemsFaqLi = document.createElement("li");
        rightItemsFaqLi.classList.add("header__main-nav__ul__right-items__li");
        rightItemsFaqLi.addEventListener("click", faqButtonPressedHandler)

        rightItemsUl.append(rightItemsFaqLi);

        // header > nav > div (right-items) > ul > li (FAQ) > a
        var rightItemsFaqA = document.createElement("a");
        rightItemsFaqA.classList.add("header__main-nav__ul__right-items__li__link");
        rightItemsFaqA.append(document.createTextNode("FAQ"));

        rightItemsFaqLi.append(rightItemsFaqA);

        // header > nav > div (right-items) > ul > li (CONTACT)
        var rightItemsContactLi = document.createElement("li");
        rightItemsContactLi.classList.add("header__main-nav__ul__right-items__li");
        rightItemsContactLi.addEventListener("click", contactButtonPressedHandler);

        rightItemsUl.append(rightItemsContactLi);

        // header > nav > div (right-items) > ul > li (CONTACT) > a
        var rightItemsContactA = document.createElement("a");
        rightItemsContactA.classList.add("header__main-nav__ul__right-items__li__link");
        rightItemsContactA.append(document.createTextNode("CONTACT"));

        rightItemsContactLi.append(rightItemsContactA);

        // get username
        var user = firebase.auth().currentUser;
        var username = user != null ? user.email.substr(0, user.email.indexOf('@')) : "undefined";
        username += " ";

        // header > nav > div (right-items) > ul > li (username)
        var rightItemsUsernameLi = document.createElement("li");
        rightItemsUsernameLi.classList.add("header__main-nav__ul__right-items__li", "header__main-nav__ul__right-items__li--contains-dropdown", "header__main-nav__ul__right-items__li--username");

        rightItemsUl.append(rightItemsUsernameLi);

        // header > nav > div (right-items) > ul > li (username) > button
        var rightItemsUsernameButton = document.createElement("button");
        rightItemsUsernameButton.classList.add("header__main-nav__ul__right-items__li__drop-down-button");
        rightItemsUsernameButton.append(document.createTextNode(username));

        rightItemsUsernameLi.append(rightItemsUsernameButton);

        // header > nav > div (right-items) > ul > li (username) > button > i
        var rightItemsUsernameI = document.createElement("i");
        rightItemsUsernameI.classList.add("fas", "fa-caret-down");

        rightItemsUsernameButton.append(rightItemsUsernameI);

        // header > nav > div (right-items) > ul > li (username) > div (dropdown-content)
        var rightItemsUsernameDiv = document.createElement("div");
        rightItemsUsernameDiv.classList.add("header__main-nav__ul__right-items__li__drop-down-button-content", "header__main-nav__ul__right-items__li__drop-down-button-content--username");

        rightItemsUsernameLi.append(rightItemsUsernameDiv);

        // header > nav > div (right-items) > ul > li (username) > div (dropdown-content) > a
        var rightItemsUsernameDropdownMenuConfiguration = [{
            text: "PROFILE",
            icon: "fa-user-alt",
            handler: profileButtonPressedHandler
        },
        {
            text: "LOG OUT",
            icon: "fa-sign-out-alt",
            handler: logOutButtonPressedHandler
        }
        ];

        for (var i = 0; i < 2; ++i) {
            var rightItemsUsernameA = document.createElement("a");
            rightItemsUsernameA.classList.add("header__main-nav__ul__right-items__li__drop-down-button-content__link");
            rightItemsUsernameA.addEventListener("click", rightItemsUsernameDropdownMenuConfiguration[i].handler);
            rightItemsUsernameA.append(document.createTextNode(rightItemsUsernameDropdownMenuConfiguration[i].text))

            rightItemsUsernameDiv.append(rightItemsUsernameA);

            var rightItemsUsernameIcon = document.createElement("i");
            rightItemsUsernameIcon.classList.add("header__main-nav__ul__right-items__li__drop-down-button-content__link__icon", "fas", rightItemsUsernameDropdownMenuConfiguration[i].icon);

            rightItemsUsernameA.append(rightItemsUsernameIcon);
        }
    }
}

function renderFooter() {
    var footers = document.getElementsByTagName("footer");

    if (footers.length == 0) {
        // footer
        var footer = document.createElement("footer");
        footer.classList.add("footer");

        document.body.append(footer);

        // footer > p
        var footerP = document.createElement("p");
        footerP.classList.add("footer__text");
        footerP.append(document.createTextNode(textContent.footer));

        footer.append(footerP);
    }
}

function deleteAllExceptHeaderAndFooter() {
    var actualBodyBlock = document.getElementById("actual-body-block");
    while (actualBodyBlock.firstChild) {
        actualBodyBlock.removeChild(actualBodyBlock.firstChild);
    }
}

function deleteAll() {
    var header = document.getElementsByClassName("header")[0];
    if (header) {
        header.parentElement.removeChild(header);
    }

    var footer = document.getElementsByClassName("footer")[0];
    if (footer) {
        footer.parentElement.removeChild(footer);
    }

    var actualBodyBlock = document.getElementById("actual-body-block");
    while (actualBodyBlock.firstChild) {
        actualBodyBlock.removeChild(actualBodyBlock.firstChild);
    }
}

export {
    renderHeader,
    renderFooter,
    deleteAllExceptHeaderAndFooter,
    sleep,
    deleteAll
};