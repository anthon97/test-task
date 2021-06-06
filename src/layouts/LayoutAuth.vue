<template>
  <div class="app__layout app__layout--auth">
    <slot name="default"> auth </slot>
  </div>
</template>

<script>
export default {
  name: 'LayoutAuth',
}
</script>
