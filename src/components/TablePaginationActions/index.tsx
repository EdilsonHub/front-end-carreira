import * as React from 'react';
import { useTheme } from '@mui/material/styles';

import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination, { LabelDisplayedRowsArgs } from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
// import EditIcon from '@mui/icons-material/Edit';

import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';

import LightTooltip from '../LightTooltip';

import { IAgendamento, removerAgendamento } from '../../store/Agendamento.store';
import { setTrueConcluido } from '../../store/Projetos.store';

import { Typography } from '@mui/material';
import { useDispatch } from 'react-redux';

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number,
  ) => void;
}


interface IProps {
  rows: IAgendamento[];
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

const CustomPaginationActionsTable: React.FC<IProps> = ({ rows }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const dispatch = useDispatch();

  const handleOnClickRemoverAgendamento = (id: string) => () => {
    dispatch(removerAgendamento(id));
  }
  const handleOnClickConcluirProjeto = (id: string) => () => {
    dispatch(setTrueConcluido(id));
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">

        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row: IAgendamento) => (
            <TableRow key={row.id}>
              <TableCell style={{ width: 140 }}>
                <Typography color={row.projetoConcluido? "darkgrey" : "dark"} >{row.inicio}</Typography>
              </TableCell>
              <TableCell style={{ width: 140 }} align="left">
                <Typography color={row.projetoConcluido? "darkgrey" : "dark"} >{row.fim}</Typography>
              </TableCell>
              <TableCell align="left">
                <Typography color={row.projetoConcluido? "darkgrey" : "dark"}> <Typography color="lightgray" component="span">{row.caminhoProjeto}</Typography >{row.nomeProjeto}</Typography>
              </TableCell>
              <TableCell style={{ width: 120, padding: 0 }} align="right">

                {
                  !row.projetoConcluido && <>
                    <LightTooltip title="Finalizar" placement="top-start">
                      <IconButton
                        onClick={handleOnClickConcluirProjeto(row.idProjeto)}
                        // disabled={page === 0}
                        aria-label="first page"
                      >
                        <CheckIcon color="success" />
                      </IconButton>
                    </LightTooltip>

                    <LightTooltip title="Remover" placement="top-start">
                      <IconButton
                        onClick={handleOnClickRemoverAgendamento(row.id)}
                        // disabled={page === 0}
                        aria-label="first page"
                      >
                        <DeleteForeverIcon color='error' />
                      </IconButton>
                    </LightTooltip>
                  </>
                }


              </TableCell>
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>

            <TablePagination
              rowsPerPageOptions={[5, 10, 25, 50, { label: 'Todas', value: -1 }]}
              colSpan={4}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'linhas por páginas',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}

              labelRowsPerPage="Linhas por página"
              labelDisplayedRows={({ from, to, count }: LabelDisplayedRowsArgs) => (`${from}–${to} de ${count !== -1 ? count : `mais ${to}`}`)}
            />

          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer >
  );
}

export default CustomPaginationActionsTable;