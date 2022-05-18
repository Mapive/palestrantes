import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSchool, faUser, faFilePen, faNewspaper } from '@fortawesome/free-solid-svg-icons'
import '../../App.css';

export default function Cabecalho() {

  return (
    <>
      <Navbar expand="lg" fixed="top" className="secundaria"></Navbar>
      <Navbar variant="dark" fixed="top" style={{marginTop: 15}} className="primaria">
        <Container>
          <span className='navUsp'><Navbar.Brand><FontAwesomeIcon icon={faSchool} /> USP</Navbar.Brand></span>
          <Nav className="me-auto">
            <Link to="/" className="linkNav"><FontAwesomeIcon icon={faUser} /> Palestrantes</Link>
            <Link to="/certificado" className="linkNav"><FontAwesomeIcon icon={faNewspaper} /> Emissão de certificado</Link>
            <Link to="/controle" className="linkNav"><FontAwesomeIcon icon={faFilePen} /> Controle</Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  )
}