'use strict'

const {dialogflow, List ,Image}=require('actions-on-google');
const functions = require('firebase-functions');
//const d=require('date-and-time');
const app=dialogflow({debug : true });
//let date = new Date();

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
exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);
