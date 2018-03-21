const graphql = require('graphql')
const Book = require('../model/book');
const Author = require('../model/author')

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLInt,
    GraphQLID,
    GraphQLList
} = graphql


const AuthorType = new GraphQLObjectType({
    name:'Author',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        books: {
            type: new GraphQLList(BookType),
            resolve(parentValue,args) {
                Book.find({authorId:parentValue.id})
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
              return Author.findById(parentValue.authorId)
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
               return Book.findById(args.id)
            }
        },
        author: {
            type: AuthorType,
            args: {
                id: {type: GraphQLString}
            },
            resolve(parentValue,args) {
                return Author.findById(args.id)
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parentValue,args) {
                return Author.find({})
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parentValue,args) {
                return Book.find({})
            }
        }
    })
})

const Mutation = new GraphQLObjectType({
    name:'Mutation',
    fields:() => ({
        addAuthor: {
            type: AuthorType,
            args:{
                name: {type: GraphQLString},
                age : {type: GraphQLInt}
            },
            resolve(parentValue,args) {
                let author = new Author({
                    name:args.name,
                    age: args.age
                })
                return author.save()
            }
        },
        addBook: {
            type:BookType,
            args:{
                name: { type: GraphQLString },
                genre: { type: GraphQLString },
                authorId: { type: GraphQLID }
            },
            resolve(parentValue,args) {
                let book = new Book({
                    name:args.name,
                    genre:args.genre,
                    authorId: args.authorId
                })
                return book.save();
            }
        }
    })
})

module.exports = new GraphQLSchema({
    query:RootQuery,
    mutation: Mutation
})