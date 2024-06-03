import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cabecalho from './pages/Components/Cabecalho'
import Rodape from './pages/Components/Rodape'
import { useEffect, useState } from "react";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from "react-router-dom";
import Certificado from "./pages/Certificado";
import Controle from "./pages/Controle";
import ControleCad from "./pages/ControleCad";
import ControleUpdate from "./pages/ControleUpdate";
import Login from "./pages/Login"; 
import Palestrantes from './pages/Palestrantes';


export default function App() {

   // Define dois estados usando o hook 'useState':
  // - users: armazena a lista de usuários
  // - onEdit: armazena o usuário que está sendo editado
  const [users, setUsers] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  // Função assíncrona que busca os usuários da API
  const getUsers = async () => {
    try{
      const res = await axios.get("http://localhost:8800");
      setUsers(res.data.sort((a, b) => (a.name > b.name ? 1 : -1)));
    }catch(error){
      // Exibe um toast de erro se houver algum problema na requisição
      toast.error(error);
    }
  };
  // Efeito colateral que é executado após a renderização inicial e toda vez que 'setUsers' é chamado
  useEffect(() => {
    getUsers();
  }, [setUsers]);

  return (
    <div className="App">
        <Cabecalho />
          <Routes>
            <Route path="Login" element={<Login />} /> 
            <Route path="/" element={<Login />} /> 
            <Route path="Controle" element={<Controle users={users} setUsers={setUsers} setOnEdit={setOnEdit} />} />
            <Route path="Certificado" element={<Certificado />} />
            <Route path="ControleCad" element={<ControleCad onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers} />} /> 
            <Route path="ControleUpdate/:id" element={<ControleUpdate />} />
            <Route path="Palestrantes" element={<Palestrantes users={users} setUsers={setUsers} setOnEdit={setOnEdit} />} /> 
          </Routes>
        <Rodape />
    </div>
  );
}