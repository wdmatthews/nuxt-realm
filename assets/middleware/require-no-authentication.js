export default function ({ $realm, $router }, redirectURL) {
  if ($realm.currentUser) {
    $router.push(redirectURL)
  }
}
