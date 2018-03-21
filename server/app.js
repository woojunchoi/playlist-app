const express = require('express')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema')
const mongoose = require('mongoose')
const app = express()

mongoose.connect('mongodb://<dbuser>:<dbpassword>@ds257838.mlab.com:57838/woojunmongo')
mongoose.connection.once('open', () => {
    console.log('connected to Mongo')
})

app.use('/graphql',graphqlHTTP({
    schema,
    graphiql:true
}))

app.listen(4000,()=> {
    console.log('now listening for request on port 4000')
})