import Vue from 'vue'

//js files
import setSnackbar from "@/utils/snackbar";
import appUtils from "@/utils/appUtils";

const utils = {
    install() {
        Vue.prototype.$setSnackbar = setSnackbar
        Vue.prototype.$appUtils = appUtils
    }
}

Vue.use(utils)
