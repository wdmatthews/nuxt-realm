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
export default {
  
}
</script>
