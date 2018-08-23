'use strict'

const {dialogflow, List ,Image}= require('actions-on-google');
const functions = require('firebase-functions');
const admin=require('firebase-admin');
admin.initializeApp();
const db=admin.firestore(); 

const app=dialogflow({debug : true });

app.intent('what is',(conv,{menu})=>{
  console.log(menu);
conv.ask('This is today menu ,well he is trying to implement this but it\'s not working.  ');
if(conv.surface.capabilities.has('actions.capability.SCREEN_OUTPUT')){
conv.ask(new List({
      title : "Today's Menu",
      items : {
        "one":{
          synonyms:[
          'show me Chinese',
          'Chinese',
        ],
        title : 'Chinese menu',
        description : 'chow(30/-), manchurian(50/-),hakka chow(80/-)',
        image : new Image({
          url : 'https://image.ibb.co/fBNYT9/image.png',
          alt : 'chinese food',
        }),
      },
    "two" : {
        synonyms:[
        'show me Veg',
        'Veg',
      ],
      title : 'Veg menu',
      description : 'chow(30/-), manchurian(50/-),hakka chow(80/-)',
      image : new Image({
        url : 'https://image.ibb.co/fBNYT9/image.png',
        alt : 'chinese food',
      }),
    },
  "three": {
      synonyms:[
        'show me non Veg',
        'non Veg',
        ],
    title : 'non Veg menu',
    description : 'fake description',
    image : new Image({
              url : 'https://image.ibb.co/fBNYT9/image.png',
              alt : 'chinese food',
          }),
      },
    },
  }));
}
else {
  conv.close("try this on a screen device");
  return;
}
const selected_item_response ={
  'one': 'You choose to eat chinese',
  'two' : 'Hey Its Veg Time',
  'three' :'NON veg timeeeeee',
}

app.intent('action.intent.OPTION',(conv,params,option)=>{
  console.log(option);
    let response='you did not selected any option';
  if(option && selected_item_response.hasOwnProperty(option)){
    response=selected_item_response[option];
  }
  conv.close(response);
});

});

// const SELECTION_KEY_ONE='one',SELECTION_KEY_TWO='two',SELECTION_KEY_THREE='three';

//this part is not working
const selected_item_response ={
  'one': 'You choose to eat chinese',
  'two' : 'Hey Its Veg Time',
  'three' :'NON veg timeeeeee',
}

app.intent('action.intent.OPTION',(conv,params,option)=>{
  console.log(option);
    let response='you did not selected any option';
  if(option && selected_item_response.hasOwnProperty(option)){
    response=selected_item_response[option];
  }
  conv.close(response);
});



const days =["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

app.intent('what_is', (conv,{routine,date}) => {
  
  // const d = new Date();
  // console.log(d);
  // const minutesSinceMidnight = d.getHours() * 60 + d.getMinutes() + 330;
  // const day = d.getDay();

  // minutesSinceMidnight < 540
  //     ? conv.ask("College has not started yet")
  //     : minutesSinceMidnight < 705
  //         ? conv.ask(`The number of period going on is ${Math.floor((minutesSinceMidnight - 540) / 55)}`)
  //         : minutesSinceMidnight < 745
  //             ? conv.ask("Enjoy the break")
  //             : minutesSinceMidnight < 1075
  //                 ? conv.ask(`The number of period going on is ${4 + Math.floor((minutesSinceMidnight - 745) / 55)}`)
  //                 : conv.ask(`College is over`);

  // console.log(`d: ${d}, minutesSinceMidnight ${minutesSinceMidnight}, this is a ${days[d.getDay()]}`);
  // conv.close(`Today is a ${days[day]}, ${minutesSinceMidnight} have elapsed since last midnight `);

  const collectionRef=db.collection('routine');
const termRef = collectionRef.doc('cse-c-5'); 
return termRef.get()
.then((snapshot) => {
  const {Mon,Tue,Wed,Thu,Fri} = snapshot.data();
  return conv.ask(`Here you go, ${Mon[1].type}, ${Mon[1].location}.  
    What else do you want to know?`);
}).catch((e) => {
  console.log('error:', e);
  conv.close('Sorry, try again and tell me another rotunitne.');
});

});
exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);
