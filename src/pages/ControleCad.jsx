import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import api from '../services/api';
import { useRef } from 'react';
import '../App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default function ControleCad() {

    const notifySuccess = () => toast.success('Cadastro realizado!', {
        position: "top-right",
        autoClose:  1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined
    });

    const notifyError = (message = 'Erro ao realizar cadastro!') => toast.error(message, {
        position: "top-right",
        autoClose:  1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined
    });

    const inicio = () => {
        window.location.href = "./Controle";
    };

    const refName = useRef('');
    const refEmail = useRef('');
    const refPhone = useRef('');
    const refCompany = useRef('');
    const refPosition = useRef('');
    const refArea = useRef('');
    const refTheme = useRef('');
    const refLinkedIn = useRef('');

    function ClearRefs() {
        refName.current.value = '';
        refEmail.current.value = '';
        refPhone.current.value = '';
        refCompany.current.value = '';
        refPosition.current.value = '';
        refArea.current.value = '';
        refTheme.current.value = '';
        refLinkedIn.current.value = '';
    }

    function postDb(e) {
        e.preventDefault();

        api.get('/palestrantes', {
            params: {
                name: refName.current.value,
                email: refEmail.current.value
            }
        }).then(response => {
            if (response.data.length >  0) {
                notifyError('O palestrante já está cadastrado no sistema.');
            } else {
                api.post('/palestrantes', {
                    "name": refName.current.value,
                    "email": refEmail.current.value,
                    "phone": refPhone.current.value,
                    "company": refCompany.current.value,
                    "position": refPosition.current.value,
                    "area": refArea.current.value,
                    "theme": refTheme.current.value,
                    "linkedin": refLinkedIn.current.value,
                    "delete": "false"
                }).then(() => {
                    notifySuccess();
                    ClearRefs();
                }).catch(function (error) {
                    console.log(error)
                    notifyError();
                })
            }
        }).catch(function (error) {
            console.log(error);
            notifyError();
        });
    }

    return (
        <main style={{ padding: "2rem" }}>
            <Card>
                <Card.Header>
                    <div id="headerControl">
                        <span className="text-muted"><h5>CADASTRAR PALESTRANTES</h5></span>
                    </div>
                </Card.Header>
                <Card.Body>
                    <Form onSubmit={postDb}>
                        <Form.Group className="mb-3">
                            <Form.Label>Nome completo</Form.Label>
                            <Form.Control type="text" ref={refName} placeholder="Insira o nome do palestrante" required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={refEmail} placeholder="Insira o email" required />
                            <Form.Text className="text-muted">
                                Este email não será compartilhado com terceiros.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Telefone</Form.Label>
                            <Form.Control type="tel" ref={refPhone} placeholder="Insira o telefone" required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Empresa</Form.Label>
                            <Form.Control type="text" ref={refCompany} placeholder="Insira o nome da empresa" required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Cargo</Form.Label>
                            <Form.Control type="text" ref={refPosition} placeholder="Insira o cargo de atuação" required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Área da palestra</Form.Label>
                            <Form.Control type="text" ref={refArea} placeholder="Insira a área" required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Tema da palestra</Form.Label>
                            <Form.Control type="text" ref={refTheme} placeholder="Insira o tema" required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>LinkedIn</Form.Label>
                            <Form.Control type="url" ref={refLinkedIn} placeholder="Insira o link para o LinkedIn" />
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
