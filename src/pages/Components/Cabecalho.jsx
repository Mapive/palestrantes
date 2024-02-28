import React from 'react'; //----------------------27/02
import { Link, useLocation } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
//import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import { faSchool, faUser, faFilePen, faNewspaper, faUserFriends, faUsersViewfinder, faFileAlt, faFileArchive } from '@fortawesome/free-solid-svg-icons'
import '../../App.css';

export default function Cabecalho() {

  const location = useLocation(); 

  const isLoginPage = location.pathname === '/' || location.pathname === '/login'; 

  return (
    <>
      <div fixed="top" className="layout_cabecalho">
        <Container style={{ display: 'flex', margin: '0.8rem 25px 0.4rem' }}>{/*corrijir o arquivo css para evitar redundancias*/}
          <Nav>
            <img src="logosCertificado\logoFEARP.png" alt="Logo FEARP" width="90px" height="63px"  border="0" style={{ position:'relative', top: '-3px'}}/>
          </Nav>
          <div style={{margin: '0 0 0 25px'}}> 
            <h3 style={{fontSize:'18px'}}>Faculdade de Economia, Administração e Contabilidade de Ribeirão Preto</h3>
            <h4 style={{fontSize:'16px', color:'#8c8c8c'}}>Universidade de São Paulo</h4>
          </div>
          <Nav>
            <img src="\usp-logo.png" width="122" height="49" alt="Logo USP" border="0" style={{ position: 'relative', top: '5px', margin:' 0 0 0 25px' }} />
          </Nav>
        </Container>

        <div expand="lg" className="barraAma"></div>
        <div expand="lg" className="baraAzulC"></div>
        <div className="barraPrinc">
          {!isLoginPage && <Link to="/Controle" className="linkNav"> Home</Link>}
        </div>
      </div>

    </>
  )
};
