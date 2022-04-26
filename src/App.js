import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSchool } from '@fortawesome/free-solid-svg-icons'
import {faHome} from '@fortawesome/free-solid-svg-icons'
import {faUser} from '@fortawesome/free-solid-svg-icons'
import {faPlus} from '@fortawesome/free-solid-svg-icons'
import {faNewspaper} from '@fortawesome/free-solid-svg-icons'
import {faQuestion} from '@fortawesome/free-solid-svg-icons'

export default function App() {
  return (
    <div className="App">
      <Navbar expand="lg"  fixed="top" className="secundaria"></Navbar>
      <Navbar classname="navTop" variant="dark" className="primaria">
        <Container>
          <span className='navUsp'><Navbar.Brand><FontAwesomeIcon icon={faSchool} /> USP</Navbar.Brand></span>
          <Nav className="me-auto">
            <Nav.Link><Link to="/" className="linkNav"><FontAwesomeIcon icon={faHome} /> Home</Link></Nav.Link>
            <Nav.Link><Link to="/palestrantes" className="linkNav"><FontAwesomeIcon icon={faUser} /> Palestrantes</Link></Nav.Link>
            <Nav.Link><Link to="/cadastro" className="linkNav"><FontAwesomeIcon icon={faPlus} /> Cadastrar</Link></Nav.Link>
            <Nav.Link><Link to="/certificado" className="linkNav"><FontAwesomeIcon icon={faNewspaper} /> Emissão de certificado</Link></Nav.Link>
            <Nav.Link><Link to="/sobre" className="linkNav"><FontAwesomeIcon icon={faQuestion} /> Sobre</Link></Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Navbar fixed="bottom" variant="dark" className="primaria">
      </Navbar>
    </div>
  );
}


