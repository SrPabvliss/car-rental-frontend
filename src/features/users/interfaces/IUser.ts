import type { ROLE_ENUM } from '../constants/RoleEnum'

export interface IUser {
  id: number
  active: boolean
  address: string
  email: string
  name: string
  lastName: string
  phone: string
  role: ROLE_ENUM
}

export interface ICreateUser extends Omit<IUser, 'id'> {
  password: string
}

export type IUpdateUser = Partial<ICreateUser>
