<template>
  <v-container>
    <v-row class="flex-column pt-10 pa-5" justify="center" align="center">
      <h2>Your favorite movies</h2>
      <p>Find your favorite movies here</p>
    </v-row>
    <v-row>
      <v-col cols="12" md="6" lg="3">
        <v-select label="Trier par :" :items="sortList" v-model="params._sort" @change="load"></v-select>
      </v-col>
    </v-row>
    <v-row v-if="!loading" class="pa-5 d-flex flex-wrap" >
      <v-col  v-for="movie in movies" :key="movie.id" cols="12" sm="6" md="4" lg="2">
        <LikedMoviePreview :movie="movie" @remove="remove"></LikedMoviePreview>
      </v-col>
    </v-row>
    <v-row v-if="loading"  justify="center" align="center" class="pa-5 d-flex flex-wrap" >
      <v-progress-circular
      indeterminate
      color="primary"
      ></v-progress-circular>
    </v-row>
  </v-container>
</template>
<script>
  import LikedMoviePreview from "../components/LikedMoviePreview";
  export default {
    components: { LikedMoviePreview },
    data() {
      return {
        movies: [],
        loading: true,
        params: {
          _sort: 'title'
        },
        sortList: [
          { text : 'Release Date', value : 'release_date' },
          { text : 'Creation date', value : 'created_at' },
          { text : 'Title', value : 'title' }
        ]
      }
    },

    async created() {
      await this.load()
    },

    methods: {
      async load() {
        this.loading = true;
        this.movies = await this.$strapi.find('movies', { ...this.params });
        this.loading = false;
      },

      async remove(id) {
        await this.$strapi.delete('movies', id);
        await this.load()
      }
    }
  }
</script>
