<template>
  <div id="app" class="app">
    <component :is="layout">
      <router-view></router-view>
    </component>
  </div>
</template>

<script>
import LayoutDefault from '@/layouts/LayoutDefault.vue'
import LayoutAuth from '@/layouts/LayoutAuth.vue'

export default {
  name: 'App',
  components: {
    'layout-default': LayoutDefault,
    'layout-auth': LayoutAuth,
  },
  computed: {
    layout() {
      return `layout-${this.$route.meta.layout || 'default'}`
    },
  },
}
</script>

<style lang="scss">
@import '@/assets/sass/index.scss';
</style>
