import type { IHttpHandler } from '@/core/interfaces/IHttpHandler'
import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios'
import { useToast } from 'vue-toastification'

export class AxiosClient implements IHttpHandler {
  private static instance: AxiosClient
  private axiosInstance: AxiosInstance
  private static readonly baseURL = (import.meta as any).env.VITE_API_URL || ''
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
        if (response.config.method !== 'get') {
          this.toast.success('Correcto')
        }
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

  private buildQueryParams(params?: Record<string, any>): string {
    if (!params) return ''
    const query = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        query.append(key, String(value))
      }
    })
    return query.toString() ? `?${query.toString()}` : ''
  }

  async get<T>(
    url: string,
    config?: AxiosRequestConfig & { params?: Record<string, any> },
  ): Promise<T> {
    try {
      const queryParams = config?.params
        ? ''
        : this.buildQueryParams(config?.params)

      const response = await this.axiosInstance.get<T>(
        `${url}${queryParams}`,
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
  ): Promise<T> {
    try {
      const response = await this.axiosInstance.post<T>(url, data, config)
      return response.data
    } catch (e: any) {
      return e.response.data
    }
  }

  async put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    try {
      const response = await this.axiosInstance.put<T>(url, data, config)
      return response.data
    } catch (e: any) {
      return e.response.data
    }
  }

  async patch<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    try {
      const response = await this.axiosInstance.patch<T>(url, data, config)
      return response.data
    } catch (e: any) {
      return e.response.data
    }
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.axiosInstance.delete<T>(url, config)
      return response.data
    } catch (e: any) {
      return e.response.data
    }
  }
}
