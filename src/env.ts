const env = {
  ENV: 'FROM_ENV',
  PORT: 'FROM_ENV',
  ROUTE_ROOT: '/api/v1',
  database: {   
    DRIVER: 'postgres',
    HOST: 'FROM_ENV',
    PORT: 'FROM_ENV',
    USERNAME: 'FROM_ENV',
    PASSWORD: 'FROM_ENV',
    NAME: 'FROM_ENV'    
  }, 
  i18n: {
    LOCALES: ['br', 'en'],
    DEFAULT_LOCALE: 'br'
  },
  paginatedResult: {
    defaultItemsPerPage: 10,
    defaultCurrentPage: 1
  },
  security: {
    JWT_KEY: 'FROM_ENV',
    JWT_EXPIRES_IN: 1440, // minutes (1440 = 1d)
  },
}

export default env
