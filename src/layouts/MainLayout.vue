<template>
  <v-app>
    <the-nav></the-nav>
    <div>
      <v-main>
        <router-view></router-view>
      </v-main>
    </div>
<!--    <v-snackbar-->
<!--        v-model="getSnackbar.show"-->
<!--        :color="getSnackbar.type"-->
<!--        :timeout="2000"-->
<!--    >-->
<!--      <v-row class="align-center justify-center">-->
<!--        <v-icon>{{ getSnackBarIcon }}</v-icon>-->
<!--        <span class="ml-2">{{ $localize(getSnackbar.message) }}</span>-->
<!--      </v-row>-->
<!--    </v-snackbar>-->
    <v-overlay :value="$appUtils.getOverlay()">
      <v-progress-circular
          indeterminate
          size="64"
      ></v-progress-circular>
    </v-overlay>
  </v-app>
</template>

<script>
import {mapGetters} from "vuex";
import theNav from "@/components/app/TheNav";
import router from "@/router";

export default {
  name: "main-layout",
  components: {theNav},
  data: () => ({
    router,
    error: false,
    original_error: "",
    error_message: "Ой, что-то пошло не так, пожалуйста попробуйте позже",
  }),

  computed: {
    ...mapGetters('snackbar', ['getSnackbar']),
    // ...mapGetters('stack', ['getOverlay']),

    getSnackBarIcon(){
      switch (this.getSnackbar.type){
        case 'success' : return 'mdi-check'
        case 'error' : return 'mdi-close-octagon-outline'
        default : return 'mdi-alert-outline'
      }
    }
  },

  watch: {
    getError(err){
      this.error = err
      this.original_error = err
    }
  },

  methods: {
    toAbout() {
      if (this.$route.name !== 'about') {
        this.$router.push('/about');
      }
    },
    closeSnackbar() {
      this.$store.dispatch("setError", false)
    }
  }
}
</script>

<style scoped lang="scss">
.drawerExist{
  margin-left: 56px;
}
</style>


