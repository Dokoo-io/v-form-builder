<template>
  <v-switch
      v-bind="$attrs"
      :input-value="value"
      inset
      class="mt-0"
      @change="$emit('input', $event)"
      v-on="$listeners"
  />
</template>

<script>
export default {
  props: {
    value: {
      required: false,
      type: Boolean,
      default: false
    }
  }
}
</script>
