import type { CarStatus, CarType } from './ICar'

export interface ICarFilters {
  search: string
  type: CarType | ''
  status: CarStatus | ''
  year: number | ''
  brand: string | ''
  minPrice: number | ''
  maxPrice: number | ''
  orderBy: 'price_asc' | 'price_desc' | 'year_desc' | 'year_asc' | ''
  page: number
  perPage: number
}

export type OrderByValue =
  | 'price_asc'
  | 'price_desc'
  | 'year_desc'
  | 'year_asc'
  | ''

export type FilterValue = string | number | null

export interface OrderByOption {
  value: OrderByValue
  label: string
}
