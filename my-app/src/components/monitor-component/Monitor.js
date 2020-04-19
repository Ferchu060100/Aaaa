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
import {Doughnut} from 'react-chartjs-2';
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
import { getMonitorData } from '../../index';
import nosensor from '../../resources/sensornodisponible.png';
import 'chart.piecelabel.js';

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







TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
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
  }
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
    //console.log(dataMonitor)
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
  let switchMonitorClasses = classNames(classes.switchButtonSendEmailMonitor, classes.footerGridItemMonitor)
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
            <ColorButton >Nuevo Cultivo</ColorButton>
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
      </TabPanel>
      <TabPanel value={value} index={1}>
      </TabPanel>
      <TabPanel value={value} index={2}>
      </TabPanel>

    </Box>
    
  );
}
