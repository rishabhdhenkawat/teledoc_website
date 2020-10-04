var can=document.getElementById("cancel");
var reschedule=document.getElementById("reschedule");
var anu=document.getElementsByClassName("anurag");
var ris=document.getElementsByClassName("rishab");
var accept=document.getElementById("accept");
var ignore=document.getElementById("ignore");
var phone=document.getElementById("phone");
var video=document.getElementById("video");


can.addEventListener('click', function(event) {
    alert("Appointment in process will be canceled");
  });

reschedule.addEventListener('click', function(event) {
    alert("Appointment in process will be rescheduled as per your choice");
  });


accept.addEventListener('click', function(event) {
    alert("Patient is informed and you will be able to monitor him in a moment");
  });
ignore.addEventListener('click', function(event) {
    alert("Patient is informed that you can't accept the appointment due to some issue");
  });

phone.addEventListener('click', function(event) {
    alert("Patient will be ready to talk to you in a moment");
  });

video.addEventListener('click', function(event) {
    alert("Patient will be ready to video call with you in a moment");
    window.open("room.ejs");
  });

