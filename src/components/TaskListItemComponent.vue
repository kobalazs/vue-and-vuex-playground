<template>
  <div class="d-flex flex-row align-items-center">
    <b-form-checkbox
      v-model="task.is_done"
      @change="modifyTask(task)"
      :disabled="waiting"
      class="float-left"
    ></b-form-checkbox>
    <b-form-input
      v-model="task.name"
      @change="modifyTask(task)"
      :disabled="waiting"
      class="float-left"
    ></b-form-input>
    <b-button variant="danger" size="sm" class="float-left ml-2" @click="deleteTask()">
      Delete
    </b-button>
  </div>
</template>

<script>
export default {
  name: 'task-list-item',
  components: {},
  data: () => ({
    loading: false,
  }),
  props: [
    'task',
    'disabled',
  ],
  computed: {
    waiting() {
      return this.loading || this.disabled;
    },
  },
  methods: {
    modifyTask() {
      this.loading = true;
      this.$store.dispatch('task/modify', this.task)
        .catch((error) => {
          // eslint-disable-next-line
          window.alert(error);
          this.$emit('error', error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    deleteTask() {
      this.loading = true;
      this.$store.dispatch('task/delete', this.task)
        .catch((error) => {
          // eslint-disable-next-line
          window.alert(error);
          this.$emit('error', error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>
