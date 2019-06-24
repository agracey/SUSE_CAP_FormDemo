// const { ServiceBusClient } = require("@azure/service-bus");
// const connectionString = ''


// var ns = ServiceBusClient.createFromConnectionString(connectionString)
// const queueName = 'testqueue'

// const client = ns.createQueueClient(queueName);
// const sender = client.createSender();

// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// if(!process.env.VCAP_SERVICES.sqs) {
//   console.log('SQS service not found. Exiting',JSON.stringify(process.env,null, 2))
//   process.exit(1)
// }
const sender_email_address = process.env.SENDER_EMAIL

const sqs_service = JSON.parse(process.env.VCAP_SERVICES).sqs.find(({instance_name})=>(instance_name == 'message-bus'))
const queue_url = sqs_service.credentials.QUEUE_URL


// Set the region 
AWS.config.update({
  region: process.env.REGION,
  accessKeyId: sqs_service.credentials.SQS_AWS_ACCESS_KEY_ID,
  secretAccessKey: sqs_service.credentials.SQS_AWS_SECRET_ACCESS_KEY

})
const ses = new AWS.SES()
const sqs = new AWS.SQS()
const comprehend = new AWS.Comprehend();

const { Consumer } = require('sqs-consumer');

//Pretty sure I need to pause this whole thing until the first handler is set.
let current_handler = async ()=>{return false}

const app = Consumer.create({
  queueUrl: queue_url,
  handleMessage: async (message) => {
    return current_handler(message)
  },
  messageAttributeNames: ['name','email','language'],
  sqs
});

app.on('error', (err) => {
  console.error(err.message);
});

app.on('processing_error', (err) => {
  console.error(err.message);
});

app.on('timeout_error', (err) => {
 console.error(err.message);
});

app.start();


 
module.exports = {
  listen: (handler)=>{
    current_handler = handler
  },

  sendEmail: (to, subject, body)=>{
    var params = {
      Destination: {
        ToAddresses: [
          to
        ]
      },
      Message: {
        Body: {
          Html: {
           Charset: "UTF-8",
           Data: body
          },
          Text: {
           Charset: "UTF-8",
           Data: body
          }
         },
         Subject: {
          Charset: 'UTF-8',
          Data: subject
         }
        },
      Source: sender_email_address
    }
    console.log('SENDING EMAIL',params)

    return ses.sendEmail(params).promise();
  },


  analyseText: (list) => {
    const TextList = list.map((text)=>(text.value))
    console.log('TextList',TextList)
    return comprehend.batchDetectKeyPhrases({LanguageCode:'en', TextList}).promise()
    .then((res)=>{
      console.log('RESULTS:',res)
      return res.ResultList.map((text)=>({...text, ...(list[text.Index])}))
    })
  }
}