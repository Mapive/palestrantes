import Form from 'react-bootstrap/Form'
import { useState, useEffect, useRef } from 'react'
import '../App.css';
import Autocomplete from '@mui/material/Autocomplete/Autocomplete'
import TextField from '@mui/material/TextField/TextField'
import Button from 'react-bootstrap/Button'
import api from '../services/api'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons'

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

    const refNome = useRef('')
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

    const [name, setName] = useState('')

    function setField(event, idValue, nameValue) {
        const filteredData = allData.filter((prop) => prop.id === idValue)
        const { id } = filteredData[0]
        setIndex(id)
        setName(nameValue)
    }

    function ClearRef() {
        setName('')
    }

    function deleteDb(e) {
        loadDb()
        e.preventDefault();
        api.patch(`/palestrantes/${index}`, {
            "delete": "true"
        }).then(() => {
            notifySuccess();
            ClearRef();
            loadDb()
        }).catch(function (error) {
            console.log(error)
            notifyError();
        })
        ClearRef()
    }

    return (
        <>
            <Form onSubmit={deleteDb}>
                <Form.Group className="mb-3">
                    <Form.Label><h5>Qual palestrante deseja deletar?</h5></Form.Label>
                    <Autocomplete
                        clearText=""
                        clearIcon={<></>}
                        noOptionsText="Não há palestrantes"
                        inputValue={name}
                        ref={refNome}
                        onChange={(e, v) => { setField(e.target.value, v.id, v.name) }}
                        disablePortal
                        options={allData}
                        getOptionLabel={(option) => option.name}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        renderInput={(params) => <TextField {...params} label="Selecione o palestrante" ref={refNome} required />}
                    />
                </Form.Group>
                <center>
                    <Button variant="danger" type="submit">
                        <FontAwesomeIcon icon={faTrash} />
                        <span> </span>REMOVER
                    </Button>
                </center>
                <ToastContainer />
            </Form>
        </>
    )
}