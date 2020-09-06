<template>
  <div class="hello">
    <div class="hello__filters">
      <div @click="chngeFilterType('movie')"
        :class="filterType === 'movie' ? 'hello__filter-type--active' : 'hello__filter-type'"
      >Movies</div>
      <div @click="chngeFilterType('series')"
        :class="filterType === 'series' ? 'hello__filter-type--active' : 'hello__filter-type'"
      >Series</div>
      <div @click="chngeFilterType('')"
        :class="filterType === '' ? 'hello__filter-type--active' : 'hello__filter-type'"
      >All</div>
    </div>
    <MovieListItem
      v-for="movie in filteredList"
      :key="movie.imdbID"
      :movie="movie"
    />
    <button class="hello__more"
      v-if="!hasMoreMovies && filterType === ''"
      @click="loadMovies(page)">
      Load more
    </button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';
import MovieService from '@/services/MovieService';
import MovieListItem from './MovieListItem.vue';
import { Movie } from '../services/types';

export default Vue.extend({
  name: 'MovieList',
  data() {
    return {
      movies: [] as Movie[],
      totalResults: null,
      page: 1,
      filterType: '',
    };
  },
  async created() {
    await this.loadMovies(1);
  },
  methods: {
    async loadMovies(page: number) {
      const result = await MovieService.movieService.getMovieList(this.getApiToken, page);
      this.totalResults = result.numberOfResult;
      this.movies = [...this.movies, ...result.result];
      this.page += 1;
    },
    chngeFilterType(type: string) {
      this.filterType = type;
    },
  },
  computed: {
    hasMoreMovies(): boolean {
      return this.movies.length === this.totalResults;
    },
    filteredList(): Movie[] {
      if (this.filterType !== '') {
        return this.movies.filter((movie) => movie.Type === this.filterType);
      }
      return this.movies;
    },
    ...mapGetters(['getApiToken']),

  },
  components: {
    MovieListItem,
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.hello {
  &__filters {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }

  &__filter-type {
      width: 120px;
      height: 120px;
      width: 120px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: black;
      background-color: white;
      border: 2px solid black;
      border-radius: 5px;
      margin: 0 30px;
      cursor: pointer;

      &--active {
        width: 124px;
        height: 120px;
        width: 120px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        background-color: black;
        border-radius: 5px;
        margin: 0 30px;
        cursor: pointer;
      }
  }

  &__more {
    width: 120px;
    padding: 8px;
    color: white;
    background-color: black;
    border: none;
    border-radius: 5px;
    margin: 10px 0;
    cursor: pointer;
  }
}
</style>
