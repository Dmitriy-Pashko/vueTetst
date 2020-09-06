<template>
  <div class="hello">
    <router-link :to="`/movies/${movie.imdbID}`">{{ movie.Title }}</router-link>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue';

import { Movie } from '@/services/types';

export default Vue.extend({
  name: 'MovieListItem',
  props: {
    movie: {
      type: Object,
    } as PropOptions<Movie>,
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.hello {
  margin: 10px 0px;
  a {
    color: black;
    text-decoration: none;
    font-weight: 900;

    &:hover {
      text-decoration: underline;
      color: #42b983;
    }
  }
}
</style>
