<template>
  <base-dialog ref="baseDialog">
    <template #title>
      Title
    </template>
    <v-form
      ref="form"
      v-model="formIsValid"
    >
      Form
    </v-form>
    <template #actions>
      Actions
    </template>
  </base-dialog>
</template>

<script>
export default {
  props: {
    isRegister: {
      type: Boolean,
      default: true,
    },
  },
  data: vm => ({
    formIsValid: false,
  }),
  methods: {
    open() {
      this.$refs.baseDialog.open()
      this.$refs.form?.reset()
    },
    close() {
      this.$refs.baseDialog.close()
    },
  },
}
</script>
