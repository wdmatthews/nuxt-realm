<template>
  <div>
    <v-btn
      :color="isRegister ? 'accent' : 'primary'"
      @click="$refs.authenticationDialog.open()"
    >
      <v-icon left>
        mdi-{{ isRegister ? 'account-plus' : 'login-variant' }}
      </v-icon>
      {{ isRegister ? 'Register' : 'Login' }}
    </v-btn>
    <AuthenticationDialog
      ref="authenticationDialog"
      :is-register="isRegister"
    />
  </div>
</template>

<script>
export default {
  props: {
    isRegister: {
      type: Boolean,
      default: true,
    },
  },
}
</script>
