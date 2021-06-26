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
    <div v-show="currentUser">
      <p class="text-center">
        {{ currentUser ? currentUser.profile.email : '' }}
      </p>
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
    <div v-show="!$store.state.userId">
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
    ],
  }),
  computed: {
    shownLinks() {
      return this.links.filter(link => (link.requiresAuthentication && this.$store.state.userId)
        || (link.requiresNoAuthentication && !this.$store.state.userId)
        || (!link.requiresAuthentication && !link.requiresNoAuthentication))
    },
    currentUser() {
      return this.$store.getters.currentUser(this.$realm)
    },
  },
  methods: {
    toggle() {
      this.isVisible = !this.isVisible
    },
    async logout() {
      await this.$realm.currentUser.logOut()
      this.$store.commit('setUserId', null)
    },
  },
}
</script>
