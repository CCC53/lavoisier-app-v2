"use client";
import dynamic from "next/dynamic";
import { use, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { DatePicker } from "@mui/x-date-pickers";
import { PacienteForm } from "../paciente.types";

const Typography = dynamic(() => import('@mui/material/Typography'));
const Box = dynamic(() => import('@mui/material/Box'), { ssr: false });
const TextField = dynamic(() => import('@mui/material/TextField'), { ssr: false });
const FormControl = dynamic(() => import('@mui/material/FormControl'), { ssr: false });
const Select = dynamic(() => import('@mui/material/Select'), { ssr: false });
const MenuItem = dynamic(() => import('@mui/material/MenuItem'), { ssr: false });
const InputLabel = dynamic(() => import('@mui/material/InputLabel'), { ssr: false });
const Button = dynamic(() => import('@mui/material/Button'), { ssr: false });

const validationSchema = yup.object({
    nombre: yup.string().required('Nombre es requerido').min(2, 'El nombre debe tener al menos 2 caracteres'),
    telefono: yup.string().required('Teléfono es requerido').matches(/^[0-9+\-\s()]+$/, 'Teléfono no válido'),
    email: yup.string().email('Email no válido').required('Email es requerido'),
    fechaNacimiento: yup.date().required('Fecha de nacimiento es requerida').nullable(),
    sexo: yup.string().required('Sexo es requerido').oneOf(['M', 'F'], 'Sexo no válido')
});

export default function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);

    const formik = useFormik<PacienteForm>({
        initialValues: {
            nombre: '',
            telefono: '',
            email: '',
            fechaNacimiento: null,
            sexo: ''
        },
        validationSchema,
        onSubmit: (values) => {
            console.log(values)
        }
    });

    const isFormValid = () => !formik.isValid || !formik.dirty;

    useEffect(() => {
        if (id !== "nuevo") {
            console.log('not new')
        }
    }, [id])
    
    return (
        <Box>
            <Typography variant="h4">Paciente</Typography>
            <hr />
            <form onSubmit={formik.handleSubmit}>
                <TextField name="nombre" variant="standard" label="Nombre" placeholder="Ingrese el nombre del paciente" fullWidth value={formik.values.nombre}
                    onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.touched.nombre && Boolean(formik.errors.nombre)}
                    helperText={formik.touched.nombre && formik.errors.nombre} />
                <TextField name="telefono" variant="standard" label="Telefono" placeholder="Ingrese el telefono del paciente" fullWidth value={formik.values.telefono}
                    onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.touched.telefono && Boolean(formik.errors.telefono)}
                    helperText={formik.touched.telefono && formik.errors.telefono} />
                <TextField name="email" variant="standard" label="Email" placeholder="Ingrese el email del paciente" fullWidth value={formik.values.email}
                    onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email} />
                <DatePicker 
                    label="Fecha de nacimiento"
                    name="fechaNacimiento"
                    value={formik.values.fechaNacimiento}
                    onChange={(date) => formik.setFieldValue('fechaNacimiento', date)}
                    slotProps={{
                        textField: {
                            variant: "standard",
                            fullWidth: true,
                            error: formik.touched.fechaNacimiento && Boolean(formik.errors.fechaNacimiento),
                            helperText: formik.touched.fechaNacimiento && formik.errors.fechaNacimiento,
                            onBlur: () => formik.setFieldTouched('fechaNacimiento', true),
                            sx: { mb: 1, mt: 1 }
                        }
                    }}
                />
                <FormControl variant="standard" fullWidth error={formik.touched.sexo && Boolean(formik.errors.sexo)}>
                    <InputLabel>Sexo</InputLabel>
                    <Select name="sexo" value={formik.values.sexo} onChange={formik.handleChange} onBlur={formik.handleBlur}>
                        <MenuItem value={"M"}>Masculino</MenuItem>
                        <MenuItem value={"F"}>Femenino</MenuItem>
                    </Select>
                    { formik.touched.sexo && formik.errors.sexo && (
                        <Typography variant="caption" color="error" sx={{ mt: 0.5, display: 'block' }}>{formik.errors.sexo}</Typography>
                    )}
                </FormControl>
                <Button type="submit" variant="contained" sx={{ mt:4 }} fullWidth disabled={isFormValid() || formik.isSubmitting} loading={formik.isSubmitting} loadingPosition="end">
                    Guardar
                </Button>
            </form>
        </Box>
    )
}