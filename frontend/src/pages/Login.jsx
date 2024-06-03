import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import validaUser from '../validaUser';  


const Login = () => {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false); 
  const navigate = useNavigate();

  const logar = (event) => {
    event.preventDefault();
    const usuarioLogado = validaUser(usuario, senha);
    if (usuarioLogado) {
      localStorage.setItem("usuarioLogado", JSON.stringify(usuarioLogado));
      navigate('/controle');
    } else {
      alert('Usuário ou senha incorretos');
      setUsuario('');   
      setSenha('');   
    }
  };
  

  const alternarVisibilidadeSenha = () => { 
    setMostrarSenha(!mostrarSenha);
  };

  return (
    <main id="pagLogin">
        <h3 id="iconLogin">Login</h3>
        <hr></hr>
      <div className="mb-3">
        <label htmlFor="usuario">Usuário</label>
        <input
          type="text"
          name="usuario"
          id="usuario"
          className="form-control"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="senha">Senha</label>
        <input
          type={mostrarSenha ? 'text' : 'password'} 
          name="senha"
          id="senha"
          className="form-control"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              logar(e);
            }
          }}
        />
        <input
          type="checkbox"
          id="mostrarSenha"
          name="mostrarSenha"
          checked={mostrarSenha}
          onChange={alternarVisibilidadeSenha}
        />
        <label htmlFor="mostrarSenha">Mostrar senha</label>
      </div>
      <div className="mb-3">
        <button
          type="submit"
          id="entrarLog"
          className="btn-sucess form-control"
          value="Entrar"
          onClick={logar}
        >
          Entrar
        </button>
      </div>
    </main>
  );
};

export default Login;
