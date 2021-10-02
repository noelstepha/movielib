<template>
  <v-container class="movie-details">
    <v-row v-if="movie" class="justify-center">
      <v-col cols="12" sm="6" md="6" lg="4">
        <v-card class="movie-preview">
          <v-img
            :src="posterSrc"
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            aspect-ratio="0.75"
          >
          </v-img>
        </v-card>
      </v-col>
      <v-col cols="12" md="6" class="movie-info pa-5">
        <h2 class="mb-3">{{ movie.original_title }}</h2><br>
        <div class="d-block mb-3">
          <div class="information d-flex">Overview&nbsp;:&nbsp;</div><div>{{ movie.overview }}</div>
        </div>
        <div class="d-flex align-center">
          <div class="information d-flex">Genre&nbsp;:&nbsp;</div><div>{{ movie.genres.map(g => g.name).join(", ") }}</div>
        </div>
        <div class="d-flex align-center">
          <div class="information d-flex">Release date&nbsp;:&nbsp;</div><div>{{ movie.release_date }}</div>
        </div>
        <div class="d-flex align-center">
          <div class="information d-flex">Worlwide rating&nbsp;:&nbsp;</div><div>{{ movie.vote_average }}/10</div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      movie: null
    }
  },

  computed: {
    posterSrc() {
      return this.movie.poster_path ? 'https://image.tmdb.org/t/p/original/' + this.movie.poster_path : '/movielib-logo.png'
    }
  },

  async created() {
    this.movie = await this.$strapi.findOne('movies', this.$route.params.id)
  }
}
</script>

<style scoped>
.movie-info .information {
  font-weight: bold;
  color: #e91e63;
}
</style>
