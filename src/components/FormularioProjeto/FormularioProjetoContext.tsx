import { ChangeEvent, ChangeEventHandler, createContext, FormEventHandler } from 'react';
import { FormikProps, useFormik } from 'formik';
import * as yup from 'yup';



export interface IValuesFormik {
    nome: string;
    custo: string;
    descricao: string;
    dias: string;
    meses: string;
    horas: string;
    minutos: string;
    dataLimite: Date | null;
    dataFimAgenda: Date | null;
    dataInicioAgenda: Date | null;
    ativarDataLimite: boolean;
    cadastrarAgenda: boolean;
}

export interface IFormularioProjeto {
    formik: FormikProps<IValuesFormik>;
}

interface IValoresCampo {
    value: string;
    error: boolean | undefined;
    helperText: string | false | undefined;
}
interface IValoresCampoData {
    value: Date | null;
    onChange: (date: Date | null, keyboardInputValue?: string | undefined) => void;
}

interface IDatasControls {
    value: boolean;
}


interface ITempoPrevisto {
    meses: IValoresCampo;
    dias: IValoresCampo;
    horas: IValoresCampo;
    minutos: IValoresCampo;
}

export interface IValoresFormulario {
    nome: IValoresCampo;
    descricao: IValoresCampo;
    custoPrevisto: IValoresCampo;
    tempoPrevisto: ITempoPrevisto;
    
    ativarDataLimite: IDatasControls;
    ativarDatasAgenda:IDatasControls

    dataLimite: IValoresCampoData;

    onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    handleSubmit: FormEventHandler<HTMLFormElement>;
}

const getInitialValores = () => {
    return {
        nome: '',
        custo: '',
        descricao: '',
        dias: '',
        meses: '',
        horas: '',
        minutos: '',
        dataLimite: (new Date()),
        dataFimAgenda: (new Date()),
        dataInicioAgenda: (new Date()),
        ativarDataLimite: false,
        cadastrarAgenda: false,
    }
}

export const FormularioProjetoContext = createContext<FormikProps<IValuesFormik> | null | undefined>(null);
FormularioProjetoContext.displayName = "FormularioProjetoContext";

const validationSchema = () => {
    return yup.object({
        nome: yup.string().required('O nome do projeto está vazio'),
        meses: yup.number().max(1200, 'Máximo 100 anos').min(0, 'Mínimo 0 minutos'),
        dias: yup.number().max(30, 'Máximo 30 dias').min(0, 'Mínimo 0 dias'),
        horas: yup.number().max(23, 'Máximo 23 horas').min(0, 'Mínimo 0 horas'),
        minutos: yup.number().max(59, 'Máximo 59 minutos').min(0, 'Mínimo 0 minutos')
    });
}




const FormularioProjetoProvider: React.FC = ({ children }) => {

    const formik: FormikProps<IValuesFormik> = useFormik<IValuesFormik>({
        initialValues: getInitialValores(),
        validationSchema: validationSchema(),
        onSubmit: (values) => {
            console.log(values);
            // submit({ ...values });
            formik.resetForm();
        },
    });

    return (
        <FormularioProjetoContext.Provider value={formik} >
            {children}
        </FormularioProjetoContext.Provider>
    );
}

export default FormularioProjetoProvider;


