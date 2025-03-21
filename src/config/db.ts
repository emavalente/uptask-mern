import mongoose from "mongoose";
import colors from "colors";
import { exit } from "node:process";

export const dbConnection = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.DB_URL, {});
    const url = `${connection.host}:${connection.port}`;
    console.log(colors.bold.green(" MONGO-DB"), colors.bold.magenta(`DATABASE CONNECTED ON: ${url}`));
  } catch (error) {
    console.log(colors.bold.green(" MONGO-DB"), colors.bold.red("DATABASE CONNECTION FAILED"), error.message);
    exit();
  }
};
