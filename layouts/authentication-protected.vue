<template>
  <v-app>
    <TheAppBar @toggle-navigation="$refs.navigationDrawer.toggle()" />
    <TheNavigationDrawer ref="navigationDrawer" />
    <v-main>
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script>
import requireAuthentication from '~/assets/middleware/require-authentication'

export default {
  data: vm => ({
    unwatchAuthentication: null,
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
