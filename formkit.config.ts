import { defaultConfig } from '@formkit/vue'
import { rootClasses } from './formkit.theme'
import {
  createAutoAnimatePlugin,
  createAutoHeightTextareaPlugin,
} from '@formkit/addons'
import { es } from '@formkit/i18n'

const config = defaultConfig({
  plugins: [
    createAutoAnimatePlugin(
      {
        duration: 250,
        easing: 'ease-in-out',
      },
      {
        global: ['outer', 'inner'],
        form: ['form'],
        repeater: ['items'],
      },
    ),
    createAutoHeightTextareaPlugin(),
  ],
  config: {
    rootClasses: rootClasses,
  },
  messages: { es },
  locale: 'es',
})

export default config
