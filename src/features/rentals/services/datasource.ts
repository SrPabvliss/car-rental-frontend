import { API_ROUTES } from '@/core/api/routes/api-routes'
import { AxiosClient } from '@/core/infrastructure/http/axios-client'
import type { IHttpHandler } from '@/core/interfaces/IHttpHandler'
import type { IFilter } from '@/shared/interfaces/IFilter'

import type {
  ICreateRental,
  IRental,
  IUpdateRental,
} from '../interfaces/IRental'

interface RentalDataSource {
  getAll(filters?: IFilter): Promise<IRental[]>
  getById(id: number): Promise<IRental>
  getByUserId(
    userId: number,
    filters?: IFilter,
  ): Promise<{
    items: IRental[]
    totalItems: number
    perPage: number
    page: number
  }>
  create(rental: ICreateRental): Promise<IRental>
  update(id: number, rental: IUpdateRental): Promise<IRental>
  delete(id: number): Promise<IRental>
}

export class RentalDataSourceImpl implements RentalDataSource {
  private httpClient: IHttpHandler
  private static instance: RentalDataSourceImpl

  constructor() {
    this.httpClient = AxiosClient.getInstance()
  }

  static getInstance(): RentalDataSourceImpl {
    if (!RentalDataSourceImpl.instance) {
      RentalDataSourceImpl.instance = new RentalDataSourceImpl()
    }
    return RentalDataSourceImpl.instance
  }

  async getAll(filters?: IFilter): Promise<IRental[]> {
    const data = await this.httpClient.get<IRental[]>(
      API_ROUTES.RENTALS.GET_ALL,
      {
        params: filters,
      },
    )
    return data
  }

  async getById(id: number): Promise<IRental> {
    const data = await this.httpClient.get<IRental>(
      API_ROUTES.RENTALS.GET_BY_ID(id),
    )
    return data
  }

  async getByUserId(
    userId: number,
    filters?: IFilter,
  ): Promise<{
    items: IRental[]
    totalItems: number
    perPage: number
    page: number
  }> {
    const data = await this.httpClient.get<{
      items: IRental[]
      totalItems: number
      perPage: number
      page: number
    }>(API_ROUTES.RENTALS.GET_BY_USER_ID(userId), {
      params: filters,
    })
    return data
  }

  async create(rental: ICreateRental): Promise<IRental> {
    const data = await this.httpClient.post<IRental>(
      API_ROUTES.RENTALS.CREATE,
      rental,
    )
    return data
  }

  async update(id: number, rental: IUpdateRental): Promise<IRental> {
    const data = await this.httpClient.patch<IRental>(
      API_ROUTES.RENTALS.UPDATE(id),
      rental,
    )
    return data
  }

  async delete(id: number): Promise<IRental> {
    const data = await this.httpClient.delete<IRental>(
      API_ROUTES.RENTALS.DELETE(id),
    )
    return data
  }
}
