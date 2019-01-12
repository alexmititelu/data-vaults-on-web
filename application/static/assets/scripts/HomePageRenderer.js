class HomePageRenderer {
    constructor() {
        if (!HomePageRenderer.instance) {
            // this._storageManager = storageManager;
            // this._keysPageRenderer = keysPageRenderer;
            // this._authenticationManager = authenticationManager;

            HomePageRenderer.instance = this;
        }

        return HomePageRenderer.instance;
    }

    renderHome() {
        console.log("Rendering home ...");
    }
}

const homePageRenderer = new HomePageRenderer();
Object.freeze(homePageRenderer);

export default homePageRenderer;