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
        <MoviePreview class="ma-2" :movie="result"></MoviePreview>
      </v-col>
      <v-col cols="12">
        <v-pagination
          v-if="results.length > 0"
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
        if (this.searched) {
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
        this.results = [];
      },
      async getPage(idx) {
        await this.search(idx)
      }
    }
  }
</script>
