<template>
  <div>
    <b-spinner v-if="loading" variant="primary" class="float-right"></b-spinner>
    <h1>Tasks</h1>
    <b-list-group>
      <b-list-group-item
        v-for="task in tasks"
        :key="task.id"
      >
        <TaskListItem :task="task" :disabled="loading" v-on:error="loadTasks()"></TaskListItem>
      </b-list-group-item>
    </b-list-group>
    <b-button variant="outline-primary" class="mt-3" @click="addTask()">
      Add new task
    </b-button>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import Task from '../models/Task';
import TaskListItem from '../components/TaskListItemComponent.vue';

export default {
  name: 'task-list',
  components: {
    TaskListItem,
  },
  data: () => ({
    loading: false,
  }),
  computed: mapState({
    tasks: state => state.task.tasks,
    user: state => state.auth.user,
  }),
  watch: {
    user(user) {
      if (!user) {
        this.$router.push('/login');
      }
    },
  },
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

    addTask() {
      const task = new Task({
        name: 'New Task',
      });
      this.loading = true;
      this.$store.dispatch('task/create', task)
        // eslint-disable-next-line
        .catch(error => window.alert(error))
        .finally(() => {
          this.loading = false;
        });
    },

    modifyTask(task) {
      this.loading = true;
      this.$store.dispatch('task/modify', task)
        // eslint-disable-next-line
        .catch(error => window.alert(error))
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>
