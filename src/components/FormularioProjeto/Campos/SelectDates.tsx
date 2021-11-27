import { styled, Paper } from '@mui/material';

const SelectDates = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(0),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    marginRight: theme.spacing(-1),
    marginLeft: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default SelectDates;