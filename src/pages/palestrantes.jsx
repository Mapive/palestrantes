import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

export default function Palestrantes() {
    return (
        <main style={{ padding: "2rem" }}>
            <Card>
                <Card.Header><span class="text-muted"><h5>PALESTRANTES</h5></span></Card.Header>
                <Card.Body>
                    <Table borderless striped hover>
                        <caption>Registro de Palestrantes</caption>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Nome</th>
                                <th>Tema(s)</th>
                                <th>Contato</th>
                                <th className='celBtn'></th>
                                <th className='celBtn'></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Marcos Vinícius Pereira</td>
                                <td>Tema palestra 1</td>
                                <td>marcos@marcos.com</td>
                                <td><Button variant="warning"><FontAwesomeIcon icon={faPen} /></Button></td>
                                <td><Button variant="danger"><FontAwesomeIcon icon={faTrash} /></Button></td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Zeus de Andrade Dacax</td>
                                <td>Tema palestra 2</td>
                                <td>zeus@zeus.com</td>
                                <td><Button variant="warning"><FontAwesomeIcon icon={faPen} /></Button></td>
                                <td><Button variant="danger"><FontAwesomeIcon icon={faTrash} /></Button></td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>Marcos Vinícius Pereira</td>
                                <td>Tema palestra 1</td>
                                <td>marcos@marcos.com</td>
                                <td><Button variant="warning"><FontAwesomeIcon icon={faPen} /></Button></td>
                                <td><Button variant="danger"><FontAwesomeIcon icon={faTrash} /></Button></td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>Marcos Vinícius Pereira</td>
                                <td>Tema palestra 1</td>
                                <td>marcos@marcos.com</td>
                                <td><Button variant="warning"><FontAwesomeIcon icon={faPen} /></Button></td>
                                <td><Button variant="danger"><FontAwesomeIcon icon={faTrash} /></Button></td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Zeus de Andrade Dacax</td>
                                <td>Tema palestra 2</td>
                                <td>zeus@zeus.com</td>
                                <td><Button variant="warning"><FontAwesomeIcon icon={faPen} /></Button></td>
                                <td><Button variant="danger"><FontAwesomeIcon icon={faTrash} /></Button></td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>Marcos Vinícius Pereira</td>
                                <td>Tema palestra 1</td>
                                <td>marcos@marcos.com</td>
                                <td><Button variant="warning"><FontAwesomeIcon icon={faPen} /></Button></td>
                                <td><Button variant="danger"><FontAwesomeIcon icon={faTrash} /></Button></td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Zeus de Andrade Dacax</td>
                                <td>Tema palestra 2</td>
                                <td>zeus@zeus.com</td>
                                <td><Button variant="warning"><FontAwesomeIcon icon={faPen} /></Button></td>
                                <td><Button variant="danger"><FontAwesomeIcon icon={faTrash} /></Button></td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>Marcos Vinícius Pereira</td>
                                <td>Tema palestra 1</td>
                                <td>marcos@marcos.com</td>
                                <td><Button variant="warning"><FontAwesomeIcon icon={faPen} /></Button></td>
                                <td><Button variant="danger"><FontAwesomeIcon icon={faTrash} /></Button></td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Zeus de Andrade Dacax</td>
                                <td>Tema palestra 2</td>
                                <td>zeus@zeus.com</td>
                                <td><Button variant="warning"><FontAwesomeIcon icon={faPen} /></Button></td>
                                <td><Button variant="danger"><FontAwesomeIcon icon={faTrash} /></Button></td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>Marcos Vinícius Pereira</td>
                                <td>Tema palestra 1</td>
                                <td>marcos@marcos.com</td>
                                <td><Button variant="warning"><FontAwesomeIcon icon={faPen} /></Button></td>
                                <td><Button variant="danger"><FontAwesomeIcon icon={faTrash} /></Button></td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Zeus de Andrade Dacax</td>
                                <td>Tema palestra 2</td>
                                <td>zeus@zeus.com</td>
                                <td><Button variant="warning"><FontAwesomeIcon icon={faPen} /></Button></td>
                                <td><Button variant="danger"><FontAwesomeIcon icon={faTrash} /></Button></td>
                            </tr>

                        </tbody>
                    </Table>
                </Card.Body>
            </Card>



        </main>
    );
}