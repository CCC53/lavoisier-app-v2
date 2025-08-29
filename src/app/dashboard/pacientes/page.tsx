"use client";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

const Typography = dynamic(() => import('@mui/material/Typography'));
const Box = dynamic(() => import('@mui/material/Box'), { ssr: false });
const Button = dynamic(() => import('@mui/material/Button'), { ssr: false });

export default function Page() {
    const router = useRouter();

    const goToNew = () => router.push('/dashboard/pacientes/nuevo');

    return (
        <Box>
            <Typography variant="h4">Pacientes</Typography>
            <hr />
            <Button onClick={goToNew} sx={{ marginTop: 3 }} variant="contained">Agregar</Button>
        </Box>
    )
}