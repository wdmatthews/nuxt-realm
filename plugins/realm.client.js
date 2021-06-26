import * as Realm from 'realm-web'

export default ({ store, $config }, inject) => {
  const realmApp = new Realm.App($config.realmAppId)
  store.commit('setUserId', realmApp.currentUser ? realmApp.currentUser.id : null)
  inject('realm', realmApp)
}
