const AR_KEYS = {
  AUTH: '/auth',
  USERS: '/users',
}

export const API_ROUTES = {
  AUTH: {
    LOGIN: AR_KEYS.AUTH + '/login',
    RESTORE_PASSWORD: AR_KEYS.AUTH + '/restore-password',
  },
  USERS: {
    GET_ALL: AR_KEYS.USERS,
    CREATE: AR_KEYS.USERS,
    GET_BY_ID: (id: number) => `${AR_KEYS.USERS}/${id}`,
    UPDATE: (id: number) => `${AR_KEYS.USERS}/${id}`,
    REMOVE: (id: number) => `${AR_KEYS.USERS}/${id}`,
  },
}
