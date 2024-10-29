/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IHttpHandler {
  get<T>(url: string, config?: any): Promise<T>
  post<T>(url: string, data: any, config?: any): Promise<T>
  put<T>(url: string, data: any, config?: any): Promise<T>
  patch<T>(url: string, data?: any, config?: any): Promise<T>
  delete<T>(url: string, config?: any): Promise<T>
  setAccessToken(accessToken: string | null): void
}

export interface IHttpResponse<T> {
  success: boolean
  message: string
  data: T
  statusCode: number
  metadata: any
}
