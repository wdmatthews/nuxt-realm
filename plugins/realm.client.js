import * as Realm from 'realm-web'

export default ({ store, $config }, inject) => {
  // Initialize the Realm app
  const realmApp = new Realm.App($config.realmAppId)
  // If the user is authenticated, set the initial store state to have the user's id
  store.commit('setUserId', realmApp.currentUser ? realmApp.currentUser.id : null)
  // Make the app available under this.$realm
  inject('realm', realmApp)
}
