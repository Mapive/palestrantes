import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash, faNewspaper, faEye, faEyeSlash, faEraser} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Palestrantes({ users, setUsers }) {
  const [dataPalestrantes, setDataPalestrantes] = useState([]);
  const [nomePalestrante, setNomePalestrante] = useState("");
  const [palestrantesFiltrados, setPalestrantesFiltrados] = useState([]);
  const [pesquisaRealizada, setPesquisaRealizada] = useState(false);
  const [mostrarDetalhes, setMostrarDetalhes] = useState({});
  const [usuarioFuncao, setUsuarioFuncao] = useState(null);
  const [historico, setHistorico] = useState([]);
  const [historicoFiltrado, setHistoricoFiltrado] = useState([]);

  //habilita o tecla 'enter'
  const handleEnterKeyPress = (e) => {
    if (e.key === "Enter") {
      handleBuscar();
    }
  };

  useEffect(() => {
    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
    if (usuarioLogado) {
      setUsuarioFuncao(usuarioLogado.function);
    }
  }, []);

  useEffect(() => {
    //função assíncrona para buscar dados
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8800");
        // Filtra os palestrantes deletados dos dados da resposta
        const getDatabase = response.data.filter(
          (data) => data.delete !== "true"
        );
        // Ordena os dados filtrados pelo nome do palestrante
        setDataPalestrantes(
          getDatabase.sort((a, b) => (a.name > b.name ? 1 : -1))
        );
      } catch (error) {
        console.error("Erro ao buscar palestrantes:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchDataHistorico = async () => {
      try {
        const response = await axios.get("http://localhost:8800/historico");
        setHistorico(response.data);
      } catch (error) {
        console.error("Erro ao buscar historico das últimas palestras:", error);
      }
    };

    fetchDataHistorico();
  }, []);

  const handleBuscar = () => {
    const filtrados = dataPalestrantes.filter((palestrante) => {
      return (
        palestrante.name
          .toLowerCase()
          .includes(nomePalestrante.toLowerCase()) ||
        palestrante.theme.toLowerCase().includes(nomePalestrante.toLowerCase())
      );
    });

    setPalestrantesFiltrados(filtrados);
    setPesquisaRealizada(true);

    // Filtrar o histórico com base no primeiro palestrante encontrado
    if (filtrados.length > 0) {
      filtrarHistorico(filtrados[0].name, filtrados[0].email);
    } else {
      setHistoricoFiltrado([]);
    }
  };

  const filtrarHistorico = (name, email) => {
    const historicoFiltrado = historico
      .filter(
        (item) =>
          item.nome_palestrante.toLowerCase().includes(name.toLowerCase()) &&
          item.email_palestrante.toLowerCase().includes(email.toLowerCase())
      )
      .slice(-3); // Limita o resultado aos 3 últimos registros
    setHistoricoFiltrado(historicoFiltrado);
  };

  const clearSearch = () => {
    setNomePalestrante("");
    setPalestrantesFiltrados([]);
    setPesquisaRealizada(false);
    setHistoricoFiltrado([]);
  };

  //-----Utilizar o navigate para cadastrar, idem o atualizar
  const handleCadastrar = () => {
    window.location.href = "./ControleCad";
  };

  const navigate = useNavigate();

  const handleClickOlho = (idPalestrante) => {
    setMostrarDetalhes((prevState) => ({
      ...prevState,
      [idPalestrante]: !prevState[idPalestrante],
    }));
  };

  const handleAtualizar = (id) => {
    navigate(`/ControleUpdate/${id}`);
    //window.location.href = `./ControleUpdate?id=${id}`;
  };

  const handleCertificado = (id) => {
    window.location.href = `./Certificado?id=${id}`;
    //navigate(`/Certificado/${id}`);
  };

  //-------------------------------------------------------------------------------------------------------------
  //------- A FUNÇÃO FUNCIONA POREM NÃO ESTA SENDO EXIBIDO A MESAGEM DE SUCESSO NA TELA
  const handleDelete = async (id) => {
    // Mostra um aviso de confirmação para o usuário antes de deletar o palestrante
    const confirmDelete = window.confirm(
      "Tem certeza que deseja remover o palestrante?"
    );

    // Se o usuário confirmar a exclusão, realiza a exclusão do palestrante
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8800/Controle/${id}`); // Faz a requisição DELETE para a URL da API
        const newArray = users.filter((user) => user.id !== id); // Filtra os usuários para remover o palestrante excluído
        setUsers(newArray); // Atualiza o estado 'users' com o novo array sem o palestrante excluído
        toast.success("Palestrante removido com sucesso!"); // Exibe uma notificação de sucesso
        // Limpar o campo de busca
        setNomePalestrante("");
      } catch (error) {
        toast.error("Erro ao remover palestrante: " + error.message); // Exibe uma notificação de erro em caso de falha na exclusão
      }
    }

    //setOnEdit(null); // Limpa o estado 'onEdit'
  };
  //---------------------------------------------------------------------------------------------------------------------

  return (
    <main id="consultaPalestrantes">
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <input
              type="text"
              class="form-control"
              placeholder="Digite o nome do palestrante ou tema da palestra"
              value={nomePalestrante}
              onChange={(e) => setNomePalestrante(e.target.value)}
              onKeyDown={handleEnterKeyPress}
            />
          </div>
          <div class="col-md-6">
            <Button
              variant=""
              style={{ color: "white", backgroundColor: "#1094AB" }}
              onClick={nomePalestrante.trim() ? handleBuscar : null}
              className="ml-3"
              disabled={!nomePalestrante.trim()}
            >
              <span> </span> BUSCAR
            </Button>

            {usuarioFuncao !== "prof" && (
              <Button
                variant=""
                style={{
                  margin: "0 0 0 10px",
                  color: "white",
                  backgroundColor: "#1094AB",
                }}
                onClick={handleCadastrar}
                className="ml-3"
              >
                <span> </span>CADASTRAR
              </Button>
            )}
            <Button
              id="btnLim"
              variant="light"
              style={{ margin: "0 0 0 10px" }}
              onClick={clearSearch}
              className="ml-3"
              data-name="Limpar"
            >
              <FontAwesomeIcon icon={faEraser} />
            </Button>
          </div>
        </div>
        {pesquisaRealizada &&
          (palestrantesFiltrados.length === 0 ? (
            <div>
              <p>Nenhum palestrante encontrado.</p>
            </div>
          ) : (
            <Card style={{ marginTop: "15px", padding: "10px" }}>
              <ul style={{ listStyleType: "none", paddingLeft: "0" }}>
                {palestrantesFiltrados.map((item) => (
                  <li key={item.id} style={{ marginTop: "20px" }}>
                    {item.name}
                    <FontAwesomeIcon
                      icon={mostrarDetalhes[item.id] ? faEyeSlash : faEye}
                      style={{ margin: "0 0 0 10px", color: "#8c8c8c" }}
                      onClick={() => handleClickOlho(item.id)}
                    />
                    {mostrarDetalhes[item.id] && (
                      <div>
                        <Card
                          style={{
                            margin: "15px",
                            padding: "10px",
                            color: "#8c8c8c",
                          }}
                        >
                          <p><strong>Nome:</strong> {item.name}</p>
                          <p><strong>E-mail:</strong> {item.email}</p>
                          <p><strong>Telefone:</strong> {item.phone}</p>
                          <p><strong>Empresa:</strong> {item.company}</p>
                          <p><strong>Cargo:</strong> {item.position}</p>
                          <p><strong>Área da palestra:</strong> {item.area}</p>
                          <p><strong>Tema da palestra:</strong> {item.theme}</p>
                          <strong>LinkedIn:</strong> {item.linkedin}
                          <hr></hr>
                          <div>
                            <div>
                              <p>
                                <strong>Histórico das ultimas palestras:</strong>
                              </p>
                              <table style={{ borderSpacing: "10px" }}>
                                <thead>
                                  <tr>
                                    <th style={{ padding: "10px" }}>Data</th>
                                    <th style={{ padding: "10px" }}>Disciplina</th>
                                    <th style={{ padding: "10px" }}>Professor Responsavel</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {historicoFiltrado.map(
                                    (itemHistorico, index) => (
                                      <tr key={index}>
                                        <td style={{ padding: "10px" }}>
                                          {new Date(
                                            itemHistorico.data_palestra
                                          ).toLocaleDateString()}
                                        </td>
                                        <td style={{ padding: "10px" }}>
                                          {itemHistorico.disciplina_certif}
                                        </td>
                                        <td style={{ padding: "10px" }}>
                                          {itemHistorico.docente_respon}
                                        </td>
                                      </tr>
                                    )
                                  )}
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
                            <Button
                              id="btnUpd"
                              variant=""
                              style={{
                                color: "white",
                                backgroundColor: "#FFB500",
                              }}
                              onClick={() => handleAtualizar(item.id)}
                              data-name="Atualizar"
                            >
                              <FontAwesomeIcon icon={faPen} />
                            </Button>
                            <Button
                              id="btnDel"
                              variant="danger"
                              onClick={() => handleDelete(item.id)}
                              data-name="Remover"
                            >
                              <FontAwesomeIcon icon={faTrash} />
                            </Button>
                          </>
                        )}
                        <Button
                          id="btnCert"
                          variant=""
                          style={{
                            margin: "0 0 0 10px",
                            color: "white",
                            backgroundColor: "#1094AB",
                          }}
                          onClick={() => handleCertificado(item.id)}
                          data-name="Certificado"
                        >
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
