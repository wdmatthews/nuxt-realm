<template>
  <div>
    <v-form
      v-show="isResetting == null"
      v-model="newPasswordIsValid"
      @submit.prevent="resetPassword"
    >
      <v-text-field
        v-model="newPassword"
        label="New Password"
        type="password"
        prepend-icon="mdi-key"
        outlined
        class="ma-4"
        :counter="passwordMaxLength"
        :rules="passwordRules"
      />
    </v-form>
    <div
      v-show="isResetting == null"
      class="text-center"
    >
      <v-btn
        color="primary"
        :disabled="!newPasswordIsValid"
        @click="resetPassword"
      >
        <v-icon left>
          mdi-key-change
        </v-icon>
        Reset Password
      </v-btn>
    </div>
    <v-alert
      v-show="isResetting"
      type="info"
      class="ma-4"
    >
      Resetting password...
    </v-alert>
    <v-alert
      v-show="isResetting === false"
      class="ma-4"
      :type="wasReset ? 'success' : 'error'"
    >
      {{ wasReset ? 'Password reset successfully' : 'Error resetting password' }}
    </v-alert>
  </div>
</template>

<script>
import { required, minLength, maxLength, password } from '@/assets/validation-rules'

export default {
  data: vm => ({
    token: vm.$route.query.token,
    tokenId: vm.$route.query.tokenId,
    newPasswordIsValid: false,
    newPassword: '',
    passwordMinLength: password.minLength,
    passwordMaxLength: password.maxLength,
    passwordRules: [
      required,
      minLength(password.minLength),
      maxLength(password.maxLength),
    ],
    isResetting: null,
    wasReset: false,
  }),
  head: vm => ({
    title: 'Reset Password',
  }),
  methods: {
    async resetPassword() {
      if (!this.newPasswordIsValid) { return }
      if (!this.token || !this.tokenId) {
        this.isResetting = false
        this.wasReset = false
        return
      }
      
      try {
        await this.$realm.emailPasswordAuth.resetPassword(this.token, this.tokenId, this.newPassword)
        this.wasReset = true
      } catch (error) {
        this.wasReset = false
      }
      
      this.isResetting = false
    },
  },
}
</script>
