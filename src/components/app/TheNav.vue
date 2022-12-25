<template>
  <div class="nav-button">
    <v-app-bar app color="#FFF">
      <the-brand class="mr-2"/>
      <v-btn text
             @click="router.push('/').catch(() => {});"
      >
        Генерация слагаемых
      </v-btn>
      <v-btn text
             @click="router.push('/random-words').catch(() => {});"
      >
        Рандомайзер слов
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
import TheBrand from "@/components/app/TheBrand";
import router from "@/router";

export default {
  name: "theNav",
  components: {TheBrand},

  data : () => ({
    router,
  }),

  methods:{
  },

  computed: {

  }
}
</script>

<style scoped lang="scss">
.nav-button{
  .v-btn{
    margin: 2px;
  }
}
.v-list-item{
  min-height: auto;
}
</style>
