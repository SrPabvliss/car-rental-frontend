/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  IHttpHandler,
  IHttpResponse,
} from '@/core/interfaces/IHttpHandler'
import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios'
import { useToast } from 'vue-toastification'

export class AxiosClient implements IHttpHandler {
  private static instance: AxiosClient
  private axiosInstance: AxiosInstance
  // @ts-expect-error - baseURL is required
  private static readonly baseURL = import.meta.env.VITE_API_URL || ''
  private accessToken: string | null = null
  private toast = useToast()

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: AxiosClient.baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    // this.axiosInstance.interceptors.request.use(config => {
    //   const authStore = useAuthStore()
    //   authStore.loadData()
    //   this.accessToken = authStore.token
    //   if (this.accessToken) {
    //     config.headers.Authorization = `Bearer ${this.accessToken}`
    //   }
    //   return config
    // })

    this.axiosInstance.interceptors.response.use(
      response => {
        // this.toast.success(response.data.message)
        this.toast.success('Correcto')
        return response
      },
      error => {
        // this.toast.error(error.response.data.message)
        this.toast.error('Error')
        return Promise.reject(error)
      },
    )
  }

  static getInstance(): AxiosClient {
    if (!this.instance) {
      this.instance = new AxiosClient()
    }
    return this.instance
  }

  setAccessToken(accessToken: string | null): void {
    if (accessToken) {
      this.axiosInstance.defaults.headers.common['Authorization'] =
        `Bearer ${accessToken}`
    } else {
      delete this.axiosInstance.defaults.headers.common['Authorization']
    }
  }

  getAxiosInstance(): AxiosInstance {
    return this.axiosInstance
  }

  async get<T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<IHttpResponse<T>> {
    try {
      const response = await this.axiosInstance.get<IHttpResponse<T>>(
        url,
        config,
      )
      return response.data
    } catch (e: any) {
      return e.response.data
    }
  }

  async post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<IHttpResponse<T>> {
    try {
      const response = await this.axiosInstance.post<IHttpResponse<T>>(
        url,
        data,
        config,
      )
      return response.data
    } catch (e: any) {
      return e.response.data
    }
  }

  async put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<IHttpResponse<T>> {
    try {
      const response = await this.axiosInstance.put<IHttpResponse<T>>(
        url,
        data,
        config,
      )
      return response.data
    } catch (e: any) {
      return e.response.data
    }
  }

  async patch<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<IHttpResponse<T>> {
    try {
      const response = await this.axiosInstance.patch<IHttpResponse<T>>(
        url,
        data,
        config,
      )
      return response.data
    } catch (e: any) {
      return e.response.data
    }
  }

  async delete<T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<IHttpResponse<T>> {
    try {
      const response = await this.axiosInstance.delete<IHttpResponse<T>>(
        url,
        config,
      )
      return response.data
    } catch (e: any) {
      return e.response.data
    }
  }
}
