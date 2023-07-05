
import {createRouter, createWebHistory} from "vue-router";
import MainPage from "@/pages/MainPage";
import SingleMovie from "@/pages/SingleMovie";


const routes = [
    {
        path: '/' ,
        name:'main',
        component: MainPage
    },
    {
        path: '/:id',
        name:'single',
        component: SingleMovie
    }
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL),
    linkExactActiveClass: 'active-class'
})

export default router;