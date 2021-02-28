export { };

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';

      REACT_APP_PROJECT_NAME: string;
      REACT_APP_VERSION: string;
      REACT_APP_ID: string;
      REACT_APP_SENTRY_DNS: string;
    }
  }
}
