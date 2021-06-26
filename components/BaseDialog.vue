<template>
  <v-dialog
    v-model="isVisible"
    width="500"
  >
    <v-card>
      <v-card-title class="pa-4">
        <slot name="title" />
      </v-card-title>
      <v-card-text class="px-4 py-0">
        <slot name="default" />
      </v-card-text>
      <v-card-actions class="pa-4">
        <slot name="actions" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: vm => ({
    isVisible: false,
  }),
  methods: {
    open() {
      this.isVisible = true
    },
    close() {
      this.isVisible = false
    },
  },
}
</script>
