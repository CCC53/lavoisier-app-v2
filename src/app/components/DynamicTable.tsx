import dynamic from "next/dynamic";
import { DyamicTableProps } from "./components.types";
import DeleteConfirmationModal from './DeleteConfirmationModal';
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { setModalOpen, setSelectedRow } from "../redux/components.slice";

const Box = dynamic(() => import('@mui/material/Box'), { ssr: false });
const Paper = dynamic(() => import('@mui/material/Paper'), { ssr: false });
const Table = dynamic(() => import('@mui/material/Table'), { ssr: false });
const TableBody = dynamic(() => import('@mui/material/TableBody'), { ssr: false });
const TableCell = dynamic(() => import('@mui/material/TableCell'), { ssr: false });
const TableContainer = dynamic(() => import('@mui/material/TableContainer'), { ssr: false });
const TableHead = dynamic(() => import('@mui/material/TableHead'), { ssr: false });
const TableRow = dynamic(() => import('@mui/material/TableRow'), { ssr: false });
const TableFooter = dynamic(() => import('@mui/material/TableFooter'), { ssr: false });
const TablePagination = dynamic(() => import('@mui/material/TablePagination'), { ssr: false });
const IconButton = dynamic(() => import('@mui/material/IconButton'), { ssr: false });
const Chip = dynamic(() => import('@mui/material/Chip'), { ssr: false });

const DeleteIcon = dynamic(() => import('@mui/icons-material/Delete'), { ssr: false });
const ModeEditIcon = dynamic(() => import('@mui/icons-material/ModeEdit'), { ssr: false });
const VisibilityIcon = dynamic(() => import('@mui/icons-material/Visibility'), { ssr: false });

export default function DynamicTable({ data, columns, page, rowsPerPage, totalItems, onPageChange, onRowsPerPageChange, onDetails, onDelete, allowDelete }: DyamicTableProps) {

    const dispatch = useDispatch<AppDispatch>();

    const openModal = (row: Record<string, any>) => {
        dispatch(setModalOpen(true));
        dispatch(setSelectedRow(row));
    }

    return (
        <Paper>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            {
                                columns.map(col => (<TableCell key={col.field}>{col.header}</TableCell>))
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            data.map((row, index) => (
                                <TableRow key={index}>
                                    {
                                        columns.map(col => (<TableCell key={col.field}>
                                            { col.field === 'tools' ? (
                                                    <Box>
                                                        <IconButton color="primary" onClick={() => onDetails(row)}>
                                                            { allowDelete ? <ModeEditIcon/> :  <VisibilityIcon/> }
                                                        </IconButton>
                                                        {
                                                            allowDelete && (
                                                                <IconButton color="error" onClick={() => openModal(row)}>
                                                                    <DeleteIcon/>
                                                                </IconButton>
                                                            )
                                                        }
                                                    </Box>
                                                ) : col.field === 'sexo' ? ( <Chip color="secondary" label={row[col.field]}/>  ) : col.field === 'paciente' ? row[col.field].nombre
                                                : col.field === 'cita' ? row[col.field].fecha : col.field === 'pacienteCita' ? row['cita'].paciente.nombre : row[col.field]
                                            }
                                        </TableCell>))
                                    }
                                </TableRow>
                            ))
                        }
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination rowsPerPageOptions={[10, 50, 100]} colSpan={7}
                                count={totalItems}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={onPageChange}
                                onRowsPerPageChange={onRowsPerPageChange}
                                labelRowsPerPage="Elementos por página"
                                labelDisplayedRows={({ count, page }) =>
                                    `Página ${page + 1} de ${Math.ceil(count / rowsPerPage)}`
                                }
                                sx={{
                                    '.MuiTablePagination-selectLabel, .MuiTablePagination-select, .MuiTablePagination-displayedRows': {
                                        fontSize: '1rem'
                                    }
                                }}
                            ></TablePagination>
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
            <DeleteConfirmationModal closeDeleteModal={() => dispatch(setModalOpen(false))} onDelete={onDelete}/>
        </Paper>
    )
}