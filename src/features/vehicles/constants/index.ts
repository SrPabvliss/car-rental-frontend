import type { CarStatus, CarType } from '../interfaces/ICar'
import type { ICarFilters, OrderByOption } from '../interfaces/ICarFilters'

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

export const CAR_STATUSES: CarStatus[] = [
  'Disponible',
  'Alquilado',
  'En mantenimiento',
]

export const CAR_TYPES: CarType[] = [
  'Económico',
  'Sedán',
  'SUV Compacto',
  'SUV Grande',
  'Lujo',
  'Camioneta',
  'Minivan',
  'Deportivo',
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
  id?: string
  key: keyof ICarFilters
  modelValue: string | number
  placeholder: string
  options: { value: string; label: string }[]
  allLabel: string
  handler: (value: string) => void
}

export const createFilterSelectConfigs = (
  selectedValues: Record<string, any>,
  handlers: Record<string, (value: string) => void>,
): SelectConfig[] => [
  {
    id: 'brand',
    key: 'brand',
    modelValue: selectedValues.brand,
    placeholder: 'Marca',
    options: CAR_BRANDS.map(b => ({ value: b, label: b })),
    allLabel: 'Todas las marcas',
    handler: handlers.handleBrandSelect,
  },
  {
    id: 'type',
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
    id: 'status',
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
    id: 'year',
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
    id: 'orderBy',
    key: 'orderBy',
    modelValue: selectedValues.orderBy,
    placeholder: 'Ordenar por',
    options: ORDER_BY_OPTIONS,
    allLabel: 'Relevancia',
    handler: handlers.handleOrderBySelect,
  },
]
