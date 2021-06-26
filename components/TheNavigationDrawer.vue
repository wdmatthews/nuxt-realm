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
        v-for="link in links"
        v-show="linkIsVisible(link)"
        :key="link.title"
        :to="link.to"
      >
        <v-list-item-icon>
          <v-icon>
            mdi-{{ link.icon }}
          </v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>
            {{ link.title }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <!-- Instead of using the computed property, you can also access $store.state.userId -->
    <div v-show="currentUser">
      <div class="text-center mb-4">
        <v-btn
          color="primary"
          outlined
          @click="logout"
        >
          <v-icon left>
            mdi-logout-variant
          </v-icon>
          Logout
        </v-btn>
      </div>
    </div>
    <div v-show="!currentUser">
      <div class="text-center mb-4">
        <AuthenticationDialogButton :is-register="false" />
      </div>
      <div class="text-center mb-4">
        <AuthenticationDialogButton :is-register="true" />
      </div>
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
      {
        title: 'Account',
        to: '/account',
        icon: 'account',
        requiresAuthentication: true,
        requiresNoAuthentication: false,
      },
    ],
  }),
  computed: {
    currentUser() {
      // The current user will now be accessible to the navigation drawer
      // as a computed property, based on the Vuex store getter "currentUser",
      // which needs the Realm app instance
      return this.$store.getters.currentUser(this.$realm)
    },
  },
  methods: {
    toggle() {
      this.isVisible = !this.isVisible
    },
    linkIsVisible(link) {
      return (link.requiresAuthentication && this.$store.state.userId)
        || (link.requiresNoAuthentication && !this.$store.state.userId)
        || (!link.requiresAuthentication && !link.requiresNoAuthentication)
    },
    async logout() {
      // Logout the user
      await this.$realm.currentUser.logOut()
      // Then erase the user from the store
      this.$store.commit('setUserId', null)
    },
  },
}
</script>
