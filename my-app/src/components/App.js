import React  from 'react';
import './App.css';
import { ToastContainer } from 'react-toastify';
import {BrowserRouter as Router,Route, Switch} from 'react-router-dom';
import SignUp from './signup-component/RegistrarUsuario'
import SignIn from './signin-component/IniciarSesion'
import Mantenimiento from './mantenimiento-component/Mantenimiento'
import Graficos from './Historico'
import Monitor from './monitor-component/Monitor';  
import Reporte  from './monitor-component/Reporte';
import Historial  from './monitor-component/Historial';
import Example  from './prueba-component/Prueba';
import ProtectedRoute from './authentication-component/ProtectedRoute';
function lineOptions(labels = []) {
  return{
  responsive: true,
  maintainAspectRatio: true,
  animation: {
    duration: 0,
  },
  legend: {
      // display: false
      labels: {
          filter: (item, chart) => {
              if (item.text) return !item.text.includes('none');
              return item;
          },
      },
  },
  scales: {
    xAxes: [
      {
        display: true,        
    
        labels: labels,
      }
    ],
      yAxes: [
          {
              ticks: {
                  beginAtZero: true,
                  max: 100,
                  min: 0,
                  stepSize: 20,
              },
          },
      ],
  },
  }
};

function data_humedad (datasrc=[]){
          return { datasets: [
               {
                   label: 'Humedad',
                   fill: false,
                   lineTension: 0.1,
                   backgroundColor: '#aeea00',
                   borderColor: '#aeea00', // The main line color
                   borderCapStyle: 'square',
                   borderDash: [], // try [5, 15] for instance
                   borderDashOffset: 0.0,
                   borderJoinStyle: 'miter',
                   pointBorderColor: 'black',
                   pointBackgroundColor: 'black',
                   pointBorderWidth: 1,
                   pointHoverRadius: 8,
                   pointHoverBackgroundColor: 'yellow',
                   pointHoverBorderColor: 'brown',
                   pointHoverBorderWidth: 2,
                   pointRadius: 4,
                   pointHitRadius: 10,
                   // notice the gap in the data and the spanGaps: true
                   data: datasrc,
                   spanGaps: true,
               }
		  ]}
 };


function data_luminosidad(datasrc=[]){
  return {
  datasets: [
    {
      label: 'Luminosidad',
      fill: false,
      lineTension: 0.1,
      backgroundColor: '#D17B0F',
      borderColor: '#D17B0F', // The main line color
      borderCapStyle: 'square',
      borderDash: [], // try [5, 15] for instance
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'black',
      pointBackgroundColor: 'black',
      pointBorderWidth: 1,
      pointHoverRadius: 8,
      pointHoverBackgroundColor: 'yellow',
      pointHoverBorderColor: 'brown',
      pointHoverBorderWidth: 2,
      pointRadius: 4,
      pointHitRadius: 10,
      // notice the gap in the data and the spanGaps: true
      data: datasrc,
      spanGaps: true,
    }
  ]}
};

function data_temperatura(datasrc=[]) {
  return {
  datasets: [
    {
      label: 'Temperatura',
      fill: false,
      lineTension: 0.1,
      backgroundColor: '#B3001B',
      borderColor: '#B3001B', // The main line color
      borderCapStyle: 'square',
      borderDash: [], // try [5, 15] for instance
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'black',
      pointBackgroundColor: 'black',
      pointBorderWidth: 1,
      pointHoverRadius: 8,
      pointHoverBackgroundColor: 'yellow',
      pointHoverBorderColor: 'brown',
      pointHoverBorderWidth: 2,
      pointRadius: 4,
      pointHitRadius: 10,
      // notice the gap in the data and the spanGaps: true
      data: datasrc,
      spanGaps: true,
    }
  ]}
};

function App() {
  return (
  <div className="App">
      <Router>
            <ProtectedRoute path="/inicio" component={Graficos}/>
              <Route path="/SignUp" component={SignUp}/>
              <Route path="/SignIn" component={SignIn}/>
              <ProtectedRoute path="/mantenimiento" component={Mantenimiento}/>
              <ProtectedRoute path="/monitoreo" component={Monitor}/>
              <ProtectedRoute path="/reporte" component={Reporte}/>
              <ProtectedRoute path="/prueba" component={Example}/>
              <Switch>
                  <Route path="/historial/:tipohistorial" component={Historial}></Route>
              </Switch>
      </Router>

      
      <ToastContainer />
  </div>
);
  }


export default App;
