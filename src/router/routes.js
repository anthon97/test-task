import PageWelcome from '@/pages/welcome/Welcome.vue'

const AuthLogin = () => import('@/pages/auth/login/AuthLogin.vue')
const AuthSignUp = () => import('@/pages/auth/signup/AuthSignUp.vue')

export default [
  {
    path: '/',
    name: 'page-welcome',
    component: PageWelcome,
    meta: {
      authConfirmation: true,
    },
  },

  {
    path: '/login',
    name: 'auth-login',
    component: AuthLogin,
    meta: {
      layout: 'auth',
    },
  },
  {
    path: '/signup',
    name: 'auth-signup',
    component: AuthSignUp,
    meta: {
      layout: 'auth',
    },
  },
]
