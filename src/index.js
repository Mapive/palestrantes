import React from 'react';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, } from "react-router-dom";
//import Palestrantes from "./pages/Palestrantes";
import Certificado from "./pages/Certificado";
import Controle from "./pages/Controle";
import ControleCad from "./pages/ControleCad";
import ControleUpdate from "./pages/ControleUpdate";
import ControleDelete from "./pages/ControleDelete";
import Login from "./pages/Login"; 
import { createRoot } from 'react-dom/client';

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(
  <BrowserRouter>
    <App />
    <Routes>
      {/*<Route path="/" element={<Palestrantes />} />*/}
      <Route path="Login" element={<Login />} /> 
      <Route path="/" element={<Login />} /> 
      <Route path="Controle" element={<Controle />} />
      <Route path="Certificado" element={<Certificado />} />
      <Route path="ControleCad" element={<ControleCad />} /> 
      <Route path="ControleUpdate" element={<ControleUpdate />} />
      <Route path="ControleDelete" element={<ControleDelete />} /> 
    </Routes>
  </BrowserRouter>
);

