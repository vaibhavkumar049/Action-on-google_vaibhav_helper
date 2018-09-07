// 'use strict'

const {dialogflow,Permission,actionssdk,SignIn}= require('actions-on-google');
const functions = require('firebase-functions');
 const admin=require('firebase-admin');
//const a=require('./index2.js');
 admin.initializeApp();
 const db=admin.firestore(); 

const app=dialogflow({debug : true ,
                    clientId : "332867731471-0gh7c35n01bnj2b3dhsmnkpkaadnjncl.apps.googleusercontent.com"  
                    });
app.intent('Start Signin', conv => {
  conv.ask(`siging you in`);
  conv.ask(new SignIn('To get your account details'))
})
app.intent('Default Welcome Intent',(conv)=>{
  conv.ask(`hi`);
})
// Create a Dialogflow intent with the `actions_intent_SIGN_IN` event.
app.intent('Get Signin', (conv, params, signin) => {
  if (signin.status === 'OK') {
    const payload = conv.user.profile.payload
    const {email} = conv.user;
    conv.ask(`I got your account details, ${payload.name}.and ${email} What do you want to do next?`)
    db.collection(`user`).doc(email).set({
      name:"some name",
    }).then(()=>{
          conv.ask(`success`);
          return;
    }).catch((e)=>{
        conv.close(`unscess ${e}`);
    })
  } else {
    conv.ask(`I won't be able to save your data, but what do you want to do next?`)
  }
})
exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);