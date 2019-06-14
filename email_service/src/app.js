// const { ServiceBusClient, ReceiveMode } = require("@azure/service-bus");
const getScores = require('./scores.js')

// const queueName = 'testqueue'

// var ns = ServiceBusClient.createFromConnectionString(connectionString)

// const {sendEmail} = require('./emails.js')

const buildBody = (name, answers)=>{
  const sc = answers.map(({key,value,KeyPhrases})=>`
    Question: <br/>
    ${key}<br/>
    Answer: <br/>
    ${value}<br/>
    KeyPhrases: <br/>
    ${KeyPhrases.map((phrase)=>(phrase.Text)).join(', ')||'N/A'}<br/>
  `).reduce((acc,curr)=>(`${acc}<br/><br/>${curr}`),'<br/>')
  
  return `
    <div>
    <h3>Hello Andrew,</h3>
    <p>${name} has filled out your form, The answers are below:</p>

    <p>
      ${sc}
    </p>
    </div>
  `
}


// const client = ns.createQueueClient(queueName);
// const receiver = client.createReceiver(ReceiveMode.peekLock);

// const onMessageHandler = async (brokeredMessage) => {
//   const {body} = brokeredMessage

//   try {
//     console.log('Getting Scores...')
//     const scores = await getScores(body.answers)

//     const emailText = buildBody(body.name, scores)

//     console.log('Sending Email...')
//     await sendEmail(body.email, 'Suse Demo Answers', emailText)
//     await brokeredMessage.complete();

//   } catch (e) {
//     console.error(e)
//     process.exit(1)
//   }
// };

// receiver.registerMessageHandler(onMessageHandler, (e) => { console.log(e); process.exit(2)}, { autoComplete: false });

const services = require('./services.js')

services.listen(async (msg)=>{

  console.log('Parsed Body:',JSON.parse(msg.Body))

  // const scores = await getScores(body.answers)
  const answers = await services.analyseText(JSON.parse(msg.Body))
  console.log('Answers',JSON.stringify(answers))
  const emailText = buildBody(msg.MessageAttributes.name.StringValue, answers)

  await services.sendEmail(msg.MessageAttributes.email.StringValue, 'Test', emailText)

  return true
})