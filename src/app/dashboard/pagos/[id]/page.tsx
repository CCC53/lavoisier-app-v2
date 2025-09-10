"use client";
import { AppDispatch, RootState } from '@/app/redux/store';
import dynamic from 'next/dynamic';
import { use, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { PagoForm } from '../pagos.types';
import { createPagoAction, findPagoByID, listCitasInput } from '@/app/redux/pago.slice';
import { useRouter } from 'next/navigation';

const Typography = dynamic(() => import('@mui/material/Typography'));
const Box = dynamic(() => import('@mui/material/Box'), { ssr: false });
const TextField = dynamic(() => import('@mui/material/TextField'), { ssr: false });
const FormControl = dynamic(() => import('@mui/material/FormControl'), { ssr: false });
const Select = dynamic(() => import('@mui/material/Select'), { ssr: false });
const MenuItem = dynamic(() => import('@mui/material/MenuItem'), { ssr: false });
const InputLabel = dynamic(() => import('@mui/material/InputLabel'), { ssr: false });
const Button = dynamic(() => import('@mui/material/Button'), { ssr: false });

const validationSchema = yup.object({
    monto: yup.number().transform((value, originalValue) => {
        return originalValue === '' ? undefined : value;
    }).required('Monto es requerido'),
    metodoPago: yup.string().required('Metodo de pago es requerido'),
    tipoPago: yup.number().required('Tipo de pago es requerido').transform((value, originalValue) => {
        return originalValue === '' ? undefined : value;
    }),
    cantidadRecibida: yup.number().transform((value, originalValue) => {
        return originalValue === '' ? undefined : value;
    }).required('La cantidad recibida es requerido'),
    cambio: yup.number().transform((value, originalValue) => {
        return originalValue === '' ? undefined : value;
    }),
    citaId: yup.string().required('Cita a pagar es requerida')
});

export default function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const { selectedPago, citasInput } = useSelector((state: RootState) => state.pagos);
    const { loading } = useSelector((state: RootState) => state.components);

    const formik = useFormik<PagoForm>({
        initialValues: {
            monto: '',
            metodoPago: '',
            tipoPago: '',
            cantidadRecibida: '',
            cambio: '',
            citaId: ''
        },
        validationSchema,
        onSubmit: (values, { setSubmitting }) => {
            if (!selectedPago && id === "nuevo") {
                dispatch(createPagoAction(values));
            }
        }
    });

    useEffect(() => {
        dispatch(listCitasInput());
        if (id !== "nuevo") {
            dispatch(findPagoByID(id));
        }
    }, [dispatch, id]);

    useEffect(() => {
        if (id !== "nuevo" && selectedPago) {
            if (id === selectedPago.id) {
                formik.setValues({
                    monto: selectedPago.monto,
                    metodoPago: selectedPago.metodoPago,
                    tipoPago: selectedPago.tipoPago,
                    cantidadRecibida: selectedPago.cantidadRecibida,
                    cambio: selectedPago.cambio,
                    citaId: selectedPago.cita.id
                });
            }
        }
    }, [selectedPago, id]);

    useEffect(() => {
        if (selectedPago && id === "nuevo") {
            router.replace(`/dashboard/pagos/${selectedPago.id}`);
        }
    }, [selectedPago, id, router])

    const isFormValid = () => {
        if (!formik.isValid || !formik.dirty) {
            return true;
        }
        if (id !== "nuevo" && selectedPago) {
            const formValues = formik.values;
            const pagoValues = {
                monto: selectedPago.monto,
                metodoPago: selectedPago.metodoPago,
                tipoPago: selectedPago.tipoPago,
                cantidadRecibida: selectedPago.cantidadRecibida,
                cambio: selectedPago.cambio,
                citaId: selectedPago.cita.id
            }
            return (
                Number(formValues.monto) === pagoValues.monto &&
                formValues.metodoPago === pagoValues.metodoPago &&
                Number(formValues.tipoPago) === pagoValues.tipoPago &&
                Number(formValues.cantidadRecibida) === pagoValues.cantidadRecibida &&
                Number(formValues.cambio) === pagoValues.cambio &&
                formValues.citaId === pagoValues.citaId
            )
        }
        return false;
    }

    return (
        <Box>
            <Typography variant='h4'>Pago</Typography>
            <hr />
            <form onSubmit={formik.handleSubmit}>
                <TextField type="number" sx={{ marginTop: 4, marginBottom: 2 }} name="monto" variant="standard" label="Monto" placeholder="Ingrese el monto a pagar de la cita"
                    fullWidth value={formik.values.monto} onChange={formik.handleChange} onBlur={formik.handleBlur}
                    error={formik.touched.monto && Boolean(formik.errors.monto)} helperText={formik.touched.monto && formik.errors.monto} disabled={!!selectedPago} />
                <FormControl variant="standard" fullWidth error={formik.touched.metodoPago && Boolean(formik.errors.metodoPago)}>
                    <InputLabel>Metodo de pago</InputLabel>
                    <Select name='metodoPago' value={formik.values.metodoPago} onChange={formik.handleChange} onBlur={formik.handleBlur} disabled={!!selectedPago}>
                        <MenuItem value={''}>Seleccione una opcion</MenuItem>
                        <MenuItem value={'E'}>Efectivo</MenuItem>
                        <MenuItem value={'T'}>Tarjeta credito/debido o NFC</MenuItem>
                    </Select>
                    { formik.touched.metodoPago && formik.errors.metodoPago && (
                        <Typography variant="caption" color="error" sx={{ mt: 0.5, display: 'block' }}>{formik.errors.metodoPago}</Typography>
                    )}
                </FormControl>
                <FormControl sx={{ marginTop: 2 }} variant="standard" fullWidth error={formik.touched.tipoPago && Boolean(formik.errors.tipoPago)}>
                    <InputLabel>Tipo de pago</InputLabel>
                    <Select name='tipoPago' value={formik.values.tipoPago} onChange={formik.handleChange} onBlur={formik.handleBlur} disabled={!!selectedPago}>
                        <MenuItem value={0}>Seleccione una opcion</MenuItem>
                        <MenuItem value={1}>Es primera cita</MenuItem>
                        <MenuItem value={2}>No es primera cita</MenuItem>
                    </Select>
                    { formik.touched.tipoPago && formik.errors.tipoPago && (
                        <Typography variant="caption" color="error" sx={{ mt: 0.5, display: 'block' }}>{formik.errors.tipoPago}</Typography>
                    )}
                </FormControl>
                <TextField type="number" sx={{ marginTop: 2, marginBottom: 2 }} name="cantidadRecibida" variant="standard" label="Cantidad recibida"
                    placeholder="Ingrese la cantidad recibida por el paciente de la cita" fullWidth value={formik.values.cantidadRecibida} onChange={formik.handleChange}
                    onBlur={formik.handleBlur} error={formik.touched.cantidadRecibida && Boolean(formik.errors.cantidadRecibida)}
                    helperText={formik.touched.cantidadRecibida && formik.errors.cantidadRecibida} disabled={!!selectedPago}/>
                <TextField type="number" sx={{ marginBottom: 2 }} name="cambio" variant="standard" label="Cambio (Campo autogenerado)" fullWidth disabled 
                    value={formik.values.cambio} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                <FormControl variant="standard" fullWidth error={formik.touched.citaId && Boolean(formik.errors.citaId)}>
                    <InputLabel>Cita</InputLabel>
                    <Select name='citaId' value={formik.values.citaId} onChange={formik.handleChange} onBlur={formik.handleBlur} disabled={!!selectedPago}>
                        {
                            citasInput.map(c => (
                                <MenuItem key={c.value} value={c.value}>{c.label}</MenuItem>
                            ))
                        }
                    </Select>
                    { formik.touched.citaId && formik.errors.citaId && (
                        <Typography variant="caption" color="error" sx={{ mt: 0.5, display: 'block' }}>{formik.errors.citaId}</Typography>
                    )}
                </FormControl>
                <Button type="submit" variant="contained" sx={{ mt:4 }} fullWidth disabled={isFormValid() || formik.isSubmitting} loading={formik.isSubmitting} loadingPosition="end">
                    Guardar
                </Button>
            </form>
        </Box>
    )
}