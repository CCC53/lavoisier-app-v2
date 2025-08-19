"use client";
import { ReactNode, Suspense } from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import dynamic from "next/dynamic";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const LocalizationProvider = dynamic(() => import('@mui/x-date-pickers').then(mod => mod.LocalizationProvider), { ssr: false });
const CssBaseline = dynamic(() => import('@mui/material/CssBaseline'), { ssr: false });
const LoadingFallback = dynamic(() => import('@/app/components/LoadingFallback'), { ssr: false });

export default function Providers({ children }: { children: ReactNode }) {
    return (
        <Suspense fallback={<LoadingFallback/>}>
            <Provider store={store}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <CssBaseline/>
                    { children }
                </LocalizationProvider>
            </Provider>
        </Suspense>
    )
}