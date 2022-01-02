import { Typography } from "@mui/material";

interface IProps {
    value: string;
    label: string;
    color: string;
}

const DetalhesProjeto: React.FC<IProps> = ({ value, label, color, ...rest }) => {
    return (
        <Typography paragraph sx={{ color, textAlign: 'justify', padding: 0, margin: 0 }} {...rest} >
            <Typography component="span" sx={{ fontWeight: 'bold', color, padding: 0, margin: 0 }}>
                {label}
            </Typography>
            {value}
        </Typography>)
}

export default DetalhesProjeto;