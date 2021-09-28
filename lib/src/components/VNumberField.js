import _ from 'lodash'
import {VTextField} from 'vuetify/lib'

export default (defaultInput) => ({
  render (h) {
    return h(defaultInput || VTextField, {
      ref: 'field',
      attrs: {
        value: this.localValue,
        ...(this.$attrs || {})
      },
      props: {
        errors: !!this.errors.length,
        errorMessages: this.errors
      },
      on: {
        ...(this.$listeners || {}),
        input: (e) => {
          this.localValue = e
        }
      }
    }, this.$slots || [])
  },
  props: {
    value: {
      required: false,
      type: [Number, String],
      default: null
    }
  },
  data () {
    return {
      localValue: ''
    }
  },
  computed: {
    listeners () {
      return _.omit(this.$listeners, ['input'])
    },
    errors () {
      if (isNaN(this.localValue)) {
        return ['Must be a number']
      }
      return []
    }
  },
  watch: {
    value: {
      immediate: true,
      handler (value) {
        if (value !== null && value.toString() !== this.localValue) {
          this.localValue = value
        }
      }
    },
    localValue: {
      handler () {
        if (typeof this.localValue === 'string') {
          this.localValue = this.localValue.replace(',', '.')
        }
        if (!isNaN(this.localValue) && this.localValue !== '' && ![',', '.'].includes(this.localValue[this.localValue.length - 1])) {
          this.$emit('input', parseFloat(this.localValue))
        }
        if (this.localValue === '') {
          this.$emit('input', null)
        }
      }
    }
  },
  methods: {
    focus () {
      this.$refs.field.focus()
    },
    select () {
      this.$refs.field.$refs.input.select()
    }
  }
})
