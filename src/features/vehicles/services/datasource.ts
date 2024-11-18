import { API_ROUTES } from '@/core/api/routes/api-routes'
import { AxiosClient } from '@/core/infrastructure/http/axios-client'
import type { IHttpHandler } from '@/core/interfaces/IHttpHandler'

import type { ICar } from '../interfaces/ICar'
import type { ICarFilters } from '../interfaces/ICarFilters'

interface CarDataSource {
  getAll: (filters?: Partial<ICarFilters>) => Promise<{
    totalItems: number
    perPage: number
    page: number
    items: ICar[]
  }>
  getById: (id: number) => Promise<ICar>
  create: (vehicle: Omit<ICar, 'id'>) => Promise<ICar>
  update: (vehicle: ICar) => Promise<ICar>
  delete: (id: number) => Promise<void>
  count: () => Promise<number>
}

export class CarDataSourceImpl implements CarDataSource {
  private httpClient: IHttpHandler
  private static instance: CarDataSourceImpl

  constructor() {
    this.httpClient = AxiosClient.getInstance()
  }

  static getInstance(): CarDataSourceImpl {
    if (!CarDataSourceImpl.instance) {
      CarDataSourceImpl.instance = new CarDataSourceImpl()
    }
    return CarDataSourceImpl.instance
  }

  count: () => Promise<number> = async () => {
    const data = await this.httpClient.get<number>(API_ROUTES.VEHICLES.COUNT)
    return data
  }

  getAll = async (
    filters?: Partial<ICarFilters>,
  ): Promise<{
    totalItems: number
    perPage: number
    page: number
    items: ICar[]
  }> => {
    const data = await this.httpClient.get<{
      totalItems: number
      perPage: number
      page: number
      items: ICar[]
    }>(API_ROUTES.VEHICLES.FILTER, {
      params: filters,
    })
    return data
  }

  getById = async (id: number): Promise<ICar> => {
    const data = await this.httpClient.get<ICar>(
      API_ROUTES.VEHICLES.GET_BY_ID(id),
    )
    return data
  }

  create = async (vehicle: Omit<ICar, 'id'>): Promise<ICar> => {
    const data = await this.httpClient.post<ICar>(
      API_ROUTES.VEHICLES.CREATE,
      vehicle,
    )
    return data
  }

  update = async (vehicle: ICar): Promise<ICar> => {
    const data = await this.httpClient.put<ICar>(
      API_ROUTES.VEHICLES.UPDATE(vehicle.id),
      vehicle,
    )
    return data
  }

  delete = async (id: number): Promise<void> => {
    await this.httpClient.delete(API_ROUTES.VEHICLES.DELETE(id))
  }
}
