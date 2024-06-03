import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useParams, useNavigate } from 'react-router-dom';
import '../App.css';

export default function ControleUpdate({ getUsers, setOnEdit }) {
    const { id } = useParams(); // Obter o ID dos parâmetros da URL
    const ref = useRef();
    const navigate = useNavigate();
    const [user, setUser] = useState(null); // Estado para armazenar os dados do palestrante

    useEffect(() => {
        // Função para buscar os dados do palestrante
        const fetchUser = async () => {
            try {
                const res = await axios.get(`http://localhost:8800/ControleUpdate/${id}`);
                setUser(res.data);
            } catch (error) {
                toast.error("Erro ao buscar dados do palestrante.");
            }
        };

        fetchUser();
    }, [id]);

    useEffect(() => {
        if (user) {
            const userForm = ref.current;
            userForm.name.value = user.name;
            userForm.email.value = user.email;
            userForm.phone.value = user.phone;
            userForm.company.value = user.company;
            userForm.position.value = user.position;
            userForm.area.value = user.area;
            userForm.theme.value = user.theme;
            userForm.linkedin.value = user.linkedin;
        }
    }, [user]);

    const inicio = () => {
        navigate("/Controle");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userForm = ref.current;

        if (
            !userForm.name.value ||
            !userForm.email.value ||
            !userForm.phone.value ||
            !userForm.company.value ||
            !userForm.position.value ||
            !userForm.area.value ||
            !userForm.theme.value ||
            !userForm.linkedin.value
        ) {
            return toast.warn("Preencha todos os campos!");
        }

        try {
            const res = await axios.put(`http://localhost:8800/ControleUpdate/${id}`, {
                name: userForm.name.value,
                email: userForm.email.value,
                phone: userForm.phone.value,
                company: userForm.company.value,
                position: userForm.position.value,
                area: userForm.area.value,
                theme: userForm.theme.value,
                linkedin: userForm.linkedin.value,
            });
            console.log(res); // Log da resposta para depuração
            toast.success("Palestrante atualizado com sucesso!");
            setOnEdit(null);
            getUsers();
            navigate("/Controle");
        } catch (error) {
            console.error(error); // Log do erro para depuração
            //toast.error("Erro ao atualizar palestrante.");
        }
    };

    return (
        <main style={{ padding: "2rem" }}>
            <Card>
                <Card.Header>
                    <div id="headerControl">
                        <span className="text-muted"><h5>ATUALIZAR PALESTRANTE</h5></span>
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
                            <Form.Control name="linkedin" type="url" placeholder="Insira o link para o LinkedIn" required />
                        </Form.Group>
                        <center>
                            <Button variant="" type="submit" style={{ color: "white", backgroundColor: "#1094AB" }}>
                                <FontAwesomeIcon icon={faArrowCircleRight} />
                                <span> </span>ATUALIZAR
                            </Button>
                            <Button variant="light" style={{ margin: "0 0 0 10px" }} onClick={inicio}>
                                <FontAwesomeIcon icon={faArrowLeft} />
                                <span> </span>VOLTAR
                            </Button>
                        </center>
                        <ToastContainer />
                    </Form>
                </Card.Body>
            </Card>
        </main>
    );
}
