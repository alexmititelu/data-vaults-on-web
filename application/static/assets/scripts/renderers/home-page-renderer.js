import {
    renderHeader,
    renderFooter,
    deleteAllExceptHeaderAndFooter
} from "../common/common-lib.js"

import textContent from "../common/text-content.js"

class HomePageRenderer {
    constructor() {
        if (!HomePageRenderer.instance) {
            // this._keysPageRenderer = keysPageRenderer;
            // this._authenticationManager = authenticationManager;

            HomePageRenderer.instance = this;
        }

        return HomePageRenderer.instance;
    }

    render() {
        deleteAllExceptHeaderAndFooter();
        renderHeader();
        this._renderActualBody();
        renderFooter();
    }

    _renderActualBody() {
        var actualBodyBlock = document.getElementById("actual-body-block");

        // div (service description grid)
        var serviceDescriptionGridDiv = document.createElement("div");
        serviceDescriptionGridDiv.classList.add("service-description-grid");

        actualBodyBlock.append(serviceDescriptionGridDiv);

        // div (service description grid) > img
        var serviceDescriptionGridImg = document.createElement("img");
        serviceDescriptionGridImg.classList.add("service-description-grid__logo");
        serviceDescriptionGridImg.src = "assets/img/logo.svg";
        serviceDescriptionGridImg.alt = "dave-logo";

        serviceDescriptionGridDiv.append(serviceDescriptionGridImg);

        // div (service description grid) > h1
        var serviceDescriptionGridH1 = document.createElement("h1");
        serviceDescriptionGridH1.classList.add("service-description-grid__title");
        serviceDescriptionGridH1.append(document.createTextNode(textContent.homePageTitle));

        serviceDescriptionGridDiv.append(serviceDescriptionGridH1);

        // div (service description grid) > h1 > i
        var serviceDescriptionGridIcon = document.createElement("i");
        serviceDescriptionGridIcon.classList.add("fas", "fa-shield-alt");

        serviceDescriptionGridH1.append(serviceDescriptionGridIcon);

        // div (service description grid) > p
        var serviceDescriptionGridP = document.createElement("p");
        serviceDescriptionGridP.classList.add("service-description-grid__description");

        serviceDescriptionGridP.append(document.createTextNode(textContent.serviceDescriptionOne));
        serviceDescriptionGridP.append(document.createElement("br"));
        serviceDescriptionGridP.append(document.createElement("br"));
        serviceDescriptionGridP.append(document.createTextNode(textContent.serviceDescriptionTwo));

        serviceDescriptionGridDiv.append(serviceDescriptionGridP);

        // div (main buttons grid)
        var mainButtonsGridDiv = document.createElement("div");
        mainButtonsGridDiv.classList.add("main-buttons-grid");

        actualBodyBlock.append(mainButtonsGridDiv);

        // div (main buttons grid) > button
        var mainButtonsGridConfuguration = [{
            particularClass: "main-buttons-grid__button--keys",
            text: "GO TO MY KEYS ",
            icon: "fa-key"
        }];

        for (var i = 0; i < mainButtonsGridConfuguration.length; ++i) {
            var mainButtonsGridButton = document.createElement("button");
            mainButtonsGridButton.classList.add("main-buttons-grid__button", mainButtonsGridConfuguration[i].particularClass);
            mainButtonsGridButton.append(document.createTextNode(mainButtonsGridConfuguration[i].text));

            mainButtonsGridDiv.append(mainButtonsGridButton);

            var mainButtonsGridIcon = document.createElement("i");
            mainButtonsGridIcon.classList.add("fas", mainButtonsGridConfuguration[i].icon);

            mainButtonsGridButton.append(mainButtonsGridIcon);
        }

        // section (faq grid)
        var faqGridSection = document.createElement("section");
        faqGridSection.classList.add("faq-grid");

        actualBodyBlock.append(faqGridSection);

        // section (faq grid) > h2
        var faqGridH2 = document.createElement("h2");
        faqGridH2.classList.add("faq-grid__title");
        faqGridH2.append(document.createTextNode("F.A.Q"));

        faqGridSection.append(faqGridH2);

        // section (faq grid) > ul
        var faqGridUl = document.createElement("ul");
        faqGridUl.classList.add("faq-grid__ul");

        faqGridSection.append(faqGridUl);

        // section (faq grid) > ul > li (question and answer)
        for (var i = 0; i < textContent.faq.length; ++i) {
            var faqGridLi = document.createElement("li");
            faqGridLi.classList.add("faq-grid__ul__li");

            faqGridUl.append(faqGridLi);

            var faqGridQuestionP = document.createElement("p");
            faqGridQuestionP.classList.add("faq-grid__ul__li__question");
            faqGridQuestionP.append(document.createTextNode(textContent.faq[i].question));

            faqGridLi.append(faqGridQuestionP);

            var faqGridAnswerP = document.createElement("p");
            faqGridAnswerP.classList.add("faq-grid__ul__li__answer");
            faqGridAnswerP.append(document.createTextNode(textContent.faq[i].answer));

            faqGridLi.append(faqGridAnswerP);
        }

        // section (faq grid) > img
        var faqGridImg = document.createElement("img");
        faqGridImg.classList.add("faq-grid__logo");
        faqGridImg.src = "assets/img/faq-pic.png";
        faqGridImg.alt = "faq-pic";

        faqGridSection.append(faqGridImg);

        // section (contact)
        var contactSection = document.createElement("section");
        contactSection.classList.add("contact");

        actualBodyBlock.append(contactSection);

        // section (contact) > h2
        var contactH2 = document.createElement("h2");
        contactH2.classList.add("contact__title");

        contactSection.append(contactH2);

        for (var i = 0; i < textContent.contact.length; ++i) {
            // section (contact) > article
            var contactArticle = document.createElement("article");
            contactArticle.classList.add("contact__article");

            contactSection.append(contactArticle);

            // section (contact) > article > h2
            var contactArticleTitle = document.createElement("h2");
            contactArticleTitle.classList.add("contact__article__title");
            contactArticleTitle.append(document.createTextNode(textContent.contact[i].name));

            contactArticle.append(contactArticleTitle);

            // section (contact) > article > div (social media)
            var contactArticleSocialMediaDiv = document.createElement("div");
            contactArticleSocialMediaDiv.classList.add("contact__article__social-media");

            contactArticle.append(contactArticleSocialMediaDiv);

            for (var j = 0; j < textContent.contact[i].socialMedia.length; ++j) {
                // section (contact) > article > div (social media) > a
                var contactArticleSocialMediaLink = document.createElement("a");
                contactArticleSocialMediaLink.classList.add("contact__article__social-media__link");
                contactArticleSocialMediaLink.href = textContent.contact[i].socialMedia[j].link;
                contactArticleSocialMediaLink.target = "_blank";

                contactArticleSocialMediaDiv.append(contactArticleSocialMediaLink);

                // section (contact) > article > div (social media) > a > img
                var contactArticleSocialMediaImg = document.createElement("img");
                contactArticleSocialMediaImg.classList.add("contact__article__social-media__link__img");
                contactArticleSocialMediaImg.src = textContent.contact[i].socialMedia[j].src;
                contactArticleSocialMediaImg.alt = textContent.contact[i].socialMedia[j].alt;

                contactArticleSocialMediaLink.append(contactArticleSocialMediaImg);
            }

            var contactArticleDescriptionP = document.createElement("p");
            contactArticleDescriptionP.classList.add("contact__article__description", textContent.contact[i].photoClass, textContent.contact[i].positioningClass);
            contactArticleDescriptionP.append(document.createTextNode(textContent.contact[i].description));

            contactArticle.append(contactArticleDescriptionP);
        }
    }
}

const homePageRenderer = new HomePageRenderer();
Object.freeze(homePageRenderer);

export default homePageRenderer;