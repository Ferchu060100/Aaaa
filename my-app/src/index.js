import React from 'react';
import ReactDOM from 'react-dom';
import AWS from "aws-sdk";
import './index.css';
import App from './components/App';
import * as serviceWorker from './components/serviceWorker';

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
var dataMonitor = null;

export function getMonitorData() {
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
    docClient.scan(params, function(err, data) {
        const {Items} = data;
        dataMonitor = Items.sort((a, b) => (a.timestamp_value > b.timestamp_value) ? 1 : -1).slice(-1)[0]
        
    })
    return dataMonitor;

}
export async function getSelectSensorData() {
    const params = {
        TableName: "Sensores",
    };

    let scanResults = [];
    let items;
    items =  await docClient.scan(params).promise();
    items.Items.forEach(function(obj){
        let dataOutValue=new Object();;
        dataOutValue.id= obj.codigo;
        dataOutValue.name = obj.nombre;
        scanResults.push(dataOutValue)
    });
    params.ExclusiveStartKey  = items.LastEvaluatedKey;

    return scanResults;

};


export async function getDataReport(sensor) {
    const params = {
        TableName: "POC_Sensor_Data",
    };

    let scanResults = [];
    let items;
    items =  await docClient.scan(params).promise();
    var BreakException= {};
    try {
        items.Items.forEach(function(obj, idx){
            if(sensor==="1luminosidad")
            {
                scanResults.push(obj.luminosidad)
            }
            else{
                scanResults.push(obj.humedad)
            }

            if (idx === 9) throw BreakException;
          
        });
    } catch (e) {
        if (e !== BreakException) {
            scanResults = [];
            throw e;
        }
    }
    params.ExclusiveStartKey  = items.LastEvaluatedKey;

    return scanResults;

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
