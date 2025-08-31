"use client";
import dynamic from "next/dynamic";
import { use, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { DatePicker } from "@mui/x-date-pickers";
import { PacienteForm } from "../paciente.types";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/redux/store";
import { findPaciente } from "@/app/redux/pacientes.slice";

const Typography = dynamic(() => import('@mui/material/Typography'));
const Box = dynamic(() => import('@mui/material/Box'), { ssr: false });
const TextField = dynamic(() => import('@mui/material/TextField'), { ssr: false });
const FormControl = dynamic(() => import('@mui/material/FormControl'), { ssr: false });
const Select = dynamic(() => import('@mui/material/Select'), { ssr: false });
const MenuItem = dynamic(() => import('@mui/material/MenuItem'), { ssr: false });
const InputLabel = dynamic(() => import('@mui/material/InputLabel'), { ssr: false });
const Button = dynamic(() => import('@mui/material/Button'), { ssr: false });

const LoaderApp = dynamic(() => import('@/app/components/LoaderApp'), { ssr: false });

const validationSchema = yup.object({
    nombre: yup.string().required('Nombre es requerido').min(2, 'El nombre debe tener al menos 2 caracteres'),
    telefono: yup.string().required('Teléfono es requerido').matches(/^[0-9+\-\s()]+$/, 'Teléfono no válido'),
    email: yup.string().email('Email no válido').required('Email es requerido'),
    nacimiento: yup.date().required('Fecha de nacimiento es requerida').nullable(),
    sexo: yup.string().required('Sexo es requerido').oneOf(['M', 'F'], 'Sexo no válido')
});

export default function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);

    const dispatch = useDispatch<AppDispatch>();
    const { selectedPaciente } = useSelector((state: RootState) => state.pacientes);
    const { loading } = useSelector((state: RootState) => state.components);

    const formik = useFormik<PacienteForm>({
        initialValues: {
            nombre: '',
            telefono: '',
            email: '',
            nacimiento: null,
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
            dispatch(findPaciente(id));
        }
    }, [id, dispatch]);

    useEffect(() => {
        if (id !== "nuevo" && selectedPaciente) {
            if (id === selectedPaciente.id) {
                formik.setValues({
                    nombre: selectedPaciente.nombre,
                    telefono: selectedPaciente.telefono,
                    email: selectedPaciente.email,
                    nacimiento: new Date(selectedPaciente.nacimiento),
                    sexo: selectedPaciente.sexo
                });
            }
        }
    }, [selectedPaciente, id]);
    
    return (
        <Box>
            <Typography variant="h4">Paciente</Typography>
            <hr />
            {
                id !== "nuevo" && loading ? <Box sx={{ marginTop: 8 }}>
                    <LoaderApp/>
                </Box> : (
                <form onSubmit={formik.handleSubmit}>
                    <TextField sx={{ marginTop: 4, marginBottom: 2 }} name="nombre" variant="standard" label="Nombre" placeholder="Ingrese el nombre del paciente" fullWidth
                        value={formik.values.nombre} onChange={formik.handleChange} onBlur={formik.handleBlur}
                        error={formik.touched.nombre && Boolean(formik.errors.nombre)} helperText={formik.touched.nombre && formik.errors.nombre} />
                    <TextField name="telefono" variant="standard" label="Telefono" placeholder="Ingrese el telefono del paciente" fullWidth value={formik.values.telefono}
                        onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.touched.telefono && Boolean(formik.errors.telefono)}
                        helperText={formik.touched.telefono && formik.errors.telefono} />
                    <TextField sx={{ marginTop: 2}} name="email" variant="standard" label="Email" placeholder="Ingrese el email del paciente" fullWidth value={formik.values.email}
                        onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email} />
                    <DatePicker 
                        label="Fecha de nacimiento"
                        name="nacimiento"
                        value={formik.values.nacimiento}
                        onChange={(date) => formik.setFieldValue('nacimiento', date)}
                        slotProps={{
                            textField: {
                                variant: "standard",
                                fullWidth: true,
                                error: formik.touched.nacimiento && Boolean(formik.errors.nacimiento),
                                helperText: formik.touched.nacimiento && formik.errors.nacimiento,
                                onBlur: () => formik.setFieldTouched('nacimiento', true),
                                sx: { mb: 2, mt: 2 }
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
                )
            }
        </Box>
    )
}