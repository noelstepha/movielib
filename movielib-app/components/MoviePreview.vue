<template>
  <v-card class="movie-preview">
    <v-img
      :src="posterSrc"
      class="white--text align-end"
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
      aspect-ratio="0.75"
    >
    </v-img>

    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn v-if="movie.liked" icon color="red">
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn  v-else icon @click="add">
        <v-icon>mdi-plus</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-eye</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  export default {
    props: {
      movie: {
        type: Object,
        required: true
      }
    },

    computed: {
      posterSrc() {
        return 'https://image.tmdb.org/t/p/original/' + this.movie.poster_path
      }
    },

    methods: {
      add() {
        this.$emit('add')
      }
    }
  }
</script>

<style scoped>
.movie-preview {
  cursor: pointer;
}
</style>
