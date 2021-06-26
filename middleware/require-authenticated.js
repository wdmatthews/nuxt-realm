export default function ({ app, redirect }) {
  if (!app.$realm.currentUser) {
    console.log('Error: Not authenticated')
  } else {
    console.log('Authenticated')
  }
}
