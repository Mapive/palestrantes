import { Button } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

export default function Modal({ closeModal, data, refDuration, refDate, refSubject, refTitle }) {
    
    const { email, theme, label, position, company } = data[0] ?? []

    const style = {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'white',
        border: '1px solid #000',
        boxShadow: 24,
        p: 4,
    };

    return (
        <>
            <Box sx={style}>
                <h1>CERTIFICADO</h1>
                <p>{label}</p>
                <p>{theme}</p>
                <p>{position}</p>
                <p>{company}</p>
                <p>{email}</p>
                <p>{refSubject}</p>
                <p>{refTitle}</p>
                <p>{refDuration}</p>
                <p>{refDate}</p>              
                <Button onClick={() => closeModal(false)}>Fechar</Button>
            </Box>
        </>
    )
}