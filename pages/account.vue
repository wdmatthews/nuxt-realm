<template>
  <div>
    Account
  </div>
</template>

<script>
import requireAuthentication from '~/assets/middleware/require-authentication'

export default {
  data: vm => ({
    unwatchAuthentication: null,
  }),
  head: vm => ({
    title: 'Account',
  }),
  mounted() {
    // Start watching authentication on the client side, as Realm is loaded on the client
    // If not authenticated on page load or when the userId changes, redirect to /
    this.unwatchAuthentication = this.$store.watch(state => state.userId,
      () => requireAuthentication(this, '/'), { immediate: true })
  },
  beforeDestroy() {
    // Stop watching for authentication when this page is destroyed
    this.unwatchAuthentication()
  },
}
</script>
