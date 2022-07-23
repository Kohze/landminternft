import { envMODE } from '../config/envMode'
import apiConfig from '../config/relysiaApi'

let config

if (envMODE === 'DEV') {
  config = {
    apiKey: 'AIzaSyDiAjG-iuYAORff9qoaQQHVAaBzU49HViM',
    authDomain: 'vaionexdev.firebaseapp.com',
    databaseURL: 'https://vaionexdev.firebaseio.com/',
    projectId: 'vaionexdev',
    storageBucket: 'vaionexdev.appspot.com',
    messagingSenderId: '540169846332',
    appId: '1:540169846332:web:f3c5e00aa07b48d2db8d39',
    measurementId: 'G-2SF16EW2KV',
  }

  apiConfig.defaults.headers.common['serviceId'] =
    '3a1958c1-929b-438b-8228-e9008501f703'
}

export default config
