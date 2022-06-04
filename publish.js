var mqtt = require('/usr/local/lib/node_modules/mqtt/mqtt');
// var mqtt = require('mqtt');
var count = 0;
var client  = mqtt.connect("mqtt://192.168.100.4");
console.log("connected flag  " + client.connected);

function Incoming(topic, message, packet){
    console.log("Incoming message is "+ message);
    console.log("Topic is "+ topic);
}

//handle incoming messages
client.on('message', (topic, message, packet) => Incoming(topic, message, packet));

//handle incoming messages
//client.on('message', (topic, message, packet) => {
//    console.log("message is "+ message);
//    console.log("topic is "+ topic);
//});

client.on("connect",function(){	
console.log("connected  "+ client.connected);

})
//handle errors
client.on("error",function(error){
console.log("Can't connect" + error);
process.exit(1)});

//publish
function publish(topic,msg,options){
console.log("publishing",msg);

client.publish(topic,msg,options);

count+=1;
if (count==10) //ens script
	clearTimeout(timer_id); //stop timer
	client.end();	
}

//////////////

var options={
retain:true,
qos:1};
var topic="clock";
var message="Publisher MESSAGE";
var topic_list=["topic2","topic3","topic4"];
var topic_o={"topic22":0,"topic33":1,"topic44":1};
console.log("subscribing to topics");
client.subscribe(topic,{qos:1}); //single topic
client.subscribe(topic_list,{qos:1}); //topic list
client.subscribe(topic_o); //object
var timer_id=setInterval(function(){publish(topic,message,options);},5000);
//notice this is printed even before we connect
console.log("end of script");
