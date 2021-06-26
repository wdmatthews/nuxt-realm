import * as Realm from 'realm-web'

export default ({ app, $config }, inject) => {
  const realmApp = new Realm.App($config.realmAppId)
  inject('realm', realmApp)
}
