export default {
    getApiUrl: () => {
        // return 'http://localhost:8080/'
        return process.env.VUE_APP_BACK_END_URL;
    },
}
