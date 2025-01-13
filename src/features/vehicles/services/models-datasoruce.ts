interface ModelResponse {
  Count: number
  Message: string
  SearchCriteria: string
  Results: Array<{
    Make_ID: number
    Make_Name: string
    Model_ID: number
    Model_Name: string
  }>
}

export const VehicleModelsService = {
  /**
   * Obtiene los modelos disponibles para una marca específica
   * @param make Marca del vehículo
   * @returns Array de nombres de modelos únicos
   */
  getModelsForMake: async (make: string): Promise<string[]> => {
    try {
      const response = await fetch(
        `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMake/${make}?format=json`,
      )

      if (!response.ok) {
        throw new Error('Error fetching models')
      }

      const data: ModelResponse = await response.json()

      // Filtrar duplicados y ordenar alfabéticamente
      return [...new Set(data.Results.map(model => model.Model_Name))].sort()
    } catch (error) {
      console.error('Error fetching models:', error)
      return []
    }
  },
}
