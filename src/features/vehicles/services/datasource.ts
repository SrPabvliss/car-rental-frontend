import type { IHttpHandler } from '@/core/interfaces/IHttpHandler'
import type { ICar } from '../interfaces/ICar'
import { AxiosClient } from '@/core/infrastructure/http/axios-client'

interface CarDataSource {
  getAll: () => Promise<ICar[]>
  getById: (id: string) => Promise<ICar>
  create: (vehicle: ICar) => Promise<ICar>
  update: (vehicle: ICar) => Promise<ICar>
  delete: (id: string) => Promise<void>
}

export class CarDataSourceImpl implements CarDataSource {
  private httpClient: IHttpHandler
  private static instance: CarDataSourceImpl

  constructor() {
    this.httpClient = new AxiosClient()
  }

  static getInstance(): CarDataSourceImpl {
    if (!CarDataSourceImpl.instance) {
      CarDataSourceImpl.instance = new CarDataSourceImpl()
    }
    return CarDataSourceImpl.instance
  }

  getAll = async (): Promise<ICar[]> => {
    const { data } = await this.httpClient.get<ICar[]>('/api/cars')
    return data
  }

  getById = async (id: string): Promise<ICar> => {
    const { data } = await this.httpClient.get<ICar>(`/api/cars/${id}`)
    return data
  }

  create = async (vehicle: ICar): Promise<ICar> => {
    const { data } = await this.httpClient.post<ICar>('/api/cars', vehicle)
    return data
  }

  update = async (vehicle: ICar): Promise<ICar> => {
    const { data } = await this.httpClient.put<ICar>(
      `/api/cars/${vehicle.id}`,
      vehicle,
    )
    return data
  }

  delete = async (id: string): Promise<void> => {
    await this.httpClient.delete(`/api/cars/${id}`)
  }
}
