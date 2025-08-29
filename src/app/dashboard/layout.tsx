"use client";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { useRedirect } from "../hooks/useRedirect";
import { useRouter } from "next/navigation";
import { AuthService } from '../api/services/auth.service';

const Box = dynamic(() => import('@mui/material/Box'), { ssr: false });
const AppBar = dynamic(() => import('@mui/material/AppBar'), { ssr: false });
const Toolbar = dynamic(() => import('@mui/material/Toolbar'), { ssr: false });
const IconButton = dynamic(() => import('@mui/material/IconButton'), { ssr: false });
const Typography = dynamic(() => import('@mui/material/Typography'));
const Drawer = dynamic(() => import('@mui/material/Drawer'));
const List = dynamic(() => import('@mui/material/List'), { ssr: false });
const ListItem = dynamic(() => import('@mui/material/ListItem'), { ssr: false });
const ListItemButton = dynamic(() => import('@mui/material/ListItemButton'), { ssr: false });
const ListItemIcon = dynamic(() => import('@mui/material/ListItemIcon'), { ssr: false });
const ListItemText = dynamic(() => import('@mui/material/ListItemText'), { ssr: false });
const Button = dynamic(() => import('@mui/material/Button'), { ssr: false });

const MenuIcon = dynamic(() => import('@mui/icons-material/Menu'), { ssr: false });
const LogoutIcon = dynamic(() => import('@mui/icons-material/Logout'), { ssr: false });
const PersonIcon = dynamic(() => import('@mui/icons-material/Person'), { ssr: false });
const CalendarTodayIcon = dynamic(() => import('@mui/icons-material/CalendarToday'), { ssr: false });
const PaymentsIcon = dynamic(() => import('@mui/icons-material/Payments'), { ssr: false });
const PendingActionsIcon = dynamic(() => import('@mui/icons-material/PendingActions'), { ssr: false });

export default function DashboardLayout({ children }: { children: React.ReactNode }) {

    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [routes, setRoutes] = useState([
        { path: '/dashboard/pacientes', label: 'Pacientes', icon: <PersonIcon/> },
        { path: '/dashboard/citas', label: 'Citas', icon: <CalendarTodayIcon/> },
    ]);

    useEffect(() => {
        const payload = AuthService.getPayloadFromToken();
        if (payload.role == "N") {
            setRoutes([...routes, { path: '/dashboard/historial-clinico', label: 'Historial Clinico', icon: <PendingActionsIcon/> }]);
        } else {
            setRoutes([...routes, { path: '/dashboard/pagos', label: 'Pagos', icon: <PaymentsIcon/> }]);
        }
    }, [])
    

    const handleNavigation = (path: string) => {
        router.push(path);
        setOpen(false);
    };

    const handleLogout = () => {
        localStorage.clear();
        router.replace('/auth');
    }

    useRedirect();

    return (
        <Box>
            {/* Header */}
            <AppBar position="fixed" sx={{
                backgroundColor: 'white'
            }}>
                <Toolbar>
                    <IconButton color="primary" onClick={() => setOpen(!open)}>
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" color="black">Lavoisier App V2</Typography>
                </Toolbar>
            </AppBar>

            {/* Sidebar */}
            <Drawer onClose={() => setOpen(false)} open={open} sx={{
                '& .MuiDrawer-paper': {
                    width: { xs: '100%', sm: 240 },
                    boxSizing: 'border-box',
                    borderRight: { xs: 'none', sm: '1px solid rgba(0, 0, 0, 0.12)' },
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                }
            }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography variant="h5" marginTop={2}>Lavoisier App Bar</Typography>
                        <List sx={{ marginTop: 3, width: '100%' }}>
                            {
                                routes.map(route => (
                                    <ListItem key={route.path} disablePadding sx={{ width: '100%' }}>
                                        <ListItemButton onClick={() => handleNavigation(route.path)} sx={{ width: '100%' }}>
                                            <ListItemIcon>{route.icon}</ListItemIcon>
                                            <ListItemText primary={route.label}/>
                                        </ListItemButton>
                                    </ListItem>
                                ))
                            }
                        </List>
                    </Box>
                    <Button 
                        onClick={handleLogout} 
                        variant="contained" 
                        startIcon={<LogoutIcon/>}
                        sx={{ marginTop: 'auto', marginBottom: 2, alignSelf: 'center', width: '90%' }}
                    >
                        Cerrar sesión
                    </Button>
                </Box>
            </Drawer>

            <Box sx={{ flexGrow: 1, padding: 10, marginLeft: 0, width: '100%', marginBottom: '150px', marginTop: '20px'}}>
                { children }

                {/* Footer */}
                <Box sx={{
                    mt: 'auto',
                    py: { xs: 1.5, sm: 2 },
                    px: { xs: 2, sm: 3 },
                    backgroundColor: 'white',
                    borderTop: '1px solid rgba(0, 0, 0, 0.12)',
                    position: 'fixed',
                    bottom: 0,
                    width: '100%',
                    left: 0,
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: { xs: 1, sm: 2 },
                    role: 'contentinfo',
                    height: { xs: 'auto', sm: '60px' },
                    minHeight: { xs: '60px', sm: '60px' }
                }}>
                    &copy; {new Date().getFullYear()} Carlos Calette.
                </Box>
            </Box>
        </Box>
    )

}