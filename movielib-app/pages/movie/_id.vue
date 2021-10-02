<template>
<div>{{ movie }}</div>
</template>

<script>
export default {
  data() {
    return {
      movie: null
    }
  },
  async created() {
    this.movie = await this.$strapi.get('movies', this.$route.params.id)
  }
}
</script>

<style scoped>

</style>
