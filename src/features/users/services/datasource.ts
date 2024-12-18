import { API_ROUTES } from '@/core/api/routes/api-routes'
import { AxiosClient } from '@/core/infrastructure/http/axios-client'
import type { IHttpHandler } from '@/core/interfaces/IHttpHandler'

import type { IUser } from '../interfaces/IUser'

interface CarDataSource {
  getClients: () => Promise<IUser[]>
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

  async getClients(): Promise<IUser[]> {
    const data = await this.httpClient.get<IUser[]>(API_ROUTES.USERS.GET_CLIENTS)
    return data
  }
}
