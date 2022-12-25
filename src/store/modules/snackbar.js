export default {
    namespaced: true,
    actions: {
        setSnackbar(ctx, snackbar){
            ctx.commit('mutateSnackbar', snackbar)
        },
    },
    mutations: {
        mutateSnackbar(state, snackbar){
            state.snackbar = snackbar
        },
    },
    getters: {
        getSnackbar(state){
            return state.snackbar;
        },
    },
    state: {
        snackbar: {
            show: false,
            type: undefined,
            message: undefined
        },
    },
}
