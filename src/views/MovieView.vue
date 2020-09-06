<template>
  <div class="movie-view">
    <h1>{{movieDetails.Title}}</h1>
    <img :src="movieDetails.Poster" alt="">
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';
import MovieService from '@/services/MovieService';

export default Vue.extend({
  name: 'MovieView',
  data() {
    return {
      movieDetails: {},
    };
  },
  async created() {
    await this.loadMovieDetails();
  },
  methods: {
    async loadMovieDetails() {
      const result = await MovieService.movieService.getSpecificMovie(
        this.getApiToken,
        this.$route.params.movieId,
      );
      this.movieDetails = result;
    },
  },
  computed: {
    ...mapGetters(['getApiToken']),
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
