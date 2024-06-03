import express from "express";
import useRoutes from "./routes/users.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors()); //evita alguns conflitos de acesso rodamdo localmente

app.use("/", useRoutes); //rota simples

//faz o app excutar a porta 8800
app.listen(8800);