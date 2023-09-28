const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

//const password = 'mongulardb'

const url = process.env.MONGODB_URI

console.log('connecting to', url)

//const url =`mongodb+srv://fullstack:${password}@fullstackopen.apeul52.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
    name: String,
    phoneNumber: String,
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)