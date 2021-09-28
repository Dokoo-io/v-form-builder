import Vue from 'vue'
import DokooForm from './components/DokooForm.js'
import VNumberField from "./components/VNumberField"

const plugin = ({ inputs = {}} = {}) => {
  return {
    install () {
      Vue.component('dokoo-form', DokooForm(inputs))
    }
  }
}

export {
  plugin,
  VNumberField,
  DokooForm
}
