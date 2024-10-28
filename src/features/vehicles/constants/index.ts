import type { ICarFilters } from '../interfaces/ICarFilters'

export const defaultFilters: ICarFilters = {
  search: '',
  type: '',
  status: '',
  year: '',
  brand: '',
  minPrice: '',
  maxPrice: '',
  orderBy: '',
  page: 1,
  perPage: 6,
}
