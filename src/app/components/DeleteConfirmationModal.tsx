import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import dynamic from "next/dynamic";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { DeleteModalProps } from "./components.types";

const Button = dynamic(() => import("@mui/material/Button"), { ssr: false });
const Dialog = dynamic(() => import("@mui/material/Dialog"), { ssr: false });
const DialogActions = dynamic(() => import("@mui/material/DialogActions"), { ssr: false });
const DialogContent = dynamic(() => import("@mui/material/DialogContent"), { ssr: false });
const DialogContentText = dynamic(() => import("@mui/material/DialogContentText"), { ssr: false });
const DialogTitle = dynamic(() => import("@mui/material/DialogTitle"), { ssr: false });

export default function DeleteConfirmationModal({ closeDeleteModal, onDelete }: DeleteModalProps) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const { modalOpen } = useSelector((state: RootState) => state.components);

    return (
        <Dialog fullScreen={fullScreen} aria-labelledby="responsive-dialog-title" open={modalOpen}>
            <DialogTitle id="responsive-dialog-title">¿Desea eliminar este registro?</DialogTitle>
            <DialogContent>
                <DialogContentText>No podrá revertir esto</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" onClick={onDelete}>Aceptar</Button>
                <Button onClick={closeDeleteModal} color="error" variant="outlined">Cancelar</Button>
            </DialogActions>
        </Dialog>
    )
}