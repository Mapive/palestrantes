import React, { useState, useEffect } from 'react';
import api from '../services/api';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash, faNewspaper, faEye, faEyeSlash, faEraser } from '@fortawesome/free-solid-svg-icons';


export default function Palestrantes() {

  const [dataPalestrantes, setDataPalestrantes] = useState([]);
  const [nomePalestrante, setNomePalestrante] = useState("");
  const [palestrantesFiltrados, setPalestrantesFiltrados] = useState([]);
  const [pesquisaRealizada, setPesquisaRealizada] = useState(false);
  const [mostrarDetalhes, setMostrarDetalhes] = useState({});
  const [deletingPalestranteId, setDeletingPalestranteId] = useState(null);
  const [usuarioFuncao, setUsuarioFuncao] = useState(null);
  const [historico, setHistorico] = useState([]);
  const [historicoFiltrado, setHistoricoFiltrado] = useState([]);



  useEffect(() => {
    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
    if (usuarioLogado) {
      setUsuarioFuncao(usuarioLogado.function);
    }
  }, []);


  useEffect(() => {
    api.get('/palestrantes').then((response) => {
      const getDatabase = [];
      response.data.forEach((data) => {
        if (data.delete !== "true") {
          getDatabase.push(data);
        }
      });
      setDataPalestrantes(getDatabase);
    });
  }, []);


  useEffect(() => {
    api.get('/historico').then((response) => {
      setHistorico(response.data);
    })
      .catch((error) => {
        console.error('Erro ao buscar historico das últimas palestras:', error);
      });
  }, []);


  const handleBuscar = () => {

    const filtrados = dataPalestrantes.filter((palestrante) => {
      return palestrante.name.toLowerCase().includes(nomePalestrante.toLowerCase()) ||
        palestrante.theme.toLowerCase().includes(nomePalestrante.toLowerCase());
    });

    setPalestrantesFiltrados(filtrados);
    setPesquisaRealizada(true);


    // Filtrar o histórico com base no primeiro palestrante encontrado
    if (filtrados.length > 0) {
      filtrarHistorico(filtrados[0].name, filtrados[0].company);
    }

  };

  const filtrarHistorico = (nomePalestrante, company) => {
    const historicoFiltrado = historico.filter(item =>
      item.name.toLowerCase().includes(nomePalestrante.toLowerCase()) &&
      item.company.toLowerCase().includes(company.toLowerCase())
    ).slice(-3); // Limita o resultado aos 3 últimos registros
    setHistoricoFiltrado(historicoFiltrado);
  };



  const clearSearch = () => {
    setNomePalestrante("");
    setPalestrantesFiltrados([]);
    setPesquisaRealizada(false);
  };

  const handleCadastrar = () => {
    window.location.href = "./ControleCad";
  };

  const handleAtualizar = (id) => {
    window.location.href = `./ControleUpdate?id=${id}`;
  };

  const handleCertificado = (id) => {
    window.location.href = `./Certificado?id=${id}`;
  };

  const handleClickOlho = (idPalestrante) => {
    setMostrarDetalhes(prevState => ({ ...prevState, [idPalestrante]: !prevState[idPalestrante] }));
  };

  const deletePalestrante = (idPalestrante) => {
    setDeletingPalestranteId(idPalestrante);
    setDataPalestrantes(oldPalestrantes => oldPalestrantes.filter(palestrante => palestrante.id !== idPalestrante));
  };

  const confirmDelete = (idPalestrante) => {
    if (window.confirm('Tem certeza que deseja remover esse palestrante?')) {
      deletePalestrante(idPalestrante);
    }
  };

  useEffect(() => {
    if (deletingPalestranteId !== null) {
      const oldPalestranteExists = dataPalestrantes.some(palestrante => palestrante.id === deletingPalestranteId);
      if (!oldPalestranteExists) {
        alert('Palestrante removido com sucesso!');
      } else {
        alert('Falha ao remover o palestrante.');
      }
      setDeletingPalestranteId(null);
    }
  }, [dataPalestrantes, deletingPalestranteId]);



  return (
    <main id='consultaPalestrantes'>
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <input
              type="text"
              class="form-control"
              placeholder="Digite o nome do palestrante ou tema da palestra"
              value={nomePalestrante}
              onChange={(e) => setNomePalestrante(e.target.value)}
            />
          </div>
          <div class="col-md-6">
            <Button variant="" style={{ color: "white", backgroundColor: "#1094AB" }} onClick={handleBuscar} className="ml-3">
              <span> </span> BUSCAR
            </Button>
            {usuarioFuncao !== "prof" && (
              <Button variant="" style={{ margin: "0 0 0 10px", color: "white", backgroundColor: "#1094AB" }} onClick={handleCadastrar} className="ml-3">
                <span> </span>CADASTRAR
              </Button>
            )}
            <Button id="btnLim" variant="light" style={{ margin: "0 0 0 10px" }} onClick={clearSearch} className="ml-3" data-name="Limpar">
              <FontAwesomeIcon icon={faEraser} />
            </Button>
          </div>
        </div>
        {
          pesquisaRealizada && (palestrantesFiltrados.length === 0 ? (
            <div>
              <p>Nenhum palestrante encontrado.</p>
            </div>
          ) : (
            <Card style={{ marginTop: "15px", padding: "10px" }}>
              <ul style={{ listStyleType: "none", paddingLeft: "0" }}>
                {palestrantesFiltrados.map((palestrante) => (
                  <li key={palestrante.id} style={{ marginTop: "20px" }}>
                    {palestrante.name}
                    <FontAwesomeIcon
                      icon={mostrarDetalhes[palestrante.id] ? faEyeSlash : faEye} style={{ margin: "0 0 0 10px", color: "#8c8c8c" }}
                      onClick={() => handleClickOlho(palestrante.id)} />
                    {mostrarDetalhes[palestrante.id] && (
                      <div>
                        <Card style={{ margin: "15px", padding: "10px", color: "#8c8c8c" }}>
                          <p><strong>Nome:</strong> {palestrante.name}</p>
                          <p><strong>E-mail:</strong> {palestrante.email}</p>
                          <p><strong>Telefone:</strong> {palestrante.phone}</p>
                          <p><strong>Empresa:</strong> {palestrante.company}</p>
                          <p><strong>Cargo:</strong> {palestrante.position}</p>
                          <p><strong>Área da palestra:</strong> {palestrante.area}</p>
                          <p><strong>Tema da palestra:</strong> {palestrante.theme}</p>
                          <strong>LinkedIn:</strong> {palestrante.linkedin}

                          <hr></hr>

                          <div>
                            <div>
                              <p><strong>Histórico das ultimas palestras:</strong></p>
                              <table style={{ borderSpacing: "10px" }}>
                                <thead>
                                  <tr>
                                    <th style={{ padding: "10px" }}>Data</th>
                                    <th style={{ padding: "10px" }}>Disciplina</th>
                                    <th style={{ padding: "10px" }}>Professor Responsavel</th>
                                  </tr>
                                </thead>
                                <tbody>

                                  {historicoFiltrado.map((item, index) => (
                                    <tr key={index}>
                                      <td style={{ padding: "10px" }}>{item.date}</td>
                                      <td style={{ padding: "10px" }}>{item.disciplina}</td>
                                      <td style={{ padding: "10px" }}>{item.responsible}</td>
                                    </tr>
                                  ))}

                                </tbody>
                              </table>
                            </div>
                          </div>

                        </Card>
                      </div>
                    )}
                    {pesquisaRealizada && (
                      <>
                        {usuarioFuncao !== "prof" && (
                          <>
                            <Button id="btnUpd" variant="" style={{ color: "white", backgroundColor: "#FFB500" }} onClick={() => handleAtualizar(palestrante.id)} data-name="Atualizar">
                              <FontAwesomeIcon icon={faPen} />
                            </Button>
                            <Button id="btnDel" variant="danger" onClick={() => confirmDelete(palestrante.id)} data-name="Remover">
                              <FontAwesomeIcon icon={faTrash} />
                            </Button>
                          </>
                        )}
                        <Button id="btnCert" variant="" style={{ margin: "0 0 0 10px", color: "white", backgroundColor: "#1094AB" }} onClick={() => handleCertificado(palestrante.id)} data-name="Certificado">
                          <FontAwesomeIcon icon={faNewspaper} />
                        </Button>

                        <hr></hr>

                      </>
                    )}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
      </div>
    </main>
  );
}


