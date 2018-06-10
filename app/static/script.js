var MQTTbroker = 'test.mosquitto.org';
var MQTTport = 8080;
var MQTTsubTopic = '/hackatopusp2018-grupo7/#'; //works with wildcard # and + topics dynamically now
var charts = new Array();
var charthack;
var dataTopics = new Array();

//mqtt broker
var client = new Paho.MQTT.Client(MQTTbroker, MQTTport,
        "myclientid_" + parseInt(Math.random() * 100, 10));
client.onMessageArrived = onMessageArrived;
client.onConnectionLost = onConnectionLost;

//mqtt connecton options including the mqtt broker subscriptions
var options = {
    timeout: 3,
    onSuccess: function () {
        console.log("mqtt connected");
        // Connection succeeded; subscribe to our topics
        client.subscribe(MQTTsubTopic, {qos: 1});
    },
    onFailure: function (message) {
        console.log("Connection failed, ERROR: " + message.errorMessage);
        //window.setTimeout(location.reload(),20000); //wait 20seconds before trying to connect again.
    }
};
//can be used to reconnect on connection lost
function onConnectionLost(responseObject) {
    console.log("connection lost: " + responseObject.errorMessage);
};

function onMessageArrived(message) {
    var myEpoch = new Date().getTime(); //get current epoch time
    var index = Number(message.destinationName.split('/')[2]) - 2;
    var tipo = message.destinationName.split('/')[3]

    if (tipo === 'ponto') {
        console.log('Index: ', index);
        var thenum = message.payloadString.replace( /^\D+/g, ''); //remove any text spaces from the message
        var data = [myEpoch, Number(thenum)]; //create the array


        if (isNumber(thenum)) { //check if it is a real number and not text
            if (Number(thenum) < 90)
                window.markers[index].setIcon('https://i.imgur.com/quLjEU7.png');
            else if (Number(thenum) < 110)
                window.markers[index].setIcon('https://i.imgur.com/sISBN5Q.png');
            else
                window.markers[index].setIcon('https://i.imgur.com/SLVHkJk.png');

                console.log('is a propper number, will send to chart.')
            plot(charts[index], data);	//send it to the plot function
            if (index === 6)
                plot(charthack, data);	//send it to the plot function
        }
    } else {
        var tipo2 = Number(message.destinationName.split('/')[4]);
        if (tipo2 === 0)
            $('#avg-time').text(Math.floor(Number(message.payloadString)) + " min")
        else
           $('#disp-sessao').text(thenum)
    }
};

function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

function chart_init() {
    Highcharts.setOptions({
    global: {
        useUTC: false
    }
    });

    client.connect(options);
};

function plot(chart, point) {
    var series1 = chart.series[0],
        shift1 = series1.data.length > 30;

    chart.series[0].addPoint(point, true, shift1);
};

$(document).ready(function() {
    var i, j;

    for (i = 0; i < window.points_name.length; i++) {
        charts.push(new Highcharts.Chart({
            chart: {
                renderTo: 'chart'+(i+1),
                defaultSeriesType: 'spline'
            },
            title: {
                text: ''
            },
            subtitle: {
                text: 'Lotação'
            },
            xAxis: {
                type: 'datetime',
                tickPixelInterval: 150,
                maxZoom: 20 * 1000
            },
            yAxis: {
                minPadding: 0.2,
                maxPadding: 0.2,
                title: {
                    text: 'Dispositivos',
                    margin: 80
                }
            },
            series: ['Lotação']
        }));
    }

    charthack = new Highcharts.Chart({
        chart: {
            renderTo: 'charthack',
            defaultSeriesType: 'spline'
        },
        title: {
            text: ''
        },
        subtitle: {
            text: 'Lotação'
        },
        xAxis: {
            type: 'datetime',
            tickPixelInterval: 150,
            maxZoom: 20 * 1000
        },
        yAxis: {
            minPadding: 0.2,
            maxPadding: 0.2,
            title: {
                text: 'Dispositivos',
                margin: 80
            }
        },
        series: ['Lotação']
    });
});
