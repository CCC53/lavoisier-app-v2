"use client";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as yup from "yup";
import { ROL_OPTIONS } from './auth.types';
import { AuthService } from "../api/services/auth.service";
import { useRedirect } from "../hooks/useRedirect";
import styles from './page.module.css';

const Box = dynamic(() => import('@mui/material/Box'), { ssr: false });
const Paper = dynamic(() => import('@mui/material/Paper'), { ssr: false });
const TextField = dynamic(() => import('@mui/material/TextField'), { ssr: false });
const Select = dynamic(() => import('@mui/material/Select'), { ssr: false });
const MenuItem = dynamic(() => import('@mui/material/MenuItem'), { ssr: false });
const FormControl = dynamic(() => import('@mui/material/FormControl'), { ssr: false });
const InputLabel = dynamic(() => import('@mui/material/InputLabel'), { ssr: false });
const Button = dynamic(() => import('@mui/material/Button'), { ssr: false });
const Typography = dynamic(() => import('@mui/material/Typography'));

const loginSchema = yup.object({
    email: yup.string().email('Ingrese un email válido').required('El email es requerido'),
    password: yup.string().min(5, 'La contraseña debe tener al menos 5 caracteres').required('La contraseña es requerida')
});

const registerSchema = yup.object({
    email: yup.string().email('Ingrese un email válido').required('El email es requerido'),
    password: yup.string().min(5, 'La contraseña debe tener al menos 5 caracteres').required('La contraseña es requerida'),
    nombre: yup.string().min(2, 'El nombre debe tener al menos 2 caracteres').required('El nombre es requerido'),
    telefono: yup.string().min(10, 'El teléfono debe tener al menos 8 caracteres').required('El teléfono es requerido'),
    rol: yup.string().required('El rol es requerido')
});

export default function Auth() {
    const router = useRouter();
    const [doRegister, setDoRegister] = useState<boolean>(false);
    
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            nombre: '',
            telefono: '',
            rol: ''
        },
        validationSchema: doRegister ? registerSchema : loginSchema,
        onSubmit: async (values, { setSubmitting, setErrors }) => {
            try {
                const response = await AuthService.auth(values, doRegister);
                console.log(response);
                router.push('/dashboard/pacientes');
            } catch (error: any) {
                console.error('Auth error:', error);
                formik.setStatus(error.message);
            } finally {
                setSubmitting(false);
            }
        }
    });

    const toggleRegister = () => {
        setDoRegister(!doRegister);
        formik.resetForm();
    };

    const handleSelectChange = (event: any) => {
        formik.setFieldValue('rol', event.target.value);
    };

    const isFormValid = () => {
        if (doRegister) {
            return !formik.isValid || !formik.dirty;
        }
        return !formik.isValid || !formik.dirty;
    };

    useRedirect();

    return (
        <Box className={styles.loginContainer}>
            <Paper elevation={3} className={doRegister ? styles.paper : styles.paperLogin}>
                <Typography variant="h5">{ doRegister ? 'Registrar' : 'Iniciar sesión' }</Typography>
                { formik.status && ( <Typography color="error" variant="body2" sx={{ mb: 2 }}>{formik.status}</Typography> )}
                <form onSubmit={formik.handleSubmit} noValidate>
                    {
                        doRegister && (
                            <Box>
                                <TextField name="nombre" required sx={{ mb: 1.5 }} value={formik.values.nombre} onChange={formik.handleChange} onBlur={formik.handleBlur}
                                    label="Nombre" variant="standard" placeholder="Ingrese su nombre" fullWidth error={formik.touched.nombre && Boolean(formik.errors.nombre)}
                                    helperText={formik.touched.nombre && formik.errors.nombre} />
                                <TextField name="telefono" required sx={{ mb: 1.5 }} value={formik.values.telefono} onChange={formik.handleChange} onBlur={formik.handleBlur}
                                    label="Telefono" variant="standard" placeholder="Ingrese su telefono" fullWidth error={formik.touched.telefono && Boolean(formik.errors.telefono)}
                                    helperText={formik.touched.telefono && formik.errors.telefono} />
                                <FormControl fullWidth variant="standard" sx={{ mb: 1.5 }} error={formik.touched.rol && Boolean(formik.errors.rol)}>
                                    <InputLabel>Rol</InputLabel>
                                    <Select name="rol" required value={formik.values.rol} onChange={handleSelectChange as any} onBlur={formik.handleBlur}
                                        error={formik.touched.rol && Boolean(formik.errors.rol)}>
                                        {ROL_OPTIONS.map(opt => (
                                          <MenuItem key={opt.value} value={opt.value}>
                                            {opt.label}
                                          </MenuItem>
                                        ))}
                                    </Select>
                                    {formik.touched.rol && formik.errors.rol && (
                                      <Typography color="error" variant="caption">
                                        {formik.errors.rol}
                                      </Typography>
                                    )}
                                </FormControl>
                            </Box>
                        )
                    }
                    <TextField name="email" required sx={{ mb: 1.5 }} value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}
                        label="Email" variant="standard" placeholder="Ingrese su email" fullWidth error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}/>
                    <TextField name="password" required sx={{ mb: 1.5 }} value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}
                        label="Contraseña" variant="standard" placeholder="Ingrese su contraseña" fullWidth type="password"
                        error={formik.touched.password && Boolean(formik.errors.password)} helperText={formik.touched.password && formik.errors.password} />
                    <Button variant="contained" type="submit" fullWidth sx={{ mt: 3, mb: 3 }} disabled={isFormValid() || formik.isSubmitting}
                        loading={formik.isSubmitting} loadingPosition="end">
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