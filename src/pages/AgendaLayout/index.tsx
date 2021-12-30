import React, { useState } from 'react';
import FormAgenda from '../../components/Form/FormAgenda';
import Agenda from './Agenda';

const AgendaLayout: React.FC = () => {
    const [idAgenda, setIdAgenda] = useState<string>("");

    return (
        <>
            <Agenda idAgenda={idAgenda} setIdAgenda={setIdAgenda} />
            <FormAgenda />
        </>
    );
}

export default AgendaLayout;