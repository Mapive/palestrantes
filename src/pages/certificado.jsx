import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Autocomplete from '@mui/material/Autocomplete/Autocomplete'
import TextField from '@mui/material/TextField/TextField'
import { useState, useRef, useEffect } from 'react'
import Modal from './Components/ModalPreviewCertificate';
import '../App.css';
import api from '../services/api'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowCircleRight, faEye } from '@fortawesome/free-solid-svg-icons'


export default function Certificado() {

    const notifySuccess = () => toast.success('Certificado enviado!', {
        position: "top-right",
        autoClose: 800,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
    });

    const notifyError = () => toast.error('Erro ao enviar certificado!', {
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
    const refTheme = useRef('');
    const refPosition = useRef('');
    const refCompany = useRef('');
    const refDate = useRef('');
    const refDuration = useRef('');
    const refSubject = useRef('');
    const refTitle = useRef('');

    function ClearRefs() {
        setName('')
        setSubject('')
        refTheme.current.value = '';
        refPosition.current.value = '';
        refCompany.current.value = '';
        refEmail.current.value = '';
        refDate.current.value = '';
        refDuration.current.value = '';
        refTitle.current.value = '';
    }

    function loadPalestrantesData() {
        api.get('/palestrantes').then((response) => {
            const db = []
            response.data.forEach((data) => {
                if (data.delete !== "true") {
                    db.push(data)
                }
            })
            setAllDatabase(db)
        })
    }

    function postDb(e) {
        e.preventDefault();
        api.post('/certificados', {
            "palestrante": name,
            "date": refDate.current.value,
            "duration": refDuration.current.value,
            "title": refTitle.current.value,
            "subject": subject
        }).then(() => {
            notifySuccess()
            ClearRefs()
            loadPalestrantesData()
        }).catch(function (error) {
            console.log(error)
            notifyError()
        })
    }

    const [allDatabase, setAllDatabase] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const [subjectData, setSubjectData] = useState([])

    useEffect(() => {
        api.get('/disciplinas').then((response) => {
            setSubjectData(response.data)
        })
    }, [])

    useEffect(() => {
        loadPalestrantesData()
    }, [])

    const [name, setName] = useState('');
    const [subject, setSubject] = useState('');

    function setFieldsOnNameChange(event, optionId, optionName) {
        const data_filter = allDatabase.filter((prop) => prop.id === optionId)
        setFilteredData(data_filter)
        const { email, theme, position, company } = data_filter[0]
        refEmail.current.value = email
        refTheme.current.value = theme
        refCompany.current.value = company
        refPosition.current.value = position
        setName(optionName)
    }

    const [openPreviewCertificate, setOpenPreviewCertificate] = useState(false);

    return (
        <main style={{ padding: "2rem" }}>
            <Card>
                <Card.Header><span className="text-muted"><h5>EMITIR CERTIFICADO</h5></span></Card.Header>
                <Card.Body>
                    <Form onSubmit={postDb}>
                        <Form.Group className="mb-3" >
                            <Form.Label>Nome:</Form.Label>
                            <Autocomplete
                                clearText=""
                                clearIcon={<></>}
                                required
                                inputValue={name}
                                ref={refName}
                                onChange={(event, value) => { setFieldsOnNameChange(event.target.value, value.id, value.name) }}
                                disablePortal
                                options={allDatabase}
                                getOptionLabel={(option) => option.name}
                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                renderInput={(params) => <TextField {...params} required label="Selecione o palestrante" />}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" >
                            <Form.Label>Tema da Palestra</Form.Label>
                            <Form.Control disabled ref={refTheme} type="text" required/>
                        </Form.Group>

                        <Form.Group className="mb-3" >
                            <Form.Label>Cargo</Form.Label>
                            <Form.Control disabled type="text" ref={refPosition} required/>
                        </Form.Group>

                        <Form.Group className="mb-3" >
                            <Form.Label>Empresa</Form.Label>
                            <Form.Control disabled type="text" ref={refCompany} required/>
                        </Form.Group>

                        <Form.Group className="mb-3" >
                            <Form.Label>Email</Form.Label>
                            <Form.Control disabled ref={refEmail} type="email" required/>
                        </Form.Group>

                        <Form.Group className="mb-3" >
                            <Form.Label>Disciplina</Form.Label>
                            <Autocomplete
                                clearText=""
                                clearIcon={<></>}
                                inputValue={subject}
                                onChange={(event, value) => setSubject(value.name)}
                                disablePortal
                                options={subjectData}
                                getOptionLabel={(option) => option.name}
                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                renderInput={(params) => <TextField {...params} required label="Selecione o palestrante" />}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" >
                            <Form.Label>Título da Palestra</Form.Label>
                            <Form.Control type="text" ref={refTitle} required placeholder="Insira o título da palestra"/>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Data:</Form.Label>
                            <Form.Control ref={refDate} required type="date"/>
                        </Form.Group>

                        <Form.Group className="mb-3" >
                            <Form.Label>Duração(min):</Form.Label>
                            <Form.Control type="number" ref={refDuration} required placeholder="Digite apenas números"/>
                        </Form.Group>

                        <center>
                            <Button variant="primary" type="submit" >
                                <FontAwesomeIcon icon={faArrowCircleRight} />
                                <span> </span>ENVIAR CERTIFICADO
                            </Button>

                            <Button variant="" style={{ color: "white", backgroundColor: "#FFB500", margin: "0 0 0 10px" }} onClick={() => { setOpenPreviewCertificate(true); }}>
                                <FontAwesomeIcon icon={faEye} />
                                <span> </span>PRÉ-VISUALIZAR
                            </Button>
                        </center>
                        
                        <ToastContainer />

                        {openPreviewCertificate && <Modal closeModal={setOpenPreviewCertificate} data={filteredData} refDuration={refDuration.current.value} refDate={refDate.current.value} refSubject={refSubject.current.value} refTitle={refTitle.current.value} />}

                    </Form>
                </Card.Body>
            </Card>
        </main>
    );
}