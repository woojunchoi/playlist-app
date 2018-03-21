const express = require('express')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema')
const mongoose = require('mongoose')
const app = express()

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://woojunchoi:spdlxm123@ds257838.mlab.com:57838/woojunmongo')
mongoose.connection.once('open', () => {
    console.log('connected to Mongo')
}).on('error', error => console.log('Error connecting to MongoLab:', error));



app.use('/graphql',graphqlHTTP({
    schema,
    graphiql:true
}))

app.listen(4000,()=> {
    console.log('now listening for request on port 4000')
})