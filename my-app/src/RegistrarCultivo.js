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
import {BaseURL,cultivo} from "./BaseURL"
import $ from 'jquery';
function PostCultivo(datos){
  $.ajax({
    url: BaseURL+cultivo,
    method:"POST",
    data: datos,
    dataType:'JSON',
    success: function(respuesta){
        return respuesta;
    }
  });
}
function GetCultivo(){
  $.ajax({
    url: BaseURL+cultivo,
    method:"GET",
    dataType:'JSON',
    success: function(respuesta){
      PlantaSelectOptions(respuesta)
    }
 });
}
function PlantaSelectOptions(data){
  if($('#plantaSelect option').length===1){
    var cont=1;
    var select=$('#plantaSelect');
    data.data.forEach(element => {
      select.append(new Option(element.planta,cont));
      cont++;
    });
  }
}

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
    selectCultivoOnClick();
  };

  const handleClose = () => {
    setOpen(false);
  };
  const selectCultivoOnClick = () =>{
    GetCultivo();
  };
  const registrarCultivoOnClick = () =>{
    var nombre=document.getElementById('nombreCultivo').value;
    var plantaSel=document.getElementById('plantaSelect');
    var planta=plantaSel.options[plantaSel.selectedIndex].text;
    var datos={
      nombre: nombre,
      planta: planta
    }
    PostCultivo(JSON.stringify(datos));
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
            id="nombreCultivo"
            label="Nombre del Cultivo"
            type="text"
            fullWidth
          />
             <FormControl className={classes.formControl}>
              <InputLabel htmlFor="plantaInputLabel">Planta</InputLabel>
              <Select
                id="plantaSelect"
                native
                value={planta}
                onChange={handleChange}
                input={<Input id="plantaInputLabel" />}>
                  <option aria-label="None" value="" />
              </Select>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={registrarCultivoOnClick} color="primary" justify="center">
            Registrar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
