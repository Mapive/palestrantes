import { db } from "../db.js";

export const getUsers = (_, res) => {
  const q = "SELECT * FROM palestrantes";

  db.query(q, (err, data) => {
    if (err) return res.json(err); //se tiver algum erro, ira retornar isso

    return res.status(200).json(data); // caso contrario, ira retornar um status code 200 dizendo que esta ok, e
  });
};

//Responsavel por CADASTRAR novos palestrantes
export const addUser = (req, res) => {
  const q =
    "INSERT INTO palestrantes (`name`, `email`, `phone`, `company`, `position`, `area`, `theme`, `linkedin`) VALUES(?)";

  const values = [
    req.body.name, // Nome do palestrante
    req.body.email, // Email do palestrante
    req.body.phone, // Telefone do palestrante
    req.body.company, // Empresa do palestrante
    req.body.position, // Posição do palestrante na empresa
    req.body.area, // Área de atuação do palestrante
    req.body.theme, // Tema de interesse do palestrante
    req.body.linkedin, // URL do perfil LinkedIn do palestrante
  ];

  db.query(q, [values], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Palestrante cadastrado com sucesso.");
  });
};

// Função para buscar um palestrante por ID
export const getUserById = (req, res) => {
  const { id } = req.params;
  const q = "SELECT * FROM palestrantes WHERE id = ?";

  db.query(q, [id], (err, data) => {
    if (err)
      return res.status(500).json({ message: "Erro ao buscar palestrante" });
    if (data.length === 0)
      return res.status(404).json({ message: "Palestrante não encontrado" });
    return res.status(200).json(data[0]);
  });
};

//Responsavel por BUSCAR os Docentes
export const getDocentes = (_, res) => {
  const q = "SELECT * FROM docentes";

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};

//Responsavel por BUSCAR as Disciplina
export const getDisciplinas = (_, res) => {
  const q = "SELECT * FROM disciplinas";

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};

//Responsavel por BUSCAR os Cursos
export const getCursos = (_, res) => {
  const q = "SELECT * FROM curso";

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};

//Responsavel por BUSCAR os Semestre
export const getSemestre = (_, res) => {
  const q = "SELECT * FROM semestre";

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};

//Responsavel por BUSCAR o historico dos Certificados gerados
export const getHistorico = (_, res) => {
  const q = "SELECT * FROM certificado";

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};

//Responsavel por SALVAR os historico
export const addHistor = (req, res) => {
  const q =
    "INSERT INTO certificado (`titulo`, `duracao`, `data_palestra`,`disciplina_certif`,`docente_respon`,`nome_palestrante`,`email_palestrante`) VALUES(?)";

  const values = [
    req.body.titulo,
    req.body.duracao,
    req.body.data_palestra,
    req.body.disciplina_certif,
    req.body.docente_respon,
    req.body.nome_palestrante,
    req.body.email_palestrante,
  ];

  db.query(q, [values], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Certificado emitido com sucesso.");
  });
};

//Responsavel por ATUALIZAR palestrante
export const updateUser = (req, res) => {
  const q =
    "UPDATE palestrantes SET `name` = ?, `email` = ?, `phone` = ?, `company` = ?, `position` = ?, `area` = ?, `theme` = ?, `linkedin` = ? WHERE `id` = ?";

  const values = [
    req.body.name,
    req.body.email,
    req.body.phone,
    req.body.company,
    req.body.position,
    req.body.area,
    req.body.theme,
    req.body.linkedin,
  ];

  db.query(q, [...values, req.params.id], (err) => {
    if (err) return res.json(err);
    return res.status(200).json("Palestrante atualizado com suscesso.");
  });
};

//Responsavel por DELETAR palestrante
export const deleteUser = (req, res) => {
  const q = "DELETE FROM palestrantes WHERE `id` = ?";

  db.query(q, [req.params.id], (err) => {
    if (err) return res.json(err);
    return res.status(200).json("Palestrante removido com suscesso.");
  });
};
