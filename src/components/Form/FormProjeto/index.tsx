import React, { useRef } from "react";
import { Form } from "@unform/web";
import { FormHandles, Scope, SubmitHandler } from "@unform/core";
import TextField from "../Inputs/TextField";
import NumberFormat from "../Inputs/NumberFormat";
import BoxFormulario from "./BoxFormulario";
import { Button, ButtonGroup, Grid } from "@mui/material";
import * as yup from "yup";
import DateTimePicker from "../Inputs/DateTimePicker";

import { useSelector } from "react-redux";
import { selectData } from "../../../store/FormProjeto.store";
import { useProjeto } from "../../../hooks/useProjeto";
import { IProjeto } from "../../../interfaces/IProjeto";

const validationSchema = () => {
  return yup.object({
    nome: yup.string().required("O nome do projeto é obrigatório"),
    // dataLimite: yup.date()
    // .transform((curr, orig, coisa ) => {console.log({curr, orig, coisa}); return curr;})
    // .required('Mandatory field message'),
    tempoPrevisto: yup.object({
      meses: yup
        .number()
        .transform((n) => (isNaN(n) ? 0 : n))
        .max(1200, "Máximo 100 anos")
        .min(0, "Mínimo 0 minutos"),
      dias: yup
        .number()
        .transform((n) => (isNaN(n) ? 0 : n))
        .max(30, "Máximo 30 dias")
        .min(0, "Mínimo 0 dias"),
      horas: yup
        .number()
        .transform((n) => (isNaN(n) ? 0 : n))
        .max(23, "Máximo 23 horas")
        .min(0, "Mínimo 0 horas"),
      minutos: yup
        .number()
        .transform((n) => (isNaN(n) ? 0 : n))
        .max(59, "Máximo 59 minutos")
        .min(0, "Mínimo 0 minutos"),
    }),
  });
};

const FormProjeto: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const {
    nomeFormulario,
    dados: { idProjetoSuperior, id },
  } = useSelector(selectData);

  const {
    dados: projetos,
    salvarProjetoBancoDados,
    atualizarProjetoBancoDados,
    fecharFormularioProjeto,
  } = useProjeto();

  const salvar = (dados: IProjeto) => {
    if (!id) {
      return salvarProjetoBancoDados({ ...dados, idProjetoSuperior });
    }
    return atualizarProjetoBancoDados(id, { ...dados, idProjetoSuperior });
  };

  const handleSubmit: SubmitHandler<IProjeto> = async (data, { reset }) => {
    try {
      const schema = validationSchema();
      await schema.validate(data, { abortEarly: false });
      formRef?.current?.setErrors({});
      salvar(data);
      reset();
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        // console.log({ error, formRef })
        let mensagensErros: { [key: string]: any } = {};
        error.inner.forEach(
          (n) => (mensagensErros[n.path || "undefined"] = n.message)
        );
        formRef?.current?.setErrors(mensagensErros);
      }
    }
  };

  const getInitialData = () => {
    if (!id) {
      return {};
    }
    const projetoArray = projetos.filter((n) => n.id === id);
    if (projetoArray.length === 0) {
      return {};
    }
    const projeto = projetoArray[0];

    const inverterDiaMes = (dataHora: string) => {
      if (!dataHora.trim()) return "";
      const [data, hora] = dataHora.split(" ");
      const [dia, mes, ano] = data.split("/");
      return `${mes}/${dia}/${ano} ${hora}`;
    };

    return {
      ...projeto,
      agenda: {
        inicio: inverterDiaMes(projeto.agenda.inicio),
        fim: inverterDiaMes(projeto.agenda.fim),
      },
      dataLimite: inverterDiaMes(projeto.dataLimite),
    };
  };

  console.log("FormProjeto foi chamado");

  return (
    <BoxFormulario titulo={nomeFormulario}>
      <Form
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
        initialData={getInitialData()}
        ref={formRef}
      >
        <TextField
          id="nome"
          name="nome"
          label="Nome do projeto"
          placeholder="Digite o nome do projeto"
          maxRows={4}
          multiline={true}
        />
        <TextField
          id="descricao"
          name="descricao"
          label="Descrição"
          placeholder="Digite aqui os detalhes do projeto"
          rows={4}
          multiline={true}
        />
        <Scope path="tempoPrevisto">
          <Grid container spacing="15">
            {[
              { id: "meses", name: "meses", label: "Meses", max: "1200" },
              { id: "dias", name: "dias", label: "Dias", max: "30" },
              { id: "horas", name: "horas", label: "Horas", max: "23" },
              { id: "minutos", name: "minutos", label: "Minutos", max: "59" },
            ].map(({ id, name, label, max: valorMaximo }) => (
              <Grid item xs={3} key={id}>
                <TextField
                  id={id}
                  name={name}
                  label={label}
                  type="number"
                  maxRows={1}
                  InputProps={{
                    inputProps: { min: "0", step: "1", max: valorMaximo },
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </Scope>
        <NumberFormat
          id="custoPrevisto"
          name="custoPrevisto"
          label="Custo Previsto (R$)"
          placeholder="Digite o custo previsto"
        />
        <DateTimePicker label="Data limite" name="dataLimite" />

        {/* <Scope path="agenda">
          <Grid container spacing="15">
            <Grid item xs={6}>
              <DateTimePicker label="Inicio Agenda" name="inicio" />
            </Grid>
            <Grid item xs={6}>
              <DateTimePicker label="Fim Agenda" name="fim" />
            </Grid>
          </Grid>
        </Scope> */}

        <ButtonGroup
          sx={{ m: 1 }}
          variant="outlined"
          fullWidth
          color="inherit"
          size="medium"
          aria-label="medium secondary button group"
        >
          <Button onClick={fecharFormularioProjeto} color="warning">
            Cancelar
          </Button>
          <Button color="primary" type="submit">
            Salvar
          </Button>
        </ButtonGroup>
      </Form>
    </BoxFormulario>
  );
};

export default FormProjeto;
