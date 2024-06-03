import  express  from "express";
import {getUsers,getUserById, addUser, updateUser, deleteUser,getDocentes,getDisciplinas,getCursos,getSemestre,addCertificado} from "../controllers/user.js";

const router = express.Router(); //indicando que sera uma rota

router.get("/", getUsers); // Obtem todos os palestrantes
router.post("/ControleCad", addUser); //cadastrar palestrante
router.get("/ControleUpdate/:id", getUserById); // Obtem palestrante pelo Id
router.get("/Certificado/:id", getUserById); //certificado
router.post("/certificado", addCertificado); //Salva o certificado

router.get("/docentes", getDocentes); // Obtem docentes
router.get("/disciplinas", getDisciplinas); // Obtem disciplinas
router.get("/curso", getCursos); // Obtem cursos
router.get("/semestre", getSemestre); // Obtem semestre


router.put("/ControleUpdate/:id", updateUser); //atualizar palestrante
router.delete("/Controle/:id", deleteUser); //deletar palestrante

export default router;
