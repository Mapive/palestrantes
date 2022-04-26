import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'


export default function Cadastro() {
    return (
        <main style={{ padding: "2rem" }}>
            <Card>
                <Card.Header><span class="text-muted"><h5>CADASTRAR PALESTRANTES</h5></span></Card.Header>
                <Card.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicText">
                            <Form.Label>Nome completo</Form.Label>
                            <Form.Control type="text" placeholder="Insira o nome do palestrante" required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicText">
                            <Form.Label>Tema da palestra</Form.Label>
                            <Form.Control type="text" placeholder="Insira o tema" required />
                            <Form.Text className="text-muted" >
                                Em caso de múltiplos temas, separe com vírgula
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Insira o email" required />
                            <Form.Text className="text-muted">
                                Este email não será compartilhado com terceiros.
                            </Form.Text>
                        </Form.Group>
                        <Button variant="warning" type="submit">
                            CADASTRAR
                        </Button>
                    </Form>
                </Card.Body>
            </Card>

        </main>
    );
}

