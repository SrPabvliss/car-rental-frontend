import { API_ROUTES } from '@/core/api/routes/api-routes'
import { AxiosClient } from '@/core/infrastructure/http/axios-client'
import type { IHttpHandler } from '@/core/interfaces/IHttpHandler'
import { useAuthStore } from '@/features/auth/context/auth-store'
import type { ICreateUser, IUser } from '@/features/users/interfaces/IUser'
import { jwtDecode } from 'jwt-decode'

import type { IAccount } from '../interfaces/IAccount'
import type { ILogin, ILoginResponse } from '../interfaces/ILogin'
import type { IResetPassword } from '../interfaces/IRecoverPassword'

interface AuthDataSource {
  login({ email, password }: ILogin): Promise<IAccount | undefined>
  logout(): void
  register(data: ICreateUser): Promise<IUser>
  restorePasswordReq(email: string): Promise<void>
  resetPassword(data: IResetPassword): Promise<void>
}

export class AuthDataSourceImpl implements AuthDataSource {
  private httpClient: IHttpHandler
  private static instance: AuthDataSourceImpl

  constructor() {
    this.httpClient = AxiosClient.getInstance()
  }

  static getInstance(): AuthDataSource {
    if (!this.instance) {
      this.instance = new AuthDataSourceImpl()
    }
    return this.instance
  }

  async login({ email, password }: ILogin) {
    const data = await this.httpClient.post<ILoginResponse>(
      API_ROUTES.AUTH.LOGIN,
      {
        email: email,
        password: password,
      },
    )

    if (!data) return

    const user = jwtDecode<IAccount>(data.token)
    useAuthStore().setToken(data.token)
    useAuthStore().setUser(user)
    this.httpClient.setAccessToken(data.token)

    return user as IAccount
  }

  logout() {
    useAuthStore().logout()
    this.httpClient.setAccessToken(null)
  }

  async register(data: ICreateUser): Promise<IUser> {
    const response = await this.httpClient.post<IUser>(
      API_ROUTES.AUTH.SIGN_UP,
      data,
    )

    if (!response) return response

    return response
  }

  async restorePasswordReq(email: string) {
    await this.httpClient.post(API_ROUTES.AUTH.RESET_REQUEST(email), {})
  }

  async resetPassword(data: IResetPassword) {
    await this.httpClient.post(API_ROUTES.AUTH.RESTORE_PASSWORD(data.token), {
      newPassword: data.newPassword,
    })
  }
}
