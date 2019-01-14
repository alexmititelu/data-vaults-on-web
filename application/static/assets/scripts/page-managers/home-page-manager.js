import homePageRenderer from "../renderers/home-page-renderer.js"

class HomePageManager {
    constructor() {
        if (!HomePageManager.instance) {
            this.renderer = homePageRenderer;
            HomePageManager.instance = this;
        }

        return HomePageManager.instance;
    }
}

const homePageManager = new HomePageManager();
Object.freeze(homePageManager);

export default homePageManager;