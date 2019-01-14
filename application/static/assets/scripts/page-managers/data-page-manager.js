import dataPageRenderer from "../renderers/data-page-renderer.js"

class DataPageManager {
    constructor() {
        if (!DataPageManager.instance) {
            this.renderer = dataPageRenderer;
            DataPageManager.instance = this;
        }

        return DataPageManager.instance;
    }
}

const dataPageManager = new DataPageManager();
Object.freeze(dataPageManager);

export default dataPageManager;