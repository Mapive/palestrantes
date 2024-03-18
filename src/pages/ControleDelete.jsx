import Form from 'react-bootstrap/Form'
import { useState, useEffect, useRef } from 'react'
import '../App.css';
import Autocomplete from '@mui/material/Autocomplete/Autocomplete'
import TextField from '@mui/material/TextField/TextField'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import api from '../services/api'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCancel } from '@fortawesome/free-solid-svg-icons'

export default function ControleDelete() {
    const notifySuccess = () => toast.success('Palestrante removido!', {
        position: "top-right",
        autoClose: 800,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
    });
    const notifyError = () => toast.error('Erro ao remover palestrante!', {
        position: "top-right",
        autoClose: 800,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
    });

    const refNome = useRef('');
    const [allData, setAllData] = useState([]);
    const [index, setIndex] = useState();
    const [palestrante, setPalestrante] = useState({});
    const [name, setName] = useState('');

    
    function loadDb() {
        api.get('/palestrantes').then((response) => {
            const db = []
            response.data.forEach((data) => {
                if (data.delete !== "true") {
                    db.push(data)
                }
            })
            setAllData(db)
        })
    }
    
    
    useEffect(() => {
        loadDb()
    }, [])


    function setField(event, idValue, nameValue, emailValue, phoneValue, companyValue, positionValue, areaValue, themeValue, linkedinValue) {
        const filteredData = allData.filter((prop) => prop.id === idValue);
        const { id } = filteredData[0]
        setIndex(id)
        setName(nameValue)

        setPalestrante({
            id,
            name: nameValue,
            email: emailValue,
            phone: phoneValue,
            company: companyValue,
            position: positionValue,
            area: areaValue,
            theme: themeValue,
            linkedin: linkedinValue
        });
    }

    function ClearRef() {
        setName('');
        setPalestrante({});
    }

    
function deleteDb(e) {
    e.preventDefault();
    if (index === undefined) {
        notifyError();
        return;
    }
    api.delete(`/palestrantes/${index}`)
        .then(() => {
            notifySuccess();
            ClearRef();
            loadDb();
        })
        .catch((error) => {
            console.log(error);
            notifyError();
        });
}




    return (
        <main style={{ padding: "2rem" }}>
            <Card>
                <Card.Header>
                    <div id="headerControl">
                        <span className="text-muted"><h5>REMOVER PALESTRANTE</h5></span>
                    </div>
                </Card.Header>
                <Card.Body>
                    <>
                        <Form onSubmit={deleteDb}>
                            <Form.Group className="mb-3">
                                <Form.Label><h5>Qual palestrante deseja remover?</h5></Form.Label>
                                <Autocomplete
                                    clearText=""
                                    clearIcon={<></>}
                                    noOptionsText="Não há palestrantes"
                                    inputValue={name}
                                    ref={refNome}
                                    onChange={(e, v) => { setField(e.target.value, v.id, v.name, v.email, v.phone, v.company, v.position, v.area, v.theme, v.linkedin) }}
                                    disablePortal
                                    options={allData}
                                    getOptionLabel={(option) => option.name}
                                    isOptionEqualToValue={(option, value) => option.id === value.id}
                                    renderInput={(params) => <TextField {...params} label="Selecione o palestrante" ref={refNome} required />}
                                />

                                {Object.keys(palestrante).length > 0 && (
                                    <Card style={{ marginTop: "10px" }}>
                                        <Card.Header>
                                            <div id="headerControl">
                                                <span className="text-muted"><h5>Dados cadastrados no sistema</h5></span>
                                            </div>
                                        </Card.Header>
                                        <Card.Body>
                                            <p><strong>Nome:</strong> {palestrante.name}</p>
                                            <p><strong>E-mail:</strong> {palestrante.email}</p>
                                            <p><strong>Telefone:</strong> {palestrante.phone}</p>
                                            <p><strong>Empresa:</strong> {palestrante.company}</p>
                                            <p><strong>Cargo:</strong> {palestrante.position}</p>
                                            <p><strong>Área da palestra:</strong> {palestrante.area}</p>
                                            <p><strong>Tema da palestra:</strong> {palestrante.theme}</p>
                                            <strong>LinkedIn:</strong> {palestrante.linkedin}
                                        </Card.Body>
                                    </Card>
                                )}


                            </Form.Group>

                            <center>
                                <Button variant="danger" type="submit" className="mr-3">
                                    <FontAwesomeIcon icon={faTrash} />
                                    <span> </span>REMOVER
                                </Button>

                                <Button variant="" style={{ margin: "0 0 0 10px", color: "white", backgroundColor: "#FFB500" }} onClick={ClearRef} className="ml-3">
                                    <FontAwesomeIcon icon={faCancel} />
                                    <span> </span>CANCELAR
                                </Button>

                            </center>
                            <ToastContainer />
                        </Form>
                    </>

                </Card.Body>
            </Card>
        </main>
    )
}


