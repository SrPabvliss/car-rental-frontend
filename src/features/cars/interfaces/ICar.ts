import type { CAR_STATUS_ENUM } from '../constants/CarStatusEnum'
import type { CAR_TYPE_ENUM } from '../constants/CarTypeEnum'

export interface ICar {
  id: number
  brand: string
  color: string
  dailyRate: number
  imageUrl: string
  mileage: number
  model: string
  plate: string
  status: CAR_STATUS_ENUM
  type: CAR_TYPE_ENUM
  year: number
}

export type ICreateCar = Omit<ICar, 'id'>

export type IUpdateCar = Partial<ICreateCar>
