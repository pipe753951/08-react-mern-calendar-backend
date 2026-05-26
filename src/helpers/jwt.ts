import jwt from "jsonwebtoken";

const generateJWT = async (uid: string, name: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const payload = { uid, name };

    jwt.sign(
      payload,
      process.env.JWT_SIGN,
      { expiresIn: "2h" },
      (error, token) => {
        if (error) {
          console.error(
            new Error("Un error inesperado ocurrió en la generación de JWT", {
              cause: error,
            }),
          );
          reject("No fue posible generar un token JWT");
        }

        resolve(token!);
      },
    );
  });
};

export { generateJWT };
