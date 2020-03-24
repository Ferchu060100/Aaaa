import { ChartData, ChartOptions } from 'chart.js';

const sourceD = [65, 59, 80, 90, 56, 55, 40, undefined, 60, 55, 109, 78];
const sourceS = [50, 40, 30, 40, 30, 90, 10, 50, 20, 30, 100, 78];
const sourceF = [90, 59, 70, 90, 56, 30, 40,50, 60, 55, 109, 78];

 function dataHumedad (res = []) {
        return {
           datasets: [
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
                   data: res,
                   spanGaps: true,
               }
           ],
       }
    };  

var data1 = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
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
            data: sourceF,
            spanGaps: true,
        }
    ],
};

const data2 = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
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
            data: sourceS,
            spanGaps: true,
        }
    ],
};

const options = {
    responsive: true,
    maintainAspectRatio: true,

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
        yAxes: [
            {
                // beforeBuildTicks: (scale: any) => {
                //     console.log(scale);
                //     if (scale._ticks)
                //         scale._ticks[0].major = true;
                // },
                ticks: {
                    beginAtZero: true,
                    max: 180,
                    min: 0,
                    stepSize: 20,
                    // values: []
                    // callback: function (value, index, values) {
                    //     // if (value) console.log(value, values);
                    //     return value == 120 ? null : value;
                    // }
                },
                // scaleLabel: {
                //     display: true,
                //     labelString: 'Moola',
                //     fontSize: isMobile() ? 11 : 30,
                //     padding: isMobile() ? 0 : undefined,
                //     lineHeight: isMobile() ? '70%' : undefined,
                // },
                // gridLines: {
                //     zeroLineWidth: 1,
                //     // borderDash: [6, 6],
                //     lineWidth: 1,
                //     color: ['#bdbdbd', '#bdbdbd', '#d50000', '#bdbdbd', '#bdbdbd', '#bdbdbd', '#bdbdbd', '#bdbdbd', '#bdbdbd'],
                // }
            },
        ],
    },
    // events: ['click'],
    // onClick: (e: any, arr: any[]) => console.log(':v', e, arr),
};



export default  dataHumedad ;

