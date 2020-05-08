import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Slider from '@material-ui/core/Slider';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box'
import {BaseURL,sensores} from '../BaseURL'
import $ from 'jquery';
/*
function GetSensores(){
    var humedadMin=document.getElementById('humedadMinima');
    var humedadMax=document.getElementById('humedadMaxima');
    var luminosidadMin=document.getElementById('LuminosidadMinima');
    var luminosidadMax=document.getElementById('LuminosidadMaxima');
    if(humedadMin.value=='' && luminosidadMin.value=='')
    {
      var phMin=document.getElementById('PhMinima');
      var phMax=document.getElementById('PhMaxima');
      var ecMin=document.getElementById('ECMinima');
      var ecMax=document.getElementById('ECMaxima');
      var tempMin=document.getElementById('temperaturaMinima');
      var tempMax=document.getElementById('temperaturaMaxima');
      //var tempMinSlider=document.getElementById('temperaturaMinimaSlider');
      $.ajax({  
        url: BaseURL+sensores,
        method:"GET",
        dataType:'JSON',
        success: function(respuesta){
          for(var element in respuesta.data){   
            switch(respuesta.data[element].nombre) {
              case 'humedad':
                  humedadMin.value=respuesta.data[element].valor_min;
                  humedadMax.value=respuesta.data[element].valor_max;
                break;
              case 'luminosidad':
                  luminosidadMax.value=respuesta.data[element].valor_max;
                  luminosidadMin.value=respuesta.data[element].valor_min;
                  break;
              case 'temperatura':
                tempMin.value=respuesta.data[element].valor_min;
                tempMax.value=respuesta.data[element].valor_max;
                //tempMinSlider.value=20;
                //console.log(tempMinSlider.childNodes[2].value);
                break;
              case 'ph':
                phMin.value=respuesta.data[element].valor_min;
                phMax.value=respuesta.data[element].valor_max;
                break;
              case "conductividad":
                ecMin.value=respuesta.data[element].valor_min;
                ecMax.value=respuesta.data[element].valor_max;
            }
          }
        }
     });
    }
}*/
function getJsonValues(){
  var humedadMin=document.getElementById('humedadMinima');
  var humedadMax=document.getElementById('humedadMaxima');
  var luminosidadMin=document.getElementById('LuminosidadMinima');
  var luminosidadMax=document.getElementById('LuminosidadMaxima');
  var phMin=document.getElementById('PhMinima');
  var phMax=document.getElementById('PhMaxima');
  var ecMin=document.getElementById('ECMinima');
  var ecMax=document.getElementById('ECMaxima');
  var tempMin=document.getElementById('temperaturaMinima');
  var tempMax=document.getElementById('temperaturaMaxima');
  var jsonArray=[]
  var jsonHumedad={
        "valor_min":humedadMin.value,
        "valor_max":humedadMax.value,
        "recomendado_min":0,
        "recomendado_max":99,
  }
  var jsonLuminosidad={
    "valor_min":luminosidadMin.value,
    "valor_max":luminosidadMax.value,
    "recomendado_min":0,
    "recomendado_max":100,
  }
  var jsonPh={
        "valor_min":phMin.value,
        "valor_max":phMax.value,
        "recomendado_min":1,
        "recomendado_max":10
  }
  var jsonTemperatura={
        "valor_min":tempMin.value,
        "valor_max":tempMax.value,
        "recomendado_min":10,
        "recomendado_max":40
  }
  var jsonEc={
        "valor_min":ecMin.value,
        "valor_max":ecMax.value,
        "recomendado_min":0,
        "recomendado_max":50
  }
  jsonArray.push(jsonHumedad);
  jsonArray.push(jsonLuminosidad);
  jsonArray.push(jsonPh);
  jsonArray.push(jsonTemperatura);
  jsonArray.push(jsonEc);
  return jsonArray;
}
function PostSensores(){
  var idArray=["1humedad","1luminosidad","1ph","1temperatura","1conductividad"];
  var jsonArray=getJsonValues();
  for (var idx in jsonArray){
    $.ajax({  
      url: BaseURL+sensores+"/"+idArray[idx],
      method:"PUT",
      dataType:'JSON',
      data:JSON.stringify(jsonArray[idx]),
      success: function(respuesta){
          console.log(respuesta);
      }
   });
  }
}
const useStyles = makeStyles({
  root: {
    height: 300,
  },
});
const AntSwitch = withStyles((theme) => ({
  root: {
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex',
  },
  switchBase: {
    padding: 2,
    color: theme.palette.grey[500],
    '&$checked': {
      transform: 'translateX(12px)',
      color: theme.palette.common.white,
      '& + $track': {
        opacity: 1,
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
      },
    },
  },
  thumb: {
    width: 12,
    height: 12,
    boxShadow: 'none',
  },
  track: {
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: theme.palette.common.white,
  },
  checked: {},
}))(Switch);
function valuetext(value) {
  return `${value}°C`;
}

const Mantenimiento=React.memo(function() {
  const [humedadMin,setHumedadMin]=React.useState();
  const  [humedadMax,setHumedadMax]=React.useState();
  const [luminosidadMin,setLuminosidadMin]=React.useState();
  const [luminosidadMax,setLuminosidadMax]=React.useState();
  const [phMin,setPhMin]=React.useState();
  const [phMax,setPhMax]=React.useState();
  const [ecMin,setEcMin]=React.useState();
  const [ecMax,setEcMax]=React.useState();
  const [tempMin,setTempMin]=React.useState();
  const [tempMax,setTempMax]=React.useState();
  const GetSensores=()=>{
    $.ajax({  
      url: BaseURL+sensores,
      method:"GET",
      dataType:'JSON',
      success: function(respuesta){
        for(var element in respuesta.data){   
          switch(respuesta.data[element].nombre) {
            case 'humedad':
              setHumedadMin(respuesta.data[element].valor_min);
              setHumedadMax(respuesta.data[element].valor_max);
              break;
            case 'luminosidad':
              setLuminosidadMax(respuesta.data[element].valor_max);
              setLuminosidadMin(respuesta.data[element].valor_min);
                break;
            case 'temperatura':
              setTempMin(respuesta.data[element].valor_min);
              setTempMax(respuesta.data[element].valor_max);
              //tempMinSlider.value=20;
              //console.log(tempMinSlider.childNodes[2].value);
              break;
            case 'ph':
              setPhMin(respuesta.data[element].valor_min);
              setPhMax(respuesta.data[element].valor_max);
              break;
            case "conductividad":
              setEcMin(respuesta.data[element].valor_min);
              setEcMax(respuesta.data[element].valor_max);
          }
        }
      }
   });
  }
  $(document).ready(()=>{
    GetSensores();
  })
  const classes = useStyles();
  const [state, setState] = React.useState({
    checkedTemperatura: true,
    checkedHumedad: true,
    checkedNivelPH: true,
    checkedEC: true,
    checkedLuminosidad: true
  });
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  return (
    <Container component="main" maxWidth="lg">
      <Grid
  container
  direction="row"
  justify="space-between"
>

<Grid container direction="column" xs={4} sm={2}>
  <br></br>
<div class="row" style={{justifyContent: 'center'}}>
<Typography component="h1">
          Temperatura
        </Typography>
</div>
<br></br>
        <div class="row" style={{justifyContent: 'space-around'}}>
        <div class="column" className={classes.root}>
        <Typography variant="subtitle2">
          Mínima
        </Typography>
        <Slider
          id="temperaturaMinimaSlider"
          value={tempMin}
          orientation="vertical"
          getAriaValueText={valuetext}
          aria-labelledby="vertical-slider"
        />
        <br></br>  
        <Box
        display="flex"
        flexWrap="nowrap"
        m={1}
        css={{ maxWidth: 70 }}
      >
                <TextField
                value={tempMin}
          id="temperaturaMinima"
          label="Valor"
          type="number"
          size="small"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />   
      </Box>   
        </div>
        <div class="column" className={classes.root}>
        <Typography variant="subtitle2">
          Máxima
        </Typography>
        <Slider
          orientation="vertical"
          getAriaValueText={valuetext}
          aria-labelledby="vertical-slider"
        />
        <br></br>
        <Box
        display="flex"
        flexWrap="wrap"
        m={1}
        css={{ maxWidth: 70 }}
      >
        <TextField
        value={tempMax}
          id="temperaturaMaxima"
          label="Valor"
          type="number"
          size="small"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
      </Box>
        </div>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <div class="row" style={{justifyContent: 'center'}}>
        <Typography component="div">
        <Grid component="label" container alignItems="center" spacing={1}>
          <Grid item>Off</Grid>
          <Grid item>
            <AntSwitch checked={state.checkedTemperatura} onChange={handleChange} name="checkedTemperatura" />
          </Grid>
          <Grid item>On</Grid>
        </Grid>
      </Typography>
        </div>
</Grid>
  <Grid item xs={4} sm={2}>
  <br></br>
  <div class="row" style={{justifyContent: 'center'}}>
  <Typography component="h1">
          Humedad
        </Typography>
  </div>
  <br></br>
        <div class="row" style={{justifyContent: 'space-around'}}>
        <div class="column" className={classes.root}>
        <Typography variant="subtitle2">
          Mínima
        </Typography>
        <Slider
          id="HumedadMinimaSlider"
          orientation="vertical"
          getAriaValueText={valuetext}
          aria-labelledby="vertical-slider"
        />
        <Box
        display="flex"
        flexWrap="nowrap"
        m={1}
        css={{ maxWidth: 70 }}
      >
                <TextField
                value={humedadMin}
          id="humedadMinima"
          label="Valor"
          type="number"
          size="small"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />   
      </Box>
        </div>
        <div class="column" className={classes.root}>
        <Typography variant="subtitle2">
          Máxima
        </Typography>
        <Slider
        id="HumedadMaximaSlider"
          orientation="vertical"
          getAriaValueText={valuetext}
          aria-labelledby="vertical-slider"
        />
        <Box
        display="flex"
        flexWrap="nowrap"
        m={1}
        css={{ maxWidth: 70 }}
      >
                <TextField
                value={humedadMax}
          id="humedadMaxima"
          label="Valor"
          type="number"
          size="small"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />   
      </Box>
        </div>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <div class="row" style={{justifyContent: 'center'}}>
        <Typography component="div">
        <Grid component="label" container alignItems="center" spacing={1}>
          <Grid item>Off</Grid>
          <Grid item>
            <AntSwitch checked={state.checkedHumedad} onChange={handleChange} name="checkedHumedad" />
          </Grid>
          <Grid item>On</Grid>
        </Grid>
      </Typography>
        </div>
</Grid>
<Grid item xs={4} sm={2}>
<br></br>
<div class="row" style={{justifyContent: 'center'}}>
<Typography component="h1">
          Nivel de Ph
        </Typography>
  </div>
  <br></br>
        <div class="row" style={{justifyContent: 'space-around'}}>
        <div class="column" className={classes.root}>
        <Typography variant="subtitle2">
          Mínima
        </Typography>
        <Slider
          orientation="vertical"
          getAriaValueText={valuetext}
          aria-labelledby="vertical-slider"
        />
                <Box
        display="flex"
        flexWrap="nowrap"
        m={1}
        css={{ maxWidth: 70 }}
      >
                <TextField
                value={phMin}
          id="PhMinima"
          label="Valor"
          type="number"
          size="small"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />   
      </Box>
        </div>
        <div class="column" className={classes.root}>
        <Typography variant="subtitle2">
          Máxima
        </Typography>
        <Slider
          orientation="vertical"
          getAriaValueText={valuetext}
          aria-labelledby="vertical-slider"
        />
                <Box
        display="flex"
        flexWrap="nowrap"
        m={1}
        css={{ maxWidth: 70 }}
      >
                <TextField
                value={phMax}
          id="PhMaxima"
          label="Valor"
          type="number"
          size="small"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />   
      </Box>
        </div>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <div class="row" style={{justifyContent: 'center'}}>
        <Typography component="div">
        <Grid component="label" container alignItems="center" spacing={1}>
          <Grid item>Off</Grid>
          <Grid item>
            <AntSwitch checked={state.checkedNivelPH} onChange={handleChange} name="checkedNivelPH" />
          </Grid>
          <Grid item>On</Grid>
        </Grid>
      </Typography>
        </div>
</Grid>
<Grid item xs={4} sm={2}>
<br></br>
<div class="row" style={{justifyContent: 'center'}}>
<Typography component="h1">
          EC
        </Typography>
  </div>
  <br></br>
        <div class="row" style={{justifyContent: 'space-around'}}>
        <div class="column" className={classes.root}>
        <Typography variant="subtitle2">
          Mínima
        </Typography>
        <Slider
          orientation="vertical"
          getAriaValueText={valuetext}
          aria-labelledby="vertical-slider"
        />
        <Box
        display="flex"
        flexWrap="nowrap"
        m={1}
        css={{ maxWidth: 70 }}
      >
                <TextField
                value={ecMin}
          id="ECMinima"
          label="Valor"
          type="number"
          size="small"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />   
      </Box>
        </div>
        <div class="column" className={classes.root}>
        <Typography variant="subtitle2">
          Máxima
        </Typography>
        <Slider
          orientation="vertical"
          getAriaValueText={valuetext}
          aria-labelledby="vertical-slider"
        />
        <Box
        display="flex"
        flexWrap="nowrap"
        m={1}
        css={{ maxWidth: 70 }}
      >
                <TextField
                value={ecMax}
          id="ECMaxima"
          label="Valor"
          type="number"
          size="small"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />   
      </Box>
        </div>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <div class="row" style={{justifyContent: 'center'}}>
        <Typography component="div">
        <Grid component="label" container alignItems="center" spacing={1}>
          <Grid item>Off</Grid>
          <Grid item>
            <AntSwitch checked={state.checkedEC} onChange={handleChange} name="checkedEC" />
          </Grid>
          <Grid item>On</Grid>
        </Grid>
      </Typography>
        </div>
</Grid>
<Grid item xs={4} sm={2}>
<br></br>
<div class="row" style={{justifyContent: 'center'}}>
<br></br>
<Typography component="h1">
          Luminosidad
        </Typography> 
  </div>
  <br></br>
        <div class="row" style={{justifyContent: 'space-around'}}>
        <div class="column" className={classes.root}>
        <Typography variant="subtitle2">
          Mínima
        </Typography>
        <Slider
          orientation="vertical"
          getAriaValueText={valuetext}
          aria-labelledby="vertical-slider"
        />
        <Box
        display="flex"
        flexWrap="nowrap"
        m={1}
        css={{ maxWidth: 70 }}
      >
                <TextField
                value={luminosidadMin}
          id="LuminosidadMinima"
          label="Valor"
          type="number"
          size="small"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />   
      </Box>
        </div>
        <div class="column" className={classes.root}>
        <Typography variant="subtitle2">
          Máxima
        </Typography>
        <Slider
          orientation="vertical"
          getAriaValueText={valuetext}
          aria-labelledby="vertical-slider"
        />
        <Box
        display="flex"
        flexWrap="nowrap"
        m={1}
        css={{ maxWidth: 70 }}
      >
                <TextField
                value={luminosidadMax}
          id="LuminosidadMaxima"
          label="Valor"
          type="number"
          size="small"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />   
      </Box>
        </div>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <div class="row" style={{justifyContent: 'center'}}>
        <Typography component="div">
        <Grid component="label" container alignItems="center" spacing={1}>
          <Grid item>Off</Grid>
          <Grid item>
            <AntSwitch checked={state.checkedLuminosidad} onChange={handleChange} name="checkedLuminosidad" />
          </Grid>
          <Grid item>On</Grid>
        </Grid>
      </Typography>
        </div>
</Grid>
<Grid
  container
  direction="row"
  justify="flex-end"
>
<Button variant="contained" color="primary" onClick={PostSensores}>
      Guardar
    </Button>
  </Grid>
</Grid>
    </Container>
  );
}
);
export default Mantenimiento;