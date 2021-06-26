<template>
  <div>
    <v-row
      no-gutters
      justify="center"
      class="pa-4"
    >
      <v-col
        cols="12"
        md="6"
      >
        <v-card>
          <v-card-title class="pa-4">
            <span class="mx-auto">Change Name</span>
          </v-card-title>
          <v-card-text class="px-4 py-0">
            <v-form
              v-model="newNameIsValid"
              @submit.prevent="changeName"
            >
              <v-text-field
                v-model="newName"
                label="Name"
                outlined
                :counter="nameMaxLength"
                :rules="newNameRules"
              />
            </v-form>
          </v-card-text>
          <v-card-actions class="pa-4">
            <v-spacer />
            <v-btn
              color="primary"
              :disabled="!newNameIsValid"
              @click="changeName"
            >
              <v-icon left>
                mdi-pencil
              </v-icon>
              Change
            </v-btn>
            <v-spacer />
          </v-card-actions>
        </v-card>
        <v-snackbar
          v-model="nameChangeSucceeded"
          color="success"
        >
          Name changed successfully
          <template #action>
            <v-btn
              text
              @click="nameChangeSucceeded = false"
            >
              Close
            </v-btn>
          </template>
        </v-snackbar>
        <v-snackbar
          v-model="nameChangeFailed"
          color="error"
        >
          Error when changing name
          <template #action>
            <v-btn
              text
              @click="nameChangeFailed = false"
            >
              Close
            </v-btn>
          </template>
        </v-snackbar>
        <v-card class="mt-4">
          <v-card-title class="pa-4">
            <span class="mx-auto">Reset Password</span>
          </v-card-title>
          <v-card-text class="px-4 py-0">
            Clicking "Reset Password" will email you a link to reset your password
          </v-card-text>
          <v-card-actions class="pa-4">
            <v-spacer />
            <v-btn
              color="primary"
              @click="resetPassword"
            >
              <v-icon left>
                mdi-email
              </v-icon>
              Reset Password
            </v-btn>
            <v-spacer />
          </v-card-actions>
        </v-card>
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
      </v-col>
    </v-row>
  </div>
</template>

<script>
// import requireAuthentication from '~/assets/middleware/require-authentication'
import { maxLength, name } from '@/assets/validation-rules'

export default {
  // You can manually protect a page or use an authentication-protected layout on multiple pages
  // Using a layout for protection also reduces the size of your page files,
  // taking only line of code to protect the page
  layout: 'authentication-protected',
  data: vm => ({
    // unwatchAuthentication: null,
    newNameIsValid: false,
    newName: '',
    nameMaxLength: name.maxLength,
    newNameRules: [
      // v => !v || v !== vm.currentUser.customData.name || 'Must be different than current name',
      maxLength(name.maxLength),
    ],
    nameChangeSucceeded: false,
    nameChangeFailed: false,
    passwordResetEmailSucceeded: false,
    passwordResetEmailFailed: false,
  }),
  head: vm => ({
    title: 'Account',
  }),
  computed: {
    currentUser() {
      // The current user will now be accessible to the navigation drawer
      // as a computed property, based on the Vuex store getter "currentUser",
      // which needs the Realm app instance
      return this.$store.getters.currentUser(this.$realm)
    },
  },
  mounted() {
    // Start watching authentication on the client side, as Realm is loaded on the client
    // If not authenticated on page load or when the userId changes, redirect to /
    // this.unwatchAuthentication = this.$store.watch(state => state.userId,
    //   () => requireAuthentication(this, '/'), { immediate: true })
    this.newName = this.currentUser.customData.name ?? ''
  },
  // beforeDestroy() {
  //   // Stop watching for authentication when this page is destroyed
  //   this.unwatchAuthentication()
  // },
  methods: {
    async changeName() {
      if (!this.newNameIsValid) { return }
      
      const mongodb = this.$realm.currentUser.mongoClient('mongodb-atlas')
      const usersCollection = mongodb.db('nuxt-realm').collection('users')
      
      try {
        await usersCollection.updateOne(
          { userId: this.$realm.currentUser.id },
          { $set: { name: this.newName } },
          { upsert: true },
        )
        
        await this.$realm.currentUser.refreshCustomData()
        this.nameChangeSucceeded = true
      } catch (error) {
        this.nameChangeFailed = true
      }
    },
    async resetPassword() {
      try {
        await this.$realm.emailPasswordAuth.sendResetPasswordEmail(this.currentUser.profile.email)
        this.passwordResetEmailSucceeded = true
      } catch (error) {
        this.passwordResetEmailFailed = true
      }
    },
  },
}
</script>
