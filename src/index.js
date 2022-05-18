import React from 'react';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import Palestrantes from "./pages/Palestrantes";
import Certificado from "./pages/Certificado";
import Controle from "./pages/Controle";
import { createRoot } from 'react-dom/client';

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(
  <BrowserRouter>
    <App />
    <Routes>
      <Route path="/" element={<Palestrantes />} />
      <Route path="certificado" element={<Certificado />} />
      <Route path="controle" element={<Controle />} />
    </Routes>
  </BrowserRouter>
);