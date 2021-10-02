<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <div class="logo py-4 d-flex justify-center">
          <Logo />
        </div>
      </v-col>
    </v-row>
    <v-row class="flex-column pt-10 pa-5" justify="center" align="center">
      <h2>Welcome to your movie library</h2>
      <p>This library allow you to manage your movies and rates them.</p>
    </v-row>
    <v-flex align-self-center>
      <v-row class="justify-center">
        <v-card :to="'/explore'" class="card-page">
          <v-card-text class="text-center">
            <v-icon large>mdi-magnify</v-icon><br />
            Explore the database
          </v-card-text>
        </v-card>
        <v-card :to="'/explore'" class="card-page">
          <v-card-text class="text-center">
            <v-icon large>mdi-movie-star</v-icon><br />
            See your movies
          </v-card-text>
        </v-card>
      </v-row>
    </v-flex>
  </v-container>
</template>
<style scoped>
.card-page {
  margin: 20px;
  width: 200px;
}

.card-page:hover {
  opacity: 0.7;
}
</style>

