import { ref } from "vue"
import type { IRental } from "../interfaces/IRental"
import { RentalDataSourceImpl } from "../services/datasource"

export const useRentalDetail = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const rentalDetail = ref<IRental | null>(null)

  const fetchRentalDetail = async (id: number) => {
    loading.value = true
    error.value = null
    try {
      rentalDetail.value = await RentalDataSourceImpl.getInstance().getById(id)
    } catch (e) {
      error.value = 'Error al cargar los detalles del alquiler'
      console.error(e)
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    rentalDetail,
    fetchRentalDetail
  }
}