import React, { useEffect, useRef } from "react";
import axios from "axios";
import '../App.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';


export default function ControleCad({ getUsers ,onEdit, setOnEdit }) {


    const inicio = () => {
        window.location.href = "./Controle";
    };

    
    const ref = useRef();
    
    // Este useEffect é executado sempre que a variável 'onEdit' mudar de valor
    useEffect(() => { //--------verifica se o formulario possui algum item sde edição
        if (onEdit) {
            const user = ref.current;// Obtém a referência do formulário
            // Preenche os campos do formulário com os valores do item sendo editado
            user.name.value = onEdit.name;
            user.email.value = onEdit.email;
            user.phone.value = onEdit.phone;
            user.company.value = onEdit.company;
            user.position.value = onEdit.position;
            user.area.value = onEdit.area;
            user.theme.value = onEdit.theme;
            user.linkedin.value = onEdit.linkedin;
        }
    }, [onEdit]);// Dependência: o useEffect é executado sempre que 'onEdit' mudar

    //--------remover a parte do atualizar
    
    const handleSubmit = async (e) => {
        e.preventDefault(); // Previne o comportamento padrão do formulário

        const user = ref.current;// Obtém a referência do formulário
        
        // Verifica se algum campo está vazio
        if (
            !user.name.value ||
            !user.email.value ||
            !user.phone.value ||
            !user.company.value ||
            !user.position.value ||
            !user.area.value ||
            !user.theme.value ||
            !user.linkedin.value 
        ) {
            return toast.warn("Preencha todos os campos!");
        }

         // Se houver um palestrante sendo editado (onEdit está definido)
        if (onEdit) {
            // Envia uma requisição PUT para atualizar os dados do palestrante existente
            await axios 
                .put("http://localhost:8800/ControleCad" + onEdit.id, {
                    name: user.name.value,
                    email: user.email.value,
                    phone: user.phone.value,
                    company: user.company.value,
                    position: user.position.value,
                    area: user.area.value,
                    theme: user.theme.value,
                    linkedin: user.linkedin.value,

                })
                .then(({ data }) => toast.success(data))
                .catch(({ data }) => toast.error(data));
        } else {
            // Se não houver um palestrante sendo editado, envia uma requisição POST para criar um novo palestrante
            await axios 
                .post("http://localhost:8800/ControleCad", {
                    name: user.name.value,
                    email: user.email.value,
                    phone: user.phone.value,
                    company: user.company.value,
                    position: user.position.value,
                    area: user.area.value,
                    theme: user.theme.value,
                    linkedin: user.linkedin.value,

                })
                .then(({ data }) => toast.success(data))
                .catch(({ data }) => toast.error(data));
        }

        //-----------------apos incluir ou editar algum item, vou limpar o formulario
        user.name.value = "";
        user.email.value = "";
        user.phone.value = "";
        user.company.value = "";
        user.position.value = "";
        user.area.value = "";
        user.theme.value = "";
        user.linkedin.value = "";
    
        setOnEdit(null); // ------ para que apos uma edição, o usuario conseguir fazer uma inclusão sem que ocorra conflitos
        getUsers(); //------- atualizar o Grid

    };

    return (
        <main style={{ padding: "2rem" }}>
            <Card>
                <Card.Header>
                    <div id="headerControl">
                        <span className="text-muted"><h5>CADASTRAR PALESTRANTES</h5></span>
                    </div>
                </Card.Header>
                <Card.Body>
                    <Form ref={ref} onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Nome completo</Form.Label>
                            <Form.Control name="name" type="text" placeholder="Insira o nome do palestrante" required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control name="email" type="email" placeholder="Insira o email" required />
                            <Form.Text className="text-muted">
                                Este email não será compartilhado com terceiros.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Telefone</Form.Label>
                            <Form.Control name="phone" type="tel" placeholder="Insira o telefone" required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Empresa</Form.Label>
                            <Form.Control name="company" type="text" placeholder="Insira o nome da empresa" required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Cargo</Form.Label>
                            <Form.Control name="position" type="text" placeholder="Insira o cargo de atuação" required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Área da palestra</Form.Label>
                            <Form.Control name="area" type="text" placeholder="Insira a área" required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Tema da palestra</Form.Label>
                            <Form.Control name="theme" type="text" placeholder="Insira o tema" required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>LinkedIn</Form.Label>
                            <Form.Control name="linkedin" type="url" placeholder="Insira o link para o LinkedIn" />
                        </Form.Group>
                        <center>
                            <Button variant="" type="submit" style={{ color: "white", backgroundColor: "#1094AB" }}>
                                <FontAwesomeIcon icon={faArrowCircleRight} />
                                <span> </span>CADASTRAR
                            </Button>
                            <Button variant="light" style={{ margin: "0  0  0  10px" }} onClick={inicio}>
                                <FontAwesomeIcon icon={faArrowLeft} />
                                <span> </span>VOLTAR
                            </Button>
                        </center>
                        <ToastContainer />
                    </Form>
                </Card.Body>
            </Card>
        </main>
    )
}
