import React from 'react';
import ReactDOM from 'react-dom';
import AWS from "aws-sdk";
import './index.css';
import App from './components/App';
import * as serviceWorker from './components/serviceWorker';
import { BaseURL } from './components/BaseURL';

AWS.config.update({
    accessKeyId: 'AKIAVQLA7TQ5KQHYBOE2' ,
    secretAccessKey: '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' ,
    region: "us-east-2",
  });
 const docClient = new AWS.DynamoDB.DocumentClient();         
const params = {
    TableName: "POC_Sensor_Data",
    scan_index_forward: false
};   

var recentEventsDateTime = [];
var humedadValues = [];
var temperaturaValues = [];
var luminosidadValues = [];


export async function getMonitorData(){
    let endPoint = '/sensores/data'
    let response = await  fetch(BaseURL + endPoint,{
        method: 'GET'
    });
    let responseJWT = await response.json();

    if(responseJWT.result == 'ok'){

        return responseJWT.data.sort((a, b) => (a.timestamp_value > b.timestamp_value) ? 1 : -1).slice(-1)[0]
    }
    else{
        return []
    }
}


export async function getSelectSensorData() {
    let endPoint = '/sensores'
    let response = await  fetch(BaseURL + endPoint,{
        method: 'GET'
    });
    let responseJWT = await response.json();

    if(responseJWT.result == 'ok'){
        let scanResults = [];
        responseJWT.data.forEach(function(obj){
            let dataOutValue=new Object();;
            dataOutValue.id= obj.codigo;
            dataOutValue.name = obj.nombre;
            scanResults.push(dataOutValue)
        });
        return scanResults;
    }
    else{
        return [];
    }
    

};

export async function getCultivoActual() {
    let endPoint = '/cultivos'
    let response = await  fetch(BaseURL + endPoint,{
        method: 'GET'
    });
    let responseJWT = await response.json();

    if(responseJWT.result === 'ok' && response.data !== []){
        return responseJWT.data.sort((a, b) => (a.fecha_inicio > b.fecha_inicio) ? 1 : -1).slice(-1)[0]
    }
    else{
        return null;
    }
    

};


export async function getCultivoAnterior() {
    let endPoint = '/cultivos'
    let response = await  fetch(BaseURL + endPoint,{
        method: 'GET'
    });
    let responseJWT = await response.json();

    if(responseJWT.result === 'ok' && responseJWT.data.length > 1){
        return responseJWT.data.sort((a, b) => (a.fecha_inicio > b.fecha_inicio) ? 1 : -1).slice(-2)[0]
    }
    else{
        return null;
    }
    

};

export async function getCultivoActualDataBySensorId(sensor) {
    var cultivoId = '';
    var data = await getCultivoActual();
    if(data!==null)
    {
        cultivoId =  data.codigo;
    }
    
    
    let endPoint = '/cultivos/'+cultivoId+"/data"
    let response = await  fetch(BaseURL + endPoint,{
        method: 'GET'
    });
    let responseJWT = await response.json();

    if(responseJWT.result === 'ok' ){
        let scanResults = [];
        responseJWT.data.forEach(function(obj, idx){
            if(sensor==="1luminosidad")
            {
                scanResults.push(obj.luminosidad)
            }
            else if(sensor==="1humedad"){
                scanResults.push(obj.humedad)
            }
            else if(sensor==="1ph"){
                scanResults.push(obj.ph)
            }
            else if(sensor==="1temperatura"){
                scanResults.push(obj.temperatura)
            }
            else if(sensor==="1conductividad"){
                scanResults.push(obj.temperatura)
            }
            if (idx === 9) {
                return scanResults;
            }
          
        });
        return scanResults;
    }
    else{
        return [];
    }
    

};

export async function getCultivoAnteriorDataBySensorId(sensor) {
    var cultivoId = '';
    var data = await getCultivoAnterior();

    if(data!==null)
    {
        cultivoId =  data.codigo;
    }
    
    let endPoint = '/cultivos/'+cultivoId+"/data"
    let response = await  fetch(BaseURL + endPoint,{
        method: 'GET'
    });
    let responseJWT = await response.json();

    if(responseJWT.result === 'ok' ){
        let scanResults = [];
        responseJWT.data.forEach(function(obj, idx){
            if(sensor==="1luminosidad")
            {
                scanResults.push(obj.luminosidad)
            }
            else if(sensor==="1humedad"){
                scanResults.push(obj.humedad)
            }
            else if(sensor==="1ph"){
                scanResults.push(obj.ph)
            }
            else if(sensor==="1temperatura"){
                scanResults.push(obj.temperatura)
            }
            else if(sensor==="1conductividad"){
                scanResults.push(obj.temperatura)
            }
            if (idx === 9) {
                return scanResults;
            }
          
        });
        return scanResults;
    }
    else{
        return [];
    }
    
    

};

export async function getDataReport(sensor) {
    let endPoint = '/sensores/data'
    let response = await  fetch(BaseURL + endPoint,{
        method: 'GET'
    });
    let responseJWT = await response.json();
    
    if(responseJWT.result == 'ok'){
        let scanResults = [];
        responseJWT.data.forEach(function(obj, idx){
            if(sensor==="1luminosidad")
            {
                scanResults.push(obj.luminosidad)
            }
            else if(sensor==="1humedad"){
                scanResults.push(obj.humedad)
            }
            else if(sensor==="1ph"){
                scanResults.push(obj.ph)
            }
            else if(sensor==="1temperatura"){
                scanResults.push(obj.temperatura)
            }
            else if(sensor==="1conductividad"){
                scanResults.push(obj.temperatura)
            }
            if (idx === 9) return scanResults;
          
        });
        return scanResults
    }
    else{
        return []
    }
    

};

function renderGraphs (){
    docClient.scan(params, function(err, data) {   
        const {Items} = data;
        
        var temprecentEventsDateTime = [];
        var temptemperaturaValues = [];
        var temphumedadValues = [];
        var templuminosidadValues = [];        
        
        var dataOutTemp = []

        Items.forEach(function(item) {
            let dataOutValue={};
            dataOutValue.dateHour = item.hora;
            
            dataOutValue.humedadValue = item.humedad;
            
            dataOutValue.luminosidadValue = item.luminosidad;
            
            dataOutValue.temperaturaValue = item.temperatura;
            
            dataOutValue.timestampValue = item.data_timestamp;
            
            dataOutValue.nanoValue = item.timestamp_value;
            dataOutTemp.push(dataOutValue);
        });
        dataOutTemp.sort(function(a,b){return a.nanoValue-b.nanoValue});
        dataOutTemp.forEach(function(it){
            temprecentEventsDateTime.push(it.dateHour);
            temptemperaturaValues.push(it.temperaturaValue);
            temphumedadValues.push(it.humedadValue);
            templuminosidadValues.push(it.luminosidadValue);
        });
        recentEventsDateTime = temprecentEventsDateTime.slice(-10);
        humedadValues = temphumedadValues.slice(-10);
        temperaturaValues = temptemperaturaValues.slice(-10);
        luminosidadValues = templuminosidadValues.slice(-10);
        ReactDOM.render(<App 
            labels = {recentEventsDateTime}
            humedadValues = {humedadValues}
            luminosidadValues = {luminosidadValues}
            temperaturaValues = {temperaturaValues}
            />, document.getElementById('root'));    
        });  
        
        
}

ReactDOM.render(<App 
    labels = {[]}
    humedadValues = {[]}
    luminosidadValues = {[]}
    temperaturaValues = {[]}
/>, document.getElementById('root'));

//setInterval(renderGraphs,2000);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
