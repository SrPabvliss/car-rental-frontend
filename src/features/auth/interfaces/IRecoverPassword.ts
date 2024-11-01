export interface IRecoverPasswordRequest {
  email: string
}

export interface IResetPassword {
  token: string
  newPassword: string
  confirmPassword: string
}
