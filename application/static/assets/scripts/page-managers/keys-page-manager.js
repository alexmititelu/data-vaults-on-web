import keysPageRenderer from "../renderers/keys-page-renderer.js"
import storageManager from "../storage/storage-manager.js"

class KeysPageManager {
    constructor() {
        if (!KeysPageManager.instance) {
            this.renderer = keysPageRenderer;
            this.storageManager = storageManager;
            KeysPageManager.instance = this;
        }

        return KeysPageManager.instance;
    }
}

const keysPageManager = new KeysPageManager();
Object.freeze(keysPageManager);

export default keysPageManager;