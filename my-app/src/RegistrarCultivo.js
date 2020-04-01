import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from '@material-ui/core/Select';
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
export default function RegistrarCultivo() {
  const useStyles = makeStyles(theme => ({
        container: {
          display: "flex",
          flexWrap: "wrap"
        },
        formControl: {
          margin: theme.spacing(1),
          minWidth: 120
        }
      }));
      
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [planta, setPlanta] = React.useState("");
  const handleChange = event => {
    setPlanta(Number(event.target.value) || "");
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Nuevo Cultivo
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Crear Nuevo Cultivo</DialogTitle>
        <DialogContent>
        <form className={classes.container}>
        <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Nombre del Cultivo"
            type="text"
            fullWidth
          />
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="demo-dialog-native">Planta</InputLabel>
              <Select
                native
                value={planta}
                onChange={handleChange}
                input={<Input id="demo-dialog-native" />}
              >
                <option aria-label="None" value="" />
                <option value={10}>Lechuga</option>
              </Select>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" justify="center">
            Registrar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
