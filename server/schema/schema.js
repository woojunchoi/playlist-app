const graphql = require('graphql')

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema
} = graphql

// dummy data
var books = [
    { name: 'Name of the Wind', genre: 'Fantasy', id: '1' },
    { name: 'The Final Empire', genre: 'Fantasy', id: '2' },
    { name: 'The Long Earth', genre: 'Sci-Fi', id: '3' },
];

const BookType = new GraphQLObjectType({
   name: 'Book',
   fields: () =>({
       id: {type: GraphQLString},
       name: {type: GraphQLString},
       genre : {type: GraphQLString}
   })
})

const RootQuery = new GraphQLObjectType({
    name:'RootQuery',
    fields:() => ({
        book: {
            type: BookType,
            args:{
                id:{type:GraphQLString}
            },
            resolve(parentValue, args) {
                for(let i=0; i<books.length; i++) {
                    if(books[i].id === args.id) {
                        return books[i]
                    }
                }
            }
        }
    })
})

module.exports = new GraphQLSchema({
    query:RootQuery
})