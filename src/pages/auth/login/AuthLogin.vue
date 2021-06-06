<template>
  <AuthForm :form="form" :rules="rules" ref-name="authFormLogin">
    <ElFormItem>
      <h1>Авторизация</h1>
    </ElFormItem>
    <ElFormItem v-if="errorMessage">
      <ElAlert
        :title="errorMessage"
        :closable="false"
        type="error"
        show-icon
      ></ElAlert>
    </ElFormItem>
    <ElFormItem prop="email" label="Введите email">
      <ElInput v-model="form.email" placeholder="tester@tester.ru"></ElInput>
    </ElFormItem>
    <ElFormItem prop="password" label="Введите пароль">
      <ElInput
        v-model="form.password"
        type="password"
        placeholder="111111"
      ></ElInput>
    </ElFormItem>
    <ElFormItem>
      <ElButton
        type="primary"
        :disabled="disabledSubmitControl"
        :loading="isLoading"
        @click.prevent="doLogin"
      >
        Войти в кабинет
      </ElButton>
    </ElFormItem>
    <ElFormItem>
      Еще не регистрировались?
      <AppLink
        :route="{ name: 'auth-signup' }"
        :class-names="['link--primary']"
      >
        Регистрация
      </AppLink>
    </ElFormItem>
  </AuthForm>
</template>

<script>
import { mapActions } from 'vuex'
import { SET_AUTH } from '@/modules/auth/store/mutation-types'

import { email, password } from '@/utils/validation'

import { login } from '@/modules/auth/api/services'

const ElFormItem = () => import('element-ui/lib/form-item')
const ElInput = () => import('element-ui/lib/input')
const ElButton = () => import('element-ui/lib/button')
const ElAlert = () => import('element-ui/lib/alert')

const AuthForm = () => import('@/modules/auth/components/form/AuthForm.vue')
const AppLink = () => import('@/components/link/Link.vue')

export default {
  name: 'AuthLogin',
  components: {
    ElFormItem,
    ElInput,
    ElButton,
    ElAlert,

    AuthForm,
    AppLink,
  },
  data() {
    return {
      isLoading: false,

      errorMessage: null,

      form: {
        email: 'tester@tester.ru',
        password: '111111',
      },

      rules: {
        email,
        password,
      },
    }
  },
  computed: {
    disabledSubmitControl() {
      return !this.form.email || !this.form.password
    },
  },
  methods: {
    ...mapActions('auth', [SET_AUTH]),
    doLogin() {
      const payload = { ...this.form }
      const $form = this.$children[0]

      $form.$refs[$form.refName].validate((valid) => {
        if (valid) {
          this.isLoading = true

          login(payload)
            .then(({ token, user }) => {
              this[SET_AUTH]({ token, user })

              this.$router.push({
                name: 'page-welcome',
              })

              this.errorMessage = null
            })
            .catch((error) => {
              this.errorMessage = error
            })
            .finally(() => {
              this.isLoading = false
            })
        }
      })
    },
  },
}
</script>
