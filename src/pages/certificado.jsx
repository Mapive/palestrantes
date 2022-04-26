import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

export default function Certificado() {
    return (
        <main style={{ padding: "2rem" }}>
            <Card>
                <Card.Header><span class="text-muted"><h5>EMITIR CERTIFICADO</h5></span></Card.Header>
                <Card.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicText">
                            <Form.Label>Nome completo</Form.Label>
                            <Form.Control required type="text" placeholder="Insira o nome do palestrante" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicText">
                            <Form.Label>Tema da palestra</Form.Label>
                            <Form.Control required type="text" placeholder="Insira o tema" />
                            <Form.Text className="text-muted">
                                Em caso de múltiplos temas, separe com vírgula
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicText">
                            <Form.Label>Data:</Form.Label>
                            <Form.Control required type="date" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicText">
                            <Form.Label>Duração(min):</Form.Label>
                            <Form.Control type="number" required placeholder="Insira apenas números" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" required placeholder="Insira o email" />
                            <Form.Text className="text-muted">
                                Este email não será compartilhado com terceiros.
                            </Form.Text>
                        </Form.Group>
                        <Button variant="warning" type="submit">
                            ENVIAR CERTIFICADO
                        </Button>
                    </Form>
                </Card.Body>
            </Card>

            

        </main>
    );
}