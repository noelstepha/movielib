<template>
  <v-container>
    <v-row class="flex-column pt-10 pa-5" justify="center" align="center">
      <h2>Discover movies</h2>
      <p>Explore our database to discover new movies</p>
    </v-row>
    <v-row class="pb-5">
      <v-col>
        <div>
          <v-text-field
            v-model="searched"
            :append-icon="''"
            append-outer-icon="mdi-send"
            prepend-icon="mdi-magnify"
            filled
            clear-icon="mdi-close-circle"
            clearable
            label="Search"
            placeholder="Enter keywords here..."
            type="text"
            @click:append-outer="search"
            @click:clear="clear"
            @keyup.enter="search()"
            autofocus
          ></v-text-field>
        </div>
      </v-col>
    </v-row>
    <v-row v-if="!loading" class="pa-5 d-flex flex-wrap" >
      <v-col  v-for="result in results" :key="result.id" cols="12" sm="6" md="4" lg="2">
        <MoviePreview class="ma-2" :movie="result" @add="add(result)"></MoviePreview>
      </v-col>
      <v-col cols="12">
        <v-pagination
          v-if="results.length > 0"
          v-model="page"
          :length="nbPages"
          circle
          @next="getPage(page + 1)"
          @previous="getPage(page - 1)"
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
  export default {
    data() {
      return {
        searched: null,
        results: [],
        loading: false,
        page: 1,
        nbPages: 1
      }
    },
    methods: {
      async search(pageIdx) {
        console.log("page1", pageIdx);
        if (this.searched) {
          console.log("page", pageIdx);
          this.loading = true;
          let query = 'movies/search?search=' + this.searched;
          if (pageIdx) {
            query += "&page=" + pageIdx
          }
          const response = await this.$strapi.$http.get(query);
          const text = await response.text();
          const { results, page, total_pages } = JSON.parse(text);
          this.results = results;
          this.page = page;
          this.nbPages = total_pages;
          this.loading = false;
        }
      },
      clear() {
        this.searched = '';
      },
      async add(movie) {
        await this.$strapi.create('movies', { moviedb_id : String(movie.id) });
        movie.liked = true
      },
      async getPage(idx) {
        await this.search(idx)
      }
    }
  }
</script>
