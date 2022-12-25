export default {
    namespaced: true,
    actions: {
        setOverlay(ctx, val){
            ctx.commit('mutateOverlay', val)
        },
    },
    mutations: {
        mutateOverlay(state, val){
            state.overlay = val
        },
    },
    getters: {
        getOverlay(state){
            return state.overlay;
        },
    },
    state: {
        overlay: false
    },
}
