import React from 'react';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from "react-router-dom";
import { createRoot } from 'react-dom/client';

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

