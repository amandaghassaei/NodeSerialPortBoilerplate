/**
 * Created by ghassaei on 10/26/16.
 */


$(function() {

    var socket = io.connect('http://localhost:8080');

    //bind events
    socket.on('connected', function(data){

        console.log("connected");

        if (data.portName) $("#portName").html(data.portName);
        if (data.baudRate) $("#baudRate").html(data.baudRate);
        if (data.availablePorts && data.availablePorts.length>0){
            var html = "";
            for (var i=0;i<data.availablePorts.length;i++){
                html += "<a class='availablePorts' href='#'>" + data.availablePorts[i] + "</a><br/>"
            }
            $("#availablePorts").html(html);
        }

        $(".availablePorts").click(function(e){//change port
            e.preventDefault();
            socket.emit("portName", $(e.target).html());
        });
    });

    socket.on('portConnected', function(data){
        console.log("connected port " + data.portName + " at " + data.baudRate);
    });

    socket.on('portDisconnected', function(data){
        console.log("disconnected port " + data.portName + " at " + data.baudRate);
    });

    socket.on("errorMsg", function(data){
        console.warn(data);
    });

    socket.on("error", function(error){
        console.warn(error);
    });

    socket.on("connect_error", function(){
        console.log("connect error");
    });

    socket.on("dataIn", function(data){//oncoming serial data
        console.log("data: " + data);
    });

});
