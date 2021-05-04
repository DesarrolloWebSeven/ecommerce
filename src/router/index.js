import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Team from '../views/Team.vue'
import Project from '../views/Project.vue'
import Contact from '../views/Contact.vue'
import PrivacyPolicy from '../views/PrivacyPolicy.vue'
import Cookies from '../views/Cookies.vue'
import Login from '../views/Login.vue'
import Profile from '../views/Profile.vue'
import Confirmation from '../views/Confirmation.vue'
import NotFound from '../views/NotFound.vue'
import PasswordForm from '../views/PasswordForm.vue'
import Category from '../views/Category.vue'
import ProductCard from '../views/ProductCard.vue'
import Cart from '../views/Cart.vue'
import Shipping from '../views/Shipping.vue'
import Payment from '../views/Payment.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/equipo',
    name: 'Team',
    component: Team
  },
  {
    path: '/proyecto',
    name: 'Project',
    component: Project
  },
  {
    path: '/contacto',
    name: 'Contact',
    component: Contact
  },
  {
    path: '/politicaprivacidad',
    name: 'PrivacyPolicy',
    component: PrivacyPolicy
  },
  {
    path: '/cookies',
    name: 'Cookies',
    component: Cookies
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/perfil',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/password/:id',
    name: 'PasswordForm',
    component: PasswordForm,
    props: true
  },
  {
    path: '/usuario/registro/:id',
    name: 'Confirmation',
    component: Confirmation,
    props: true
  },
  {
    path: '/productos/:category',
    name: 'Category',
    component: Category,
  },
  {
    path: '/producto/id/:id',
    name: 'ProductCard',
    component: ProductCard
  },
  {
    path: '/carrito',
    name: 'Cart',
    component: Cart,
  },
  {
    path: '/carrito/envio',
    name: 'Shipping',
    component: Shipping,   
  }, 
  {
    path: '/carrito/pago',
    name: 'Payment',
    component: Payment,    
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  },
})

router.beforeEach((to, from, next) => {
  if ((to.name === 'Home'|| to.name == 'PasswordForm' || to.name == 'Confirmation' || to.name == 'Login' || to.name == 'Cookies') || localStorage.getItem('geeky')) {
    if (localStorage.getItem('geeky')) cookie.classList.add('hide')
    next()
  }
  else {
    alert("Para navegar debes aceptar la política de Cookies")
    next(false)
  }
}) 

export default router
                              
