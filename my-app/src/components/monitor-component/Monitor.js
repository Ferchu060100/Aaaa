import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import Input from "@material-ui/core/Input";
import { Grid, Button, Dialog, FormGroup, FormControlLabel, Switch, Slide,DialogTitle, DialogContent, FormControl, InputLabel, Select, MenuItem, DialogActions, DialogContentText } from '@material-ui/core';
import {Doughnut, Line} from 'react-chartjs-2';
import {BaseURL,cultivo,sensores} from "../BaseURL";
import {PowerSettingsNew as TurnOff} from '@material-ui/icons';
import TextField from '@material-ui/core/TextField';
import { getMonitorData, getSelectSensorData,getDataReport } from '../../index';
import classNames from "classnames";
import nosensor from '../../resources/sensornodisponible.png';
import $ from 'jquery';
import { Link, withRouter } from 'react-router-dom';
const styles = theme =>({
  titleMonitor: {
    margin: 0,
    position:"relative",
    textAlign: "center",
    color: "#238c74",
    top: "50%"
  },
  formControl: {
    margin: '10px',
    minWidth: 120
  },
});
const imageCenterStyle={
  display:"block",
  margin:"auto",
  width: "60%",
  height: "100%",
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


class Monitor extends React.Component{
  state = {
    isCultivoDialogOpened: false,
    isHistorialDialogOpened: false,
    sendMessage: false,
    selectedHistorial: '',
    isDialogMessageOpened: false,
    arrayHistorico: [{'id':1, 'name': 'Actual'},{'id':2, 'name': 'Anterior'}],
    isTemperaturePresent: true,
    isHumidityPresent: true,
    isLightLevelPresent: true,
    isPHPresent: true,
    isECPresent: true,
    selectedSensor: '',
    planta: '',
    dataReporte: [65, 59, 80, 81, 56, 55, 40,50,54,10],
  }
  dataReportShown = {
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
        data: this.state.dataReporte
      },
      
    ]
  };
  constructor(props){
    super(props);
    this.handleClickOpenCultivoDialog = this.handleClickOpenCultivoDialog.bind(this);
    this.GetCultivo = this.GetCultivo.bind(this);
    this.handleOpenMessageDialog = this.handleOpenMessageDialog.bind(this);
    this.handleCloseMessageDialog = this.handleCloseMessageDialog.bind(this);
    this.handleCloseHistorialDialog = this.handleCloseHistorialDialog.bind(this);
    this.registrarCultivoOnClick = this.registrarCultivoOnClick.bind(this);
    this.PostCultivo = this.PostCultivo.bind(this);
    this.handleOpenHistorialDialog = this.handleOpenHistorialDialog.bind(this);
    this.handleCancelMessageDialog = this.handleCancelMessageDialog.bind(this);
    this.handleAprobalMessageDialog = this.handleAprobalMessageDialog.bind(this);
    this.HalfDoughnutTemperature = this.HalfDoughnutTemperature.bind(this);
    this.HalfDoughnutHumidity = this.HalfDoughnutHumidity.bind(this);
    this.DoughnutPHLevel = this.DoughnutPHLevel.bind(this);
    this.DoughnutEC = this.DoughnutEC.bind(this);
    this.HalfDoughnutLightLevel = this.HalfDoughnutLightLevel.bind(this);
    this.LineReport = this.LineReport.bind(this);
    this.handleChangePlantaSelect = this.handleChangePlantaSelect.bind(this);
    this.handleRevisarCultivo = this.handleRevisarCultivo.bind(this);
    this.handleChangeSelectionHistorial = this.handleChangeSelectionHistorial.bind(this);
  }

  componentDidMount(props){
   
    setInterval(() => {
      getMonitorData().then(
        (dataMonitor) => {
          dataHalfDoughnutTemperature.datasets[0].data = [dataMonitor.temperatura,Math.round((50-dataMonitor.temperatura)*100)/100]
          dataHalfDoughnutHumidity.datasets[0].data = [dataMonitor.humedad,Math.round((100-dataMonitor.humedad)*100)/100]
          dataHalfDoughnutLightLevel.datasets[0].data = [dataMonitor.luminosidad,Math.round((100-dataMonitor.luminosidad)*100)/100]
        }
      )
    }, 200000);
  }
  
  handleClickOpenCultivoDialog(){
    this.setState({isCultivoDialogOpened:true});
    this.GetCultivo();
  };
  PostCultivo(datos){
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
  GetCultivo(){
    $.ajax({
      url: BaseURL+cultivo,
      method:"GET",
      dataType:'JSON',
      success: function(respuesta){
        if($('#plantaSelect option').length===1){
          var cont=1;
          var select=$('#plantaSelect');
          respuesta.data.forEach(element => {
            select.append(new Option(element.planta,cont));
            cont++;
          });
        }
        
      }
   });
  };
  registrarCultivoOnClick (){
    var nombre=document.getElementById('nombreCultivo').value;
    var plantaSel=document.getElementById('plantaSelect');
    var planta=plantaSel.options[plantaSel.selectedIndex].text;
    var datos={
      nombre: nombre,
      planta: planta
    }
    this.PostCultivo(JSON.stringify(datos));
  };
  registrarCultivoOnClick (){
    var nombre=document.getElementById('nombreCultivo').value;
    var plantaSel=document.getElementById('plantaSelect');
    var planta=plantaSel.options[plantaSel.selectedIndex].text;
    var datos={
      nombre: nombre,
      planta: planta
    }
    this.PostCultivo(JSON.stringify(datos));
  };
  PostCultivo(datos){
    $.ajax({
      url: BaseURL+cultivo,
      method:"POST",
      data: datos,
      dataType:'JSON',
      success: function(respuesta){
          return respuesta;
      }
    });
  };
 
  
  handleOpenHistorialDialog(){
    this.setState({isHistorialDialogOpened : true});
  }
  handleOpenMessageDialog () {
    if(!this.state.sendMessage)
    {
      this.setState({isDialogMessageOpened:true});
    }
    else{
      this.setState({sendMessage:true});
    }
    
  };
  handleCloseHistorialDialog (){
    this.setState({isHistorialDialogOpened : false});
  };
  handleCloseMessageDialog() {
    this.setState({isDialogMessageOpened: false});
  };
  handleCancelMessageDialog (){
    this.setState({
      sendMessage: false,
      isDialogMessageOpened: false,
    })
  };
  handleChangePlantaSelect (event){
    this.setState({planta: Number(event.target.value) || "" });
  };
  
  sendAlert(){
    /* var dataMonitor = getMonitorData();
      $.ajax({  
        url: BaseURL+sensores,
        method:"GET",
        dataType:'JSON',
        success: function(respuesta){
          console.log(respuesta);  
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
   */
  };
  handleAprobalMessageDialog(){
    this.setState({
      sendMessage: true,
      isDialogMessageOpened: false,
    })
    this.sendAlert();
  }
  handleRevisarCultivo (event){
    if(this.state.selectedHistorial!==""){
      this.props.history.push("historial/"+this.state.selectedHistorial)
    }
  }
  handleChangeSelectionHistorial(event){
    if(event.target.value === 1){
      this.setState({selectedHistorial:"actual"});
    }
    else{
      this.setState({selectedHistorial:"anterior"});
    }
    
    
  }
  HalfDoughnutTemperature(){
    
    if(this.state.isTemperaturePresent)
    {
      return <Doughnut data={dataHalfDoughnutTemperature} options={optionsHalfDoughnutTemperature}></Doughnut>
    }
    else
    {
      return <img src={nosensor} style={imageCenterStyle}></img>
    }
  }; 
  HalfDoughnutHumidity(){
    if(this.state.isHumidityPresent)
    {
      return <Doughnut data={dataHalfDoughnutHumidity} options={optionsHalfDoughnutHumidity}></Doughnut>
    }
    else
    {
      return <img src={nosensor}  style={imageCenterStyle}></img>
    }
  }
  DoughnutPHLevel(){
    if(this.state.isLightLevelPresent)
    {
      return <Doughnut data={dataDoughnutPHLevel} options={optionsDoughnutPHLevel}></Doughnut>
    }
    else
    {
      return <img src={nosensor}  style={imageCenterStyle}></img>
    }
    
  }
  DoughnutEC(){
    if(this.state.isPHPresent)
    {
      return <Doughnut data={dataDoughnutEC} options={optionsDoughnutEC}></Doughnut>
    }
    else
    {
      return <img src={nosensor}  style={imageCenterStyle}></img>
    }
  }
  
  HalfDoughnutLightLevel(){
    if(this.state.isECPresent)
    {
      return <Doughnut data={dataHalfDoughnutLightLevel} options={optionsHalfDoughnutLightLevel}></Doughnut>
    }
    else
    {
      return <img src={nosensor}  style={imageCenterStyle}></img>
    }
  }
  LineReport(){
    
    if(this.state.selectedSensor!='')
    {
      return <Line data={this.dataReportShown} options={{animation: false}} ></Line>
    }
    else
    {
      return <img src={nosensor}  style={imageCenterStyle}></img>
    }
      
  
  }
  render(){
    const { classes } = this.props;
    let switchMonitorClasses = classNames(classes.switchButtonSendEmailMonitor, classes.footerGridItemMonitor)
    let optionsHistorico = this.state.arrayHistorico.map((data) =>
        <MenuItem 
            key={data.id}
            value={data.id}
        >
            {data.name}
        </MenuItem>
    );
    

    return(
      <div>

      
        <Grid container spacing={3}>
            <Grid item xs={3}>
              <ColorButton onClick={this.handleClickOpenCultivoDialog}>Nuevo Cultivo</ColorButton>
              <ColorButton onClick={this.handleOpenHistorialDialog} >Visualizar Histórico</ColorButton> 
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
          <Grid item xs={2}><this.HalfDoughnutTemperature/></Grid>
          <Grid item xs={2}><this.HalfDoughnutHumidity/></Grid>
          <Grid item xs={2}><this.DoughnutPHLevel/></Grid>          
          <Grid item xs={2}><this.DoughnutEC/></Grid>
          <Grid item xs={2}><this.HalfDoughnutLightLevel/></Grid>
          <Grid item xs={1}></Grid> 
            
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <FormGroup row>
              <FormControlLabel
                control={<Switch checked={this.state.sendMessage} onChange={this.handleOpenMessageDialog}  />}
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
            open={this.state.isHistorialDialogOpened}
            TransitionComponent={Transition}
            keepMounted
            onClose={this.handleCloseHistorialDialog}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle id="alert-dialog-slide-title">{"Visualizar Histórico"}</DialogTitle>
            <DialogContent>
              <Grid container spacing={3}>
                <Grid item xs={3}>
                  <FormControl  className={classes.formControl}>
                                <InputLabel id="Historico-select-helper-label">Historico</InputLabel>
                                <Select
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    onChange={this.handleChangeSelectionHistorial}
                                >
                                    <MenuItem value="">
                                    <em>None</em>
                                    </MenuItem>
                                    {optionsHistorico}
                                </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={9}></Grid>
              
              </Grid>
            </DialogContent>
            <DialogActions>
            
              <Button onClick={this.handleRevisarCultivo} color="primary" justify="center">
                Revisar
              </Button>
            
          </DialogActions>
        </Dialog>
        <Dialog
          open={this.state.isDialogMessageOpened}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleCloseMessageDialog}
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
            <Button onClick={this.handleCancelMessageDialog} color="primary">
              No
            </Button>
            <Button onClick={this.handleAprobalMessageDialog} color="primary">
              Sí
            </Button>
            </DialogActions>
        </Dialog>
        <Dialog open={this.state.isCultivoDialogOpened} onClose={this.handleClickOpenCultivoDialog} aria-labelledby="form-dialog-title">
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
                      value={this.state.planta}
                      onChange={this.handleChangePlantaSelect}
                      input={<Input id="plantaInputLabel" />}>
                        <option aria-label="None" value="" />
                    </Select>
                  </FormControl>
              </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.registrarCultivoOnClick} color="primary" justify="center">
              Registrar
            </Button>
          </DialogActions>
          </Dialog> 
      </div>
    )
  }
}
Monitor.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withRouter(withStyles(styles)(Monitor));
