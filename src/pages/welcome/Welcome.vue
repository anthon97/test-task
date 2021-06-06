<template>
  <div class="welcome">
    <ElAlert
      :title="`${userName}, Успешная авторизация`"
      type="success"
      :closable="false"
    ></ElAlert>
    <ElButton @click="doLogout">Выход</ElButton>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import { REMOVE_AUTH } from '@/modules/auth/store/mutation-types'
import { logout } from '@/modules/auth/api/services'

import { Notification, Loading } from 'element-ui'

const ElAlert = () => import('element-ui/lib/alert')
const ElButton = () => import('element-ui/lib/button')

export default {
  name: 'PageWelcome',
  components: {
    ElAlert,
    ElButton,
  },
  computed: {
    ...mapState('auth', ['token']),
    ...mapGetters('auth', ['userName']),
  },
  methods: {
    ...mapActions('auth', [REMOVE_AUTH]),
    doLogout() {
      const loadingOverlay = Loading.service({ fullscreen: true })
      const payload = {
        token: this.token,
      }

      logout(payload)
        .then(({ success }) => {
          if (success) {
            this.REMOVE_AUTH()

            Notification.success({
              message: 'Вы успешно вышли из кабинета',
            })

            this.$router.push({
              name: 'auth-login',
            })
          }
        })
        .catch((error) =>
          Notification.error({
            title: 'Ошибка',
            message: error,
          })
        )
        .finally(() => loadingOverlay.close())
    },
  },
}
</script>
