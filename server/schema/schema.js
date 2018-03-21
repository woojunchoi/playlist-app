const graphql = require('graphql')

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLInt
} = graphql

// dummy data
var books = [
    { name: 'Name of the Wind', genre: 'Fantasy', id: '1' },
    { name: 'The Final Empire', genre: 'Fantasy', id: '2' },
    { name: 'The Long Earth', genre: 'Sci-Fi', id: '3' },
];

var authors = [
    { name: 'Patrick Rothfuss', age: 44, id: '1' },
    { name: 'Brandon Sanderson', age: 42, id: '2' },
    { name: 'Terry Pratchett', age: 66, id: '3' }
];

const AuthorType = new GraphQLObjectType({
    name:'Author',
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        age: {type: GraphQLInt}
    })
})

const BookType = new GraphQLObjectType({
   name: 'Book',
   fields: () =>({
       id: {type: GraphQLString},
       name: {type: GraphQLString},
       genre : {type: GraphQLString},
       author: {
           type:AuthorType,
           resolve(parentValue,args) {
               for(let i=0; i<authors.length; i++) {
                   if(authors[i].id === parentValue.id) {
                       return authors[i]
                   }
               }
           }
       }
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
        },
        author: {
            type: AuthorType,
            args: {
                id: {type: GraphQLString}
            },
            resolve(parentValue,args) {
                for(let i=0; i<authors.length; i++) {
                    if(authors[i].id === args.id) {
                        return authors[i]
                    }
                }
            }
        }
    })
})

module.exports = new GraphQLSchema({
    query:RootQuery
})