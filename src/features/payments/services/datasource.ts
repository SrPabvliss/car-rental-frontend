import { API_ROUTES } from '@/core/api/routes/api-routes'
import { AxiosClient } from '@/core/infrastructure/http/axios-client'
import type { IHttpHandler } from '@/core/interfaces/IHttpHandler'
import type { IFilter } from '@/shared/interfaces/IFilter'

import type { CreatePaymentReqDto, IPayment, UpdatePaymentReqDto } from '../interfaces/IPayment'

interface PaymentDatasource {
  getAll: (filters: IFilter) => Promise<{
    items: IPayment[]
    totalItems: number
    page: number
    perPage: number
  }>
  getById: (id: number) => Promise<IPayment>
  create: (payment: CreatePaymentReqDto) => Promise<IPayment>
  update: (id: number, payment: UpdatePaymentReqDto) => Promise<IPayment>
  delete: (id: number) => Promise<IPayment>
}

export class PaymentDatasourceImpl implements PaymentDatasource {
  private httpClient: IHttpHandler
  private static instance: PaymentDatasourceImpl

  private constructor() {
    this.httpClient = AxiosClient.getInstance()
  }

  static getInstance(): PaymentDatasourceImpl {
    if (!PaymentDatasourceImpl.instance) {
      PaymentDatasourceImpl.instance = new PaymentDatasourceImpl()
    }
    return PaymentDatasourceImpl.instance
  }

  async getAll(filters: IFilter): Promise<{
    items: IPayment[]
    totalItems: number
    page: number
    perPage: number
  }> {
    const data = await this.httpClient.get<{
      items: IPayment[]
      totalItems: number
      page: number
      perPage: number
    }>(API_ROUTES.PAYMENTS.GET_ALL, {
      params: filters
    })
    return data
  }

  async getById(id: number): Promise<IPayment> {
    const data = await this.httpClient.get<IPayment>(
      API_ROUTES.PAYMENTS.GET_BY_ID(id)
    )
    return data
  }

  async create(payment: CreatePaymentReqDto): Promise<IPayment> {
    const data = await this.httpClient.post<IPayment>(
      API_ROUTES.PAYMENTS.CREATE,
      payment
    )
    return data
  }

  async update(id: number, payment: UpdatePaymentReqDto): Promise<IPayment> {
    const data = await this.httpClient.patch<IPayment>(
      API_ROUTES.PAYMENTS.UPDATE(id),
      payment
    )
    return data
  }

  async delete(id: number): Promise<IPayment> {
    const data = await this.httpClient.delete<IPayment>(
      API_ROUTES.PAYMENTS.DELETE(id)
    )
    return data
  }
}