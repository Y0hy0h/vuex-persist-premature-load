import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'

import VuexPersistence from 'vuex-persist'
import localForage from 'localforage'

Vue.config.productionTip = false

Vue.use(Vuex)

const waitForVueDevtools = 1000  // if too low, RESTORE_MUTATION won't be picked up in devtools' history
const delayStoreCreation = 0
const delayRestore = 0  // if 'State restored' is after 'Loaded Vue', then the items do not appear
const delayVueInit = 25  // delaying 'Loaded Vue' with respect to 'Store created' sometimes work, sometimes not

setTimeout(async () => {
  console.log('Create vuex-persist at', performance.now())
  const vuexLocal = new VuexPersistence({
    strictMode: true,
    storage: localForage,
    restoreState: async function (key) {
      const state = localForage.getItem(key)
      await new Promise(resolve => setTimeout(resolve, delayRestore))
      console.log('State restored at', performance.now())
      return state
    },
    asyncStorage: true,
  })
  console.log('vuex-persist created at', performance.now())

  let store
  await new Promise(resolve => setTimeout(resolve, delayStoreCreation))
  console.log('Create Store at', performance.now())
  store = new Vuex.Store({
    strict: true,
    state: {
      items: [1, 2, 3]
    },
    mutations: {
      ['add-item'] (state, payload) {
        state.items.push(payload)
      },
      'RESTORE_MUTATION': vuexLocal.RESTORE_MUTATION,
    },
    actions: {},
    plugins: [
      vuexLocal.plugin
    ]
  })
  console.log('Store created at', performance.now())

  await new Promise(resolve => setTimeout(resolve, delayVueInit))
    console.log('Start loading Vue at', performance.now())
    new Vue({
      render: h => h(App),
      store: store,
    }).$mount('#app')
    console.log('Loaded Vue at', performance.now())
}, waitForVueDevtools)
