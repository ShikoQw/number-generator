import store from '@/store'

export default {
    getOverlay: () => {
        return store.getters["app/getOverlay"]
    },
    setOverlay: (val) => {
        return store.dispatch("app/setOverlay", val)
    },

};
