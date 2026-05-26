export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // Internet connections.
      PORT: string;
      MONGO_DB_CONNECTION: string;

      // Keys
      JWT_SIGN: string;
    }
  }
}
