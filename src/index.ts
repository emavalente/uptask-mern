import server from "./server";
import colors from "colors";

const port = process.env.PORT || 4000;

// Habilito la escucha del servidor en un puerto específico.
server.listen(port, () => console.log(colors.bold.cyan(` SERVER RUNNING ON PORT: ${port}`)));
