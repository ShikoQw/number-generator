import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from "./routes";

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: routes
})

// router.beforeEach((to, from, next) => {
//     ctx.dispatch('user/checkUser').then(() => {
//        if(to.meta.requiredAuth && !ctx.getters["user/getUser"]) next({ name: 'Login' })
//        else next();
//     })
// });

router.afterEach(to => {
    Vue.nextTick(() => {
        document.title = to.meta.label !== undefined ? to.meta.label + " - " + DEFAULT_TITLE : DEFAULT_TITLE;
    });
});

const DEFAULT_TITLE = "lera app";

export default router
