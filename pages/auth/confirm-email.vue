<template>
  <div>
    <v-alert
      v-show="isConfirming"
      type="info"
      class="ma-4"
    >
      Confirming account...
    </v-alert>
    <v-alert
      v-show="!isConfirming"
      class="ma-4"
      :type="wasConfirmed ? 'success' : 'error'"
    >
      {{ wasConfirmed ? 'Account confirmed successfully' : 'Error confirming account' }}
    </v-alert>
  </div>
</template>

<script>
export default {
  data: vm => ({
    token: vm.$route.query.token,
    tokenId: vm.$route.query.tokenId,
    isConfirming: false,
    wasConfirmed: false,
  }),
  head: vm => ({
    title: 'Confirm Email',
  }),
  async mounted() {
    if (!this.token || !this.tokenId) {
      this.isConfirming = false
      this.wasConfirmed = false
      return
    }
    
    try {
      await this.$realm.emailPasswordAuth.confirmUser(this.token, this.tokenId)
      this.wasConfirmed = true
    } catch (error) {
      this.wasConfirmed = false
    }
    
    this.isConfirming = false
  },
}
</script>
