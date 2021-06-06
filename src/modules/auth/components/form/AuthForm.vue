<template>
  <ElForm :ref="refName" :model="form" :rules="rules" class="auth-form">
    <slot name="default"></slot>
  </ElForm>
</template>

<script>
const ElForm = () => import('element-ui/lib/form')

export default {
  name: 'AuthForm',
  components: {
    ElForm,
  },
  props: {
    refName: {
      type: String,
      required: true,
      default: 'authForm',
    },
    form: {
      type: Object,
      required: true,
      default: () => {},
    },
    rules: {
      type: Object,
      default: () => {},
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/sass/components/form/auth/auth-form.scss';
</style>
