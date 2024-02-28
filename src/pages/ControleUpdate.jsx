import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import api from '../services/api';
import { useRef, useState, useEffect } from 'react';
import '../App.css';
import Autocomplete from '@mui/material/Autocomplete/Autocomplete';
import TextField from '@mui/material/TextField/TextField'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';



export default function ControleUpdate() {

    const [name, setName] = useState('');

    const notifySuccess = () => toast.success('Palestrante atualizado!', {
        position: "top-right",
        autoClose: 800,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
    });

    const notifyError = () => toast.error('Erro ao atualizar palestrante!', {
        position: "top-right",
        autoClose: 800,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
    });

    const refName = useRef('');
    const refEmail = useRef('');
    const refPhone = useRef('');
    const refCompany = useRef('');
    const refPosition = useRef('');
    const refArea = useRef('');
    const refTheme = useRef('');
    const refLinkedIn = useRef('');
    const refLabel = useRef('');

    const [index, setIndex] = useState();

    const inicio = () => {
        window.location.href = "./Controle";
    };


    function loadDb() {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');

        if (id) {
            api.get(`/palestrantes/${id}`).then((response) => {
                const { id, email, theme, position, company, name, phone, linkedin, area } = response.data;
                setIndex(id);
                refLabel.current.value = name ?? '';
                refEmail.current.value = email ?? '';
                refPhone.current.value = phone ?? '';
                refCompany.current.value = company ?? '';
                refPosition.current.value = position ?? '';
                refArea.current.value = area ?? '';
                refTheme.current.value = theme ?? '';
                refLinkedIn.current.value = linkedin ?? '';
                setName(name);
            });
        }
    }


    useEffect(() => { loadDb(); }, []);


    function ClearRefs() {
        refLabel.current.value = '';
        refEmail.current.value = '';
        refPhone.current.value = '';
        refCompany.current.value = '';
        refPosition.current.value = '';
        refArea.current.value = '';
        refTheme.current.value = '';
        refLinkedIn.current.value = '';
        setName('')
    };

    function patchDb(e) {
        loadDb();
        e.preventDefault();
        api.patch(`/palestrantes/${index}`, {
            "name": refLabel.current.value,
            "email": refEmail.current.value,
            "phone": refPhone.current.value,
            "company": refCompany.current.value,
            "position": refPosition.current.value,
            "area": refArea.current.value,
            "theme": refTheme.current.value,
            "linkedin": refLinkedIn.current.value
        }).then(() => {
            notifySuccess()
            ClearRefs()
            loadDb()
        }).catch(function (error) {
            console.log(error);
            notifyError();
        })
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

                    < div >
                        <Form onSubmit={patchDb}>
                            <Form.Group className="mb-3">
                                <Form.Label><h5>Qual palestrante deseja atualizar?</h5></Form.Label>
                                <Autocomplete
                                    clearText=""
                                    clearIcon={<></>}
                                    noOptionsText="Não há palestrantes"
                                    inputValue={name}
                                    ref={refName}
                                    disablePortal
                                    id="formNome"
                                    getOptionLabel={(option) => option.name}
                                    isOptionEqualToValue={(option, value) => option.id === value.id}
                                    renderInput={(params) => <TextField {...params} label="Selecione o palestrante" required />}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Nome</Form.Label>
                                <Form.Control type="text" id="theme" ref={refLabel} placeholder="" required />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" id="email" ref={refEmail} placeholder="" required />
                                <Form.Text className="text-muted">
                                    Este email não será compartilhado com terceiros.
                                </Form.Text>
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Telefone</Form.Label>
                                <Form.Control type="tel" id="phone" ref={refPhone} placeholder="" required />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Empresa</Form.Label>
                                <Form.Control type="text" ref={refCompany} placeholder="" id="company" required />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Cargo</Form.Label>
                                <Form.Control type="text" ref={refPosition} placeholder="" id="position" required />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Área da palestra</Form.Label>
                                <Form.Control type="text" id="area" ref={refArea} placeholder="" required />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Tema da palestra</Form.Label>
                                <Form.Control type="text" id="theme" ref={refTheme} placeholder="" required />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>LinkedIn</Form.Label>
                                <Form.Control type="url" id="linkedin" ref={refLinkedIn} placeholder="" />
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
                    </div>

                </Card.Body>
            </Card>
        </main>
    )
}
