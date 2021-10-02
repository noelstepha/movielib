<template>
  <div>
    <v-row v-if="loading" ustify="center" align="center" class="pa-5">
      <v-progress-circular
      indeterminate
      color="primary"
      ></v-progress-circular>
    </v-row>
    <v-row>
      <v-col v-for="result in results" :key="result.id" cols="6" sm="3" md="2" lg="1">
        <MoviePreview :movie="result"></MoviePreview>
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
  </div>
</template>

<script>
  export default {
    props: {
      id: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        results: [],
        loading: false,
        page: 1,
        nbPages: 1
      }
    },
    created() {
      this.search()
    },
    methods: {
      async search(pageIdx) {
          this.loading = true;
          let query = 'movies/' + this.id + '/recommendations';
          if (pageIdx) {
            query += "?&page=" + pageIdx
          }
          const response = await this.$strapi.$http.get(query);
          const text = await response.text();
          const { results, page, total_pages } = JSON.parse(text);
          this.results = results;
          this.page = page;
          this.nbPages = total_pages;
          this.loading = false;
      },
      async getPage(idx) {
        await this.search(idx)
      }
    }
  }
</script>

<style scoped>

</style>
