"use client";
import dynamic from 'next/dynamic';

const Box = dynamic(() => import('@mui/material/Box'), { ssr: false });
const CircularProgress = dynamic(() => import('@mui/material/CircularProgress'), { ssr: false });

export default function LoadingFallback() {
    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
            <CircularProgress/>
        </Box>
    )
}