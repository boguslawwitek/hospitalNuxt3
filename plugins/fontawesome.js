import { library, config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faAngleDown, faArrowUpRightFromSquare, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { faFacebook } from '@fortawesome/free-brands-svg-icons'

config.autoAddCss = false
library.add(faAngleDown, faArrowUpRightFromSquare, faMagnifyingGlass, faFacebook);

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('font-awesome-icon', FontAwesomeIcon, {})
})