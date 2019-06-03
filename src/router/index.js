import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

import Home from '../components/home.vue';
import About from '../components/about.vue';
import Contact from '../components/contact.vue';

export default new Router({
  routes: [
    {
      path: '',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/contact',
      name: 'contact',
      component: Contact
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    }
  ]
})

// const router = new VueRouter({
//   mode: 'history',
//   base: __dirname,
//   routes: [
//     { path: '/', component: HelloWorld },
//     { path: '/about', component: About },
//     { path: '/contact', component: Contact } 
//   ]
// });

// new Vue({
//   el: '#app',
//   router,
//   render: h => h(App)
// })  