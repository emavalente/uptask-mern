import { CorsOptions } from "cors";

export const corsConfig: CorsOptions = {
  origin: (origin, callback) => {
    if (origin === process.env.CLIENT_URL) {
      callback(null, true);
    } else {
      callback(new Error("Error de CORS"));
    }
  },
};
