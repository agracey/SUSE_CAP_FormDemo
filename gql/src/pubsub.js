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

const sqs_service = JSON.parse(process.env.VCAP_SERVICES).sqs.find(({instance_name})=>(instance_name == 'message-bus'))

// Set the region 
AWS.config.update({
  region: process.env.REGION,
  accessKeyId: sqs_service.credentials.SQS_AWS_ACCESS_KEY_ID,
  secretAccessKey: sqs_service.credentials.SQS_AWS_SECRET_ACCESS_KEY

});

const queue_url = sqs_service.credentials.QUEUE_URL
// Create an SQS service object
var sqs = new AWS.SQS({apiVersion: '2012-11-05'});

module.exports = {
  // send:(body)=>(sender.send({body}))
  send:async (data)=>{
    var params = {
      DelaySeconds: 10,
      MessageAttributes: {
        "name": {
          DataType: "String",
          StringValue: data.name
        },
        "email": {
          DataType: "String",
          StringValue: data.email
        },
        "language": {
          DataType: "String",
          StringValue: data.language || 'en_us'
        }
      },
      MessageBody: JSON.stringify(data.answers),
      QueueUrl: queue_url
    }

    sqs.sendMessage(params, function(err, data) {
      if (err) {
        console.log("Error", err)
      } else {
        console.log("Sent Message to Queue", data.MessageId)
      }
    });
  }
}