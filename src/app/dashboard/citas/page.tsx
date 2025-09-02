"use client";
import dynamic from 'next/dynamic';
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { Column } from "@/app/components/components.types";
import { AppDispatch, RootState } from "@/app/redux/store";
import { setPage, setPageSize } from '@/app/redux/components.slice';
import { listCitas, removeCita, setSelectedCita } from '@/app/redux/citas.slice';

const Typography = dynamic(() => import('@mui/material/Typography'));
const Box = dynamic(() => import('@mui/material/Box'), { ssr: false });
const Button = dynamic(() => import('@mui/material/Button'), { ssr: false });
// 
const DynamicTable = dynamic(() => import('@/app/components/DynamicTable'), { ssr: false });
const DataInfo = dynamic(() => import('@/app/components/DataInfo'), { ssr: false });
const LoaderApp = dynamic(() => import('@/app/components/LoaderApp'), { ssr: false });

const columns: Column[] = [
    { field: 'motivo', header: 'Motivo' },
    { field: 'fecha', header: 'Fecha' },
    { field: 'horario', header: 'Horario' },
    { field: 'paciente', header: 'Paciente' },
    { field: 'tools', header: 'Acciones' }
];

export default function Page() {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const { pageSize, currentPage, loading, totalCount } = useSelector((state: RootState) => state.components);
    const { citas } = useSelector((state: RootState) => state.citas);

    useEffect(() => {
        dispatch(listCitas());
        dispatch(setSelectedCita(null));
    }, [])
    

    const handleOnPageChange = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        dispatch(setPage(newPage));
    }

    const handleOnRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        dispatch(setPageSize(parseInt(event.target.value, 10)));
    }

    const handleOnDetail = (row: Record<string, any>) => router.push(`/dashboard/citas/${row.id}`);
    const goToNew = () => router.push('/dashboard/citas/nuevo');

    const handleDelete = () => {
        dispatch(removeCita());
    }

    return (
        <Box>
            <Typography variant="h4">Citas</Typography>
            <hr />
            <Button onClick={goToNew} sx={{ marginTop: 3, marginBottom: 3 }} variant="contained">Agregar</Button>
            {
                loading ? <LoaderApp/> : citas.length === 0 ? <DataInfo message="No hay citas registradas"/>
                    : <DynamicTable columns={columns} data={citas} page={currentPage} rowsPerPage={pageSize} onDetails={handleOnDetail}
                        totalItems={totalCount} onPageChange={handleOnPageChange} onRowsPerPageChange={handleOnRowsPerPageChange} onDelete={handleDelete} />
            }
        </Box>
    )
}