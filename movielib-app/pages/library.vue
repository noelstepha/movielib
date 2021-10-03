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
      <v-col  v-for="movie in movies" :key="movie.id" cols="6" sm="4" md="3" lg="2">
        <LikedMoviePreview :movie="movie" @remove="remove"></LikedMoviePreview>
      </v-col>
      <v-col cols="12">
        {{ page }}
        <v-pagination
          v-if="movies.length > 0"
          v-model="page"
          :length="nbPages"
          circle
          @input="getPage"
        ></v-pagination>
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
          _sort: 'rating:DESC',
          _start: 0,
          _limit: 18
        },
        sortList: [
          { text : 'Release Date', value : 'release_date' },
          { text : 'Creation date', value : 'created_at' },
          { text : 'Title', value : 'title' },
          { text : 'Your rating', value: 'rating:DESC'}
        ],
        nbPages: 1,
        page: 1
      }
    },

    async created() {
      await this.load();
      const nbMovies = await this.$strapi.count('movies');
      this.nbPages = Math.ceil(nbMovies / this.params._limit);
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
      },

      async getPage(pageIdx) {
        this.params._start = (pageIdx - 1) * 18;
        await this.load();
        this.page = pageIdx
      }
    }
  }
</script>
