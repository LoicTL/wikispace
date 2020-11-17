import {
    createWebHistory,
    createRouter
} from 'vue-router'

import List from './pages/List.vue'
import Astronaut from './pages/Astronaut.vue'
import Spacecraft from './pages/Spacecraft.vue'
import Event from './pages/Event.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: List },
        { path: '/astronaut/:id', component: Astronaut },
        { path: '/spacecraft/:id', component: Spacecraft },
        { path: '/event/:id', component: Event },
    ]
})

export default router