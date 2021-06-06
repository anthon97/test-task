import Vue from 'vue'
import App from '@/components/App.vue'
import router from '@/router'
import store from '@/store'

import lang from 'element-ui/lib/locale/lang/ru-RU'
import locale from 'element-ui/lib/locale'

locale.use(lang)

import { db_users } from '@/modules/auth/api/mock'
localStorage.setItem('db_users', JSON.stringify(db_users))

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
