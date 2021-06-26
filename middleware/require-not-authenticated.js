export default function ({ app, redirect }) {
  if (app.$realm.currentUser) {
    console.log('Error: Authenticated')
  } else {
    console.log('Not authenticated')
  }
}
