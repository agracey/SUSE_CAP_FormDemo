const pubsub = require('./pubsub.js')


module.exports = {
  submitForm: async (_, {form})=>{

    console.log('Recieved a message. Adding it to the queue. ')

    await pubsub.send(form)

    return "success"
  }
}