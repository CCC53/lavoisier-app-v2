"use client";
import { useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { Column } from "@/app/components/components.types";
import { AppDispatch, RootState } from "@/app/redux/store";
import { listPacientes, removePaciente, setSelectedPaciente } from "@/app/redux/pacientes.slice";
import { setPageSize, setPage } from "@/app/redux/components.slice";

const Typography = dynamic(() => import('@mui/material/Typography'));
const Box = dynamic(() => import('@mui/material/Box'), { ssr: false });
const Button = dynamic(() => import('@mui/material/Button'), { ssr: false });
// 
const DynamicTable = dynamic(() => import('@/app/components/DynamicTable'), { ssr: false });
const DataInfo = dynamic(() => import('@/app/components/DataInfo'), { ssr: false });
const LoaderApp = dynamic(() => import('@/app/components/LoaderApp'), { ssr: false });

const columns: Column[] = [
    { field: 'nombre', header: 'Nombre' },
    { field: 'nacimiento', header: 'Fecha de Nacimiento' },
    { field: 'sexo', header: 'Sexo' },
    { field: 'telefono', header: 'Telefono' },
    { field: 'email', header: 'Email' },
    { field: 'tools', header: 'Acciones' }
];

export default function Page() {
    const dispatch = useDispatch<AppDispatch>();
    const { pacientes } = useSelector((state: RootState) => state.pacientes);
    const { pageSize, currentPage, loading, totalCount, selectedRow } = useSelector((state: RootState) => state.components);
    const router = useRouter();

    useEffect(() => {
        dispatch(listPacientes());
        dispatch(setSelectedPaciente(null));
    }, []);

    const handleOnPageChange = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        dispatch(setPage(newPage));
        dispatch(listPacientes());
    }

    const handleOnRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        dispatch(setPageSize(parseInt(event.target.value, 10)));
        dispatch(listPacientes());
    }

    const handleOnDetail = (row: Record<string, any>) => router.push(`/dashboard/pacientes/${row.id}`);
    const goToNew = () => router.push('/dashboard/pacientes/nuevo');

    const handleDelete = () => {
        selectedRow && dispatch(removePaciente(selectedRow.id));
    }

    return (
        <Box>
            <Typography variant="h4">Pacientes</Typography>
            <hr />
            <Button onClick={goToNew} sx={{ marginTop: 3, marginBottom: 3 }} variant="contained">Agregar</Button>
            <Box>
                {
                    loading ? <LoaderApp/> : pacientes.length === 0 ? <DataInfo message="No hay pacientes registrados"/>
                        : <DynamicTable columns={columns} data={pacientes} page={currentPage} rowsPerPage={pageSize} onDetails={handleOnDetail} allowDelete={true}
                            totalItems={totalCount} onPageChange={handleOnPageChange} onRowsPerPageChange={handleOnRowsPerPageChange} onDelete={handleDelete} />
                }
            </Box>
        </Box>
    )
}