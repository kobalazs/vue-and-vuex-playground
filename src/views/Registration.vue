<template>
  <div>
    <h1>Registration</h1>
    <b-form @submit="onSubmit" @reset="onReset">
      <b-form-group
        label="Name"
        :invalid-feedback="errors.first('name')"
        :state="!errors.has('name')"
      >
        <b-form-input
          name="name"
          v-model="user.name"
          v-validate="'required'"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        label="Email"
        :invalid-feedback="errors.first('email')"
        :state="!errors.has('email')"
      >
        <b-form-input
          name="email"
          v-model="user.email"
          v-validate="'required|email'"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        label="Password"
        :invalid-feedback="errors.first('password')"
        :state="!errors.has('password')"
      >
        <b-form-input
          name="password"
          type="password"
          v-model="user.password"
          v-validate="'required|password'"
          ref="password"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        label="Password (again)"
        :invalid-feedback="errors.first('passwordConfirmation')"
        :state="!errors.has('passwordConfirmation')"
      >
        <b-form-input
          name="passwordConfirmation"
          type="password"
          v-model="passwordConfirmation"
          v-validate="'required|confirmed:password'"
          data-vv-as="password"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary" :disabled="errors.any()">Register</b-button>
      <b-button type="reset" variant="light">Discard</b-button>
    </b-form>
    <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ user }}</pre>
    </b-card>
  </div>
</template>

<script>
import { Validator } from 'vee-validate';
import User from '../models/User';

Validator.extend('password', {
  getMessage: field => `The ${field} should contain at least one digit, one lowercase and one uppercase letter.`,
  validate: value => !!(value.match(/\d+/) && value.match(/[a-z]+/) && value.match(/[A-Z]+/)),
});

export default {
  name: 'registration',
  components: {},
  data: () => ({
    user: new User(),
    passwordConfirmation: '',
  }),
  methods: {
    onSubmit(event) {
      event.preventDefault();
      this.$validator.validateAll().then((isValid) => {
        if (!isValid) {
          return;
        }
        // eslint-disable-next-line
        console.log('Submitted:', this.user);
      });
    },
    onReset(event) {
      event.preventDefault();
      this.user = new User();
    },
  },
};
</script>

<style scoped>
  button[type=submit] {
    margin-right: 6px;
  }
</style>
