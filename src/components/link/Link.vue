<template>
  <router-link :to="route" :class="['link', ...classNames]">
    <slot name="default"> Ссылка </slot>
  </router-link>
</template>

<script>
export default {
  name: 'AppLink',
  props: {
    route: {
      type: Object,
      default: () => ({
        name: 'page-welcome',
      }),
    },
    classNames: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/sass/components/link/link.scss';
</style>
