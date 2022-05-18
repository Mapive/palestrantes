import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import api from '../services/api'
import { useRef } from 'react'
import '../App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons'

export default function ControleCad() {

    const notifySuccess = () => toast.success('Cadastro realizado!', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined
    });

    const notifyError = () => toast.error('Erro ao realizar cadastro!', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined
    });

    const refName = useRef('')
    const refTheme = useRef('')
    const refPosition = useRef('')
    const refCompany = useRef('')
    const refEmail = useRef('')

    function ClearRefs() {
        refName.current.value = '';
        refTheme.current.value = '';
        refPosition.current.value = '';
        refCompany.current.value = '';
        refEmail.current.value = '';
    }

    function postDb(e) {
        e.preventDefault();
        api.post('/palestrantes', {
            "name": refName.current.value,
            "theme": refTheme.current.value,
            "position": refPosition.current.value,
            "company": refCompany.current.value,
            "email": refEmail.current.value,
            "delete": "false"
        }).then(() => {
            notifySuccess();
            ClearRefs();
        }).catch(function (error) {
            console.log(error)
            notifyError();
        })
    }

    return (
        <Form onSubmit={postDb}>
            <Form.Group className="mb-3">
                <Form.Label>Nome completo</Form.Label>
                <Form.Control type="text" ref={refName} placeholder="Insira o nome do palestrante" required />
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label>Tema da palestra</Form.Label>
                <Form.Control type="text" ref={refTheme} placeholder="Insira o tema" required />
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label>Cargo</Form.Label>
                <Form.Control type="text" ref={refPosition} placeholder="Insira o nome do palestrante" required />
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label>Empresa</Form.Label>
                <Form.Control type="text" ref={refCompany} placeholder="Insira o nome do palestrante" required />
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={refEmail} placeholder="Insira o email" required />
                <Form.Text className="text-muted">
                    Este email não será compartilhado com terceiros.
                </Form.Text>
            </Form.Group>
            <center>
                <Button variant="primary" type="submit">
                    <FontAwesomeIcon icon={faArrowCircleRight} />
                    <span> </span>CADASTRAR
                </Button>
            </center>
            <ToastContainer />
        </Form>
    )
}