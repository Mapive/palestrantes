import Card from 'react-bootstrap/Card'
import '../App.css';
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import BootstrapTable from 'react-bootstrap-table-next';
import React from 'react';
import api from '../services/api'
import { useEffect, useState } from 'react'
import '../App.css';

export default function Palestrantes() {

    const [dataPalestrantes, setDataPalestrantes] = useState([])

    useEffect(() => {
        api.get('/palestrantes').then((response) => {
            const getDatabase = []
            response.data.forEach((data) => {
                if (data.delete !== "true") {
                    getDatabase.push(data)
                }
            })
            setDataPalestrantes(getDatabase)
        })

    }, [])

    const defaultSorted = [{ dataField: "id",order: "asc"}];
    const columns = [
        {
            dataField: "id",
            text: "⇅",
            sort: true,
        },
        {
            dataField: "name",
            text: "⇅ Nome",
            sort: true,
            filter: textFilter({
                placeholder: "Procurar"
            }),
        },
        {
            dataField: "theme",
            text: "⇅ Tema",
            sort: true,
            filter: textFilter({
                placeholder: "Procurar"
            }),
        },
        {
            dataField: "position",
            text: "⇅ Cargo",
            sort: true,
            filter: textFilter({
                placeholder: "Procurar"
            }),
        },
        {
            dataField: "company",
            text: "⇅ Empresa",
            sort: true,
            filter: textFilter({
                placeholder: "Procurar"
            }),
        },
        {
            dataField: "email",
            text: "⇅ Email",
            sort: true,
            filter: textFilter({
                placeholder: "Procurar"
            })
        },
    ];

    return (
        <main style={{ padding: "2rem" }}>
            <Card>
                <Card.Header><span className="text-muted"><h5>PALESTRANTES</h5></span></Card.Header>
                <Card.Body>
                    <BootstrapTable
                        classes="customBootStrapClasses"
                        bordered={false}
                        bootstrap4={true}
                        hover={true}
                        keyField="id"
                        data={dataPalestrantes}
                        columns={columns}
                        defaultSorted={defaultSorted}
                        filter={filterFactory()}
                    />
                </Card.Body>
            </Card>
        </main>
    );
}