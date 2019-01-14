import {
    renderHeader,
    renderFooter,
    deleteAllExceptHeaderAndFooter
} from "../common/common-lib.js"

import textContent from "../common/text-content.js"

class DataPageRenderer {
    constructor() {
        if (!DataPageRenderer.instance) {
            this.pageNumber = 1;
            DataPageRenderer.instance = this;
        }

        return DataPageRenderer.instance;
    }

    render(keyName) {
        this.pageNumber = 1;

        deleteAllExceptHeaderAndFooter();
        renderHeader();
        this._renderActualBody(keyName);
        renderFooter();
    }

    _renderPageControls(positioning) {
        var formsGrid = document.getElementsByClassName("forms-grid")[0];

        // div (forms grid) > div (page controls)
        var pageControlsDiv = document.createElement("div");
        pageControlsDiv.classList.add("forms-grid__page-controls", "forms-grid__page-controls--" + positioning);

        formsGrid.append(pageControlsDiv);

        // div (forms grid) > div (page controls) > a (left arrow)
        var leftArrowA = document.createElement("a");
        leftArrowA.classList.add("forms-grid__page-controls__arrow", "forms-grid__page-controls__arrow--left");
        leftArrowA.href = "#";

        pageControlsDiv.append(leftArrowA);

        // div (forms grid) > div (page controls) > a (left arrow) > icon
        var leftArrowIcon = document.createElement("i");
        leftArrowIcon.classList.add("fas", "fa-caret-left", "fa-2x");

        leftArrowA.append(leftArrowIcon);

        // div (forms grid) > div (page controls) > p
        var pageControlsText = document.createElement("p");
        pageControlsText.classList.add("forms-grid__page-controls__text");
        pageControlsText.append(document.createTextNode("PAGE " + this.pageNumber));

        pageControlsDiv.append(pageControlsText);

        // div (forms grid) > div (page controls) > a (right arrow)
        var rightArrowA = document.createElement("a");
        rightArrowA.classList.add("forms-grid__page-controls__arrow", "forms-grid__page-controls__arrow--right");
        rightArrowA.href = "#";

        pageControlsDiv.append(rightArrowA);

        // div (forms grid) > div (page controls) > a (right arrow) > icon
        var rightArrowIcon = document.createElement("i");
        rightArrowIcon.classList.add("fas", "fa-caret-right", "fa-2x");

        rightArrowA.append(rightArrowIcon);
    }

    _renderForms() {

    }

    _renderActualBody(keyName) {
        var actualBodyBlock = document.getElementById("actual-body-block");

        // div (intro)
        var introDiv = document.createElement("div");
        introDiv.classList.add("intro");

        actualBodyBlock.append(introDiv);

        // div (intro) > intro title
        var introTitle = document.createElement("h1");
        introTitle.classList.add("intro__title");
        introTitle.append(document.createTextNode(textContent.homePageTitle));

        introDiv.append(introTitle);

        // div (intro) > intro title > icon
        var introTitleIcon = document.createElement("i");
        introTitleIcon.classList.add("fas", "fa-shield-alt");

        introTitle.append(introTitleIcon);

        // div (intro) > subtitle > icon
        var introSubtitle = document.createElement("h2");
        introSubtitle.classList.add("intro__sub-title");
        introSubtitle.append(document.createTextNode("Visualizing data for " + keyName + " "));

        introDiv.append(introSubtitle);

        // div (intro) > subtitle > icon
        var introSubtitleIcon = document.createElement("i");
        introSubtitleIcon.classList.add("fa", "fa-key");

        introSubtitle.append(introSubtitleIcon);

        // div (filters)
        var filtersDiv = document.createElement("div");
        filtersDiv.classList.add("filters");

        actualBodyBlock.append(filtersDiv);

        // div (filters) > title
        var filtersTitle = document.createElement("h3");
        filtersTitle.classList.add("filters__title");
        filtersTitle.append(document.createTextNode("Filters "));

        filtersDiv.append(filtersTitle);

        // div (filters) > title > icon
        var filtersTitleIcon = document.createElement("i");
        filtersTitleIcon.classList.add("fas", "fa-filter");

        filtersTitle.append(filtersTitleIcon);

        // div (filters) > filters add button
        var filtersAddButton = document.createElement("button");
        filtersAddButton.classList.add("filters__button", "filters__button--add-filter");

        filtersDiv.append(filtersAddButton);

        // div (filters) > filters add button > icon
        var filtersAddButtonIcon = document.createElement("i");
        filtersAddButtonIcon.classList.add("fas", "fa-plus-circle");

        filtersAddButton.append(filtersAddButtonIcon);

        // div (filters) > select
        var filtersSelect = document.createElement("select");
        filtersSelect.classList.add("filters_button--sort-by-options");

        filtersDiv.append(filtersSelect);

        // div (filters) > select > option 1
        var filtersSelectMostRecentOption = document.createElement("option");
        filtersSelectMostRecentOption.value = "1";
        filtersSelectMostRecentOption.append(document.createTextNode("Most recent"));

        filtersSelect.append(filtersSelectMostRecentOption);

        // div (filters) > select > option 2
        var filtersSelectLeastRecentOption = document.createElement("option");
        filtersSelectLeastRecentOption.value = "2";
        filtersSelectLeastRecentOption.append(document.createTextNode("Least recent"));

        filtersSelect.append(filtersSelectLeastRecentOption);

        // div (filters) > div (current filters)
        var currentFiltersDiv = document.createElement("div");
        currentFiltersDiv.classList.add("filters__current-filters");

        filtersDiv.append(currentFiltersDiv);

        // div (filters) > div (current filters) > p
        var currentFiltersDivNoFiltersP = document.createElement("p");
        currentFiltersDivNoFiltersP.classList.add("filters__current-filters__text");
        currentFiltersDivNoFiltersP.append(document.createTextNode(textContent.noCurrentFilters));

        currentFiltersDiv.append(currentFiltersDivNoFiltersP);

        // div (filters) > div (forms grid)
        var formsGrid = document.createElement("div");
        formsGrid.classList.add("forms-grid");

        filtersDiv.append(formsGrid);

        // div (filters) > div (forms grid) > page controls top
        this._renderPageControls("top");

        // div (filters) > div (forms grid) > forms
        this._renderForms();

        // div (filters) > div (forms grid) > page controls bot
        this._renderPageControls("bottom");
    }
}

const dataPageRenderer = new DataPageRenderer();

export default dataPageRenderer;