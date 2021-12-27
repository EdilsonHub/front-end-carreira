const montarStringTempoPrevito = ({ meses, dias, horas, minutos }: { meses: string, dias: string, horas: string, minutos: string }) => {
    const formulaStringPlural = (labelSingular: string, labelPlural: string, value: string) => {
        return (Number(value) > 1) ? `${value} ${labelPlural}` : `${value} ${labelSingular}`;
    };

    const isVoid = (data: string) => {
        if(!data.trim()) return false;
        if(isNaN(Number(data))) return false;
        return (Number(data) > 0);
    }

    const mes = isVoid(meses)? formulaStringPlural("mes", "meses", meses) : "";
    const dia = isVoid(dias)? formulaStringPlural("dia", "dias", dias) : "";
    const hora = isVoid(horas)? formulaStringPlural("hora", "horas", horas) : "";
    const minuto = isVoid(minutos)? formulaStringPlural("minuto", "minutos", minutos) : "";

    let arrayFiltrado = [mes, dia, hora, minuto].filter(n => !!n);

    if (arrayFiltrado.length < 2) return arrayFiltrado.join(" e ");

    arrayFiltrado = arrayFiltrado.reverse();
    arrayFiltrado[1] = `${arrayFiltrado[1]} e ${arrayFiltrado[0]}`;
    arrayFiltrado = arrayFiltrado.reverse();
    arrayFiltrado.pop();

    return arrayFiltrado.join(", ");

}

const montarStringAgenda = ({ inicio, fim }: { inicio: string, fim: string }) => {
    return (inicio || fim) ? `${inicio} à ${fim}` : "";
}

export { montarStringTempoPrevito, montarStringAgenda };