import React, { useState, useRef, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Autocomplete from '@mui/material/Autocomplete/Autocomplete';
import TextField from '@mui/material/TextField/TextField';
import Modal from './Components/ModalPreviewCertificate';
import '../App.css';
import api from '../services/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleRight, faEye } from '@fortawesome/free-solid-svg-icons';
import emailjs from '@emailjs/browser'; //------------
//require('dotenv').config();//-------------
//import { Link } from "react-router-dom";



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

    
    const refName = useRef(null);
    const refTheme = useRef(null);
    const refEmail = useRef(null);
    const refCompany = useRef(null);
    const refPosition = useRef(null);
    const refDate = useRef(null);
    const refTitle = useRef(null);
    const refDuration = useRef(null);
    const refPhone = useRef(null);
    const refArea = useRef(null);
    const refLinkedIn = useRef(null);




    const [allDatabase, setAllDatabase] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [subjectData, setSubjectData] = useState([]);
    const [cursoData, setCursoData] = useState([]);
    const [semestreData, setSemestreData] = useState([]);
    const [docenteData, setDocenteData] = useState([]);
    const [name, setName] = useState('');
    const [subject, setSubject] = useState('');
    const [curso, setCurso] = useState('');
    const [semestre, setSemestre] = useState('');
    const [docente, setDocente] = useState('');
    const [openPreviewCertificate, setOpenPreviewCertificate] = useState(false);
    const [disciplinaSearch, setDisciplinaSearch] = useState('');
    const [id, setId] = useState(null);

    

    useEffect(() => {
        api.get('/disciplinas').then((response) => {
            setSubjectData(response.data);
        });
        api.get('/curso').then((response) => {
            setCursoData(response.data);
        });
        api.get('/semestre').then((response) => {
            setSemestreData(response.data);
        });
        api.get('/docentes').then((response) => {
            setDocenteData(response.data);
        });
    }, []);


    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        if (id) {
            setId(id);
            api.get(`/palestrantes/${id}`).then((response) => {
                const { name, email, theme, position, company, phone, linkedin, area } = response.data;
                if (refName.current) refName.current.value = name ?? '';
                if (refEmail.current) refEmail.current.value = email ?? '';
                if (refPhone.current) refPhone.current.value = phone ?? '';
                if (refCompany.current) refCompany.current.value = company ?? '';
                if (refPosition.current) refPosition.current.value = position ?? '';
                if (refArea.current) refArea.current.value = area ?? '';
                if (refTheme.current) refTheme.current.value = theme ?? '';
                if (refLinkedIn.current) refLinkedIn.current.value = linkedin ?? '';
                setName(name);
            });
        }
    }, [id]);
    
    
    function ClearRefs() {
        refName.current.value = '';
        refEmail.current.value = '';
        refCompany.current.value = '';
        refPosition.current.value = '';
        refTheme.current.value = '';
        refDate.current.value = '';
        refTitle.current.value = '';
        refDuration.current.value = '';
    }
    
    function postDb(e) {
        e.preventDefault();

        const historico = {
            date: refDate.current.value,
            duration: refDuration.current.value, 
            title: refTitle.current.value,
            subject,
            curso,
            semestre,
            docente,
        };

        api.post('/certificados', {

            palestrante: name,
            date: refDate.current.value,
            duration: refDuration.current.value,
            title: refTitle.current.value,
            subject,
            curso,
            semestre,
            docente,
        }).then(() => {
            // Adiciona ao histórico -------------------------------------
            const updatedDatabase = allDatabase.map(palestrante => {
                if (palestrante.name === name) {
                    palestrante.historico.unshift(historico); // Adiciona ao início do array (últimas 3 palestras)
                }
                return palestrante;
            });
            setAllDatabase(updatedDatabase);
            //--------------------------------------------------------------
            notifySuccess()
            ClearRefs()
        
            }).catch(function (error) {
                console.log(error);
                notifyError();
            })
            
        }

   

    function setFieldsOnNameChange(event, optionId, optionName) {
        const data_filter = allDatabase.filter((prop) => prop.id === optionId)
        setFilteredData(data_filter)
        const { email, theme, position, company } = data_filter[0]
        refEmail.current.value = email
        refCompany.current.value = company
        refPosition.current.value = position
        refTheme.current.value = theme
        setName(optionName);
    }


    function sendEmail(e) {
        e.preventDefault();

        emailjs.sendForm(
            process.env.REACT_APP_SERVICE_ID,
            process.env.REACT_APP_TEMPLATE_ID,
            e.target,
            process.env.REACT_APP_USER_ID
        )
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
    }


    return (
        <main style={{ padding: "2rem" }}>
            <Card>
                <Card.Header><span className="text-muted"><h5>EMITIR CERTIFICADO</h5></span></Card.Header>
                <Card.Body>
                    <Form onSubmit={sendEmail}>
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
                                <Form.Control disabled ref={refTheme} type="text" required />
                            </Form.Group>

                            <Form.Group className="mb-3" >
                                <Form.Label>Email</Form.Label>
                                <Form.Control disabled ref={refEmail} type="email" required />
                            </Form.Group>

                            <Form.Group className="mb-3" >
                                <Form.Label>Empresa</Form.Label>
                                <Form.Control disabled type="text" ref={refCompany} required />
                            </Form.Group>

                            <Form.Group className="mb-3" >
                                <Form.Label>Cargo</Form.Label>
                                <Form.Control disabled type="text" ref={refPosition} required />
                            </Form.Group>

                            <Form.Group className="mb-3" >
                                <Form.Label>Disciplina:</Form.Label>
                                <Autocomplete
                                    clearText=""
                                    clearIcon={<></>}
                                    inputValue={disciplinaSearch}
                                    onInputChange={(event, newInputValue) => setDisciplinaSearch(newInputValue)}
                                    onChange={(event, value) => setSubject(value)}
                                    disablePortal
                                    options={subjectData}
                                    getOptionLabel={(option) => `${option.codigo} - ${option.name}`}
                                    isOptionEqualToValue={(option, value) => option.id === value.id}
                                    filterOptions={(options, { inputValue }) => {
                                        const regex = new RegExp(inputValue, 'i');
                                        return options.filter((option) => regex.test(option.name) || regex.test(option.codigo));
                                    }}
                                    renderInput={(params) => <TextField {...params} required label="Selecione a disciplina" />}
                                />

                            </Form.Group>


                            <Form.Group className="mb-3" >
                                <Form.Label>Curso:</Form.Label>
                                <Autocomplete
                                    clearText=""
                                    clearIcon={<></>}
                                    inputValue={curso}
                                    onChange={(event, value) => setCurso(value.name)}
                                    disablePortal
                                    options={cursoData}
                                    getOptionLabel={(option) => option.name}
                                    isOptionEqualToValue={(option, value) => option.id === value.id}
                                    renderInput={(params) => <TextField {...params} required label="Selecione o curso" />}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" >
                                <Form.Label>Semestre:</Form.Label>
                                <Autocomplete
                                    clearText=""
                                    clearIcon={<></>}
                                    inputValue={semestre}
                                    onChange={(event, value) => setSemestre(value.name)}
                                    disablePortal
                                    options={semestreData}
                                    getOptionLabel={(option) => option.name}
                                    isOptionEqualToValue={(option, value) => option.id === value.id}
                                    renderInput={(params) => <TextField {...params} required label="Selecione o semestre letivo" />}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Docente:</Form.Label>
                                <Autocomplete
                                    clearText=""
                                    clearIcon={<></>}
                                    inputValue={docente}
                                    onInputChange={(event, newInputValue) => setDocente(newInputValue)}
                                    onChange={(event, value) => setDocente(value ? value.name : '')}
                                    disablePortal
                                    options={docenteData}
                                    getOptionLabel={(option) => option.name}
                                    isOptionEqualToValue={(option, value) => option.id === value.id}
                                    filterOptions={(options, { inputValue }) => {
                                        const regex = new RegExp(inputValue, 'i');
                                        return options.filter((option) => regex.test(option.name));
                                    }}
                                    renderInput={(params) => <TextField {...params} required label="Selecione o docente responsável" />}
                                />
                            </Form.Group>


                            <Form.Group className="mb-3" >
                                <Form.Label>Título da Palestra</Form.Label>
                                <Form.Control type="text" ref={refTitle} required placeholder="Insira o título da palestra" />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Data:</Form.Label>
                                <Form.Control ref={refDate} required type="date" />
                            </Form.Group>

                            <Form.Group className="mb-3" >
                                <Form.Label>Duração(hora):</Form.Label>
                                <Form.Control type="number" ref={refDuration} required placeholder="Digite apenas números" />
                            </Form.Group>

                            <center>
                                <Button variant="" type="submit" style={{ color: "white", backgroundColor: "#1094AB" }}>
                                    <FontAwesomeIcon icon={faArrowCircleRight} />
                                    <span> </span>ENVIAR CERTIFICADO
                                </Button>

                                <Button variant="" style={{ color: "white", backgroundColor: "#FFB500", margin: "0 0 0 10px" }} onClick={() => { setOpenPreviewCertificate(true); }}>
                                    <FontAwesomeIcon icon={faEye} />
                                    <span> </span>PRÉ-VISUALIZAR
                                </Button>
                            </center>

                            <ToastContainer />

                            {openPreviewCertificate && <Modal closeModal={setOpenPreviewCertificate} data={filteredData}
                                refName={refName.current.value} refDuration={refDuration.current.value} refDate={refDate.current.value} refSubject={subject ? `(${subject.codigo}) - ${subject.name}` : ''}
                                refTitle={refTitle.current.value} subject={subject} curso={curso} semestre={semestre} docente={docente} refCompany={refCompany.current.value}/>}
                        </Form>
                    </Form>
                </Card.Body>
            </Card>
        </main>
    );
}