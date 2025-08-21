"use client";
import dynamic from "next/dynamic";
import React from "react";
import { useRedirect } from "../hooks/useRedirect";

const Box = dynamic(() => import('@mui/material/Box'), { ssr: false });

export default function DashboardLayout({ children }: { children: React.ReactNode }) {

    useRedirect();

    return (
        <Box>
            { children }
        </Box>
    )

}