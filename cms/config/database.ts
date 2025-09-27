import path from 'path';

export default ({ env }) => {
  const defaultConfig = {
    STRAPI_PORT: 3004,
    NODE_ENV: 'production',
    DATABASE_CLIENT: 'postgres',
    DATABASE_HOST: 'db',
    DATABASE_PORT: 5432,
    DATABASE_NAME: 'strapi',
    DATABASE_USERNAME: 'strapi',
    DATABASE_PASSWORD: 'strapi',
    DATABASE_SSL: false,
  };

  const client = env('DATABASE_CLIENT', defaultConfig.DATABASE_CLIENT);

  const connections = {
    mysql: {
      connection: {
        host: env('DATABASE_HOST', defaultConfig.DATABASE_HOST),
        port: env.int('DATABASE_PORT', 3306),
        database: env('DATABASE_NAME', defaultConfig.DATABASE_NAME),
        user: env('DATABASE_USERNAME', defaultConfig.DATABASE_USERNAME),
        password: env('DATABASE_PASSWORD', defaultConfig.DATABASE_PASSWORD),
        ssl: env.bool('DATABASE_SSL', defaultConfig.DATABASE_SSL) && {
          key: env('DATABASE_SSL_KEY'),
          cert: env('DATABASE_SSL_CERT'),
          ca: env('DATABASE_SSL_CA'),
          capath: env('DATABASE_SSL_CAPATH'),
          cipher: env('DATABASE_SSL_CIPHER'),
          rejectUnauthorized: env.bool('DATABASE_SSL_REJECT_UNAUTHORIZED', true),
        },
      },
      pool: { min: env.int('DATABASE_POOL_MIN', 2), max: env.int('DATABASE_POOL_MAX', 10) },
    },
    postgres: {
      connection: {
        connectionString: env('DATABASE_URL'),
        host: env('DATABASE_HOST', defaultConfig.DATABASE_HOST),
        port: env.int('DATABASE_PORT', defaultConfig.DATABASE_PORT),
        database: env('DATABASE_NAME', defaultConfig.DATABASE_NAME),
        user: env('DATABASE_USERNAME', defaultConfig.DATABASE_USERNAME),
        password: env('DATABASE_PASSWORD', defaultConfig.DATABASE_PASSWORD),
        ssl: env.bool('DATABASE_SSL', defaultConfig.DATABASE_SSL) && {
          key: env('DATABASE_SSL_KEY'),
          cert: env('DATABASE_SSL_CERT'),
          ca: env('DATABASE_SSL_CA'),
          capath: env('DATABASE_SSL_CAPATH'),
          cipher: env('DATABASE_SSL_CIPHER'),
          rejectUnauthorized: env.bool('DATABASE_SSL_REJECT_UNAUTHORIZED', true),
        },
        schema: env('DATABASE_SCHEMA', 'public'),
      },
      pool: { min: env.int('DATABASE_POOL_MIN', 2), max: env.int('DATABASE_POOL_MAX', 10) },
    },
    sqlite: {
      connection: {
        filename: path.join(
          __dirname,
          '..',
          '..',
          env('DATABASE_FILENAME', '.tmp/data.db')
        ),
      },
      useNullAsDefault: true,
    },
  };

  const connectionConfig = connections[client] || connections[defaultConfig.DATABASE_CLIENT];

  return {
    connection: {
      client,
      ...connectionConfig,
      acquireConnectionTimeout: env.int('DATABASE_CONNECTION_TIMEOUT', 60000),
    },
  };
};
