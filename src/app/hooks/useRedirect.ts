import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
import { store } from "@/app/redux/store";
import { RootState } from "@/app/redux/store.types";

const isJWTExpired = (token: string): boolean => {
    try {
        const decoded = jwtDecode(token);
        console.log(decoded);
        if (!decoded.exp) {
            return true;
        }
        const currentTime = Math.floor(Date.now() / 1000);
        return decoded.exp < currentTime;
    } catch (error) {
        console.log(error);
        return true;
    }
}

export const useRedirect = () => {
    const router = useRouter();
    const path = usePathname();
    useEffect(() => {
        const state: RootState = store.getState();
        const token = state.auth.token;
        if (!token || isJWTExpired(token)) {
            router.replace('/auth');
        }
        if (token) {
            !isJWTExpired(token) && path === '/auth' && router.replace('/dashboard');
        }
    }, [router]);
}