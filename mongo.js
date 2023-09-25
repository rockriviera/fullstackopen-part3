const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const phoneNumber = process.argv[4]

const url =
    `mongodb+srv://fullstack:${password}@fullstackopen.apeul52.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    phoneNumber: String,
})

const Person = mongoose.model('Person', personSchema)
const person = new Person({
    name: name,
    phoneNumber: phoneNumber,
})

if (process.argv.length < 4) {

    Person
        .find({})
        .then(result => {
            console.log(Person.db.name + ":")
            result.forEach(person => {
                console.log(person.name, person.phoneNumber)
            })
            mongoose.connection.close()
        })
}

else {
    person.save().then(result => {
        console.log('added', result.name, 'number', result.phoneNumber, 'to', Person.db.name)
        mongoose.connection.close()
    })
}


