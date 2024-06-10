import { Button } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Modal({
  closeModal,
  data,
  refDuration,
  refDate,
  refTitle,
  subject,
  curso,
  semestre,
  docente,
  refSubject,
  refName,
  refEmail,
  refCompany,
}) {
  const dataPales = new Date(refDate);
  dataPales.setDate(dataPales.getDate() + 1);
  const formDate = dataPales.toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });

  const dataEmi = new Date();
  const formattedDate = dataEmi.toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    size: {
      width: 297,
      height: 210,
    },
    bgcolor: "white",
    boxShadow: 30,
    p: 4,
  };

  const visualizarImpressao = () => {
    const div = document.getElementById("meuDiv");
    html2canvas(div, {
      ignoreElements: (node) => node.tagName === "BUTTON",
      scale: 3,
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const doc = new jsPDF("l");
      const imgProps = doc.getImageProperties(imgData);
      const pdfWidth = doc.internal.pageSize.getWidth();

      const imgWidth = pdfWidth - 20;
      const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

      const posX = 10;
      const posY = -15;

      doc.addImage(imgData, "PNG", posX, posY, imgWidth, imgHeight);
      doc.save("certificado.pdf");

      // Chama a função postHistor após o PDF ser salvo
      addHistor();
    });
  };

  const addHistor = async () => {
    try {
      await axios
        .post("http://localhost:8800/historCertificado", {
          titulo: refTitle,
          duracao: refDuration,
          data_palestra: refDate,
          disciplina_certif: refSubject,
          docente_respon: docente,
          nome_palestrante: refName,
          email_palestrante: refEmail,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ response }) => toast.error(response.data));
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while adding the history.");
    }
  };

  return (
    <>
      <Box sx={style} id="meuDiv">
        <div class="cabCerti">
          <div class="logo">
            <img
              src="logosCertificado\logoFEARP.png"
              alt="Logo da FEARP"
              style={{ width: "100%" }}
            />
          </div>
          <div class="cabecalho">
            <h3 style={{ fontWeight: "bold", fontSize: "15px" }}>
              ESCRITÓRIO DE RELAÇÕES EMPRESARIAIS
            </h3>
            <h4 style={{ fontSize: "14px" }}>
              PROGRAMA DE PARCERIA UNIVERSIDADE-EMPRESA
            </h4>
          </div>
          <div class="logo">
            <img
              src="logosCertificado\logoUSP.png"
              alt="Logo da USP"
              style={{ width: "100%" }}
            />
          </div>
        </div>

        <div class="conCerti">
          <p>Certificamos que,</p>

          <div class="infoCerti">
            <b>{refName}</b>
            <p>da empresa {refCompany}</p>
          </div>

          <p class="textCerti">
            <br></br>
            proferiu a palestra "{refTitle}", aos alunos do {semestre} semestre
            do curso de {curso}, da Faculdade de Economia, Administração e
            Contabilidade de Ribeirão Preto da USP, junto a disciplina{" "}
            {refSubject} , sob a responsabilidade do Professor(a) {docente},
            dentro do Programa de Parceria Universidade-Empresa patrocinado pelo
            Escritório de Relações Empresariais da FEA-RP, em {formDate}, com
            duração de {refDuration} horas.
          </p>
          <p class="rodapCerti">Ribeirão Preto, {formattedDate}</p>

          <div class="validacao">
            <b>{docente}</b>
            <p>Professor(a) Responsavel</p>
          </div>
        </div>

        <Button onClick={() => closeModal(false)}>Fechar</Button>
        <Button onClick={visualizarImpressao}>Baixar Documento</Button>
      </Box>
    </>
  );
}
