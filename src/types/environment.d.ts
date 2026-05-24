export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // Definimos que 'PORT' siempre estará presente en nuestro proyecto como un string
      PORT: string;

      // Aquí irás agregando tus futuras variables del curso, por ejemplo:
      // MONGO_URI: string;
      // JWT_SECRET: string;
    }
  }
}
