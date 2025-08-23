import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';

const isJWTExpired = (token: string): boolean => {
    try {
        const decoded = jwtDecode(token);
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
        const token = localStorage.getItem('token');
        if (!token || isJWTExpired(token)) {
            router.replace('/auth');
        }
        if (token) {
            !isJWTExpired(token) && path === '/auth' && router.replace('/dashboard');
        }
    }, [router]);
}