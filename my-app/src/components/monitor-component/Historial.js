import React  from 'react';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import {Select, Button} from '@material-ui/core/';
import {  getSelectSensorData, getCultivoAnteriorDataBySensorId, getCultivoActualDataBySensorId } from '../../index';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {Line} from 'react-chartjs-2';
import nosensor from '../../resources/sensornodisponible.png';
import { Link } from 'react-router-dom';
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

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120
    },
    footerGridMonitor: {
      height: "100%",
      position: "relative"
    },
    
  }));
  
export default function Historial(props){
    const [arraySensor, setArraySensor] =  React.useState([]);
    const [dataReporte,setDataReporte] =  React.useState([]);
    const [selectedSensor,setSelectedSensor] =  React.useState('');
    const classes = useStyles();
    React.useEffect(() => {
    
        getSelectSensorData().then(
          function(result){
            setArraySensor(result);
          }
        )
      });
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
    let options = arraySensor.map((data) =>
        <MenuItem 
            key={data.id}
            value={data.id}
        >
            {data.name}
        </MenuItem>
        );
        const dataReportShown = {
            labels: ['Muestra 1', 'Muestra 2', 'Muestra 3', 'Muestra 4', 'Muestra 5', 'Muestra 6', 'Muestra 7', 'Muestra 8', 'Muestra 9', 'Muestra 10'],
            datasets: [
              {
                label: '',
                fill: false,
                lineTension: 0.1,
                fontColor:'black',
                backgroundColor: 'black',
                borderColor: 'black',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'black',
                pointBackgroundColor: 'black',
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
          function handleChangeSelectionSensor(event){
            setSelectedSensor(event.target.value)
            if(event.target.value!=''){
                
                
                if(JSON.stringify(props.match.params.tipohistorial)==='"actual"'){
                    getCultivoActualDataBySensorId(event.target.value).then(
                        function(result){
                            console.log(result)
                            setDataReporte(result);
                        }
                      )
                }
                else{
                    getCultivoAnteriorDataBySensorId(event.target.value).then(
                        function(result){
                            setDataReporte(result);
                        }
                      )
                }
              
            }
            
          }
    return(

        <div>
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
            
        <Link to= "/home/monitor">
        <ColorButton >Volver</ColorButton>
        </Link>
        
        </Grid>
    </Grid>
    </div>
    
    )
}