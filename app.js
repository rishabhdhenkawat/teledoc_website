
var express= require("express");
var app = express();
var bodyparser= require("body-parser");
const axios = require('axios');
var http = require('http').Server(app);
const port = process.env.PORT || 3000



// web rtc vc

var os = require('os');
var nodeStatic = require('node-static');
var io = require('socket.io')(http);

// const { JSDOM } = require( "jsdom" );
// const { window } = new JSDOM( "" );
// const $ = require( "jquery" )( window );


app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));
var resp_rate,blood_gulcose,body_weight,pul_rate,body_temp,blood_press,params,flag=0;


app.get("/",function(req,res){
	res.render("homepage.ejs");

});



//doctor portal


app.get("/dashboard.ejs",function(req,res){

	// res.render("dashboard.ejs");

	(async () => {
			try{
				const response=await axios.get('http://52.90.167.154:5000/get?id=456');
				resp_rate=response.data["Respiration Rate"];
			  	blood_gulcose=response.data["Blood Glucose"];
			  	body_weight=response.data["Body weight"];
			  	body_temp=response.data["Body Temp"];
			  	pul_rate=response.data["Pulse"];
			  	blood_press=response.data["Blood Pressure"];
			  	res.render("dashboard.ejs",{resp_rate:resp_rate, blood_gulcose:blood_gulcose, body_weight:body_weight, body_temp:body_temp, pul_rate:pul_rate, blood_press:blood_press});

			}

			catch(err){
				console.log(err);
			}
	})();

});



//patient portal


app.get("/patient.ejs",function(req,res){

	(async () => {
			try{
				const response=await axios.get('http://52.90.167.154:5000/get?id=456');
				resp_rate=response.data["Respiration Rate"];
			  	blood_gulcose=response.data["Blood Glucose"];
			  	body_weight=response.data["Body weight"];
			  	body_temp=response.data["Body Temp"];
			  	pul_rate=response.data["Pulse"];
			  	blood_press=response.data["Blood Pressure"];
			  	res.render("patient.ejs",{resp_rate:resp_rate, blood_gulcose:blood_gulcose, body_weight:body_weight, body_temp:body_temp, pul_rate:pul_rate, blood_press:blood_press});

			}

			catch(err){
				console.log(err);
			}
	})();
});





//signup as new user

app.get("/signup.ejs",function(req,res){
	res.render("signup.ejs");
});


//getting data for new registration as clinic

		// app.post("/addnewclinic", function(req, res){
	
		// 	var	CliId       =req.body.phone
		// 		name        =req.body.name
		// 		Age         =req.body.age
		// 		email       =req.body.email
		// 		phone       =req.body.phone
		// 		pass        =req.body.pass
		// 		city        =req.body.city
		// 		state       =req.body.state
		// 		country     =req.body.country
		// 		PIN         =req.body.pincode
		

		// 	var data = {"User":"1","Clinic_Id":CliId, "name": name, "Age":Age,"email":email, "phone":phone, "pass":pass, "city":city, "state":state, "country":country, "PIN":PIN };
			
		// 	var config = {
		// 	  method: 'post',
		// 	  url: 'http://52.90.167.154:5000/signup',
		// 	  headers: { 
		// 	    'Content-Type': 'text/plain'
		// 	  },
		// 	  data : data
		// 	};

		// 	axios(config) 
		// 	.then(function (response) {
		// 	  console.log(JSON.stringify(response.data));
		// 	  res.redirect("signin.ejs");
		// 	})
		// 	.catch(function (error) {
		// 	  console.log(error);
		// 	});
			

			

		// });

    //getting data for new registration as doctor

		app.post("/addnewdoctor", function(req, res){
			
			var	DocId       =req.body.age
				name        =req.body.name
				Age         =req.body.age
				email       =req.body.email
				phone       =req.body.phone
				pass        =req.body.pass
				city        =req.body.city
				state       =req.body.state
				country     =req.body.country
				PIN         =req.body.pincode
				user        ="2"
		

			var data = {"User":user,"Doctor_Id":DocId, "name": name, "Age":Age,"email":email, "phone":phone, "pass":pass, "city":city, "state":state, "country":country, "PIN":PIN };
			
			var config = {
			  method: 'post',
			  url: 'http://52.90.167.154:5000/signup',
			  headers: { 
			    'Content-Type': 'text/plain'
			  },
			  data : data
			};

			axios(config) 
			.then(function (response) {
			  console.log(JSON.stringify(response.data));
			  res.redirect("signin.ejs");
			})
			.catch(function (error) {
			  console.log(error);
			});
			

		});

		//getting data for new registration as patient

		app.post("/addnewpatient", function(req, res){
			var	PatId       =req.body.age
				name        =req.body.name
				Age         =req.body.age
				email       =req.body.email
				phone       =req.body.phone
				pass        =req.body.pass
				city        =req.body.city
				state       =req.body.state
				country     =req.body.country
				PIN         =req.body.pincode
				user        ="1"
		

			var data = {"User":user,"Patient_Id":PatId, "name": name, "Age":Age,"email":email, "phone":phone, "pass":pass, "city":city, "state":state, "country":country, "PIN":PIN };
			
			var config = {
			  method: 'post',
			  url: 'http://52.90.167.154:5000/signup',
			  headers: { 
			    'Content-Type': 'text/plain'
			  },
			  data : data
			};

			axios(config) 
			.then(function (response) {
			  console.log(JSON.stringify(response.data));
			  console.log(req.body);
			  res.redirect("signin.ejs");
			})
			.catch(function (error) {
			  console.log(error);
			});
		});




//signin as a registered user


app.get("/signin.ejs",function(req,res){	
	res.render("signin.ejs");
});


		// signin as patient
	  
		app.post("/patientuser", function(req, res){
			
			var	PatId  =req.body.age
			    user   ="1"
				// pass        =req.body.pass
				
			var data = {"User":user,"Patient_Id":PatId};
			
			var config = {
			  method: 'post',
			  url: 'http://52.90.167.154:5000/signin',
			  headers: { 
			    'Content-Type': 'text/plain'
			  },
			  data : data
			};

			axios(config) 
			.then(function (response) {
			  console.log(JSON.stringify(response.data));
			  res.redirect("patient.ejs")
			  
			})
			.catch(function (error) {
			  console.log(error);
			});
			

		});


		// signin as doctor
	  
		app.post("/doctoruser", function(req, res){
			
			var	DocId  =req.body.age;
			    user   ="2"
				
			var data = {"User":user,"Doctor_Id":DocId};
			
			var config = {
			  method: 'post',
			  url: 'http://52.90.167.154:5000/signin',
			  headers: { 
			    'Content-Type': 'text/plain'
			  },
			  data : data
			};

			axios(config) 
			.then(function (response) {
			  console.log(JSON.stringify(response.data));
			  res.redirect("dashboard.ejs")
			  
			})
			.catch(function (error) {
			  console.log(error);
			});
			

		});
		
		









// web rtc vc
app.get("/room.ejs",function(req,res){

			
			// var run = http.createServer(function(req, res) {
			//   fileServer.serve(req, res);
			// }).listen(3000);

			// var io = socketIO.listen(run);
			io.sockets.on('connection', function(socket) {

			  // convenience function to log server messages on the client
			  function log() {
			    var array = ['Message from server:'];
			    array.push.apply(array, arguments);
			    socket.emit('log', array);
			  }

			  socket.on('message', function(message) {
			    log('Client said: ', message);
			    // for a real app, would be room-only (not broadcast)
			    socket.broadcast.emit('message', message);
			  });

			  socket.on('create or join', function(room) {
			    log('Received request to create or join room ' + room);

			    var clientsInRoom = io.sockets.adapter.rooms[room];
			    var numClients = clientsInRoom ? Object.keys(clientsInRoom.sockets).length : 0;

			    log('Room ' + room + ' now has ' + numClients + ' client(s)');

			    if (numClients === 0) {
			      socket.join(room);
			      log('Client ID ' + socket.id + ' created room ' + room);
			      socket.emit('created', room, socket.id);

			    } else if (numClients === 1) {
			      log('Client ID ' + socket.id + ' joined room ' + room);
			      io.sockets.in(room).emit('join', room);
			      socket.join(room);
			      socket.emit('joined', room, socket.id);
			      io.sockets.in(room).emit('ready');
			    } else { // max two clients
			      socket.emit('full', room);
			    }
			  });

			  socket.on('ipaddr', function() {
			    var ifaces = os.networkInterfaces();
			    for (var dev in ifaces) {
			      ifaces[dev].forEach(function(details) {
			        if (details.family === 'IPv4' && details.address !== '127.0.0.1') {
			          socket.emit('ipaddr', details.address);
			        }
			      });
			    }
			  });

			 });
	res.render("room.ejs");
});


//webrtc ends here



http.listen(port, () => console.log(`Active on ${port} port`))

