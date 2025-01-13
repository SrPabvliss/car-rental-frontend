import type { ROLE_ENUM } from "@/features/users/constants/RoleEnum"

export interface IAccount {
  userId: number
  email: string
  role: ROLE_ENUM
}
