import Rails from '@rails/ujs'
import * as ActiveStorage from '@rails/activestorage'
import 'channels'

Rails.start()
ActiveStorage.start()

require('../main.js')
require('../search_box.js')
require('../slider_items.js')
