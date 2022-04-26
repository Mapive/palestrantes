import React from 'react';
import { render } from "react-dom";
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import Palestrantes from "./pages/palestrantes";
import Certificado from "./pages/certificado";
import Cadastro from "./pages/cadastro";
import Home from "./pages/home";
import Sobre from "./pages/sobre";

const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <App />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="palestrantes" element={<Palestrantes />} />
      <Route path="cadastro" element={<Cadastro />} />
      <Route path="sobre" element={<Sobre />} />
      <Route path="certificado" element={<Certificado />} />
    </Routes>
    
  </BrowserRouter>,
  rootElement
);