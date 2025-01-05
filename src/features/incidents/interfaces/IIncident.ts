/* eslint-disable @typescript-eslint/no-empty-object-type */
export enum INCIDENT_STATUS {
  PENDING = 'Pendiente',
  PROCESSED = 'Procesado',
  RESOLVED = 'Resuelto',
}

export interface IIncident {
  id: number
  description: string
  repairCost: number
  reportedAt: Date
  photoEvidenceUrl: null
  status: INCIDENT_STATUS
}

export interface ICreateIncident extends Omit<IIncident, 'id'> {
  rentalId: number
}

export interface IUpdateIncident extends Partial<ICreateIncident> {}
