<template>
  <div class="home">
    <img alt="Batman logo" src="../assets/logo.png" />
    <HelloWorld :msg="`Hello ${getUserName} which batman movie do you want to see?`" />
    <MovieList />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';
import MovieList from '@/components/MovieList.vue';

import { mapGetters } from 'vuex';

export default {
  name: 'Home',
  components: {
    HelloWorld,
    MovieList,
  },
  computed: {
    ...mapGetters(['getUserName']),
  },
};
</script>
