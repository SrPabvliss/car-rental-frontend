import { API_ROUTES } from '@/core/api/routes/api-routes'
import { AxiosClient } from '@/core/infrastructure/http/axios-client'
import type { IHttpHandler } from '@/core/interfaces/IHttpHandler'

import type {
  IIncident,
  ICreateIncident,
  IUpdateIncident,
} from '../interfaces/IIncident'

interface IncidentDataSource {
  getAll: () => Promise<IIncident[]>
  getByRentalId: (rentalId: number) => Promise<IIncident[]>
  getById: (id: number) => Promise<IIncident>
  create: (incident: ICreateIncident) => Promise<IIncident>
  update: (id: number, incident: IUpdateIncident) => Promise<IIncident>
  delete: (id: number) => Promise<IIncident>
}

export class IncidentDataSourceImpl implements IncidentDataSource {
  private httpClient: IHttpHandler
  private static instance: IncidentDataSourceImpl

  private constructor() {
    this.httpClient = AxiosClient.getInstance()
  }

  static getInstance(): IncidentDataSourceImpl {
    if (!IncidentDataSourceImpl.instance) {
      IncidentDataSourceImpl.instance = new IncidentDataSourceImpl()
    }
    return IncidentDataSourceImpl.instance
  }

  async getAll(): Promise<IIncident[]> {
    const data = await this.httpClient.get<IIncident[]>(
      API_ROUTES.INCIDENTS.GET_ALL,
    )
    return data
  }

  async getByRentalId(rentalId: number): Promise<IIncident[]> {
    const data = await this.httpClient.get<IIncident[]>(
      API_ROUTES.INCIDENTS.GET_BY_RENTAL_ID(rentalId),
    )
    return data
  }

  async getById(id: number): Promise<IIncident> {
    const data = await this.httpClient.get<IIncident>(
      API_ROUTES.INCIDENTS.GET_BY_ID(id),
    )
    return data
  }

  async create(incident: ICreateIncident): Promise<IIncident> {
    const data = await this.httpClient.post<IIncident>(
      API_ROUTES.INCIDENTS.CREATE,
      {
        ...incident,
        photoEvidenceUrl: null,
        reportedAt: new Date()
          .toLocaleString('es-EC', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
          })
          .replace(', ', ':'),
      },
    )
    return data
  }

  async update(id: number, incident: IUpdateIncident): Promise<IIncident> {
    const data = await this.httpClient.patch<IIncident>(
      API_ROUTES.INCIDENTS.UPDATE(id),
      {
        ...incident,
        photoEvidenceUrl: null,
      },
    )
    return data
  }

  async delete(id: number): Promise<IIncident> {
    const data = await this.httpClient.delete<IIncident>(
      API_ROUTES.INCIDENTS.DELETE(id),
    )
    return data
  }
}
