"use client";
import dynamic from 'next/dynamic';

const Box = dynamic(() => import('@mui/material/Box'), { ssr: false });
const CircularProgress = dynamic(() => import('@mui/material/CircularProgress'), { ssr: false });
const Typography = dynamic(() => import('@mui/material/Typography'));

export default function LoaderApp() {
    return (
        <Box display="flex" justifyContent="center" alignItems="center" flexDirection={'column'}>
            <CircularProgress sx={{ marginBottom: 2 }}/>
            <Typography variant="h5">Cargando datos...</Typography>
        </Box>
    )
}