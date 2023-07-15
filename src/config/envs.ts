import { server$ } from "@builder.io/qwik-city";

export const appEnvironments = server$(function () {
    const envPrivateValue = this.env.get('DB_PRIVATE_KEY');
    // `this` is the `RequestEvent` object

    const data = {
        apiKey: this.env.get('F_API_KEY'),
        authDomain: this.env.get('F_AUTH_DOMAIN'),
        projectId: this.env.get('F_PROJECT_ID'),
        storageBucket: this.env.get('F_STORAGE_BUCKET'),
        messagingSenderId: this.env.get('F_MSG_SENDER_ID'),
        appId: this.env.get('F_APP_ID')
    }
    return { example: envPrivateValue || '', data };
});