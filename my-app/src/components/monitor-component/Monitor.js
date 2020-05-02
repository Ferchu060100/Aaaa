import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import  Button  from '@material-ui/core/Button';
import TurnOff from '@material-ui/icons/PowerSettingsNew'
import {Doughnut, Line} from 'react-chartjs-2';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import classNames from "classnames";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { getMonitorData, getSelectSensorData,getDataReport } from '../../index';
import nosensor from '../../resources/sensornodisponible.png';
import Input from "@material-ui/core/Input";
import TextField from '@material-ui/core/TextField';
import $ from 'jquery';
import {BaseURL,cultivo,sensores} from "../BaseURL"
import Mantenimiento from '../mantenimiento-component/Mantenimiento';
import 'chart.piecelabel.js';
import emailjs from 'emailjs-com';
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

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
function sendAlert(){
  var dataMonitor = getMonitorData();
    $.ajax({  
      url: BaseURL+sensores,
      method:"GET",
      dataType:'JSON',
      success: function(respuesta){
        for(var element in respuesta.data){      
          switch(respuesta.data[element].nombre) {
            case 'humedad':
              if(respuesta.data[element].recomendado_min>dataMonitor.humedad){
                sendEmail("Nivel de humedad: "+dataMonitor.humedad+"  "+"El nivel recomendado es "+respuesta.data[element].recomendado_min)
              } else if(respuesta.data[element].recomendado_max<dataMonitor.humedad){
                sendEmail("Nivel de humedad: "+dataMonitor.humedad+"  "+"El nivel recomendado es "+respuesta.data[element].recomendado_max)
              }
              break;
            case 'luminosidad':
              if(respuesta.data[element].recomendado_min>dataMonitor.luminosidad){
                sendEmail("Nivel de luminosidad: "+dataMonitor.luminosidad+"  "+"El nivel recomendado es "+respuesta.data[element].recomendado_min)
              } else if(respuesta.data[element].recomendado_max<dataMonitor.luminosidad){
                sendEmail("Nivel de luminosidad: "+dataMonitor.luminosidad+"  "+"El nivel recomendado es "+respuesta.data[element].recomendado_max)
              }
                break;
          }
        }
      }
   });

}
function sendEmail(mensaje){
  var template_params = {
    "to_email": "marting_ng_96@hotmail.com",
    "to_name": "Martin",
    "message_html": mensaje
 }
 
 var service_id = "Martin_Ng";
 var template_id = "template_UTsu7Cwg";
 var userId="user_91BgDbvnrfuHO08aKSE1e";
 emailjs.send(service_id, template_id, template_params,userId);
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

const ColorButton = withStyles((theme) => ({
  root: {
    margin: "10px",
    backgroundColor: "#238c74",
    color: "black",
    borderColor: "black",
    fontSize: 12,
    minWidth: "90px",
    minHeight: "54px",
    maxWidth: "118px",
    maxHeight: "54px",
    '&:hover':{
      backgroundColor: "#50C750",
    }
  },
}))(Button);
const TurnOffButton = withStyles((theme) => ({
  root: {
    position: "relative",
    margin: "10px",
    float: "right",
  },
}))(Button);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  root: {
    flexGrow: 1,
    backgroundColor: "#333433",
    height: "100%",
    width: "100%",
    position: "fixed"
  },
  appBarMonitor: {
    backgroundColor: "#91ab83",
    color: "black",
  },
  tabSelected: {
    backgroundColor: "#238c74",
  },
  titleMonitor: {
    margin: 0,
    position:"relative",
    textAlign: "center",
    color: "#238c74",
    top: "50%"
  },
  imageCenter:{
    display:"block",
    margin:"auto",
    width: "60%",
    height: "100%",
  },
  graphMonitor: {
    marginTop: 100,
  },
  footerGridMonitor: {
    height: "100%",
    position: "relative"
  },
  footerGridItemMonitor:{
    marginTop: "80%",
    marginBottom: "auto"
  },
  switchButtonSendEmailMonitor: {
    color: "white"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const dataHalfDoughnutTemperature = {
	labels: [
    'C°',
    ''
	],
	datasets: [{
		data: [0,50],
		backgroundColor: [
    '#cc9129',
    '#636364'
		],
	}]
};
const dataHalfDoughnutHumidity = {
	labels: [
    '%',
    ''
	],
	datasets: [{
		data: [0,100],
		backgroundColor: [
    '#b49864',
    '#636364'
		],
	}]
};
const dataHalfDoughnutLightLevel = {
	labels: [
    '%',
    ''
	],
	datasets: [{
		data: [0,100],
		backgroundColor: [
    '#3ac6bc',
    '#636364'
		],
	}]
};
const dataDoughnutPHLevel = {
	labels: [
    'pH',
    ''
  ],
  datasets: [{
		data: [3,0],
		backgroundColor: [
    '#bf3635',
    '#636364'
		],
	}]
	
};
const dataDoughnutEC = {
	labels: [
    'mS/cm',
    ''
	],
	datasets: [{
		data: [0.98,4.02],
		backgroundColor: [
    '#94ca3c',
    '#636364'
		],
	}]
};

const optionsHalfDoughnutTemperature = {
  rotation: 1 * Math.PI,
  animation: false,
  circumference: 1 * Math.PI,
  pieceLabel: {
    
    render: 'percentage',
    fontColor: 'white'
  },
  legend: {
      display: false
  },
  tooltip: {
      enabled: false
  },
  title: {
    display: true,
    text: 'Temperatura',
    fontColor: 'white'
  },
  cutoutPercentage: 60
}

const optionsHalfDoughnutHumidity= {
  rotation: 1 * Math.PI,
  animation: false,
  circumference: 1 * Math.PI,
  legend: {
      display: false
  },
  pieceLabel: {
    
    render: 'percentage',
    fontColor: 'white'
  },
  tooltip: {
      enabled: false
  },
  
  title: {
    display: true,
    text: 'Humedad',
    fontColor: 'white'
  },
  cutoutPercentage: 60
}

const optionsHalfDoughnutLightLevel= {
  
  rotation: 1 * Math.PI,
  animation: false,
  circumference: 1 * Math.PI,
  legend: {
      display: false
  },
  tooltip: {
      enabled: false
  },
  pieceLabel: {
    
    render: 'percentage',
    fontColor: 'white'
  },
  title: {
    display: true,
    text: 'Nivel de Luminosidad',
    fontColor: 'white'
  },
  cutoutPercentage: 60
}

const optionsDoughnutPHLevel= {
  animation: false,
  legend: {
    display: false
  },
  tooltip: {
      enabled: false
  },
  pieceLabel: {
    
    render: 'percentage',
    fontColor: 'white'
  },
  title: {
    display: true,
    text: 'Nivel de PH',
    fontColor: 'white'
  },
  cutoutPercentage: 60
}

const optionsDoughnutEC = {
  animation: false,
  legend: {
      display: false
  },
  tooltip: {
      enabled: false
  },
  pieceLabel: {
    
    render: 'percentage',
    fontColor: 'white'
  },
  title: {
    display: true,
    text: 'EC',
    fontColor: 'white'
  },
  cutoutPercentage: 60
}

var updateMonitorData = function(){
  var dataMonitor = getMonitorData();
  
  if(dataMonitor!==null)
  {
    dataHalfDoughnutTemperature.datasets[0].data = [dataMonitor.temperatura,Math.round((50-dataMonitor.temperatura)*100)/100]
    dataHalfDoughnutHumidity.datasets[0].data = [dataMonitor.humedad,Math.round((100-dataMonitor.humedad)*100)/100]
    dataHalfDoughnutLightLevel.datasets[0].data = [dataMonitor.luminosidad,Math.round((100-dataMonitor.luminosidad)*100)/100]
  }
  
  
   
}

setInterval(updateMonitorData,2000);

export default function Monitor() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [sendMessage, setSendMessage] = React.useState(false);
  const [isTemperaturePresent, setTemperaturePresent] = React.useState(true);
  const [isHumidityPresent, setHumidityPresent] = React.useState(true);
  const [isLightLevelPresent, setLightLevelPresent] = React.useState(true);
  const [isPHPresent, setPHPresent] = React.useState(true);
  const [isECPresent, setECPresent] = React.useState(true);
  const [planta, setPlanta] = React.useState("");
  const [arraySensor, setArraySensor] =  React.useState([]);
  const [dataReporte,setDataReporte] =  React.useState([65, 59, 80, 81, 56, 55, 40,50,54,10]);
  const [selectedSensor,setSelectedSensor] =  React.useState('');
  const [isLineReportShown,setIsLineReportShown] =  React.useState(false);
  const dataReportShown = {
    labels: ['Muestra 1', 'Muestra 2', 'Muestra 3', 'Muestra 4', 'Muestra 5', 'Muestra 6', 'Muestra 7', 'Muestra 8', 'Muestra 9', 'Muestra 10'],
    datasets: [
      {
        label: '',
        fill: false,
        lineTension: 0.1,
        fontColor:'white',
        backgroundColor: 'white',
        borderColor: 'white',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'white',
        pointBackgroundColor: 'white',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: dataReporte
      },
      
    ]
  };
  
  const handleChangePlantaSelect = event => {
    setPlanta(Number(event.target.value) || "");
  };

  const handleClickOpen = () => {
    if(!sendMessage)
    {
      setOpen(true);
    }
    else{
      setSendMessage(false);
    }
    
  };
  const handleAprobal = () => {
    setSendMessage(true);
    sendAlert();
    setOpen(false);
  }
  const handleCancel = () => {
    setSendMessage(false);
    setOpen(false);
  }
  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  function HalfDoughnutTemperature(){
    
    if(isTemperaturePresent)
    {
      return <Doughnut data={dataHalfDoughnutTemperature} options={optionsHalfDoughnutTemperature}></Doughnut>
    }
    else
    {
      return <img src={nosensor} className={classes.imageCenter}></img>
    }
  }
  function HalfDoughnutHumidity(){
    if(isHumidityPresent)
    {
      return <Doughnut data={dataHalfDoughnutHumidity} options={optionsHalfDoughnutHumidity}></Doughnut>
    }
    else
    {
      return <img src={nosensor} className={classes.imageCenter}></img>
    }
  }
  function DoughnutPHLevel(){
    if(isLightLevelPresent)
    {
      return <Doughnut data={dataDoughnutPHLevel} options={optionsDoughnutPHLevel}></Doughnut>
    }
    else
    {
      return <img src={nosensor} className={classes.imageCenter}></img>
    }
    
  }
  function DoughnutEC(){
    if(isPHPresent)
    {
      return <Doughnut data={dataDoughnutEC} options={optionsDoughnutEC}></Doughnut>
    }
    else
    {
      return <img src={nosensor} className={classes.imageCenter}></img>
    }
  }
  function HalfDoughnutLightLevel(){
    if(isECPresent)
    {
      return <Doughnut data={dataHalfDoughnutLightLevel} options={optionsHalfDoughnutLightLevel}></Doughnut>
    }
    else
    {
      return <img src={nosensor} className={classes.imageCenter}></img>
    }
  }
  function LineReport(){
    
    if(selectedSensor!='')
    {
      return <Line data={dataReportShown} options={{animation: false}} ></Line>
    }
    else
    {
      return <img src={nosensor} className={classes.imageCenter}></img>
    }
      
  
  }
   function handleChangeSelectionSensor(event){
    setSelectedSensor(event.target.value)
    if(selectedSensor!=''){
      getDataReport(event.target.value).then(
        function(result){
          setDataReporte(result);
          
        }
      )
    }
    
  }
  React.useEffect(() => {
    
    getSelectSensorData().then(
      function(result){
        setArraySensor(result);
      }
    )
  });
  
  
  let switchMonitorClasses = classNames(classes.switchButtonSendEmailMonitor, classes.footerGridItemMonitor)
  let options = arraySensor.map((data) =>
                <MenuItem 
                    key={data.id}
                    value={data.id}
                >
                    {data.name}
                </MenuItem>
            );

  const [openDialog, setOpenDialog] = React.useState(false);
  const handleClickOpenCultivoDialog = () => {
    setOpenDialog(true);
    selectCultivoOnClick();
  };
  const handleCloseCultivoDialog = () => {
    setOpenDialog(false);
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
    
    <Box className={classes.root}>
      <AppBar  className={classes.appBarMonitor} position="static">
        <Tabs value={value}  classes={{
            indicator: classes.tabSelected
          }} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Monitoreo del sistema" {...a11yProps(0)} />
          <Tab label="Reportes" {...a11yProps(1)} />
          <Tab label="Mantenimiento" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <ColorButton onClick={handleClickOpenCultivoDialog}>Nuevo Cultivo</ColorButton>
            <ColorButton >Visualizar Histórico</ColorButton>
          </Grid>
          <Grid item xs={6}>
            
          </Grid>
          <Grid item xs={3}>
            <TurnOffButton
              variant="contained"
              color="default"
              endIcon={<TurnOff /> }
            >
              Cerrar Sesión
            </TurnOffButton>
          </Grid>
          
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <h5 className={classes.titleMonitor}><b>Mi Cultivo Hidropónico</b></h5>
          </Grid>
        </Grid>
        <Grid  container spacing={2} className= { classes.graphMonitor}  >
          <Grid item xs={1}></Grid>
          <Grid item xs={2}><HalfDoughnutTemperature/></Grid>
          <Grid item xs={2}><HalfDoughnutHumidity/></Grid>
          <Grid item xs={2}><DoughnutPHLevel/></Grid>          
          <Grid item xs={2}><DoughnutEC/></Grid>
          <Grid item xs={2}><HalfDoughnutLightLevel/></Grid>
          <Grid item xs={1}></Grid>
          
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <FormGroup row>
              <FormControlLabel
                control={<Switch checked={sendMessage} onChange={handleClickOpen}  />}
                label="Enviar Correo"
                labelPlacement="start"
                className={switchMonitorClasses}
              />
            </FormGroup>
          </Grid>
          <Grid item xs={6}></Grid>
          <Grid item xs={3} className={classes.footerGridMonitor}>
            <ColorButton className={classes.footerGridItemMonitor} >Regular Valores</ColorButton>
          </Grid>
        </Grid>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">{"¿Quieres activar las notificaciones?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Al activar esta opción se enviará las alertas al correo establecido.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancel} color="primary">
              No
            </Button>
            <Button onClick={handleAprobal} color="primary">
              Sí
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={openDialog} onClose={handleCloseCultivoDialog} aria-labelledby="form-dialog-title">
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
                onChange={handleChangePlantaSelect}
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
      </TabPanel>
      <TabPanel value={value} index={1}>
      <Grid container spacing={3}>
          <Grid item xs={3}>
            <FormControl  className={classes.formControl}>
                          <InputLabel id="demo-simple-select-helper-label">Sensores</InputLabel>
                          <Select
                              labelId="demo-simple-select-helper-label"
                              id="demo-simple-select-helper"
                              onChange = {handleChangeSelectionSensor}
                          >
                              <MenuItem value="">
                              <em>None</em>
                              </MenuItem>
                              {options}
                          </Select>
            </FormControl>
          </Grid>
          <Grid item xs={9}></Grid>
        
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={3}></Grid>
          <Grid item xs={6}><LineReport></LineReport></Grid>
          <Grid item xs={3}></Grid>
          
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={9}>
          </Grid>
          <Grid item xs={3} className={classes.footerGridMonitor}>
            <ColorButton >Comprar Cultivos</ColorButton>
          </Grid>
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Mantenimiento>
        </Mantenimiento>
      </TabPanel>

    </Box>
    
  );
}
