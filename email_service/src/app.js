const services = require('./services.js')

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


services.listen(async (msg)=>{

  console.log('Parsed Body:',JSON.parse(msg.Body))

  // const scores = await getScores(body.answers)
  const answers = await services.analyseText(JSON.parse(msg.Body))
  console.log('Answers',JSON.stringify(answers))
  const emailText = buildBody(msg.MessageAttributes.name.StringValue, answers)

  await services.sendEmail(msg.MessageAttributes.email.StringValue, 'Test', emailText)

  return true
})