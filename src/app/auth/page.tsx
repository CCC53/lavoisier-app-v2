"use client";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { SelectChangeEvent } from "@mui/material/Select";
import { AuthDynamicFields, AuthDynamicFieldsTouched, AuthDynamicFieldsTouchedErrors, ROL_OPTIONS } from './auth.types';
import styles from './page.module.css';
import { AuthService } from "../api/services/auth.service";
import { useRedirect } from "../hooks/useRedirect";

const Box = dynamic(() => import('@mui/material/Box'), { ssr: false });
const Paper = dynamic(() => import('@mui/material/Paper'), { ssr: false });
const TextField = dynamic(() => import('@mui/material/TextField'), { ssr: false });
const Select = dynamic(() => import('@mui/material/Select'), { ssr: false });
const MenuItem = dynamic(() => import('@mui/material/MenuItem'), { ssr: false });
const FormControl = dynamic(() => import('@mui/material/FormControl'), { ssr: false });
const InputLabel = dynamic(() => import('@mui/material/InputLabel'), { ssr: false });
const Button = dynamic(() => import('@mui/material/Button'), { ssr: false });
const Typography = dynamic(() => import('@mui/material/Typography'));

export default function Auth() {
    const [loading, setLoading] = useState<boolean>(false);
    const [doRegister, setDoRegister] = useState<boolean>(false);
    const router = useRouter();
    const [values, setValues] = useState<AuthDynamicFields>({
        email: '',
        password: '',
        nombre: '',
        telefono: '',
        rol: ''
    });
    const [touched, setTouched] = useState<AuthDynamicFieldsTouched>({
        email: false,
        password: false,
        nombre: false,
        telefono: false,
        rol: false
    });

    const [errors, setErrors] = useState<AuthDynamicFieldsTouchedErrors>({
        email: '',
        password: '',
        nombre: '',
        telefono: '',
        rol: ''
    });

    const toggleRegister = () => setDoRegister(!doRegister);

    const validatePassword = (password: string): string => {
        if (!password) {
            return 'La contraseña es requerida';
        }
        if (password.length < 5) {
            return 'La contraseña debe tener al menos 6 caracteres';
        }
        return '';
    };

    const validateEmail = (email: string): string => {
        if (!email) {
            return 'El email es requerido';
        }
        if (!new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$').test(email)) {
            return 'Ingrese un email valido'
        }
        return '';
    };

    const validateNombre = (nombre: string): string => !nombre ? 'El nombre es requerido' : '';
    const validateTelefono = (telefono: string): string => !telefono ? 'El telefono es requerido' : '';
    const validateRol = (rol: string): string => !rol ? 'El rol es requerido' : '';

    const handleOnChange = (field: keyof AuthDynamicFields) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setValues(prev => ({ ...prev, [field]: value }));
        if (touched[field]) {
            const validationFunction = field === 'email' ? validateEmail : field === 'password' ? validatePassword : field === 'nombre' ? validateNombre : validateTelefono;
            setErrors(prev => ({ ...prev, [field]: validationFunction(value) }))
        }
    }

    const handleOnBlur = (field: keyof AuthDynamicFields) => () => {
        setTouched(prev => ({ ...prev, [field]: true }));
        const value = values[field];
        const validationFunction = field === 'email' ? validateEmail : field === 'password' ? validatePassword : field === 'nombre' ?
            validateNombre : field === 'telefono' ? validateTelefono : validateRol;
        setErrors(prev => ({ ...prev, [field]: validationFunction(value) }));
    }

    const handleOnSelectChange = (event: SelectChangeEvent) => {
        const { value } = event.target;
        setValues(prev => ({ ...prev, rol: value }));
        if (touched.rol) {
            setErrors(prev => ({ ...prev, rol: validateRol(value) }));
        }
    }

    const isValid = () => {
        const passError = validatePassword(values.password);
        const emailError = validateEmail(values.email);
        if (doRegister) {
            const nomError = validateNombre(values.nombre);
            const telError = validateTelefono(values.telefono);
            const rolError = validateRol(values.rol);
            return !Boolean(
                values.email && values.password && values.nombre && values.telefono && values.rol
                && !passError && !emailError && !nomError && !telError && !rolError
            )
        }
        return !Boolean(values.email && values.password && !passError && !emailError)
    }

    const handleOnSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await AuthService.auth(values, doRegister);
            console.log(response);
            router.push('/dashboard/pacientes');
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useRedirect();

    return (
        <Box className={styles.loginContainer}>
            <Paper elevation={3} className={doRegister ? styles.paper : styles.paperLogin}>
                <Typography variant="h5">{ doRegister ? 'Registrar' : 'Iniciar sesión' }</Typography>
                <form className="loginForm" onSubmit={handleOnSubmit} noValidate>
                    {
                        doRegister && (
                            <Box>
                                <TextField required={doRegister} sx={{ mb: 1.5 }} value={values.nombre} onChange={handleOnChange('nombre')} onBlur={handleOnBlur('nombre')}
                                    label="Nombre" variant="standard" placeholder="Ingrese su nombre" fullWidth error={touched.nombre && Boolean(errors.nombre)}
                                    helperText={touched.nombre && errors.nombre}/>
                                <TextField required={doRegister} sx={{ mb: 1.5 }} value={values.telefono} onChange={handleOnChange('telefono')} label="Telefono"
                                    onBlur={handleOnBlur('telefono')} variant="standard" placeholder="Ingrese su telefono" fullWidth error={touched.telefono && Boolean(errors.telefono)}
                                    helperText={touched.telefono && errors.telefono}/>
                                <FormControl fullWidth variant="standard" sx={{ mb: 1.5 }}>
                                    <InputLabel>Rol</InputLabel>
                                    <Select required={doRegister} value={values.rol} onChange={(e) => handleOnSelectChange(e as SelectChangeEvent<string>)}
                                        onBlur={handleOnBlur('rol')} error={touched.rol && Boolean(errors.rol)}>
                                        { ROL_OPTIONS.map(opt => (<MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>)) }
                                    </Select>
                                    <Typography color="error" variant="caption">{touched.rol && errors.rol}</Typography>
                                </FormControl>
                            </Box>
                        )
                    }
                    <TextField required value={values.email} label="Email" variant="standard" placeholder="Ingrese su email" fullWidth onBlur={handleOnBlur('email')}
                        sx={{ mb: 1.5 }}  onChange={handleOnChange('email')} error={touched.email && Boolean(errors.email)}
                            helperText={touched.email && errors.email}/>
                    <TextField required value={values.password} label="Contraseña" variant="standard" placeholder="Ingrese su contraseña" fullWidth type="password"
                        sx={{ mb: 1.5 }}  onChange={handleOnChange('password')} onBlur={handleOnBlur('password')} error={touched.password && Boolean(errors.password)}
                            helperText={touched.password && errors.password}/>
                    <Button variant="contained" type="submit" fullWidth sx={{ mt: 3, mb: 3 }} disabled={isValid()} loading={loading} loadingPosition="end">
                        { doRegister ? 'Registrar' : 'Iniciar sesión' }
                    </Button>
                    <Typography onClick={toggleRegister} sx={{ cursor: 'pointer' }} variant="button" color="primary">
                        { doRegister ? '¿Ya está registrado? Inicie sesión' : 'Registrar nuevo miembro' }
                    </Typography>
                </form>
            </Paper>
        </Box>
    )
}