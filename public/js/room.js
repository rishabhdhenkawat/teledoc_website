const socket = io('http://localhost:3000'); //location of where server is hosting socket app

socket.on('chat-message', data =>{
    console.log(data)
});

// query DOM
const message = document.getElementById('message');
      handle  = document.getElementById('handle');
      button  = document.getElementById('submit');
      output  = document.getElementById('output');
      typing  = document.getElementById('typing');

//send typing message 

message.addEventListener('keypress',() =>
{
	socket.emit("userTyping", handle.value)
})


// send message to clients
if(button){
    button.addEventListener('click', () =>
	{
	    socket.emit('userMessage', {
	        message: message.value,
	        handle: handle.value
	    })
	    document.getElementById('message').value="";
	}) 
}
 




// Emit events

// button.addEventListener('click', () =>
// {
//     socket.emit('chat', {
//         message: message.value,
//         handle: handle.value
//     })
// }) 



//listen for events from the server

 socket.on("userMessage", (data) => 
 {
 	typing.innerHTML = "";
 	output.innerHTML += '<p> <strong>' + data.handle + ':</strong>' + data.message + '</p>'
 })


socket.on("userTyping", (data) =>{
	typing.innerHTML = '<p> <em>' + data + 'is typing.... </em></p>'
})


// video chat
 

// get the local video ans display it with permission
function getVideo(callbacks) {

	navigator.getUserMedia = navigator.getUserMedia || navigator.webkitgetUsermedia || navigator.mozgetUserMedia;
    var constraints ={
    	audio : true,
    	video : true
    }
    navigator.getUserMedia(constraints,callbacks.success, callbacks.error)
}

function recStream(stream, elemid){
	var video= document.getElementById(elemid);
	video.srcObject=stream;
	window.pper_stream = stream;
}

getVideo({
	success : function(stream){
		window.localstream = stream;
		recStream(stream, 'lVideo');
	},
	error : function(err){
		alert("cannot access your camera");
		console.log(err);
	}
})


var conn;
var peer_id;


var peer = new Peer(); 

peer.on('open',function(){
	document.getElementById("displayId").innerHTML = peer.id
})

peer.on('connection',function(connection){
	conn= connection;
	peer_id= connection.peer;

	document.getElementById('connId').value= peer_id;
});

peer.on('error', function(err){
	alert("ASn error has occured : " + err);
	console.log(err);
})

document.getElementById('conn_button').addEventListener('click', function(){
	peer_id=document.getElementById("connId").value;

	if(peer_id){
		conn= peer.connect(peer_id);
	}
	else{
		alert("Enter an Id");
		return false;
	}
})


// call on click 
peer.on('call',function(call){
    
	confirm("Do you want to answer this call?");

	
   		call.answer(window.localstream);

		call.on('stream',function(stream){
			window.peer_stream = stream;
			recStream(stream, 'rVideo')
		});

		call.on('close', function(){
			alert("The call has ended");
		})
    


    

	// if(acceptCall){
		
	// } else {
	// 	console.log("call denied");
	// }
});


//ask to call
document.getElementById('call_button').addEventListener('click',function(){
	console.log("calling a peer : " + peer_id);
	console.log(peer);

	var call= peer.call(peer_id, window.localstream);

	call.on('stream', function(stream){
		window.peer_stream = stream;
		recStream(stream, 'rVideo');
	});


})

// Listen to events

// socket.on('chat', (data)=>{
//     output.innerHTML += '<p> <strong>' + data.handle + ': </strong>' + data.message + '</p>'
// })