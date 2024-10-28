import type { ICarFilters, OrderByOption } from '../interfaces/ICarFilters'
import type { CarStatus, CarType } from '../interfaces/ICar'

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

export const CAR_BRANDS = [
  'Toyota',
  'Honda',
  'Ford',
  'Chevrolet',
  'Volkswagen',
  'BMW',
  'Mercedes-Benz',
  'Audi',
  'Nissan',
  'Hyundai',
].sort()

export const CAR_TYPES: CarType[] = [
  'sedan',
  'suv',
  'hatchback',
  'pickup',
  'van',
  'coupe',
]

export const CAR_STATUSES: CarStatus[] = [
  'available',
  'maintenance',
  'rented',
  'unavailable',
]

export const YEARS: number[] = Array.from(
  { length: 5 },
  (_, i) => new Date().getFullYear() - i,
)

export const ORDER_BY_OPTIONS: OrderByOption[] = [
  { value: 'price_asc', label: 'Precio: Menor a Mayor' },
  { value: 'price_desc', label: 'Precio: Mayor a Menor' },
  { value: 'year_desc', label: 'Año: Más reciente' },
  { value: 'year_asc', label: 'Año: Más antiguo' },
]

export interface SelectConfig {
  key: keyof ICarFilters
  modelValue: string | number
  placeholder: string
  options: { value: string; label: string }[]
  allLabel: string
  handler: (value: string) => void
}

export const createFilterSelectConfigs = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  selectedValues: Record<string, any>,
  handlers: Record<string, (value: string) => void>,
): SelectConfig[] => [
  {
    key: 'brand',
    modelValue: selectedValues.brand,
    placeholder: 'Marca',
    options: CAR_BRANDS.map(b => ({ value: b, label: b })),
    allLabel: 'Todas las marcas',
    handler: handlers.handleBrandSelect,
  },
  {
    key: 'type',
    modelValue: selectedValues.type,
    placeholder: 'Tipo de vehículo',
    options: CAR_TYPES.map(t => ({
      value: t,
      label: t.charAt(0).toUpperCase() + t.slice(1),
    })),
    allLabel: 'Todos los tipos',
    handler: handlers.handleTypeSelect,
  },
  {
    key: 'status',
    modelValue: selectedValues.status,
    placeholder: 'Estado',
    options: CAR_STATUSES.map(s => ({
      value: s,
      label: s.charAt(0).toUpperCase() + s.slice(1),
    })),
    allLabel: 'Todos los estados',
    handler: handlers.handleStatusSelect,
  },
  {
    key: 'year',
    modelValue: selectedValues.year,
    placeholder: 'Año',
    options: YEARS.map(y => ({
      value: y.toString(),
      label: y.toString(),
    })),
    allLabel: 'Todos los años',
    handler: handlers.handleYearSelect,
  },
  {
    key: 'orderBy',
    modelValue: selectedValues.orderBy,
    placeholder: 'Ordenar por',
    options: ORDER_BY_OPTIONS,
    allLabel: 'Relevancia',
    handler: handlers.handleOrderBySelect,
  },
]
