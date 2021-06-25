import * as Realm from 'realm-web'

export default ({ app }, inject) => {
  const realmApp = new Realm.App(this.$config.realmAppId)
  inject('realm', realmApp)
}
