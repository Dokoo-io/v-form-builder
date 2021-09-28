# Dokoo Form Builders

## Installation

```
yarn add @dokoo/v-form-builder
```

```javascript
import Vue from 'vue'
import {plugin} from '@dokoo/v-form-builder'

Vue.use(plugin({
  inputs: {
    text: {
      component: VTextField,
      options: {
        dense: true,
        outlined: true
      }
    }
  }
}))
```

## Usage
```vue
<template>
  <dokoo-form 
    :inputs="inputs"
  />
</template>

<script>
export default {
  data () {
    return {
      inputs: [
        {
          type: 'text',
          key: 'title',
          options: {
            label: 'My Title'
          }
        }
      ]
    }
  }
}
</script>
```
