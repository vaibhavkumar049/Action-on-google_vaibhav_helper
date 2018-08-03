'use strict'

const {dialogflow}=require('actions-on-google');
const functions = require('firebase-functions');
const d=require('date-and-time');
const app=dialogflow({debug : true });
let date = new Date();


app.intent('what should',(conv,{Work})=>{
  console.log(Work);
  if(Work === 'do now'){
 if(d.format(date,'ddd')==='Mon' && d.format(date,'hh:mm')==='09:00'){
   conv.close("You have a class of Microprocessor in ICT 308 ,You can go a bit late.");
 }
 else if (d.format(date,'ddd')==='Thu' && d.format(date,'hh:mm')==='09:00'){
   conv.close("You have a class of Microprocessor in ICT 308 ,You can go a bit late.");
 }
 else {
   conv.close("You should be sleeping now");

 }
}
 // else{
 //   conv.close("i could not understood");
 // }

// conv.close('good night');

});

exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);

//if (d.getDay()








// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
