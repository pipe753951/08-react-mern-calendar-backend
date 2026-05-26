import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_CONNECTION, {
      dbName: "mern-calendar",
    });
    console.info("Database connected");
  } catch (originError) {
    console.error(originError);
    throw new Error("Hubo un error al conectarse a una base de datos MongoDB", {
      cause: originError,
    });
  }
};

export default connectDb;
