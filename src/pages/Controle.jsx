import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { useState } from 'react'
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import ControleCad from './ControleCad'
import ControleDelete from './ControleDelete'
import ControleUpdate from './ControleUpdate'

export default function Cadastro() {

    const [openPageCad, setOpenPageCad] = useState(true)
    const [openPageUpd, setOpenPageUpd] = useState(false)
    const [openPageDel, setOpenPageDel] = useState(false)

    function openCad() {
        setOpenPageCad(true)
        setOpenPageUpd(false)
        setOpenPageDel(false)
    }
    function openUpd() {
        setOpenPageCad(false)
        setOpenPageUpd(true)
        setOpenPageDel(false)
    }
    function openDel() {
        setOpenPageCad(false)
        setOpenPageUpd(false)
        setOpenPageDel(true)
    }

    return (
        <main style={{ padding: "2rem" }}>
            <Card>
                <Card.Header>
                    <div id="headerControl">
                        <span className="text-muted"><h5>CONTROLE PALESTRANTES</h5></span>
                        <div id="btnControl">
                            <Button id="btnCad" variant="primary" onClick={openCad}>
                                <FontAwesomeIcon icon={faPlus} />
                            </Button>
                            <Button id="btnUpd" variant="warning" onClick={openUpd}>
                                <FontAwesomeIcon icon={faPen} />
                            </Button>
                            <Button id="btnDel" variant="danger" onClick={openDel}>
                                <FontAwesomeIcon icon={faTrash} />
                            </Button>
                        </div>
                    </div>
                </Card.Header>
                <Card.Body>
                    {openPageCad && <ControleCad />}
                    {openPageUpd && <ControleUpdate />}
                    {openPageDel && <ControleDelete />}
                </Card.Body>
            </Card>
        </main>
    );
}