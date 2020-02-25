const nodeEnv = process.env.NODE_ENV || 'development';

const envConfig = {
  dialect: process.env.DB_CONNECTION,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  define: {
    charset: 'utf8',
    collate: 'utf8_general_ci',
  },

};

module.exports = {
  [nodeEnv]: envConfig,
};
