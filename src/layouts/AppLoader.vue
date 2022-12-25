<template>
  <div class="app-loader">
    <v-progress-circular
        indeterminate
        color="#8BC34A"
        :size="50"
        :width="5"
    ></v-progress-circular>
  </div>
</template>

<script>
export default {
  name: "AppLoader"
}
</script>

<style scoped lang="scss">
  .app-loader {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
</style>
