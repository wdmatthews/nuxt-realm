<template>
  <v-navigation-drawer
    v-model="isVisible"
    app
    clipped
  >
    <v-list
      dense
      nav
      class="mb-2"
    >
      <v-list-item
        v-for="link in shownLinks"
        :key="link.title"
        :to="link.to"
      >
        <v-list-item-icon>
          <v-icon v-text="`mdi-${link.icon}`" />
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title v-text="link.title" />
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <div class="text-center mb-4">
      <AuthenticationDialogButton :is-register="false" />
    </div>
    <div class="text-center mb-4">
      <AuthenticationDialogButton :is-register="true" />
    </div>
  </v-navigation-drawer>
</template>

<script>
export default {
  data: vm => ({
    isVisible: null,
    links: [
      {
        title: 'Home',
        to: '/',
        icon: 'home',
        requiresAuthentication: false,
        requiresNoAuthentication: false,
      },
    ],
  }),
  computed: {
    shownLinks() {
      return this.links.filter(link => (link.requiresAuthentication && this.$realm.currentUser)
        || (link.requiresNoAuthentication && !this.$realm.currentUser)
        || (!link.requiresAuthentication && !link.requiresNoAuthentication))
    },
  },
  methods: {
    toggle() {
      this.isVisible = !this.isVisible
    },
  },
}
</script>
