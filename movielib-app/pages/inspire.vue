<template>
  <v-row>
    <v-col class="text-center">
      <div>Movie :</div>
      <div>{{ movie }}</div>
    </v-col>
  </v-row>
</template>
<script>
  export default {
    data() {
      return {
        movie: null
      }
    },
    async created() {
      this.movie = await this.$strapi.findOne('movies', '6157524c0d335a254ed9d55e')
    }
  }
</script>
