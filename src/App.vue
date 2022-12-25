<template>
  <div id="app">
    <AppLoader v-if="isInit"/>
    <component :is="layout" v-else>
      <router-view />
    </component>
  </div>
</template>

<script>
import ErrorLayout from "@/layouts/ErrorLayout";
import EmptyLayout from "@/layouts/EmptyLayoutt"
import MainLayout from "@/layouts/MainLayout"
import AppLoader from "@/layouts/AppLoader"

export default {
  name: 'App',
  components: {
    AppLoader, MainLayout, ErrorLayout, EmptyLayout
  },
  data(){
    return {
      isInit: true,
    }
  },

  computed: {
    layout() {
      return (this.$route.meta.layout || "empty") + "-layout"
    },
  },

  watch:{
    layout () {
      this.init();
    }
  },

  methods:{
    init() {
      // if(!this.$store.getters.isInited) {
      //   this.isInit = this.$route.meta.layout !== 'error';
      // }
      this.isInit = false;
    }
  }
}
</script>

<style lang="scss">
@import "assets";
</style>
