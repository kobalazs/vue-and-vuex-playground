<template>
  <div>
    <h1>Tasks</h1>
    <b-spinner v-if="loading" variant="primary"></b-spinner>
    <b-list-group v-if="!loading">
      <b-list-group-item v-for="task in tasks" :key="task.id">
        {{ task.name }}
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'task-list',
  components: {},
  data: () => ({
    loading: false,
  }),
  computed: mapState({
    tasks: state => state.task.tasks,
  }),
  created() {
    this.loadTasks();
  },
  methods: {
    loadTasks() {
      this.loading = true;
      this.$store.dispatch('task/list')
        // eslint-disable-next-line
        .catch(error => window.alert(error))
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>
