export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // Definimos que 'PORT' siempre estará presente en nuestro proyecto como un string
      PORT: string;
      MONGO_DB_CONNECTION: string;
    }
  }
}
