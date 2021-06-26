<template>
  <base-dialog ref="baseDialog">
    <template #title>
      <span
        class="mx-auto"
        v-text="isRegister ? 'Register' : 'Login'"
      />
    </template>
    <v-form
      ref="form"
      v-model="formIsValid"
      @submit.prevent="authenticate"
    >
      <v-text-field
        ref="emailInput"
        v-model="email"
        label="Email"
        placeholder="username@domain.tld"
        prepend-icon="mdi-email"
        outlined
        :rules="emailRules"
        @keyup.enter="authenticate"
      />
      <v-text-field
        v-model="password"
        label="Password"
        type="password"
        prepend-icon="mdi-key"
        outlined
        :counter="passwordMaxLength"
        :rules="passwordRules"
        @keyup.enter="authenticate"
      />
      <p
        v-show="!isRegister"
        class="text-center mb-0"
      >
        Forgot password?
        <a
          :disabled="!$refs.emailInput || $refs.emailInput.valid"
          @click.stop="resetPassword"
        >
          Send password reset email
        </a>
      </p>
    </v-form>
    <v-snackbar
      v-model="registrationSucceeded"
      color="success"
    >
      Account created successfully. Please check your email to confirm your account
      <template #action>
        <v-btn
          text
          @click="registrationSucceeded = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <v-snackbar
      v-model="authenticationFailed"
      color="error"
    >
      {{ isRegister ? 'Account already exists' : 'Incorrect username or password' }}
      <template #action>
        <v-btn
          text
          @click="authenticationFailed = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <v-snackbar
      v-model="passwordResetEmailSucceeded"
      color="success"
    >
      Password reset email sent successfully
      <template #action>
        <v-btn
          text
          @click="passwordResetEmailSucceeded = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <v-snackbar
      v-model="passwordResetEmailFailed"
      color="error"
    >
      Error when sending password reset email
      <template #action>
        <v-btn
          text
          @click="passwordResetEmailFailed = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <template #actions>
      <v-spacer />
      <v-btn
        text
        @click="close"
      >
        Cancel
      </v-btn>
      <v-btn
        color="primary"
        text
        :disabled="!formIsValid"
        @click="authenticate"
      >
        {{ isRegister ? 'Register' : 'Login' }}
      </v-btn>
      <v-spacer />
    </template>
  </base-dialog>
</template>

<script>
import * as Realm from 'realm-web'
import { required, minLength, maxLength, password } from '@/assets/validation-rules'

export default {
  props: {
    isRegister: {
      type: Boolean,
      default: true,
    },
  },
  data: vm => ({
    formIsValid: false,
    email: '',
    password: '',
    emailRules: [
      required,
    ],
    passwordMinLength: password.minLength,
    passwordMaxLength: password.maxLength,
    passwordRules: [
      required,
      minLength(password.minLength),
      maxLength(password.maxLength),
    ],
    registrationSucceeded: false,
    authenticationFailed: false,
    passwordResetEmailSucceeded: false,
    passwordResetEmailFailed: false,
  }),
  methods: {
    open() {
      this.$refs.baseDialog.open()
      this.$refs.form?.reset()
    },
    close() {
      this.$refs.baseDialog.close()
    },
    async authenticate() {
      if (!this.formIsValid) { return }
      
      if (this.isRegister) {
        try {
          await this.$realm.emailPasswordAuth.registerUser(this.email, this.password)
          this.registrationSucceeded = true
        } catch (error) {
          this.authenticationFailed = true
        }
      } else {
        try {
          const credentials = Realm.Credentials.emailPassword(this.email, this.password)
          await this.$realm.logIn(credentials)
          this.$store.commit('setUserId', this.$realm.currentUser.id)
          this.close()
        } catch (error) {
          this.authenticationFailed = true
        }
      }
    },
    async resetPassword() {
      if (!this.$refs.emailInput.valid) { return }
      
      try {
        await this.$realm.emailPasswordAuth.sendResetPasswordEmail(this.email)
        this.passwordResetEmailSucceeded = true
      } catch (error) {
        this.passwordResetEmailFailed = true
      }
    },
  },
}
</script>
