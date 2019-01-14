import storageManager from "../storage/storage-manager.js"
import textContent from "./text-content.js"
import homePageManager from "../page-managers/home-page-manager.js"

function profileButtonPressedHandler() {
    alert("PROFILE PRESSED");
}

function logOutButtonPressedHandler() {
    alert("LOG OUT PRESSED");
}

function homeButtonPressedHandler() {
    homePageManager.renderer.render();
}

function faqButtonPressedHandler() {
    var faqGrid = document.getElementsByClassName('faq-grid')[0];
    if (!faqGrid) {
        homePageManager.renderer.render();
    }

    faqGrid = document.getElementsByClassName('faq-grid')[0];
    faqGrid.scrollIntoView({
        behavior: 'smooth'
    });
}

function contactButtonPressedHandler() {
    var contactSection = document.getElementsByClassName('contact')[0];
    if (!contactSection) {
        homePageManager.renderer.render();
    }

    contactSection = document.getElementsByClassName('contact')[0];
    contactSection.scrollIntoView({
        behavior: 'smooth'
    });
}

function populateDataDropdownMenu(data) {
    var rightItemsDataDiv = document.getElementsByClassName("header__main-nav__ul__right-items__li__drop-down-button-content")[0];

    for (var idx = 0; idx < data.length; ++idx) {
        var a = document.createElement("a");

        if (data[idx].isPrivate) {
            var aPrivateClass = "header__main-nav__ul__right-items__li__drop-down-button-content__link--not-saved-key-item";
            var iPrivateClass = "fa-lock";
        } else {
            var aPrivateClass = "header__main-nav__ul__right-items__li__drop-down-button-content__link--saved-key-item";
            var iPrivateClass = "fa-lock-open";
        }

        a.classList.add("header__main-nav__ul__right-items__li__drop-down-button-content__link", aPrivateClass);
        a.href = "#";
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

        leftItemsDiv.append(leftItemsUl);

        // header > nav > div (left-items) > ul > li (logo)
        var leftItemsLogoLi = document.createElement("li");
        leftItemsLogoLi.classList.add("header__main-nav__ul__left-items__li");

        leftItemsUl.append(leftItemsLogoLi);

        // header > nav > div (left-items) > ul > li (logo) > a
        var leftItemsLogoA = document.createElement("a");
        leftItemsLogoA.classList.add("header__main-nav__ul__left-items__li__link", "header__main-nav__ul__left-items__li__link--logo", "fa", "fa-unlock-alt", "fa-2x");
        leftItemsLogoA.href = "#";

        leftItemsLogoLi.append(leftItemsLogoA);

        // header > nav > div (left-items) > ul > li (text)
        var leftItemsTextLi = document.createElement("li");
        leftItemsTextLi.classList.add("header__main-nav__ul__left-items__li");

        leftItemsUl.append(leftItemsTextLi);

        // header > nav > div (left-items) > ul > li (text) > p
        var leftItemsTextP = document.createElement("p");
        leftItemsTextP.classList.add("header__main-nav__ul__left-items__li__text");
        leftItemsTextP.append(document.createTextNode("DAVE"));

        leftItemsTextLi.append(leftItemsTextP);

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

        rightItemsUl.append(rightItemsHomeLi);

        // header > nav > div (right-items) > ul > li (HOME) > a
        var rightItemsHomeA = document.createElement("a");
        rightItemsHomeA.classList.add("header__main-nav__ul__right-items__li__link", "header__main-nav__ul__right-items__li__link--active");
        rightItemsHomeA.addEventListener("click", homeButtonPressedHandler);
        rightItemsHomeA.append(document.createTextNode("HOME"));

        rightItemsHomeLi.append(rightItemsHomeA);

        // header > nav > div (right-items) > ul > li (DATA)
        var rightItemsDataLi = document.createElement("li");
        rightItemsDataLi.classList.add("header__main-nav__ul__right-items__li", "header__main-nav__ul__right-items__li--contains-dropdown");

        rightItemsUl.append(rightItemsDataLi);

        // header > nav > div (right-items) > ul > li (DATA) > button
        var rightItemsDataButton = document.createElement("button");
        rightItemsDataButton.classList.add("header__main-nav__ul__right-items__li__drop-down-button");
        rightItemsDataButton.append(document.createTextNode("DATA"));

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

        rightItemsUl.append(rightItemsFaqLi);

        // header > nav > div (right-items) > ul > li (FAQ) > a
        var rightItemsFaqA = document.createElement("a");
        rightItemsFaqA.classList.add("header__main-nav__ul__right-items__li__link");
        rightItemsFaqA.addEventListener("click", faqButtonPressedHandler)
        rightItemsFaqA.append(document.createTextNode("FAQ"));

        rightItemsFaqLi.append(rightItemsFaqA);

        // header > nav > div (right-items) > ul > li (CONTACT)
        var rightItemsContactLi = document.createElement("li");
        rightItemsContactLi.classList.add("header__main-nav__ul__right-items__li");

        rightItemsUl.append(rightItemsContactLi);

        // header > nav > div (right-items) > ul > li (CONTACT) > a
        var rightItemsContactA = document.createElement("a");
        rightItemsContactA.classList.add("header__main-nav__ul__right-items__li__link");
        rightItemsContactA.addEventListener("click", contactButtonPressedHandler);
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

export {
    renderHeader,
    renderFooter,
    deleteAllExceptHeaderAndFooter
};