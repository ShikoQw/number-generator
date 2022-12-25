import Vue from "vue"
import Vuetify from "vuetify"
import "vuetify/dist/vuetify.min.css"

Vue.use(Vuetify)

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#78909C',
                secondary:'#90A4AE',
                accent: '#546E7A',
                loader: '#546E7A',
                tooltip: '#f1f1f1',
                gray: "#636363",
                blue: "#1976D2",
            }
        },
    },
});
