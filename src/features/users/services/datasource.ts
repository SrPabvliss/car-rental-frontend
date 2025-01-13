// features/users/services/datasource.ts
import { API_ROUTES } from '@/core/api/routes/api-routes'
import { AxiosClient } from '@/core/infrastructure/http/axios-client'
import type { IHttpHandler } from '@/core/interfaces/IHttpHandler'

import type { ICreateUser, IUpdateUser, IUser } from '../interfaces/IUser'

interface UserDataSource {
  getAll(): Promise<IUser[]>
  getById(id: number): Promise<IUser>
  getClients(): Promise<IUser[]>
  create(data: ICreateUser): Promise<IUser>
  update(id: number, data: IUpdateUser): Promise<IUser>
  delete(id: number): Promise<void>
}

export class UserDataSourceImpl implements UserDataSource {
  private httpClient: IHttpHandler
  private static instance: UserDataSourceImpl

  private constructor() {
    this.httpClient = AxiosClient.getInstance()
  }

  static getInstance(): UserDataSourceImpl {
    if (!UserDataSourceImpl.instance) {
      UserDataSourceImpl.instance = new UserDataSourceImpl()
    }
    return UserDataSourceImpl.instance
  }

  async getAll(): Promise<IUser[]> {
    const response = await this.httpClient.get<IUser[]>(
      API_ROUTES.USERS.GET_ALL,
    )
    return response
  }

  async getById(id: number): Promise<IUser> {
    const response = await this.httpClient.get<IUser>(
      API_ROUTES.USERS.GET_BY_ID(id),
    )
    return response
  }

  async getClients(): Promise<IUser[]> {
    const response = await this.httpClient.get<IUser[]>(
      API_ROUTES.USERS.GET_CLIENTS,
    )
    return response
  }

  async create(data: ICreateUser): Promise<IUser> {
    const response = await this.httpClient.post<IUser>(
      API_ROUTES.USERS.GET_ALL,
      data,
    )
    return response
  }

  async update(id: number, data: IUpdateUser): Promise<IUser> {
    const response = await this.httpClient.patch<IUser>(
      API_ROUTES.USERS.UPDATE(id),
      data,
    )
    return response
  }

  async delete(id: number): Promise<void> {
    await this.httpClient.delete(API_ROUTES.USERS.REMOVE(id))
  }
}
