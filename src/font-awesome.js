import Vue from 'vue'
import { library, dom } from '@fortawesome/fontawesome-svg-core'
import { faCompass, faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faCompass, faSort, faSortUp, faSortDown)

dom.watch()

Vue.component('font-awesome-icon', FontAwesomeIcon)
