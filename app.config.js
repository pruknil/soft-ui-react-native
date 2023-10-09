require('dotenv').config();

module.exports = ({config}) => {
  // Environment variables, either from local .env or from EAS secrets if in EAS server
  //config.extra.auth.appleAuthSecret = process.env.APPLE_AUTH_SECRET;
  switch (process.env.APP_ENV) {
    case 'dev':
      config.extra.api.host = 'http://192.168.5.114:8080';
      return config;
    default:
      throw new Error('Unexpected environment');
  }
};
