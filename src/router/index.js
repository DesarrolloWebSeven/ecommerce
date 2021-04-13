import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Team from '../views/Team.vue'
import Proyect from '../views/Proyect.vue'
import HelpContact from '../views/HelpContact.vue'
import Contact from '../views/Contact.vue'
import PrivacyPolicy from '../views/PrivacyPolicy.vue'
import Cookies from '../views/Cookies.vue'
import Login from '../views/Login.vue'
import Confirmation from '../views/Confirmation.vue'
import NotFound from '../views/NotFound.vue'
import PasswordForm from '../views/PasswordForm.vue'

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
    name: 'Proyect',
    component: Proyect
  },
  {
    path: '/ayuda',
    name: 'HelpContact',
    component: HelpContact
  },
  {
    path: '/contacto',
    name: 'Contact',
    component: Contact
  },
  {
    path: '/politicaPrivacidad',
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
    path: '/usuario/registro/:id',
    name: 'Confirmation',
    component: Confirmation,
    props: true,
  },
  {
    path: '/password/:id',
    name: 'PasswordForm',
    component: PasswordForm,
    props: true,
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
