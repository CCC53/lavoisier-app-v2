"use client";
import dynamic from "next/dynamic";
import { use, useEffect } from "react";
import { DatePicker } from "@mui/x-date-pickers";

const Typography = dynamic(() => import('@mui/material/Typography'));
const Box = dynamic(() => import('@mui/material/Box'), { ssr: false });
const TextField = dynamic(() => import('@mui/material/TextField'), { ssr: false });
const FormControl = dynamic(() => import('@mui/material/FormControl'), { ssr: false });
const Select = dynamic(() => import('@mui/material/Select'), { ssr: false });
const MenuItem = dynamic(() => import('@mui/material/MenuItem'), { ssr: false });
const InputLabel = dynamic(() => import('@mui/material/InputLabel'), { ssr: false });
const Button = dynamic(() => import('@mui/material/Button'), { ssr: false });

export default function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);

    useEffect(() => {
        if (id !== "nuevo") {
            console.log('not new')
        }
    }, [id])
    

    return (
        <Box>
            <Typography variant="h4">Paciente</Typography>
            <hr />
            <form>
                <TextField variant="standard" label="Nombre" placeholder="Ingrese el nombre del paciente" fullWidth />
                <TextField variant="standard" label="Telefono" placeholder="Ingrese el telefono del paciente" fullWidth />
                <TextField variant="standard" label="Email" placeholder="Ingrese el email del paciente" fullWidth />
                <DatePicker 
                    label="Fecha de nacimiento" 
                    slotProps={{
                        textField: {
                            variant: "standard",
                            fullWidth: true,
                            sx: { mb: 1, mt: 1 }
                        }
                    }}
                />
                <FormControl variant="standard" fullWidth>
                    <InputLabel>Sexo</InputLabel>
                    <Select>
                        <MenuItem value={"M"}>Masculino</MenuItem>
                        <MenuItem value={"F"}>Femenino</MenuItem>
                    </Select>
                </FormControl>
                <Button variant="contained" sx={{ mt:4 }} fullWidth>Guardar</Button>
            </form>
        </Box>
    )
}