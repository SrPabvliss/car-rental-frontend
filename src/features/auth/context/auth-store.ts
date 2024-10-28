import { defineStore } from 'pinia'
import type { IAccount } from '../interfaces/IAccount'
import { readLocalStorage } from '@/core/helpers/read-local-storage'

interface IAuthStore {
  user: IAccount | null
  token: string
}

const LC_KEY = 'auth'

export const useAuthStore = defineStore(LC_KEY, {
  state: () =>
    ({
      user: null as IAccount | null,
      token: '',
    }) as IAuthStore,
  actions: {
    setUser(userData: IAccount | null) {
      this.user = userData
    },
    setToken(token: string) {
      this.token = token
    },
    logout() {
      this.user = null
      this.token = ''
    },
    loadData() {
      const store = readLocalStorage<IAuthStore>(LC_KEY)

      if (!store) return

      this.user = store.user
      this.token = store.token
    },
  },
  persist: {
    key: LC_KEY,
    storage: localStorage,
  },
})
