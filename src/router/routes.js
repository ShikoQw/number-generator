const routes = [
    {
        path: '*',
        name: 'error',
        meta: {
            layout: "error",
        },
        component: () => import('../views/Error')
    },
    {
        path: '/',
        redirect: '/home',
        name: 'main',
        meta: {
            layout: "main",
            label: "Главная",
        },
    },
    {
        path: '/home',
        name: 'home',
        meta: {
            layout: "main",
            label: "Главная",
        },
        component: () => import('../views/Home')
    },
    {
        path: '/random-words',
        name: 'random-words',
        meta: {
            layout: "main",
            label: "Рандомайзер слов",
        },
        component: () => import('../views/RandomWords')
    },

];

export default routes;
