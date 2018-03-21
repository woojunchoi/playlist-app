const graphql = require('graphql')

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLInt,
    GraphQLID,
    GraphQLList
} = graphql

// dummy data
var books = [
    { name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorId: '1' },
    { name: 'The Final Empire', genre: 'Fantasy', id: '2', authorId: '2' },
    { name: 'The Hero of Ages', genre: 'Fantasy', id: '4', authorId: '2' },
    { name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorId: '3' },
    { name: 'The Colour of Magic', genre: 'Fantasy', id: '5', authorId: '3' },
    { name: 'The Light Fantastic', genre: 'Fantasy', id: '6', authorId: '3' },
];

var authors = [
    { name: 'Patrick Rothfuss', age: 44, id: '1' },
    { name: 'Brandon Sanderson', age: 42, id: '2' },
    { name: 'Terry Pratchett', age: 66, id: '3' }
];

const AuthorType = new GraphQLObjectType({
    name:'Author',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        books: {
            type: new GraphQLList(BookType),
            resolve(parentValue,args) {
                let output = []
                for(let i=0; i<books.length; i++) {
                    if(parentValue.id === books[i].authorId) {
                        output.push(books[i])
                    }
                }
                return output
            }
        }
    })
})

const BookType = new GraphQLObjectType({
   name: 'Book',
   fields: () =>({
       id: {type: GraphQLID},
       name: {type: GraphQLString},
       genre : {type: GraphQLString},
       author: {
           type: AuthorType,
           resolve(parentValue,args) {
               for(let i=0; i<authors.length; i++) {
                   if(authors[i].id === parentValue.authorId) {
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
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parentValue,args) {
                return authors
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parentValue,args) {
                return books
            }
        }
    })
})

module.exports = new GraphQLSchema({
    query:RootQuery
})