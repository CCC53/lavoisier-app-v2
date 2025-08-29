"use client";
import { Column } from "@/app/components/components.types";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

const Typography = dynamic(() => import('@mui/material/Typography'));
const Box = dynamic(() => import('@mui/material/Box'), { ssr: false });
const Button = dynamic(() => import('@mui/material/Button'), { ssr: false });
// 
const DynamicTable = dynamic(() => import('@/app/components/DynamicTable'), { ssr: false });

const columns: Column[] = [
    { field: 'nombre', header: 'Nombre' },
    { field: 'nacimiento', header: 'Fecha de Nacimiento' },
    { field: 'sexo', header: 'Sexo' },
    { field: 'telefono', header: 'Telefono' },
    { field: 'email', header: 'Email' },
    { field: 'tools', header: 'Acciones' }
];

export default function Page() {
    const router = useRouter();

    const goToNew = () => router.push('/dashboard/pacientes/nuevo');

    return (
        <Box>
            <Typography variant="h4">Pacientes</Typography>
            <hr />
            <Button onClick={goToNew} sx={{ marginTop: 3, marginBottom: 3 }} variant="contained">Agregar</Button>
            <DynamicTable columns={columns} data={[]} />
        </Box>
    )
}