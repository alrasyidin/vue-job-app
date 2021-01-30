import Vue from 'vue'
import VueRouter from 'vue-router'
import JobPages from './pages/JobPages.vue'
import JobDetailPages from './pages/JobDetailPages.vue'

Vue.use(VueRouter)

const router = new VueRouter({
	mode: 'history',
	routes: [
		{
			path: '/',
			name: 'Home',
			component: JobPages
		},
		{
			path: '/detail/:id',
			name: 'Detail',
			component: JobDetailPages,
			props: true
		}
	]
})

export default router