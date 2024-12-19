/* eslint-disable @typescript-eslint/no-empty-object-type */
import type { IUser } from '@/features/users/interfaces/IUser'
import type { ICar } from '@/features/vehicles/interfaces/ICar'

export enum RentalStatus {
  ACTIVE = 'Activo',
  CANCELED = 'Cancelado',
  COMPLETED = 'Completado',
  RESERVED = 'Reservado',
  PAID = 'Pagado',
}

export interface IRental {
  id: number
  startDate: Date
  endDate: Date
  actualEndDate: Date | null
  total: number
  status: RentalStatus
  user: IUser
  employee: IUser
  car: ICar
  payments: any[]
  incidents: any[]
}

export interface ICreateRental
  extends Omit<
    IRental,
    | 'id'
    | 'actualEndDate'
    | 'payments'
    | 'incidents'
    | 'car'
    | 'user'
    | 'employee'
  > {
  employeeId?: number
  userId: number
  carId: number
}

export interface IUpdateRental extends Partial<ICreateRental> {}
