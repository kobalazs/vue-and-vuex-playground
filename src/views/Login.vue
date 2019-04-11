<template>
  <div>
    <h1>Login</h1>
    <b-alert v-if="error" variant="danger" show>
      {{ error }}
    </b-alert>

    <b-form @submit="onSubmit">
      <b-form-group label="Email">
        <b-form-input
          name="email"
          v-model="user.email"
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Password">
        <b-form-input
          name="password"
          type="password"
          v-model="user.password"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Log In</b-button>
    </b-form>
  </div>
</template>

<script>
import User from '../models/User';

export default {
  name: 'login',
  components: {},
  data: () => ({
    user: new User(),
    error: '',
  }),
  methods: {
    onSubmit(event) {
      event.preventDefault();
      this.$store.dispatch('login', this.user).then(() => {
        this.$router.push('/');
      }).catch((error) => {
        this.error = error;
      });
    },
  },
};
</script>

<style scoped>
  button[type=submit] {
    margin-right: 6px;
  }
</style>
