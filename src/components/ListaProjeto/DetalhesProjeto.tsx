import { Typography } from "@mui/material";

interface IProps {
    value: string;
    label: string;
}

const DetalhesProjeto: React.FC<IProps> = ({ value, label, ...rest }) => {
    return (
        <Typography paragraph sx={{ color: 'text.secondary', textAlign: 'justify', padding: 0, margin: 0}} {...rest} >
            <Typography component="span" sx={{ fontWeight: 'bold', color: 'text.primary', padding: 0, margin: 0 }}>
                {label}
            </Typography>
            {value}
        </Typography>)
}

export default DetalhesProjeto;