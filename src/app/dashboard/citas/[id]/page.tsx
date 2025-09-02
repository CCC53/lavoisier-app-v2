"use client";
import { use, useEffect } from "react";
import dynamic from "next/dynamic";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/redux/store";
import { useRouter } from "next/navigation";
import * as yup from 'yup';
import { useFormik } from "formik";
import { CitaForm } from "../cita.types";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { parse, format } from 'date-fns';
import { createCita, findCita, listPacientesInput, updateCita } from "@/app/redux/citas.slice";

const Typography = dynamic(() => import('@mui/material/Typography'));
const Box = dynamic(() => import('@mui/material/Box'), { ssr: false });
const TextField = dynamic(() => import('@mui/material/TextField'), { ssr: false });
const FormControl = dynamic(() => import('@mui/material/FormControl'), { ssr: false });
const Select = dynamic(() => import('@mui/material/Select'), { ssr: false });
const MenuItem = dynamic(() => import('@mui/material/MenuItem'), { ssr: false });
const InputLabel = dynamic(() => import('@mui/material/InputLabel'), { ssr: false });
const Button = dynamic(() => import('@mui/material/Button'), { ssr: false });

const LoaderApp = dynamic(() => import('@/app/components/LoaderApp'), { ssr: false });

const stringToDate = (timeString: string | null) => {
    if (!timeString) return null;
    try {
        return parse(timeString, 'HH:mm', new Date());
    } catch {
        return null;
    }
};

const dateToString = (dateValue: Date | null) => {
    if (!dateValue) return '';
    return format(dateValue, 'HH:mm');
};

const validationSchema = yup.object({
    motivo: yup.string().required("Motivo es requerido"),
    fecha: yup.date().required('Fecha de cita es requerida').nullable(),
    horario: yup.string().required("Horario es requerido"),
    paciente: yup.string().required('Paciente es requerido')
});

export default function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const { selectedCita, pacientesInput } = useSelector((state: RootState) => state.citas);
    const { loading } = useSelector((state: RootState) => state.components);

    const formik = useFormik<CitaForm>({
        initialValues: {
            motivo: '',
            fecha: null,
            horario: '',
            paciente: '',
        },
        validationSchema,
        onSubmit: (values, { setSubmitting }) => {
            if (!selectedCita && id === "nuevo") {
                dispatch(createCita(values))
            } else {
                dispatch(updateCita(values));
                setSubmitting(false);
            }
        }
    });

    useEffect(() => {
        dispatch(listPacientesInput());
        if (id !== "nuevo") {
            dispatch(findCita(id));
        }
    }, [dispatch, id]);

    useEffect(() => {
        if (id !== "nuevo" && selectedCita) {
            if (id === selectedCita.id) {
                formik.setValues({
                    motivo: selectedCita.motivo,
                    horario: selectedCita.horario,
                    fecha: new Date(selectedCita.fecha),
                    paciente: selectedCita.paciente.id
                });
            }
        }
    }, [selectedCita, id]);

    useEffect(() => {
        if (selectedCita && id === "nuevo") {
            router.replace(`/dashboard/citas/${selectedCita.id}`);
        }
    }, [selectedCita, id, router])


    const isFormValid = () => {
        if (!formik.isValid || !formik.dirty) {
            return true;
        }
        if (id !== "nuevo" && selectedCita) {
            const formValues = formik.values;
            const citaValues = {
                motivo: selectedCita.motivo,
                fecha: new Date(selectedCita.fecha),
                horario: selectedCita.horario,
                paciente: selectedCita.paciente
            }
            return (
                formValues.motivo === citaValues.motivo &&
                formValues.horario === citaValues.horario &&
                formValues.paciente === citaValues.paciente.id &&
                formValues.fecha?.getTime() === citaValues.fecha.getTime()
            )
        }
        return false;
    }

    return (
        <Box>
            <Typography variant="h4">Cita</Typography>
            <hr />
            {
                id !== "nuevo" && loading ? <Box sx={{ marginTop: 8 }}>
                    <LoaderApp/>
                </Box> : (
                    <form onSubmit={formik.handleSubmit}>
                        <TextField sx={{ marginTop: 4, marginBottom: 2 }} name="motivo" variant="standard" label="Motivo" placeholder="Ingrese el motivo de la cita" fullWidth
                            value={formik.values.motivo} onChange={formik.handleChange} onBlur={formik.handleBlur}
                            error={formik.touched.motivo && Boolean(formik.errors.motivo)} helperText={formik.touched.motivo && formik.errors.motivo} />
                        <DatePicker 
                            label="Fecha de la cita"
                            name="fecha"
                            value={formik.values.fecha}
                            onChange={(date) => formik.setFieldValue('fecha', date)}
                            slotProps={{
                                textField: {
                                    variant: "standard",
                                    fullWidth: true,
                                    error: formik.touched.fecha && Boolean(formik.errors.fecha),
                                    helperText: formik.touched.fecha && formik.errors.fecha,
                                    onBlur: () => formik.setFieldTouched('fecha', true),
                                    sx: { mb: 2, mt: 2 }
                                }
                            }}
                        />
                        <TimePicker
                            label="Horario de la cita"
                            name="horario"
                            value={stringToDate(formik.values.horario)}
                            onChange={(date) => formik.setFieldValue('horario', dateToString(date))}
                            slotProps={{
                                textField: {
                                    variant: "standard",
                                    fullWidth: true,
                                    error: formik.touched.horario && Boolean(formik.errors.horario),
                                    helperText: formik.touched.horario && formik.errors.horario,
                                    onBlur: () => formik.setFieldTouched('horario', true),
                                    sx: { mb: 2, mt: 2 }
                                }
                            }}
                        />
                        <FormControl variant="standard" fullWidth error={formik.touched.paciente && Boolean(formik.errors.paciente)}>
                            <InputLabel>Paciente</InputLabel>
                            <Select name="paciente" value={formik.values.paciente} onChange={formik.handleChange} onBlur={formik.handleBlur}>
                                {
                                    pacientesInput.map(p => (
                                        <MenuItem key={p.value} value={p.value}>{p.label}</MenuItem>
                                    ))
                                }
                            </Select>
                            { formik.touched.paciente && formik.errors.paciente && (
                                <Typography variant="caption" color="error" sx={{ mt: 0.5, display: 'block' }}>{formik.errors.paciente}</Typography>
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