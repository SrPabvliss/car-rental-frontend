/* eslint-disable @typescript-eslint/no-empty-object-type */

export type CarStatus = 'available' | 'maintenance' | 'rented' | 'unavailable'
export type CarType = 'sedan' | 'suv' | 'hatchback' | 'pickup' | 'van' | 'coupe'

export interface ICar {
  id: number
  brand: string
  model: string
  color: string
  plate: string
  type: CarType
  status: CarStatus
  year: number
  mileage: number
  dailyRate: number
  imageUrl?: string
}

export interface ICreateCar
  extends Omit<ICar, 'id'> {}

export interface IUpdateCar
  extends Partial<ICreateCar> {}
