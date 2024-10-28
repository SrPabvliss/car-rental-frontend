const AR_KEYS = {
  AUTH: '/auth',
  USERS: '/users',
}

export const API_ROUTES = {
  AUTH: {
    LOGIN: AR_KEYS.AUTH + '/login',
    RESET_REQUEST: (email: string) => `${AR_KEYS.AUTH}'/reset?email=${email}`,
    RESTORE_PASSWORD: (token: string, newPassword: string) =>
      `${AR_KEYS.AUTH}/reset?token=${token}?newPassword=${newPassword}`,
  },
  USERS: {
    GET_ALL: AR_KEYS.USERS,
    CREATE: AR_KEYS.USERS,
    GET_BY_ID: (id: number) => `${AR_KEYS.USERS}/${id}`,
    UPDATE: (id: number) => `${AR_KEYS.USERS}/${id}`,
    REMOVE: (id: number) => `${AR_KEYS.USERS}/${id}`,
  },
}
