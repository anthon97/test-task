<template>
  <AuthForm :form="form" :rules="rules" ref-name="authFormSignUp">
    <ElFormItem>
      <h1>Регистрация</h1>
    </ElFormItem>
    <ElFormItem v-if="errorMessage">
      <ElAlert
        :title="errorMessage"
        :closable="false"
        type="error"
        show-icon
      ></ElAlert>
    </ElFormItem>
    <ElFormItem prop="name" label="Введите имя">
      <ElInput
        v-model="form.name"
        placeholder="Иван"
        autocomplete="off"
      ></ElInput>
    </ElFormItem>
    <ElFormItem prop="email" label="Введите email">
      <ElInput
        v-model="form.email"
        placeholder="email@email.com"
        autocomplete="off"
      ></ElInput>
    </ElFormItem>
    <ElFormItem prop="password" label="Введите пароль">
      <ElInput
        v-model="form.password"
        type="password"
        autocomplete="off"
      ></ElInput>
    </ElFormItem>
    <ElFormItem prop="password_confirmation" label="Введите пароль повторно">
      <ElInput
        v-model="form.password_confirmation"
        type="password"
        autocomplete="off"
      ></ElInput>
    </ElFormItem>
    <ElFormItem>
      <ElButton
        type="primary"
        :disabled="disabledSubmitControl"
        :loading="isLoading"
        @click.prevent="doSignUp"
      >
        Регистрация
      </ElButton>
    </ElFormItem>
    <ElFormItem>
      Уже регистрировались?
      <AppLink :route="{ name: 'auth-login' }" :class-names="['link--primary']">
        Войти в кабинет
      </AppLink>
    </ElFormItem>
  </AuthForm>
</template>

<script>
import {
  name,
  email,
  password,
  password_confirmation,
} from '@/utils/validation'

import { signup } from '@/modules/auth/api/services'

const ElFormItem = () => import('element-ui/lib/form-item')
const ElInput = () => import('element-ui/lib/input')
const ElButton = () => import('element-ui/lib/button')
const ElAlert = () => import('element-ui/lib/alert')

const AuthForm = () => import('@/modules/auth/components/form/AuthForm.vue')
const AppLink = () => import('@/components/link/Link.vue')

export default {
  name: 'AuthSignUp',
  components: {
    ElFormItem,
    ElInput,
    ElButton,
    ElAlert,

    AuthForm,
    AppLink,
  },
  data() {
    const customPasswordConfirmationValidator = (rule, value, callback) => {
      if (this.form.password !== value) {
        callback(new Error('Пароли не совпадают'))
      } else {
        callback()
      }
    }

    return {
      isLoading: false,

      errorMessage: null,

      form: {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
      },
      rules: {
        name,
        email,
        password,
        password_confirmation: password_confirmation(
          customPasswordConfirmationValidator
        ),
      },
    }
  },
  computed: {
    disabledSubmitControl() {
      return (
        !this.form.name ||
        !this.form.email ||
        !this.form.password ||
        !this.form.password_confirmation
      )
    },
  },
  methods: {
    doSignUp() {
      const payload = { ...this.form }
      const $form = this.$children[0]

      $form.$refs[$form.refName].validate((valid) => {
        if (valid) {
          this.isLoading = true

          signup(payload)
            .then(({ success }) => {
              if (success) {
                this.$router.push({
                  name: 'auth-login',
                })

                this.errorMessage = null
              }
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
