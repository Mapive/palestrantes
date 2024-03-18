import Card from 'react-bootstrap/Card'
import { useState } from 'react'
import '../App.css';
import ControleCad from './ControleCad'
import ControleDelete from './ControleDelete'
import ControleUpdate from './ControleUpdate'
import Palestrantes from './Palestrantes'


export default function Controle() { 

    const [openPageCon] = useState(true)
    const [openPageCad] = useState(false)
    const [openPageUpd] = useState(false)
    const [openPageDel] = useState(false)
    


    return (
        <main style={{ padding: "2rem" }}>
            <Card>
                <Card.Header>
                    <div id="headerControl">
                        <span className="text-muted"><h5>CONSULTAR PALESTRANTES</h5></span>
                        
                    </div>
                </Card.Header>
                <Card.Body>
                    {openPageCad && <ControleCad />}
                    {openPageUpd && <ControleUpdate />}
                    {openPageCon && <Palestrantes />}
                    {openPageDel && <ControleDelete />}
                </Card.Body>
            </Card>
        </main>
    );
}



