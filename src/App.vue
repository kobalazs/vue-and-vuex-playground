<template>
  <div id="app">
    <NavigationComponent></NavigationComponent>
    <b-container>
      <router-view/>
    </b-container>
  </div>
</template>

<script>
import NavigationComponent from '@/components/NavigationComponent.vue';

export default {
  name: 'home',
  components: {
    NavigationComponent,
  },
};
</script>

<style scoped>
  .container {
    margin-top: 12px;
  }
</style>
