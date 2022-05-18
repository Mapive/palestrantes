import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import api from '../services/api'
import { useRef, useState, useEffect } from 'react'
import '../App.css';
import Autocomplete from '@mui/material/Autocomplete/Autocomplete'
import TextField from '@mui/material/TextField/TextField'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons'

export default function ControleUpdate() {

    const [name, setName] = useState('')

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

    const refName = useRef('')
    const refTheme = useRef('')
    const refPosition = useRef('')
    const refCompany = useRef('')
    const refEmail = useRef('')
    const refLabel = useRef('')

    const [allData, setAllData] = useState([])
    const [index, setIndex] = useState()

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

    function setFields(event, idValue, nameValue) {
        const filteredData = allData.filter((prop) => prop.id === idValue)
        const { id, email, theme, position, company, name } = filteredData[0]
        setIndex(id)
        refEmail.current.value = email
        refTheme.current.value = theme
        refCompany.current.value = company
        refPosition.current.value = position
        refLabel.current.value = name
        setName(nameValue)
    }

    function ClearRefs() {
        refLabel.current.value = '';
        refTheme.current.value = '';
        refPosition.current.value = '';
        refCompany.current.value = '';
        refEmail.current.value = '';
        setName('')
    }

    function patchDb(e) {
        loadDb();
        e.preventDefault();
        api.patch(`/palestrantes/${index}`, {
            "name": refLabel.current.value,
            "theme": refTheme.current.value,
            "position": refPosition.current.value,
            "company": refCompany.current.value,
            "email": refEmail.current.value
        }).then(() => {
            notifySuccess()
            ClearRefs()
            loadDb()
        }).catch(function (error) {
            console.log(error);
            notifyError();
        })
    }

    return (
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
                        onChange={(e, v) => { setFields(e.target.value, v.id, v.name) }}
                        disablePortal
                        id="formNome"
                        options={allData}
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
                    <Form.Label>Tema da palestra</Form.Label>
                    <Form.Control type="text" id="theme" ref={refTheme} placeholder="" required />
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Cargo</Form.Label>
                    <Form.Control type="text" ref={refPosition} placeholder="" id="position" required />
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Empresa</Form.Label>
                    <Form.Control type="text" ref={refCompany} placeholder="" id="company" required />
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" id="email" ref={refEmail} placeholder="" required />
                    <Form.Text className="text-muted">
                        Este email não será compartilhado com terceiros.
                    </Form.Text>
                </Form.Group>
                <center>
                    <Button variant="" type="submit" style={{ color: "white", backgroundColor: "#FFB500", margin: "0 0 0 10px" }}>
                        <FontAwesomeIcon icon={faArrowCircleRight} />
                        <span> </span>ATUALIZAR
                    </Button>
                </center>
                <ToastContainer />
            </Form>
        </div>
    )
}