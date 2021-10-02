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

      <v-btn  icon @click="remove">
        <v-icon>mdi-minus</v-icon>
      </v-btn>

      <v-btn icon @click="see">
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
        return this.movie.poster_path ? 'https://image.tmdb.org/t/p/original/' + this.movie.poster_path : '/movielib-logo.png'
      }
    },

    methods: {
      remove() {
        this.$emit('remove', this.movie.id);
      },
      see() {
        this.$emit('see', this.movie.id);
      }
    }
  }
</script>

<style scoped>
  .movie-preview {
    cursor: pointer;
  }
</style>

