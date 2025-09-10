"use client";
import { Column } from '@/app/components/components.types';
import { setPage, setPageSize } from '@/app/redux/components.slice';
import { listPagos, setSelectedPago } from '@/app/redux/pago.slice';
import { AppDispatch, RootState } from '@/app/redux/store';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Typography = dynamic(() => import('@mui/material/Typography'));
const Box = dynamic(() => import('@mui/material/Box'), { ssr: false });
const Button = dynamic(() => import('@mui/material/Button'), { ssr: false });
// 
const DynamicTable = dynamic(() => import('@/app/components/DynamicTable'), { ssr: false });
const DataInfo = dynamic(() => import('@/app/components/DataInfo'), { ssr: false });
const LoaderApp = dynamic(() => import('@/app/components/LoaderApp'), { ssr: false });

const columns: Column[] = [
    { field: 'cita', header: 'Fecha de cita' },
    { field: 'pacienteCita', header: 'Paciente' },
    { field: 'monto', header: 'Monto' },
    { field: 'cantidadRecibida', header: 'Cantidad Recibida' },
    { field: 'cambio', header: 'Cambio' },
    { field: 'tools', header: 'Acciones' }
];

export default function PagosPage() {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const { pageSize, currentPage, loading, totalCount } = useSelector((state: RootState) => state.components);
    const { pagos } = useSelector((state: RootState) => state.pagos);

    useEffect(() => {
        dispatch(listPagos());
        dispatch(setSelectedPago(null));
    }, []);

    const handleOnPageChange = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        dispatch(setPage(newPage));
        dispatch(listPagos());
    }

    const handleOnRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        dispatch(setPageSize(parseInt(event.target.value, 10)));
        dispatch(listPagos());
    }

    const handleOnDetail = (row: Record<string, any>) => router.push(`/dashboard/pagos/${row.id}`);

    const goToNew = () => router.push('/dashboard/pagos/nuevo');

    const handleDelete = () => {
        console.log('Operation not allowed');
    }

    return (
        <Box>
            <Typography variant="h4">Pagos de citas</Typography>
            <Button onClick={goToNew} sx={{ marginTop: 3, marginBottom: 3 }} variant="contained">Agregar</Button>
            <Box>
                {
                    loading ? <LoaderApp/> : pagos.length === 0 ? <DataInfo message="No hay pagos registrados"/>
                        : <DynamicTable columns={columns} data={pagos} page={currentPage} rowsPerPage={pageSize} onDetails={handleOnDetail}
                            totalItems={totalCount} onPageChange={handleOnPageChange} onRowsPerPageChange={handleOnRowsPerPageChange} onDelete={handleDelete} allowDelete={false} />
                }
            </Box>
        </Box>
    )
}