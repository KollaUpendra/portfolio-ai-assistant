import app from"./src/app.js";
import { env }  from "./src/config/env.js"

const PORT = env.PORT;

app.listen(PORT, () => {
    console.log(`server is running on the port: ${PORT}`)
})