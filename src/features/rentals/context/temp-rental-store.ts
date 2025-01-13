// features/rentals/context/temp-rental-store.ts
import { defineStore } from 'pinia'

interface ITempRentalData {
  startDate: Date
  endDate: Date
  carId: number
  total: number
  initialPaymentAmount?: number
}

export const useTempRentalStore = defineStore('tempRental', {
  state: () => ({
    rentalData: null as ITempRentalData | null,
  }),
  actions: {
    setRentalData(data: ITempRentalData) {
      this.rentalData = data
    },
    clearRentalData() {
      this.rentalData = null
    },
  },
  persist: {
    storage: sessionStorage,
  },
})
