import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cabecalho from './pages/Components/Cabecalho'
import Rodape from './pages/Components/Rodape'

export default function App() {
  return (
    <div className="App">
      <Cabecalho />
      <Rodape />
    </div>
  );
}