import { db } from "../db.js"; 

export const getUsers = (_, res) =>{
    const q = "SELECT * FROM palestrantes"; //Cria uma const q = query

    db.query(q,(err, data) =>{
        if(err) return res.json(err); //se tiver algum erro, ira retornar isso

        return res.status(200).json(data); // caso contrario, ira retornar um status code 200 dizendo que esta ok, e 
        // retornar em json a listagem de todos os usuarios
    });
};

//Responsavel por CADASTRAR novos palestrantes
// Exporta a função addUser, que recebe os objetos req (requisição) e res (resposta) como parâmetros
export const addUser = (req, res) => {
    // Declara a constante q que contém a consulta SQL para inserir dados na tabela 'usuarios'
    const q = 
    "INSERT INTO palestrantes (`name`, `email`, `phone`, `company`, `position`, `area`, `theme`, `linkedin`) VALUES(?)";

    // Declara a constante values que armazena um array com os valores recebidos no corpo da requisição (req.body)
    const values = [
        req.body.name,      // Nome do usuário
        req.body.email,     // Email do usuário
        req.body.phone,     // Telefone do usuário
        req.body.company,   // Empresa do usuário
        req.body.position,  // Posição do usuário na empresa
        req.body.area,      // Área de atuação do usuário
        req.body.theme,     // Tema de interesse do usuário
        req.body.linkedin,  // URL do perfil LinkedIn do usuário
    ];

    // Executa a consulta no banco de dados usando a query q e os valores values
    db.query(q, [values], (err) => {
        // Verifica se ocorreu um erro durante a execução da consulta
        if(err) return res.json(err); // Se houve um erro, retorna o erro como resposta JSON

        // Se não houve erro, retorna uma resposta com status 200 e uma mensagem de sucesso
        return res.status(200).json("Palestrante cadastrado com sucesso.");
    });
};

// Função para buscar um palestrante por ID
export const getUserById = (req, res) => {
    const { id } = req.params;
    const q = "SELECT * FROM palestrantes WHERE id = ?";
    
    db.query(q, [id], (err, data) => {
        if (err) return res.status(500).json({ message: 'Erro ao buscar palestrante' });
        if (data.length === 0) return res.status(404).json({ message: 'Palestrante não encontrado' });
        return res.status(200).json(data[0]);
    });
};

//Responsavel por BUSCAR os Docentes 
export const getDocentes = (_, res) =>{
    const q = "SELECT * FROM docentes"; //Cria uma const q = query

    db.query(q,(err, data) =>{
        if(err) return res.json(err); //se tiver algum erro, ira retornar isso

        return res.status(200).json(data); // caso contrario, ira retornar um status code 200 dizendo que esta ok, e 
        // retornar em json a listagem de todos os usuarios
    });
};

//Responsavel por BUSCAR as Disciplina 
export const getDisciplinas = (_, res) =>{
    const q = "SELECT * FROM disciplinas"; //Cria uma const q = query

    db.query(q,(err, data) =>{
        if(err) return res.json(err); //se tiver algum erro, ira retornar isso

        return res.status(200).json(data); // caso contrario, ira retornar um status code 200 dizendo que esta ok, e 
        // retornar em json a listagem de todos os usuarios
    });
};

//Responsavel por BUSCAR os Cursos
export const getCursos = (_, res) =>{
    const q = "SELECT * FROM curso"; //Cria uma const q = query

    db.query(q,(err, data) =>{
        if(err) return res.json(err); //se tiver algum erro, ira retornar isso

        return res.status(200).json(data); // caso contrario, ira retornar um status code 200 dizendo que esta ok, e 
        // retornar em json a listagem de todos os usuarios
    });
};

//Responsavel por BUSCAR os Semestre
export const getSemestre = (_, res) =>{
    const q = "SELECT * FROM semestre"; //Cria uma const q = query

    db.query(q,(err, data) =>{
        if(err) return res.json(err); //se tiver algum erro, ira retornar isso

        return res.status(200).json(data); // caso contrario, ira retornar um status code 200 dizendo que esta ok, e 
        // retornar em json a listagem de todos os usuarios
    });
};

//Responsavel por SALVAR os certificados gerados
// Exporta a função addUser, que recebe os objetos req (requisição) e res (resposta) como parâmetros
export const addCertificado = (req, res) => {
    // Declara a constante q que contém a consulta SQL para inserir dados na tabela 'usuarios'
    const q = 
    "INSERT INTO certificado (`title`, `duration`, `data_palestra`) VALUES(?)";

    // Declara a constante values que armazena um array com os valores recebidos no corpo da requisição (req.body)
    const values = [
        req.body.title,      
        req.body.duration,     
        req.body.data_palestra,     
    ];

    // Executa a consulta no banco de dados usando a query q e os valores values
    db.query(q, [values], (err) => {
        // Verifica se ocorreu um erro durante a execução da consulta
        if(err) return res.json(err); // Se houve um erro, retorna o erro como resposta JSON

        // Se não houve erro, retorna uma resposta com status 200 e uma mensagem de sucesso
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

    db.query(q, [...values, req.params.id], (err) =>{
        if(err) return res.json(err);
        return res.status(200).json("Palestrante atualizado com suscesso.");
    });
};

//Responsavel por DELETAR palestrante
export const deleteUser = (req, res) => {
    const q = "DELETE FROM palestrantes WHERE `id` = ?";

    db.query(q, [req.params.id], (err) =>{
        if(err) return res.json(err);

        return res.status(200).json("Palestrante removido com suscesso.");
    });
};

