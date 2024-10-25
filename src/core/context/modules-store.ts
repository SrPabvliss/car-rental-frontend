import { defineStore } from 'pinia'
import type { LinkProp } from '../layout/nav-list.vue'

interface IModulesStore {
  modules: LinkProp[]
}

export const useModulesStore = defineStore('modules', {
  state: () =>
    ({
      modules: [] as LinkProp[],
    }) as IModulesStore,
  actions: {
    setModules(modules: LinkProp[]) {
      this.modules = modules
    },
    loadModules() {
      const store: IModulesStore = JSON.parse(localStorage.getItem('modules') || '{}')
      this.modules = store.modules
    },
  },
  persist: {
    key: 'modules',
    storage: localStorage,
  },
})
