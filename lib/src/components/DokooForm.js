import {VRow, VCol, VAlert, VTextField, VFileInput, VSelect, VCombobox} from 'vuetify/lib'
import NumberField from "./VNumberField";
import DBooleanField from "./DBooleanField";

export default (inputs) => {
  const defaultInputs = {
    text: {
      component: VTextField
    },
    number: {
      component: NumberField(VTextField)
    },
    file: {
      component: VFileInput
    },
    select: {
      component: VSelect
    },
    combobox: {
      component: VCombobox
    },
    boolean: {
      component: DBooleanField
    }
  }

  Object.assign(defaultInputs, inputs)

  return {
    render (h) {
      const cells = this.inputs.map((input, index) => {
        const componentToUse = defaultInputs[input.type] ? defaultInputs[input.type].component : (input.type || input.customType)
        return h(VCol, {
          props: {
            md: input.md || 12
          },
          class: 'my-0 py-0',
          key: `input-${index}`
        }, [
          h(componentToUse, {
            attrs: {
              value: this.internalValue[input.key],
              ...(defaultInputs[input.type].options || {}),
              ...(input.options || {})
            },
            ref: 'input',
            refInFor: true,
            on: {
              input: (e) => {
                this.internalValue[input.key] = e
                this.$emit('input', this.internalValue)
              }
            }
          })
        ])
      })
      if (this.error) {
        cells.push(h(VCol, {
          props: {
            md: 12
          }
        }, [
          h(VAlert, {
            props: {
              type: 'error'
            }
          }, [this.errorMessage])
        ]))
      }
      return h(VRow, {
        class: 'my-0'
      }, cells)
    },
    props: {
      inputs: {
        required: true,
        type: Array
      },
      error: {
        required: false,
        type: [String, Error],
        default: null
      },
      initialValue: {
        required: false,
        type: Object,
        default: () => {}
      }
    },
    data () {
      return {
        internalValue: Object.assign({}, ...this.inputs.map((input) => {
          return {
            [input.key]: null
          }
        }), this.initialValue ? JSON.parse(JSON.stringify(this.initialValue)) : {}),
        defaultInputs
      }
    },
    computed: {
      errorMessage () {
        if (!this.error) {
          return this.error
        }

        if (this.error && this.error.response && this.error.response.data && this.error.response.data.message) {
          return this.error.response.data.message
        }

        return this.error
      }
    },
    watch: {
      internalValue: {
        deep: true,
        handler () {
          this.$emit('input', { ...this.internalValue })
        }
      }
    },
    methods: {
      getValue () {
        return this.internalValue
      },
      blurAll () {
        if (!this.$refs.input || !Array.isArray(this.$refs.input)) {
          return
        }

        for (const ref of this.$refs.input) {
          if (ref.blur && typeof ref.blur === 'function') {
            ref.blur()
          }
        }
      }
    }
  }
}
