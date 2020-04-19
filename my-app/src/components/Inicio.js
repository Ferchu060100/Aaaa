import React  from 'react';
import './App.css';
import { Line } from 'react-chartjs-2';
import { Card, CardBody } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
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
 }


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
 


export default function Graficos(props) {
  return (
  <div className="Appt">
      <ToastContainer />
    <div className="container">
       <div style={{ marginTop: '20px'}}>
                <Card >
                    <CardBody>                      
                      <Line height={undefined} data={data_humedad(props.humedadValues)} options={lineOptions(props.labels)} />
                    </CardBody>
                </Card>
                <hr />
      </div>
     <div style={{ marginTop: '20px'}}>
                <Card >
                    <CardBody>                      
                      <Line height={undefined} data={data_luminosidad(props.luminosidadValues)} options={lineOptions(props.labels)} />
                    </CardBody>
                </Card>
                <hr />
      </div>
      <div style={{ marginTop: '20px'}}>
                <Card >
                    <CardBody>                      
                      <Line height={undefined} data={data_temperatura(props.temperaturaValues)} options={lineOptions(props.labels)} />
                    </CardBody>
                </Card>
                <hr />
      </div>
    </div>
    </div>
);
}