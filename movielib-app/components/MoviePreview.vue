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

      <v-btn v-if="liked" icon color="red">
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn  v-else icon @click="add">
        <v-icon>mdi-plus</v-icon>
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

    data() {
      return {
        liked : false
      }
    },

    computed: {
      posterSrc() {
        return this.movie.poster_path ? 'https://image.tmdb.org/t/p/original/' + this.movie.poster_path : null
      }
    },

    created() {
      this.liked = this.movie.liked
    },

    methods: {
      async add() {
        const data = {
          moviedb_id : String(this.movie.id),
          title: this.movie.original_title,
          poster_path: this.movie.poster_path
        };

        if (this.movie.release_date && this.movie.release_date !== "") {
          data.release_date = this.movie.release_date
        }
        await this.$strapi.create('movies', data);
        this.liked = true
      },

      see() {
        this.$router.push({ path: 'movie/' + this.movie.id })
      }
    }
  }
</script>

<style scoped>
.movie-preview {
  cursor: pointer;
}
</style>
