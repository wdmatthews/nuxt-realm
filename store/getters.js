export default {
  currentUser(state) {
    return realm => state.userId ? realm.currentUser : null
  },
}
