import dynamic from "next/dynamic";
import { DyamicTableProps } from "./components.types";

const Box = dynamic(() => import('@mui/material/Box'), { ssr: false });
const Paper = dynamic(() => import('@mui/material/Paper'), { ssr: false });
const Table = dynamic(() => import('@mui/material/Table'), { ssr: false });
const TableBody = dynamic(() => import('@mui/material/TableBody'), { ssr: false });
const TableCell = dynamic(() => import('@mui/material/TableCell'), { ssr: false });
const TableContainer = dynamic(() => import('@mui/material/TableContainer'), { ssr: false });
const TableHead = dynamic(() => import('@mui/material/TableHead'), { ssr: false });
const TableRow = dynamic(() => import('@mui/material/TableRow'), { ssr: false });
const IconButton = dynamic(() => import('@mui/material/IconButton'), { ssr: false });
const Chip = dynamic(() => import('@mui/material/Chip'), { ssr: false });

const DeleteIcon = dynamic(() => import('@mui/icons-material/Delete'), { ssr: false });
const ModeEditIcon = dynamic(() => import('@mui/icons-material/ModeEdit'), { ssr: false });

export default function DynamicTable({ data, columns }: DyamicTableProps) {
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
                                                        <IconButton color="primary">
                                                            <ModeEditIcon/>
                                                        </IconButton>
                                                        <IconButton color="error">
                                                            <DeleteIcon/>
                                                        </IconButton>
                                                    </Box>
                                                ) : col.field === 'sexo' ? ( <Chip color="secondary" label={row[col.field]}/>  ) : row[col.field]
                                            }
                                        </TableCell>))
                                    }
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    )
}