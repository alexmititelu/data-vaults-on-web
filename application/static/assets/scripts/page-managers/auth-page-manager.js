import authPageRenderer from "../renderers/auth-page-renderer.js"
import authenticationManager from "./authentication-manager.js";

class AuthPageManager {
    constructor() {
        if (!AuthPageManager.instance) {
            this.renderer = authPageRenderer;
            this.authenticationManager = authenticationManager;
            AuthPageManager.instance = this;
        }

        return AuthPageManager.instance;
    }
}

const authPageManager = new AuthPageManager();
Object.freeze(authPageManager);

export default authPageManager;