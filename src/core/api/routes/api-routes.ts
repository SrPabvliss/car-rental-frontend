const AR_KEYS = {
  AUTH: '/auth',
  USERS: '/users',
  VEHICLES: '/cars',
  RENTALS: '/rentals',
  PAYMENTS: '/payments',
  INCIDENTS: '/incidents',
}

export const API_ROUTES = {
  AUTH: {
    LOGIN: AR_KEYS.AUTH + '/signin',
    RESET_REQUEST: (email: string) => `${AR_KEYS.AUTH}/reset?email=${email}`,
    RESTORE_PASSWORD: (token: string) =>
      `${AR_KEYS.AUTH}/reset-password?token=${token}`,
    SIGN_UP: AR_KEYS.AUTH + '/signup',
  },
  USERS: {
    GET_ALL: AR_KEYS.USERS,
    GET_BY_ID: (id: number) => `${AR_KEYS.USERS}/${id}`,
    GET_CLIENTS: `${AR_KEYS.USERS}/clients`,
    UPDATE: (id: number) => `${AR_KEYS.USERS}/${id}`,
    REMOVE: (id: number) => `${AR_KEYS.USERS}/${id}`,
  },
  VEHICLES: {
    GET_ALL: AR_KEYS.VEHICLES,
    GET_BY_ID: (id: number) => `${AR_KEYS.VEHICLES}/${id}`,
    CREATE: AR_KEYS.VEHICLES,
    UPDATE: (id: number) => `${AR_KEYS.VEHICLES}/${id}`,
    DELETE: (id: number) => `${AR_KEYS.VEHICLES}/${id}`,
    FILTER: `${AR_KEYS.VEHICLES}/filter`,
    COUNT: `${AR_KEYS.VEHICLES}/count`,
  },
  RENTALS: {
    GET_ALL: AR_KEYS.RENTALS,
    GET_BY_ID: (id: number) => `${AR_KEYS.RENTALS}/${id}`,
    GET_BY_USER_ID: (userId: number) => `${AR_KEYS.RENTALS}/users/${userId}`,
    CREATE: AR_KEYS.RENTALS,
    UPDATE: (id: number) => `${AR_KEYS.RENTALS}/${id}`,
    DELETE: (id: number) => `${AR_KEYS.RENTALS}/${id}`,
    SEND_INVOICE: (id: number) => `${AR_KEYS.RENTALS}/${id}/send-invoice`,
  },
  PAYMENTS: {
    GET_ALL: AR_KEYS.PAYMENTS,
    GET_BY_ID: (id: number) => `${AR_KEYS.PAYMENTS}/${id}`,
    CREATE: AR_KEYS.PAYMENTS,
    UPDATE: (id: number) => `${AR_KEYS.PAYMENTS}/${id}`,
    DELETE: (id: number) => `${AR_KEYS.PAYMENTS}/${id}`,
  },
  INCIDENTS: {
    GET_ALL: AR_KEYS.INCIDENTS,
    GET_BY_RENTAL_ID: (rentalId: number) =>
      `${AR_KEYS.INCIDENTS}/rentals/${rentalId}`,
    GET_BY_ID: (id: number) => `${AR_KEYS.INCIDENTS}/${id}`,
    CREATE: AR_KEYS.INCIDENTS,
    UPDATE: (id: number) => `${AR_KEYS.INCIDENTS}/${id}`,
    DELETE: (id: number) => `${AR_KEYS.INCIDENTS}/${id}`,
  },
}
