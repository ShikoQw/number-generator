import Vue from "vue"
import Vuex from "vuex"

// import localize from "@/store/modules/localize"
import snackbar from "@/store/modules/snackbar";
import app from "@/store/modules/app";

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        // localize,
        snackbar,
        app
    },
    actions: {
        async init(ctx){
            if (ctx.getters.isInited) return
            console.log("ctx: loaded")
            ctx.commit("setInited")
        },

        setError(ctx, boolean) {
            ctx.commit("mutateError", boolean)
        },
    },
    mutations: {
        setInited(state) {
            setTimeout(() => {
                state.inited = true
                console.log("ctx: initialized")
            }, 2000)
        },

        mutateError(state, boolean) {
            state.$error = boolean
        },
    },
    getters: {
        isInited: (state) => state.inited,
        getError: (state) => state.$error,
    },
    state: {
        inited: false,
        $error: false,
    }
})
