import Card from 'react-bootstrap/Card'
import { useState } from 'react'
import '../App.css';
import Palestrantes from './Palestrantes'


export default function Controle({ users, setUsers, setOnEdit }) { 

    const [openPageCon] = useState(true)
    


    return (
        <main style={{ padding: "2rem" }}>
            <Card>
                <Card.Header>
                    <div id="headerControl">
                        <span className="text-muted"><h5>CONSULTAR PALESTRANTES</h5></span>
                        
                    </div>
                </Card.Header>
                <Card.Body>
                    {openPageCon && <Palestrantes />}
                </Card.Body>
            </Card>
        </main>
    );
}



